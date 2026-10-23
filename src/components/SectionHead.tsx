import type { ReactNode } from "react";

type Props = { eyebrow?: string; title: string; text?: string; titleId?: string; action?: ReactNode; as?: "h1" | "h2" };

export function SectionHead({ eyebrow, title, text, titleId, action, as: Tag = "h2" }: Props) {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <Tag id={titleId} className="mt-2 text-[28px] leading-[34px] tracking-[-0.01em] sm:text-[32px] sm:leading-[38px]">
          {title}
        </Tag>
        {text && <p className="mt-3 max-w-[560px]">{text}</p>}
      </div>
      {action}
    </div>
  );
}
