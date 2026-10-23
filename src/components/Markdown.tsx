import Link from "next/link";
import type { ReactNode } from "react";
import { slugify } from "@/lib/site";

/**
 * Renderizador de Markdown sem dependências e sem HTML bruto (seguro).
 * Suporta: títulos, parágrafos, **negrito**, *itálico*, `código`, links, listas, citações, imagens e divisória.
 * Se preferir, troque por react-markdown/MDX no futuro.
 */
type Block =
  | { t: "h"; level: number; text: string }
  | { t: "img"; alt: string; src: string; caption?: string }
  | { t: "ul" | "ol"; items: string[] }
  | { t: "q" | "p"; text: string }
  | { t: "hr" };

function parseBlocks(src: string): Block[] {
  const lines = src.replace(/\r/g, "").split("\n");
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { i++; continue; }
    let m: RegExpExecArray | null;
    if ((m = /^(#{1,4})\s+(.*)$/.exec(l))) { blocks.push({ t: "h", level: m[1].length, text: m[2] }); i++; continue; }
    if ((m = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)\s*$/.exec(l.trim()))) { blocks.push({ t: "img", alt: m[1], src: m[2], caption: m[3] }); i++; continue; }
    if (/^\s*[-*]\s+/.test(l)) { const items: string[] = []; while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) items.push(lines[i++].replace(/^\s*[-*]\s+/, "")); blocks.push({ t: "ul", items }); continue; }
    if (/^\s*\d+[.)]\s+/.test(l)) { const items: string[] = []; while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) items.push(lines[i++].replace(/^\s*\d+[.)]\s+/, "")); blocks.push({ t: "ol", items }); continue; }
    if (/^>\s?/.test(l)) { const q: string[] = []; while (i < lines.length && /^>\s?/.test(lines[i])) q.push(lines[i++].replace(/^>\s?/, "")); blocks.push({ t: "q", text: q.join(" ") }); continue; }
    if (/^(-{3,}|\*{3,})$/.test(l.trim())) { blocks.push({ t: "hr" }); i++; continue; }
    const p: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|>|\s*[-*]\s|\s*\d+[.)]\s|!\[)/.test(lines[i])) p.push(lines[i++].trim());
    if (!p.length) p.push(lines[i++].trim());
    blocks.push({ t: "p", text: p.join(" ") });
  }
  return blocks;
}

function inline(text: string, key: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let n = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const k = `${key}-${n++}`;
    if (m[2]) out.push(<strong key={k}>{m[2]}</strong>);
    else if (m[3]) out.push(<em key={k}>{m[3]}</em>);
    else if (m[4]) out.push(<code key={k}>{m[4]}</code>);
    else {
      const href = /^(javascript|data|vbscript):/i.test(m[6]) ? "#" : m[6];
      out.push(
        href.startsWith("/") ? (
          <Link key={k} href={href}>{m[5]}</Link>
        ) : (
          <a key={k} href={href} target={/^https?:/.test(href) ? "_blank" : undefined} rel={/^https?:/.test(href) ? "noopener noreferrer" : undefined}>
            {m[5]}
          </a>
        ),
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Markdown({ source, className = "" }: { source: string; className?: string }) {
  return (
    <div className={`prose-rt ${className}`}>
      {parseBlocks(source).map((b, i) => {
        const k = `b${i}`;
        switch (b.t) {
          case "h": {
            const H = (b.level <= 1 ? "h2" : b.level === 2 ? "h2" : "h3") as "h2" | "h3";
            return <H key={k} id={slugify(b.text)}>{inline(b.text, k)}</H>;
          }
          case "img":
            return (
              <figure key={k}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.src} alt={b.alt} loading="lazy" />
                {b.caption && <figcaption>{b.caption}</figcaption>}
              </figure>
            );
          case "ul":
            return <ul key={k}>{b.items.map((it, j) => <li key={j}>{inline(it, k + j)}</li>)}</ul>;
          case "ol":
            return <ol key={k}>{b.items.map((it, j) => <li key={j}>{inline(it, k + j)}</li>)}</ol>;
          case "q":
            return <blockquote key={k}>{inline(b.text, k)}</blockquote>;
          case "hr":
            return <hr key={k} />;
          default:
            return <p key={k}>{inline(b.text, k)}</p>;
        }
      })}
    </div>
  );
}
