import Image from "next/image";
import Link from "next/link";

type Props = { image: string; imageAlt: string; eyebrow: string; title: string; text: string; href: string };

export function RouteCard({ image, imageAlt, eyebrow, title, text, href }: Props) {
  return (
    <Link href={href} className="grid grid-cols-[112px_1fr] overflow-hidden rounded-card bg-surface shadow-soft transition duration-200 hover:-translate-y-[3px] hover:shadow-lift sm:grid-cols-[200px_1fr]">
      <div className="relative min-h-[148px]">
        <Image src={image} alt={imageAlt} fill sizes="200px" className="object-cover" />
      </div>
      <div className="flex flex-col gap-2 p-4 sm:p-6">
        <p className="eyebrow">{eyebrow}</p>
        <h3 className="text-xl leading-[26px]">{title}</h3>
        <p className="text-[15px] leading-6">{text}</p>
      </div>
    </Link>
  );
}
