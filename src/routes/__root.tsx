import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { domAnimation, LazyMotion } from "motion/react";
import { Footer } from "#/components/layout/footer";
import { Navbar } from "#/components/layout/navbar";
import { NotFound } from "#/components/not-found";
import { ThemeProvider } from "#/hooks/theme";
import { seo } from "#/lib/seo";
import config from "../../project.config";
import globalsStyles from "../globals.css?url";

export const Route = createRootRoute({
  head: () => {
    const tags = seo({
      title: `${config.profile.name} - ${config.site.displayName}`,
      description: config.pages.home.description,
      keywords: config.site.keywords,
      image: config.site.ogImage ? absoluteUrl(config.site.url, config.site.ogImage) : undefined,
      twitter: config.site.twitter,
    });

    return {
      meta: [
        { charSet: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        ...tags.meta,
      ],
      links: [
        { rel: "preconnect", href: "https://cdn.simpleicons.org" },
        { rel: "stylesheet", href: globalsStyles },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/portfolio/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/portfolio/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/portfolio/favicon-16x16.png",
        },
        { rel: "icon", href: "/portfolio/favicon.ico" },
        ...tags.links,
      ],
      scripts: tags.scripts,
    };
  },
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="full-stack"
      data-scroll-behavior="smooth"
      className="scroll-smooth h-full bg-background text-foreground antialiased"
    >
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>
          <LazyMotion features={domAnimation} strict>
            {children}
          </LazyMotion>
        </ThemeProvider>

        <Scripts />
      </body>
    </html>
  );
}
