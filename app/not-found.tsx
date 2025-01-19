import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center flex-grow py-12 px-4">
      <Card className="w-full max-w-[420px]">
        <CardHeader>
          <CardTitle className="text-4xl font-extrabold">404</CardTitle>
          <CardDescription>Oops! Page not found</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/" replace>
              Go back home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
