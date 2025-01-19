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
            <span>404 - Not Found</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-7xl font-bold text-gray-300">404</p>
            <p className="text-xl text-gray-600">
              Oops! The page you&apos;re looking for doesn&apos;t exist.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/" replace className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
