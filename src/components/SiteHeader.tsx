"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/site";
import { Brand } from "./Brand";
import { Button } from "./Button";
import { Icon } from "./Icon";

function activeId(pathname: string): string | null {
  if (pathname === "/") return "inicio";
  if (pathname.startsWith("/artigos/categoria/dicas-para-viajar-melhor")) return "dicas";
  if (pathname.startsWith("/artigos/categoria/roteiros-e-destinos")) return "roteiros";
  return null;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const current = activeId(pathname);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-surface">
      <div className="container-rt flex h-16 items-center gap-8 sm:h-[76px]">
        <Brand />
        <nav aria-label="Navegação principal" className="ml-auto hidden lg:block">
          <ul className="flex gap-6">
            {NAV.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  aria-current={current === item.id ? "page" : undefined}
                  className="group relative inline-block py-2 text-[15px] font-semibold text-ink"
                >
                  {item.label}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0.5 h-0.5 origin-left scale-x-0 rounded bg-sky transition-transform duration-200 group-hover:scale-x-100 group-aria-[current=page]:scale-x-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden lg:block">
          <Button href="#contato">Planeje sua próxima viagem</Button>
        </div>
        <button
          type="button"
          className="ml-auto inline-flex size-11 items-center justify-center rounded-full border-[1.5px] border-line-strong text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="menu-movel"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} size={22} />
          <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
        </button>
      </div>

      <div id="menu-movel" hidden={!open} className="border-t border-line bg-surface shadow-lift lg:hidden">
        <nav aria-label="Navegação móvel" className="container-rt">
          <ul className="py-3">
            {NAV.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={current === item.id ? "page" : undefined}
                  className="block border-b border-line py-3 text-[17px] font-semibold text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button href="#contato" onClick={() => setOpen(false)} className="mt-1 mb-5 w-full">
            Planeje sua próxima viagem
          </Button>
        </nav>
      </div>
    </header>
  );
}
