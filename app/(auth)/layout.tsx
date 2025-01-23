import type { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Inicio de sesión",
  description: "Usa tu cuenta para iniciar sesión",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/");
  return (
    <div className="flex justify-center p-8">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
