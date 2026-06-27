import { useTranslation } from "react-i18next";
import { BadgeCheck, MapPin, Send, Users } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { StatCard } from "@/components/StatCard";
import { Reveal } from "@/components/Reveal";

const COLUMNS = ["about.intro", "about.vision", "about.mission"] as const;

const STATS = [
  { key: "about.stat1", number: 10, prefix: "", icon: Users },
  { key: "about.stat2", number: 500, prefix: "+", icon: Send },
  { key: "about.stat3", number: 25, prefix: "", icon: MapPin },
  { key: "about.stat4", number: 10, prefix: "", icon: BadgeCheck },
] as const;

export function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="section-pad scroll-mt-28">
      <Container>
        <Reveal>
          <SectionTitle>{t("about.title")}</SectionTitle>
        </Reveal>

        {/* Three text columns: intro · vision · mission (RTL right→left) */}
        <div className="mt-8 grid gap-x-8 gap-y-6 md:mt-10 md:grid-cols-3">
          {COLUMNS.map((key, i) => (
            <Reveal key={key} delay={i * 0.1} direction="up">
              <div className="flex gap-3 text-start">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-orange" />
                <p className="font-body leading-loose text-ink-sand [text-align:justify]">
                  {t(key)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Four stat cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.key} delay={i * 0.08} direction="up">
                <StatCard
                  icon={<Icon className="h-7 w-7" strokeWidth={1.75} />}
                  number={s.number}
                  prefix={s.prefix}
                  unit={t(`${s.key}.unit`)}
                  caption={t(`${s.key}.caption`)}
                />
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
