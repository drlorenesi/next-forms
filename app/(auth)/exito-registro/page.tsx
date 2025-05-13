import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegisterSuccess() {
  return (
    <div className="flex flex-col items-center space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            !Gracias por Registrarte 👍!
          </CardTitle>
          <CardDescription className="text-center">
            Se ha enviado un correo con instrucciones para verificar tu cuenta.
            En cuanto la hayas verificado podrás iniciar sesión.
          </CardDescription>
        </CardHeader>
      </Card>
      <Button variant="link" asChild>
        <Link href="/login">
          <ChevronLeft />
          Regresar a inicio
        </Link>
      </Button>
    </div>
  );
}
