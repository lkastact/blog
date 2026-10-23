import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "sky" | "ghost" | "light" | "link";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] font-semibold whitespace-nowrap " +
  "transition duration-200 hover:-translate-y-px hover:shadow-soft active:translate-y-0 active:shadow-none " +
  "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 cursor-pointer";

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-[22px] text-[15px]",
  lg: "h-[52px] px-7 text-base",
};

const variants: Record<Variant, string> = {
  primary: "border-transparent bg-primary text-on-primary hover:brightness-110",
  sky: "border-transparent bg-sky text-on-sky hover:brightness-105",
  ghost: "bg-transparent text-ink border-line-strong hover:bg-surface-sky",
  light: "bg-white/15 text-white border-white/80 hover:bg-white/25",
  link: "!h-auto !px-0 !border-0 text-accent hover:underline underline-offset-4 hover:!translate-y-0 hover:!shadow-none",
};

type Props = {
  variant?: Variant;
  size?: Size;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  iconStart?: IconName;
  iconEnd?: IconName;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
};

export function Button({ variant = "primary", size = "md", href, type = "button", disabled, iconStart, iconEnd, onClick, className, children }: Props) {
  const cls = [base, sizes[size], variants[variant], className].filter(Boolean).join(" ");
  const content = (
    <>
      {iconStart && <Icon name={iconStart} size={18} />}
      <span>{children}</span>
      {iconEnd && <Icon name={iconEnd} size={18} />}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}
