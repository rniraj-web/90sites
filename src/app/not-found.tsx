import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center sm:px-6">
      <p className="font-serif text-sm font-medium text-muted-foreground">404</p>
      <h1 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
        We couldn&apos;t find that page.
      </h1>
      <p className="mt-3 text-muted-foreground">
        The page may have moved or no longer exists.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:opacity-90 active:translate-y-0"
      >
        Back to home
      </Link>
    </div>
  );
}
