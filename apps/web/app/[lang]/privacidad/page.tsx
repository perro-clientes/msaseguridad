import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { getDictionary } from "@/content/dictionaries";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacidad">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const title = getDictionary(lang).privacy.title;
  return pageMetadata({
    locale: lang,
    path: "/privacidad",
    title,
    description:
      lang === "es"
        ? "Cómo trata MSA Seguridad los datos personales que recibe a través de este sitio (Ley 25.326)."
        : "How MSA Seguridad handles the personal data it receives through this website (Argentine Law 25.326).",
  });
}

/*
 * BORRADOR: texto base a validar por el área legal de MSA antes de publicar.
 * Se publica solo en español; la versión en inglés muestra el mismo texto.
 */
export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacidad">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const p = getDictionary(lang).privacy;

  return (
    <article className="shell max-w-3xl pb-24 pt-32 md:pt-44">
      <h1 className="text-headline font-medium">{p.title}</h1>
      <p className="label mt-4 text-faint">{p.updated}</p>
      <div className="mt-12 space-y-6 text-ink/75 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-ink">
        <p>
          {site.legalName} (en adelante, “MSA”) respeta la privacidad de quienes visitan este sitio. Esta
          política describe qué datos recopilamos a través del formulario de contacto y cómo los
          tratamos, de acuerdo con la Ley 25.326 de Protección de los Datos Personales.
        </p>
        <h2>Datos que recopilamos</h2>
        <p>
          Nombre, empresa, email, teléfono y el mensaje que nos envíes. No recopilamos datos sensibles
          ni utilizamos cookies de seguimiento con fines publicitarios.
        </p>
        <h2>Finalidad</h2>
        <p>
          Usamos estos datos únicamente para responder tu consulta y, si corresponde, enviarte una
          propuesta comercial. No los cedemos a terceros.
        </p>
        <h2>Tus derechos</h2>
        <p>
          Podés solicitar el acceso, la rectificación o la supresión de tus datos escribiendo a{" "}
          <a className="underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          . La Agencia de Acceso a la Información Pública, órgano de control de la Ley 25.326, atiende
          las denuncias y reclamos relativos al incumplimiento de las normas sobre protección de datos
          personales.
        </p>
      </div>
    </article>
  );
}
