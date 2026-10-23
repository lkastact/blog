import Link from "next/link";
import { Icon, type IconName } from "./Icon";

type Props = { icon: IconName; title: string; description: string; href: string; linkLabel?: string };

export function CategoryCard({ icon, title, description, href, linkLabel = "Explorar artigos" }: Props) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-card border border-line bg-surface p-6 shadow-soft transition duration-200 hover:-translate-y-[3px] hover:shadow-lift"
    >
      <span aria-hidden className="mb-2 inline-flex size-[52px] items-center justify-center rounded-full bg-mist text-ink transition-colors group-hover:bg-sky group-hover:text-on-sky">
        <Icon name={icon} size={24} />
      </span>
      <h3 className="text-[22px] leading-7">{title}</h3>
      <p className="flex-1 text-[15px] leading-6">{description}</p>
      <span className="inline-flex items-center gap-2 text-[15px] font-semibold text-accent group-hover:underline underline-offset-4">
        {linkLabel}
        <Icon name="arrow-right" size={18} className="transition-transform group-hover:translate-x-[3px]" />
      </span>
    </Link>
  );
}
