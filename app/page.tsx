import { InputForm } from "./_forms/input-form";

export default function Home() {
  return (
    <div className="p-6">
      <h2 className="scroll-m-20 mb-6 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Next.js Forms
      </h2>
      <h3 className="mb-4 scroll-m-20 text-2xl font-semibold tracking-tight">
        Input Form
      </h3>
      <InputForm />
    </div>
  );
}
