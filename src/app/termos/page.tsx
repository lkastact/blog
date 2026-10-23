import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Termos de uso" };

export default function TermsPage() {
  return (
    <LegalPage title="Termos de uso">
      <p>Esta página está reservada para o texto oficial da Tour.</p>
      <p>Inclua aqui as condições de uso do site e do blog, direitos autorais do conteúdo e responsabilidades.</p>
    </LegalPage>
  );
}
