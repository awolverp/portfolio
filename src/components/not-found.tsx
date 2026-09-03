import { Link } from "@tanstack/react-router";

import { buttonVariants } from "#/components/ui/button";

export function NotFound() {
  return (
    <main className="container flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center gap-4 px-4 pt-24 pb-20 text-center">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl starting:opacity-0 starting:translate-y-2 transition-[opacity,translate]">
        Page Not Found
      </h1>
      <p className="max-w-xl text-muted-foreground lg:text-lg starting:opacity-0 starting:translate-y-4 transition-[opacity,translate]">
        This URL isn't a page on this site.
      </p>
      <Link to="/" className={buttonVariants()}>
        Back home
      </Link>
    </main>
  );
}
