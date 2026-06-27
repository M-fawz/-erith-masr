import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Field } from "@/components/Field";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { SOCIALS } from "@/lib/site";
import { SOCIAL_ICONS } from "@/components/Socials";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Booking() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!EMAIL_RE.test(email)) next.email = t("booking.errorEmail");
    if (password.length < 6) next.password = t("booking.errorPassword");
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("submitting");
    window.setTimeout(() => {
      setStatus("success");
      setEmail("");
      setPassword("");
    }, 700);
  };

  return (
    <section id="booking" className="section-pad scroll-mt-28">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Aswan sunset photo — inline-start */}
        <Reveal direction="start" className="order-2 lg:order-1">
          <img
            src="/assets/backgrounds/aswan-sunset.webp"
            alt={t("booking.title")}
            loading="lazy"
            width={850}
            height={1264}
            className="mx-auto w-full max-w-md -rotate-2 rounded-card object-cover shadow-card transition-transform duration-500 hover:rotate-0"
          />
        </Reveal>

        {/* Form — inline-end */}
        <Reveal direction="end" className="order-1 lg:order-2">
          <SectionTitle>{t("booking.title")}</SectionTitle>
          <p className="mt-4 max-w-md text-balance font-body text-lead text-ink-sand text-start">
            {t("booking.subtitle")}
          </p>

          <form onSubmit={submit} noValidate className="mt-7 max-w-lg space-y-5">
            <Field
              label={t("booking.email")}
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={setEmail}
              placeholder={t("booking.emailPlaceholder")}
              error={errors.email}
            />
            <Field
              label={t("booking.password")}
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={setPassword}
              placeholder={t("booking.passwordPlaceholder")}
              error={errors.password}
            />

            <Button
              type="submit"
              variant="orange"
              size="lg"
              className="w-full"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? t("booking.submitting") : t("booking.submit")}
            </Button>

            <AnimatePresence>
              {status === "success" && (
                <motion.p
                  role="status"
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 rounded-input bg-teal/10 px-4 py-3 font-body text-sm font-semibold text-teal"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  {t("booking.success")}
                </motion.p>
              )}
            </AnimatePresence>
          </form>

          {/* Follow us */}
          <div className="mt-8 max-w-lg">
            <div className="flex items-center gap-3 text-orange">
              <span className="h-px flex-1 border-t border-dashed border-orange/50" />
              <span className="font-body text-sm font-semibold">{t("booking.followus")}</span>
              <span className="h-px flex-1 border-t border-dashed border-orange/50" />
            </div>
            <ul className="mt-4 flex items-center justify-center gap-4">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t(s.labelKey)}
                    className="flex h-11 w-16 items-center justify-center rounded-input bg-orange text-ink shadow-soft transition-transform duration-200 hover:-translate-y-0.5 hover:bg-orange-600"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" stroke="currentColor" aria-hidden="true">
                      {SOCIAL_ICONS[s.name]}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
