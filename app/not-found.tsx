import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-96">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center space-x-2">
            <AlertCircle className="h-6 w-6 text-yellow-500" />
            <span>Página no encontrada</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <code className="text-7xl font-mono font-semibold relative rounded px-[0.3rem] py-[0.2rem] ">
              404
            </code>
            <p className="text-muted-foreground mb-8 text-center max-w-md">
              Lo sentimos, no pudimos encontrar la página que estás buscando.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/" replace className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span>Volver a Inicio</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
