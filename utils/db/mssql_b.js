import sql from "mssql";

// Construct the config object from environment variables.
const config = {
  server: process.env.MSSQL_SERVER,
  database: process.env.MSSQL_DATABASE,
  user: process.env.MSSQL_USER,
  password: process.env.MSSQL_PASSWORD,
  port: process.env.MSSQL_PORT ? parseInt(process.env.MSSQL_PORT, 10) : 1433,
  options: {
    encrypt: process.env.MSSQL_ENCRYPT === "true", // use encryption if required (e.g., for Azure)
    trustServerCertificate: process.env.MSSQL_TRUST_CERT === "true", // set to true for local development
  },
};

if (!config.server || !config.database || !config.user || !config.password) {
  throw new Error(
    "MSSQL connection environment variables (MSSQL_SERVER, MSSQL_DATABASE, MSSQL_USER, MSSQL_PASSWORD) must be set"
  );
}

let pool;

// Helper function to create a new connection pool and attach an error listener.
function createPool() {
  const newPool = new sql.ConnectionPool(config);
  newPool.on("error", (err) => {
    console.error("SQL Pool encountered an error:", err);
  });
  newPool.connect().catch((err) => {
    console.error("Database Connection Failed!", err);
  });
  return newPool;
}

// In production, create a new pool per instance; in development, reuse the pool.
if (process.env.NODE_ENV === "production") {
  pool = createPool();
} else {
  if (!global.__dbPool__) {
    global.__dbPool__ = createPool();
  }
  pool = global.__dbPool__;
}

// Test connection function
export async function mssqlConnect() {
  try {
    // Ensure the pool is connected
    if (!pool.connected) {
      await pool.connect();
    }
    const { database, server } = pool.config;
    console.log(`- Connected to ${database} on ${server}`);
  } catch (error) {
    throw error; // Preserve the original error stack
  }
}

// Query function without parameters
// Usage: const { rows, duration } = await query('SELECT GETDATE() AS now');
export async function query(sqlQuery) {
  const start = Date.now();
  try {
    const result = await pool.request().query(sqlQuery);
    const duration = Date.now() - start;
    return { rows: result.recordset, duration };
  } catch (error) {
    throw error;
  }
}

// Execute function with parameter binding.
// Supports optional explicit parameter types for enhanced type safety.
// Usage example:
// const { rows, duration } = await execute(
//   'SELECT * FROM Users WHERE id = @p0',
//   [userId],
//   [sql.Int] // Optional explicit SQL type(s)
// );
export async function execute(sqlQuery, params, types = []) {
  const start = Date.now();
  try {
    const request = pool.request();
    // Bind parameters with names: @p0, @p1, etc.
    params.forEach((param, index) => {
      // Use the provided SQL type if available; otherwise, default to sql.Int for numbers or sql.NVarChar otherwise.
      const type =
        types[index] || (typeof param === "number" ? sql.Int : sql.NVarChar);
      request.input(`p${index}`, type, param);
    });
    const result = await request.query(sqlQuery);
    const duration = Date.now() - start;
    return { rows: result.recordset, duration };
  } catch (error) {
    throw error;
  }
}
