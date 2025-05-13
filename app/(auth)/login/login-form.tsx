"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import { FormInputField } from "@/components/form-inputs/form-input-field";
import { SubmitButton } from "@/components/form-inputs/submit-button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// Schemas
import { loginSchema } from "../schemas";
// Actions
import { login } from "../actions";

export function LoginForm() {
  const router = useRouter();

  // 1. Define default values.
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof loginSchema>) {
    // Call Server Action
    const result = await login(data);
    if (result.error) {
      toast({
        variant: "destructive",
        title: "Credenciales inválidas",
        description:
          "El correo o la contraseña son incorrectos. Por favor, inténtalo de nuevo.",
        duration: 3000,
      });
    } else {
      toast({
        className: "bg-green-950 border-green-800 text-green-50",
        description: (
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-400" />
            <span>Sesión iniciada!</span>
          </div>
        ),
        duration: 3000,
      });
      router.push("/");
    }
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
          <CardDescription>
            Ingresa tu correo @granada.com.gt o @chocolatesgranada.com
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-2">
                <FormInputField
                  form={form}
                  name="email"
                  label="Email"
                  placeholder="tu_correo@granada.com.gt"
                  type="email"
                  autocomplete="username"
                />
                <FormInputField
                  form={form}
                  name="password"
                  label="Contraseña"
                  placeholder="********"
                  type="password"
                  autocomplete="current-password"
                />
              </div>
              <SubmitButton
                isSubmitting={form.formState.isSubmitting}
                defaultText="Iniciar sesión"
                className="mt-4 w-full"
              />
              <div className="mt-4 text-center text-sm">
                ¿No tienes cuenta?{" "}
                <Link href="/registro" className="underline underline-offset-4">
                  Registrate aquí
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Link
        href="/solicitar"
        className="inline-block text-sm underline-offset-4 hover:underline"
      >
        ¿Olvidaste tu contraseña?
      </Link>
    </div>
  );
}
