import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <section className="flex flex-col items-center justify-center space-y-4 py-24 text-center">
        <h1 className="text-4xl font-bold">Build your component library</h1>
        <p className="max-w-[600px] text-muted-foreground">
          Beautifully designed components that you can copy and paste into your
          apps. Accessible. Customizable. Open Source.
        </p>
        <div className="flex gap-4">
          <Button>Get Started</Button>
          <Button variant="outline">Browse Components</Button>
        </div>
      </section>
      <section className="grid gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
          >
            <h2 className="font-semibold">Card {i + 1}</h2>
            <p className="text-sm text-muted-foreground">
              This is a sample card to demonstrate the layout.
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
