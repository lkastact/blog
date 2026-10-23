"use client";

import { useState, type FormEvent } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Props = {
  /**
   * Enquanto não houver integração com um serviço de e-mail, o formulário é demonstrativo:
   * valida o e-mail e mostra a confirmação, mas não envia nada.
   * Para integrar, passe `onSubscribe` (ex.: chamada a uma API route) e `demo={false}`.
   */
  demo?: boolean;
  onSubscribe?: (email: string) => Promise<void> | void;
};

export function Newsletter({ demo = true, onSubscribe }: Props) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!value) return setError("Informe seu e-mail para receber as novidades.");
    if (!EMAIL_RE.test(value)) return setError("Esse e-mail parece incompleto. Confira e tente de novo.");
    setError(null);
    await onSubscribe?.(value);
    setDone(true);
  }

  return (
    <section id="newsletter" aria-labelledby="news-titulo" className="py-12 sm:py-[72px]">
      <div className="container-rt">
        <div className="relative overflow-hidden rounded-panel bg-surface-sky px-5 py-12 text-center sm:px-12 sm:py-[72px]">
          <svg aria-hidden viewBox="0 0 1000 360" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 size-full fill-surface opacity-70">
            <ellipse cx="90" cy="300" rx="160" ry="46" />
            <ellipse cx="170" cy="270" rx="80" ry="44" />
            <ellipse cx="900" cy="70" rx="150" ry="36" />
            <ellipse cx="840" cy="50" rx="70" ry="36" />
            <ellipse cx="940" cy="320" rx="110" ry="30" />
          </svg>
          <div className="relative mx-auto max-w-[560px]">
            <h2 id="news-titulo" className="text-[28px] leading-[34px] tracking-[-0.01em] sm:text-[32px] sm:leading-[38px]">
              Inspire-se para sua próxima viagem.
            </h2>
            <p className="mt-3">Receba dicas, roteiros e inspirações para descobrir novos destinos.</p>

            {done ? (
              <div role="status" className="mt-8 inline-flex items-center gap-3 rounded-card bg-surface px-6 py-4 text-left font-semibold text-success">
                <Icon name="check" size={24} />
                <div>
                  Tudo certo!{" "}
                  <span className="font-medium text-ink">
                    {demo ? "Seu e-mail foi validado nesta demonstração — nenhum dado foi enviado ou armazenado." : "Você receberá nossas próximas inspirações."}
                  </span>
                </div>
              </div>
            ) : (
              <form noValidate onSubmit={submit} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <label htmlFor="news-email" className="sr-only">
                  Seu e-mail
                </label>
                <input
                  id="news-email"
                  type="email"
                  autoComplete="email"
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  aria-invalid={!!error}
                  aria-describedby={error ? "news-erro" : undefined}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  className="h-[52px] flex-1 rounded-full border-[1.5px] border-line-strong bg-surface px-6 text-base font-medium text-ink placeholder:text-ink-muted focus:outline-2 focus:outline-offset-2 focus:outline-focus aria-invalid:border-danger"
                />
                <Button type="submit" size="lg">
                  Quero receber
                </Button>
              </form>
            )}

            {!done && error && (
              <p id="news-erro" role="alert" className="mt-3 flex items-center justify-center gap-1.5 text-sm font-semibold text-danger">
                <Icon name="alert" size={16} />
                {error}
              </p>
            )}
            {demo && <p className="mt-4 text-[13px] leading-[18px] text-ink-muted">Formulário demonstrativo: ainda não está conectado a um serviço de e-mail.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
