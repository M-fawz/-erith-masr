import { useState, type FormEvent, type ComponentType } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Field, TextAreaField } from "@/components/Field";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";

// TODO(client): replace with the final Google Maps place-embed URL.
const MAP_SRC =
  "https://maps.google.com/maps?q=Rabie%20Tours%20El%20Agouza%20Giza&z=15&output=embed";

const PHONE_RE = /^[0-9+\-\s()]{7,}$/;

const INFO: { key: string; icon: ComponentType<{ className?: string }> }[] = [
  { key: "address", icon: MapPin },
  { key: "phones", icon: Phone },
  { key: "email", icon: Mail },
  { key: "hours", icon: Clock },
];

export function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ first: "", last: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.first.trim()) next.first = t("contact.errorRequired");
    if (!form.last.trim()) next.last = t("contact.errorRequired");
    if (!PHONE_RE.test(form.phone)) next.phone = t("contact.errorPhone");
    if (!form.message.trim()) next.message = t("contact.errorRequired");
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("submitting");
    window.setTimeout(() => {
      setStatus("success");
      setForm({ first: "", last: "", phone: "", message: "" });
    }, 700);
  };

  return (
    <section id="contact" className="section-pad scroll-mt-28">
      <Container>
        <Reveal>
          <SectionTitle>{t("contact.title")}</SectionTitle>
        </Reveal>

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Map — inline-start */}
          <Reveal direction="start" className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-card shadow-card ring-1 ring-line/50">
              <iframe
                src={MAP_SRC}
                title={t("contact.mapTitle")}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-square w-full border-0"
              />
            </div>
          </Reveal>

          {/* Form — inline-end */}
          <Reveal direction="end" className="order-1 lg:order-2">
            <form onSubmit={submit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label={t("contact.firstName")}
                  name="first"
                  value={form.first}
                  onChange={set("first")}
                  placeholder={t("contact.placeholderFirst")}
                  error={errors.first}
                  autoComplete="given-name"
                />
                <Field
                  label={t("contact.lastName")}
                  name="last"
                  value={form.last}
                  onChange={set("last")}
                  placeholder={t("contact.placeholderLast")}
                  error={errors.last}
                  autoComplete="family-name"
                />
              </div>
              <Field
                label={t("contact.phone")}
                name="phone"
                type="tel"
                value={form.phone}
                onChange={set("phone")}
                placeholder={t("contact.placeholderPhone")}
                error={errors.phone}
                autoComplete="tel"
              />
              <TextAreaField
                label={t("contact.message")}
                name="message"
                value={form.message}
                onChange={set("message")}
                placeholder={t("contact.placeholderHere")}
                error={errors.message}
              />

              <div className="flex items-center gap-4">
                <Button type="submit" variant="outline" size="md" disabled={status === "submitting"}>
                  {status === "submitting" ? t("contact.sending") : t("contact.send")}
                </Button>
                <AnimatePresence>
                  {status === "success" && (
                    <motion.span
                      role="status"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 font-body text-sm font-semibold text-teal"
                    >
                      <CheckCircle2 className="h-5 w-5" />
                      {t("contact.success")}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>

        {/* Info cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {INFO.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.key} delay={i * 0.08} direction="up">
                <div className="h-full rounded-card bg-cream/70 p-6 text-center shadow-soft ring-1 ring-line/50">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-ink text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-orange">
                    {t(`contact.${item.key}Title`)}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-sand" dir={item.key === "email" ? "ltr" : undefined}>
                    {t(`contact.${item.key}`)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
