import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70vh] flex-col items-start justify-center gap-6 pt-24">
      <p className="label text-faint">404</p>
      <h1 className="text-headline font-medium">Página no encontrada · Page not found</h1>
      <Link href="/" className="label rounded-md bg-ink px-4 py-2.5 text-white">
        Volver al inicio · Home
      </Link>
    </section>
  );
}
