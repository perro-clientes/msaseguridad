import { notFound } from "next/navigation";
import { hasLocale, href } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionaries";
import { Clients, Hero, Intro, Operation, Stats } from "@/components/sections/home";
import { CtaBand, Faq } from "@/components/sections/shared";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <Hero locale={lang} dict={dict} />
      <Intro locale={lang} dict={dict} />
      <Stats dict={dict} />
      <Clients dict={dict} />
      <Operation locale={lang} dict={dict} />
      <Faq {...dict.home.faq} />
      <CtaBand title={dict.home.cta.title} button={dict.home.cta.button} to={href(lang, "/contacto")} />
    </>
  );
}
