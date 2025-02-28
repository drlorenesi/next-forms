import sql from "mssql";

// Construct the config object from environment variables, with additional options.
const config = {
  server: process.env.MSSQL_SERVER,
  database: process.env.MSSQL_DATABASE,
  user: process.env.MSSQL_USER,
  password: process.env.MSSQL_PASSWORD,
  port: process.env.MSSQL_PORT ? parseInt(process.env.MSSQL_PORT, 10) : 1433,
  options: {
    encrypt: process.env.MSSQL_ENCRYPT === "true", // Use encryption if required (e.g., for Azure)
    trustServerCertificate: process.env.MSSQL_TRUST_CERT === "true", // Useful for local development
    enableArithAbort: true, // Helps avoid certain arithmetic errors
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

if (!config.server || !config.database || !config.user || !config.password) {
  throw new Error(
    "MSSQL connection environment variables (MSSQL_SERVER, MSSQL_DATABASE, MSSQL_USER, MSSQL_PASSWORD) must be set"
  );
}

// Asynchronously creates a new connection pool and awaits connection.
async function createPool() {
  const pool = new sql.ConnectionPool(config);

  pool.on("error", (err) => {
    console.error("SQL Pool encountered an error:", err);
    // Optionally reset the pool promise so that a new connection can be attempted.
    if (process.env.NODE_ENV !== "production") {
      global.__mssqlPoolPromise = null;
    }
  });

  try {
    await pool.connect();
    console.log(
      `- Connected to ${pool.config.database} on ${pool.config.server}`
    );
    return pool;
  } catch (err) {
    console.error("Database Connection Failed!", err);
    throw err;
  }
}

// Cache the pool promise to avoid multiple connections in development.
// In production, a new pool is created per instance.
let poolPromise;
if (process.env.NODE_ENV === "production") {
  poolPromise = createPool();
} else {
  if (!global.__mssqlPoolPromise) {
    global.__mssqlPoolPromise = createPool();
  }
  poolPromise = global.__mssqlPoolPromise;
}

/**
 * Returns a promise that resolves with a connected pool.
 */
export async function mssqlConnect() {
  return await poolPromise;
}

/**
 * Executes a query with optional parameters.
 *
 * @param {string} sqlQuery - The SQL query to execute.
 * @param {object} [params={}] - An object with key/value pairs for query parameters.
 * @returns {Promise<object>} The result of the query.
 */
export async function query(sqlQuery, params = {}) {
  const pool = await poolPromise;
  try {
    const request = pool.request();
    for (const [key, value] of Object.entries(params)) {
      request.input(key, value);
    }
    const result = await request.query(sqlQuery);
    return result;
  } catch (err) {
    console.error("Query failed:", err);
    throw err;
  }
}

// Optionally, export the raw pool if needed.
export { poolPromise as pool };
