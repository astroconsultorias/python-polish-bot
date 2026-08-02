import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  HeartPulse,
  House,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import heroPart1 from "@/assets/heroCollage/heroPart1";
import heroPart2 from "@/assets/heroCollage/heroPart2";
import heroPart3 from "@/assets/heroCollage/heroPart3";
import heroPart4 from "@/assets/heroCollage/heroPart4";

const heroParts = [heroPart1, heroPart2, heroPart3, heroPart4];

const impactAreas = [
  {
    icon: HeartPulse,
    title: "Saúde",
    description: "Ambientes de cuidado mais acolhedores, previsíveis e acessíveis para todos.",
    iconClass: "bg-[#EEE9FF] text-[#5B46B2]",
  },
  {
    icon: BriefcaseBusiness,
    title: "Trabalho e renda",
    description: "Oportunidades reais com suporte adequado para desenvolver potencial e autonomia.",
    iconClass: "bg-[#FFE9E5] text-[#E76F61]",
  },
  {
    icon: BookOpen,
    title: "Conhecimento",
    description: "Formação e informação que capacitam pessoas, famílias e profissionais.",
    iconClass: "bg-[#E7F4FA] text-[#3987AD]",
  },
  {
    icon: UsersRound,
    title: "Comunidade",
    description: "Conexão, apoio e pertencimento para transformar realidades juntos.",
    iconClass: "bg-[#E6F5F0] text-[#248B72]",
  },
];

const pillars = [
  {
    icon: Building2,
    title: "Reduz barreiras invisíveis",
    description: "Tornamos ambientes e processos mais compreensíveis, acessíveis e respeitosos com as diferenças.",
    iconClass: "bg-[#EEE9FF] text-[#5B46B2]",
  },
  {
    icon: Sparkles,
    title: "Amplia autonomia",
    description: "Apoiamos escolhas, habilidades e trajetórias com mais independência, clareza e segurança.",
    iconClass: "bg-[#FFE9E5] text-[#E76F61]",
  },
  {
    icon: House,
    title: "Transforma ambientes",
    description: "Capacitamos equipes e organizações para criar culturas verdadeiramente neuroinclusivas.",
    iconClass: "bg-[#E6F5F0] text-[#248B72]",
  },
];

