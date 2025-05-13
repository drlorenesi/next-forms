import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegisterError() {
  return (
    <div className="flex flex-col items-center space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Error 😖...</CardTitle>
          <CardDescription className="text-center">
            <p>Por favor revisa tu enlace e intenta de nuevo.</p>
            <p>
              Si estabas intentanto reiniciar tu contraseña es posible que tu
              enlace haya caducado. Te recomendamos solicitar un nuevo reinicio
              de contraseña.
            </p>
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
