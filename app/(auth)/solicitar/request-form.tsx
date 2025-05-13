"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInputField } from "@/components/form-inputs/form-input-field";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// Schemas
import { requestSchema } from "../schemas";

export function RequestForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof requestSchema>>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(data: z.infer<typeof requestSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">¿Olvidaste tu contraseña?</CardTitle>
        <CardDescription>
          Por favor ingresa el correo electrónico que usaste para crear tu
          cuenta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <FormInputField
                  form={form}
                  name="email"
                  label="Email"
                  type="email"
                  autocomplete="username"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="mt-4 w-full"
              disabled={form.formState.isSubmitting}
            >
              Solicitar Re-inicio
            </Button>
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