const Home = () => (
  <div className="overflow-hidden bg-[#FCFBFD] text-[#17151D]">
    <section className="relative isolate border-b border-[#4B3F72]/5 bg-[radial-gradient(circle_at_12%_68%,rgba(231,111,97,0.10),transparent_28%),radial-gradient(circle_at_88%_18%,rgba(75,63,114,0.09),transparent_26%),linear-gradient(180deg,#ffffff_0%,#fbf9fd_100%)]">
      <div
        className="pointer-events-none absolute right-8 top-10 hidden h-36 w-36 opacity-30 lg:block"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle, #4B3F72 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-6 pb-16 pt-14 lg:min-h-[760px] lg:grid-cols-[0.84fr_1.16fr] lg:px-10 lg:pb-24 lg:pt-20 xl:px-16">
        <div className="relative z-10 text-center lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#4B3F72]/10 bg-white/85 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#4B3F72] shadow-sm backdrop-blur">
            <ShieldCheck className="h-4 w-4 text-[#E76F61]" />
            Tecnologia social para neuroinclusão
          </div>

          <h1
            className="mx-auto max-w-3xl text-[3.25rem] font-bold leading-[0.98] tracking-[-0.045em] text-[#28213D] sm:text-6xl lg:mx-0 xl:text-[4.65rem]"
            style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", serif' }}
          >
            Inclusão começa quando o ambiente se prepara
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[#5F5969] md:text-xl lg:mx-0">
            A Inclu@tech transforma acolhimento, atendimento e oportunidades em experiências mais previsíveis, humanas e neuroinclusivas.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Button size="xl" asChild className="min-w-[210px] bg-[#4B3F72] px-8 shadow-xl shadow-[#4B3F72]/20 hover:bg-[#3D3262]">
              <Link to="/sobre">
                Conhecer o projeto
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="xl"
              variant="outline"
              asChild
              className="min-w-[210px] border-2 border-[#E76F61] bg-white/75 px-8 font-extrabold text-[#D85E51] hover:bg-[#FFF1EE] hover:text-[#C85145]"
            >
              <Link to="/vagas">
                <BriefcaseBusiness className="mr-2 h-5 w-5" />
                Ver oportunidades
              </Link>
            </Button>
          </div>

          <p className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#4B3F72]">
            <ShieldCheck className="h-5 w-5" />
            A pessoa no centro. O ambiente preparado para acolher.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[760px]">
          <div
            className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[#4B3F72]/10 blur-3xl"
            aria-hidden="true"
          />
          <figure className="overflow-hidden rounded-[2.25rem] border-[7px] border-white bg-white shadow-[0_30px_85px_rgba(40,33,61,0.20)]">
            <div className="grid aspect-[86/53] grid-cols-4 overflow-hidden" role="img" aria-label="Criança em experiências de acolhimento e aprendizagem acompanhada">
              {heroParts.map((part, index) => (
                <img
                  key={part}
                  src={part}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              ))}
            </div>
          </figure>
        </div>
      </div>
    </section>

    <section className="relative z-10 -mt-8 px-6 pb-16 lg:px-10 xl:px-16">
      <div className="mx-auto grid max-w-[1320px] gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {impactAreas.map((area) => {
          const Icon = area.icon;
          return (
            <article
              key={area.title}
              className="group rounded-[1.55rem] border border-[#4B3F72]/10 bg-white p-6 shadow-[0_12px_36px_rgba(40,33,61,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(40,33,61,0.13)]"
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-full ${area.iconClass}`}>
                <Icon className="h-7 w-7" strokeWidth={2} />
              </div>
              <h2 className="mt-5 text-xl font-extrabold text-[#28213D]">{area.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#686170]">{area.description}</p>
            </article>
          );
        })}
      </div>
    </section>

    <section className="bg-white px-6 py-20 lg:px-10 lg:py-24 xl:px-16">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_2.2fr] lg:items-start">
          <div>
            <span className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#E76F61]">Impacto possível</span>
            <h2
              className="mt-4 text-4xl font-bold leading-[1.06] tracking-[-0.035em] text-[#28213D] md:text-5xl"
              style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", serif' }}
            >
              Por que a Inclu@tech importa?
            </h2>
            <div className="mt-5 h-1 w-20 rounded-full bg-[#E76F61]" />
            <p className="mt-6 max-w-md text-base leading-7 text-[#686170]">
              Pequenas mudanças na forma como acolhemos, comunicamos e organizamos ambientes podem gerar impactos profundos e duradouros.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <article
                  key={pillar.title}
                  className={`relative ${index > 0 ? "md:border-l md:border-[#4B3F72]/10 md:pl-8" : ""}`}
                >
                  <div className={`flex h-16 w-16 items-center justify-center rounded-full ${pillar.iconClass}`}>
                    <Icon className="h-8 w-8" strokeWidth={1.9} />
                  </div>
                  <h3 className="mt-6 text-xl font-extrabold leading-snug text-[#28213D]">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#686170]">{pillar.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>

    <section className="px-6 pb-20 lg:px-10 lg:pb-24 xl:px-16">
      <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-8 overflow-hidden rounded-[2rem] bg-[#28213D] px-8 py-11 text-center text-white shadow-2xl md:flex-row md:px-12 md:text-left">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#F6A79D]">Faça parte da mudança</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">Ambientes melhores começam com uma primeira conversa.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 md:text-base">
            Pessoas, famílias, profissionais e organizações podem contribuir para construir soluções mais humanas e neuroinclusivas.
          </p>
        </div>
        <Button size="xl" asChild className="shrink-0 bg-[#E76F61] px-8 text-white shadow-xl shadow-black/20 hover:bg-[#D85E51]">
          <Link to="/participar">
            Quero colaborar
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  </div>
);

export default Home;
