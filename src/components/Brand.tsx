import Image from "next/image";
import Link from "next/link";

/**
 * Logotipo oficial da Tour (manual de marca).
 * Regras: não alterar cor fora da paleta, não cortar, não rotacionar, sem sombras/efeitos/opacidade,
 * nunca sobre ilustrações. Versão azul-escuro (#142c63) em fundos claros; versão azul-claro (#caf5f7)
 * em fundos escuros (rodapé e modo escuro).
 */
type Props = { variant?: "auto" | "light-bg" | "dark-bg"; height?: number; className?: string };

const RATIO = 760 / 311;

export function Brand({ variant = "auto", height = 50, className = "" }: Props) {
  const width = Math.round(height * RATIO);
  const navy = <Image src="/logo/logo-tour.png" alt="Tour" width={width} height={height} priority />;
  const light = <Image src="/logo/logo-tour-claro.png" alt="Tour" width={width} height={height} priority />;

  return (
    <Link href="/" aria-label="Tour — página inicial" className={`inline-flex shrink-0 items-center ${className}`}>
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
