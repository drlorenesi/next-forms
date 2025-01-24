import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
// Types
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reportes Granada",
  description: "Sistema de reportes gereciales",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  // const user = {
  //   name: data?.user.user_metadata?.first_name ?? "",
  //   email: data?.user.user_metadata?.email ?? "",
  //   avatar: null,
  //   initials:
  //     (data?.user.user_metadata?.first_name.trim()?.[0]?.toUpperCase() ?? "") +
  //     (data?.user.user_metadata?.last_name.trim()?.[0]?.toUpperCase() ?? ""),
  // };
  // console.log(user);

  return (
    <>
      <Header />
      <main className="flex-grow mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4">
        {children}
      </main>
      <Footer />
    </>
  );
}
