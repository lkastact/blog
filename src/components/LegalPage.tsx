import type { ReactNode } from "react";
import { Button } from "./Button";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="container-rt">
      <div className="mx-auto max-w-[68ch] py-12 sm:py-[72px]">
        <p className="eyebrow">Institucional</p>
        <h1 className="mt-3 mb-6 text-[32px] leading-[38px] sm:text-[42px] sm:leading-[48px]">{title}</h1>
        <div className="space-y-4">{children}</div>
        <Button href="/" variant="ghost" iconStart="arrow-left" className="mt-8">
          Voltar ao início
        </Button>
      </div>
    </div>
  );
}
