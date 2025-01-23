import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VerificationSuccess() {
  return (
    <div className="flex flex-col items-center space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            ¡Enhorabuena 👏! Tu cuenta ha sido verificada ✅.
          </CardTitle>
          <CardDescription className="text-center">
            Ahora podrás iniciar sesión.
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
