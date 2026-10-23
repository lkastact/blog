import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icon";

type Props = { image: string; imageAlt: string; title: string; text: string; href: string; size?: "lg" | "wide"; className?: string };

export function DestinationTile({ image, imageAlt, title, text, href, size, className = "" }: Props) {
  const span = size === "lg" ? "sm:col-span-2 lg:row-span-2" : size === "wide" ? "sm:col-span-2" : "";
  return (
    <Link href={href} className={`group relative flex items-end overflow-hidden rounded-card text-white ${span} ${className}`}>
      <Image src={image} alt={imageAlt} fill sizes={size ? "(min-width: 1080px) 740px, 100vw" : "(min-width: 1080px) 360px, 100vw"} className="object-cover transition-transform duration-[600ms] group-hover:scale-105" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,var(--scrim)_0%,var(--scrim)_30%,rgba(11,26,61,0)_72%)]" />
      <div className="relative p-6">
        <h3 className={`!text-white ${size === "lg" ? "text-[22px] leading-7 lg:text-[30px] lg:leading-9" : "text-[22px] leading-7"}`}>{title}</h3>
        <p className="mt-1 max-w-[340px] text-[15px] leading-[22px]">{text}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold">
          Ver artigos <Icon name="arrow-right" size={16} />
        </span>
      </div>
    </Link>
  );
}
