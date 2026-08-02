import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import KnotMark from "@/components/KnotMark";
import { ArrowRight, Building2, HeartHandshake, Hospital, Lightbulb, ShieldCheck, Users } from "lucide-react";

const pathways = [
  {
    icon: Users,
    eyebrow: "Pessoas e talentos",
    title: "Encontre oportunidades e apresente sua trajetória com autonomia",
    description:
      "Crie um perfil profissional, registre competências, preferências de trabalho e acomodações relevantes. Você decide o que compartilhar e pode acompanhar suas candidaturas em um só lugar.",
    actions: [
      { label: "Criar perfil de talento", to: "/auth?signup=true&type=talent", primary: true },
      { label: "Ver vagas", to: "/vagas", primary: false },
    ],
  },
  {
    icon: Building2,
    eyebrow: "Empresas e organizações",
    title: "Publique vagas mais claras e desenvolva práticas de inclusão consistentes",
    description:
      "Apresente sua organização, descreva oportunidades com transparência, acompanhe candidaturas e participe de uma comunidade que busca transformar responsabilidade social em prática cotidiana.",
    actions: [
      { label: "Cadastrar organização", to: "/auth?signup=true&type=company", primary: true },
      { label: "Conhecer o projeto", to: "/sobre", primary: false },
    ],
  },
  {
    icon: Hospital,
    eyebrow: "Saúde, universidade e instituições",
    title: "Ajude a construir e validar uma tecnologia social responsável",
    description:
      "Buscamos escuta institucional, revisão técnica, participação social e espaços seguros para estudar barreiras, testar melhorias de baixo custo e produzir evidências sem antecipar promessas.",
    actions: [
      { label: "Conversar sobre parceria", href: "mailto:astroconsultorias@gmail.com?subject=Inclu%40tech%20-%20parceria%20institucional", primary: true },
      { label: "Entender o método", to: "/#metodo", primary: false },
    ],
  },
  {
    icon: HeartHandshake,
    eyebrow: "Famílias e comunidade",
    title: "Contribua com experiência vivida, prioridades e avaliação crítica",
    description:
      "A Inclu@tech não pretende falar pelas pessoas sem ouvi-las. Famílias, pessoas neurodivergentes e organizações comunitárias são essenciais para definir problemas reais e avaliar se as soluções fazem sentido.",
    actions: [
      { label: "Compartilhar interesse", href: "mailto:astroconsultorias@gmail.com?subject=Inclu%40tech%20-%20participa%C3%A7%C3%A3o%20da%20comunidade", primary: true },
      { label: "Ler conteúdos", to: "/blog", primary: false },
    ],
  },
];

const commitments = [
  "Nenhuma parceria ou resultado será anunciado antes de autorização formal.",
  "Dados sensíveis não serão exigidos para participar da comunidade ou consultar vagas.",
  "A experiência vivida será combinada com revisão técnica, governança e transparência.",
  "Receita futura deverá sustentar a missão, remunerar trabalho e ampliar acesso.",
];

const Participate = () => (
  <div className="-mx-6 -my-12 overflow-hidden lg:-mx-8">
    <section className="relative bg-hero-glow px-6 py-20 md:py-28 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <span className="section-kicker">Como participar</span>
          <h1 className="mt-6 max-w-4xl text-5xl font-extrabold leading-tight md:text-6xl">
            Uma comunidade se transforma quando cada pessoa encontra uma forma real de contribuir.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
            A Inclu@tech conecta impacto social, oportunidade profissional e aprendizagem institucional. O projeto começa pequeno, mas foi desenhado para reunir pessoas, empresas e instituições em torno de um objetivo comum: reduzir barreiras sem apagar diferenças.
          </p>
        </div>
        <div className="mx-auto flex aspect-square w-full max-w-md items-center justify-center rounded-[28%] bg-primary p-16 text-white shadow-2xl">
          <KnotMark className="h-full w-full" title="Pessoa no centro, ambiente preparado para acolher" />
        </div>
      </div>
    </section>

    <section className="bg-white px-6 py-20 md:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="section-kicker">Escolha seu caminho</span>
          <h2 className="mt-5 text-4xl font-extrabold md:text-5xl">Participação com propósito e clareza</h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Cada público encontra ferramentas e responsabilidades diferentes. A plataforma não substitui relações humanas; ela organiza caminhos para que elas aconteçam com mais respeito e previsibilidade.
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-2">
          {pathways.map((pathway) => {
            const Icon = pathway.icon;
            return (
              <article key={pathway.eyebrow} className="rounded-[2rem] border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl md:p-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
                  <Icon className="h-7 w-7" />
                </div>
                <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.16em] text-primary">{pathway.eyebrow}</p>
                <h3 className="mt-3 text-2xl font-extrabold leading-tight md:text-3xl">{pathway.title}</h3>
                <p className="mt-5 leading-7 text-muted-foreground">{pathway.description}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  {pathway.actions.map((action) => {
                    const content = (
                      <>
                        {action.label}
                        {action.primary && <ArrowRight className="ml-2 h-4 w-4" />}
                      </>
                    );

                    if (action.href) {
                      return (
                        <Button key={action.label} variant={action.primary ? "default" : "outline"} asChild>
                          <a href={action.href}>{content}</a>
                        </Button>
                      );
                    }

                    return (
                      <Button key={action.label} variant={action.primary ? "default" : "outline"} asChild>
                        <Link to={action.to || "/"}>{content}</Link>
                      </Button>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    <section className="bg-[hsl(var(--foreground))] px-6 py-20 text-white md:py-24 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-accent">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h2 className="mt-6 text-4xl font-extrabold">Compromissos antes da escala</h2>
          <p className="mt-5 text-lg leading-8 text-white/70">
            Crescer só faz sentido quando a expansão preserva dignidade, segurança, participação e verdade sobre os resultados.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {commitments.map((commitment) => (
            <div key={commitment} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <Lightbulb className="mb-3 h-5 w-5 text-accent" />
              <p className="leading-7 text-white/80">{commitment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Participate;
