"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import { FormInputField } from "@/components/form-inputs/form-input-field";
import { SubmitButton } from "@/components/form-inputs/submit-button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Schemas
import { registerSchema } from "../schemas";
// Actions
import { signup } from "../actions";

export function RegisterForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof registerSchema>) {
    // Call the Server Action
    const result = await signup(data);
    console.log(result);
    if (result === "invalid_credentials") {
      toast({
        variant: "destructive",
        title: "Ocurrió un error",
        description:
          "El correo o la contraseña son incorrectos. Por favor, inténtalo de nuevo.",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Regístrate</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              <FormInputField
                form={form}
                name="firstName"
                label="Nombre"
                autocomplete="given-name"
              />
              <FormInputField
                form={form}
                name="lastName"
                label="Apellido"
                autocomplete="family-name"
              />
              <FormInputField
                form={form}
                name="email"
                label="Email"
                placeholder="tu_correo@granada.com.gt"
                description="Usa un correo @granada.com.gt o @chocolatesgranada.com"
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
              <FormInputField
                form={form}
                name="confirm"
                label="Confirmar tu contraseña"
                placeholder="********"
                type="password"
                autocomplete="current-password"
              />
            </div>
            <SubmitButton
              isSubmitting={form.formState.isSubmitting}
              defaultText="Crear cuenta"
              className="mt-4 w-full"
            />
            <div className="mt-4 text-center text-sm">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Inicia sesión aquí
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
