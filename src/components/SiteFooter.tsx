import Link from "next/link";
import type { ReactNode } from "react";
import { CATEGORIES, CONTACT, NAV, SITE, SOCIAL_HANDLE } from "@/lib/site";
import { Brand } from "./Brand";
import { Icon, type IconName } from "./Icon";

function Placeholder({ children }: { children: string }) {
  return <span className="italic">{children}</span>;
}

export function SiteFooter() {
  const digits = CONTACT.phone.replace(/\D/g, "");
  const contact: { icon: IconName; value: ReactNode }[] = [
    {
      icon: "phone",
      value: CONTACT.phone ? (
        <>
          <a href={`tel:+55${digits}`}>{CONTACT.phone}</a>
          {" · "}
          <a href={`https://wa.me/55${digits}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </>
      ) : (
        <Placeholder>[Telefone / WhatsApp]</Placeholder>
      ),
    },
    { icon: "mail", value: CONTACT.email ? <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> : <Placeholder>[E-mail de contato]</Placeholder> },
    {
      icon: "pin",
      value: CONTACT.address ? (
        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`} target="_blank" rel="noopener noreferrer">
          {CONTACT.address}
        </a>
      ) : (
        <Placeholder>[Endereço da agência]</Placeholder>
      ),
    },
    { icon: "clock", value: CONTACT.hours || <Placeholder>[Horário de atendimento]</Placeholder> },
  ];
  const heading = "mb-4 font-sans text-[13px] leading-[18px] font-bold tracking-[0.08em] uppercase !text-on-navy";
  const link = "text-on-navy hover:underline underline-offset-4";

  return (
    <footer id="contato" className="bg-navy pt-12 pb-8 text-[15px] leading-6 text-on-navy-muted sm:pt-[72px]">
      <div className="container-rt">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-12">
          <div id="sobre">
            <Brand variant="dark-bg" height={64} />
            <p className="mt-4 max-w-[340px]">{SITE.about}</p>
            <p className="mt-6 text-sm">
              <span className="sr-only">Redes sociais: </span>
              <span className="inline-flex h-[34px] items-center rounded-full border border-on-navy-muted/45 px-3.5 text-on-navy">{SOCIAL_HANDLE}</span>
            </p>
          </div>

          <nav aria-labelledby="rodape-nav">
            <h2 id="rodape-nav" className={heading}>Navegação</h2>
            <ul className="flex flex-col gap-2">
              {NAV.map((n) => (
                <li key={n.id}>
                  <Link href={n.href} className={link}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="rodape-cat">
            <h2 id="rodape-cat" className={heading}>Categorias</h2>
            <ul className="flex flex-col gap-2">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/artigos/categoria/${c.slug}`} className={link}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={heading}>Contato</h2>
            <ul className="flex flex-col gap-2">
              {contact.map((c) => (
                <li key={c.icon} className="flex items-start gap-2 [&_a]:text-on-navy [&_a]:underline-offset-4 [&_a:hover]:underline">
                  <Icon name={c.icon} size={16} className="mt-1 text-sky" />
                  <span>{c.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-on-navy-muted/25 pt-6 text-sm">
          <p>© {new Date().getFullYear()} Rota Tour. Todos os direitos reservados.</p>
          <ul className="flex gap-6">
            <li><Link href="/privacidade" className={link}>Política de privacidade</Link></li>
            <li><Link href="/termos" className={link}>Termos de uso</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
