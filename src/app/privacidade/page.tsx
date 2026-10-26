import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Política de privacidade" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Política de privacidade">
      <p>Esta página está reservada para o texto oficial da Rota Tour.</p>
      <p>
        Inclua aqui como a agência coleta, usa e protege dados pessoais, em conformidade com a LGPD, e o canal para o titular exercer seus direitos.
      </p>
    </LegalPage>
  );
}
