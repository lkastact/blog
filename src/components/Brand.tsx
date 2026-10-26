import Image from "next/image";
import Link from "next/link";

/**
 * Logotipo oficial da Rota Tour (manual de marca).
 * Regras: não alterar cor fora da paleta, não cortar, não rotacionar, não remover elementos ou a escrita "ROTA",
 * sem sombras/efeitos/opacidade, nunca sobre ilustrações. Versão original (azul #0b2975) em fundos claros; versão azul-claro (#caf5f7)
 * em fundos escuros (rodapé e modo escuro).
 */
type Props = { variant?: "auto" | "light-bg" | "dark-bg"; height?: number; className?: string };

const RATIO = 760 / 298;

export function Brand({ variant = "auto", height = 58, className = "" }: Props) {
  const width = Math.round(height * RATIO);
  const navy = <Image src="/logo/logo-rota-tour.png" alt="Rota Tour" width={width} height={height} priority />;
  const light = <Image src="/logo/logo-rota-tour-claro.png" alt="Rota Tour" width={width} height={height} priority />;

  return (
    <Link href="/" aria-label="Rota Tour — página inicial" className={`inline-flex shrink-0 items-center ${className}`}>
      {variant === "light-bg" && navy}
      {variant === "dark-bg" && light}
      {variant === "auto" && (
        <>
          <span className="dark:hidden">{navy}</span>
          <span className="hidden dark:inline">{light}</span>
        </>
      )}
    </Link>
  );
}
