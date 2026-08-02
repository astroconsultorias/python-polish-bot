import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import KnotMark from "@/components/KnotMark";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  FlaskConical,
  HeartHandshake,
  Hospital,
  Layers3,
  Lightbulb,
  MessageSquareText,
  Scale,
  ShieldCheck,
  Users,
  XCircle,
} from "lucide-react";

const principles = [
  { title: "Participação real", text: "Pessoas neurodivergentes e famílias devem participar da definição, do teste e da avaliação das soluções." },
  { title: "Centralidade na pessoa", text: "Preferências, necessidades e valores orientam a experiência, respeitando segurança e limites institucionais." },
  { title: "Redução de barreiras", text: "O projeto atua sobre ambiente, comunicação e processos; não procura normalizar ou corrigir a pessoa." },
  { title: "Baixa fricção", text: "Recomendações precisam caber na rotina, ter propósito claro e evitar burocracia desnecessária." },
  { title: "Dados mínimos", text: "Somente informações necessárias, com finalidade definida, proteção e anonimização sempre que possível." },
  { title: "Evidência e transparência", text: "Resultados, limitações, efeitos adversos e aprendizados devem ser registrados sem inflar impacto." },
];

const isAndIsNot = [
  { is: "Tecnologia social e melhoria de experiência", not: "Serviço clínico, diagnóstico ou terapia" },
  { is: "Método para identificar e reduzir barreiras", not: "Promessa de eliminar crises ou garantir resultado clínico" },
  { is: "Piloto de co-desenvolvimento e aprendizagem", not: "Produto pronto imposto à rotina institucional" },
  { is: "Intervenção limitada, mensurável e revisável", not: "Certificação definitiva de organização neuroinclusiva" },
  { is: "Futura organização de impacto sustentável", not: "Uso de causa social como marketing sem entrega" },
];

const roadmap = [
  { stage: "1", title: "Base institucional", text: "Consolidar documento mestre, governança, limites e materiais para escuta institucional." },
  { stage: "2", title: "Núcleo técnico e social", text: "Reunir profissionais, pessoas neurodivergentes, famílias e áreas responsáveis para revisar a hipótese." },
  { stage: "3", title: "Micro-piloto em saúde", text: "Mapear um fluxo, testar poucas melhorias e avaliar utilidade, riscos e carga operacional." },
  { stage: "4", title: "Método validado", text: "Registrar aprendizados, corrigir instrumentos e decidir se há base para continuidade ou expansão." },
  { stage: "5", title: "Escala responsável", text: "Desenvolver formação, ferramentas, oportunidades de trabalho e soluções digitais sustentadas por evidência." },
];

const About = () => (
  <div className="space-y-20 md:space-y-28">
    <section className="relative overflow-hidden rounded-[2rem] bg-primary p-8 text-white shadow-2xl md:p-14">
      <div className="dot-grid absolute inset-0 opacity-10" aria-hidden="true" />
      <div className="relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-white/65">Sobre a Inclu@tech</p>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-6xl">
            Neuroinclusão precisa sair do discurso e aparecer na experiência.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/75">
            A Inclu@tech é um projeto de tecnologia social que busca reduzir barreiras sensoriais, comunicacionais, informacionais, processuais e culturais em saúde e, progressivamente, em ambientes de trabalho.
          </p>
        </div>
        <div className="mx-auto flex aspect-square w-full max-w-sm items-center justify-center rounded-[28%] bg-white/10 p-16">
          <KnotMark className="h-full w-full" title="Pessoa no centro e ambiente preparado para acolher" />
        </div>
      </div>
    </section>

    <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div>
        <span className="section-kicker">Propósito</span>
        <h2 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl">
          Dignidade, autonomia, previsibilidade e segurança.
        </h2>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          O projeto contribui para que pessoas neurodivergentes sejam atendidas, trabalhem e participem da sociedade com menos barreiras. A solução não é exigir que a pessoa suporte ambientes inadequados; é ajudar ambientes e relações a responderem melhor à diversidade humana.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Card className="bg-primary-light/55"><CardContent className="p-7"><Hospital className="h-8 w-8 text-primary" /><h3 className="mt-5 text-xl font-extrabold">Missão inicial</h3><p className="mt-3 leading-7 text-muted-foreground">Desenvolver e validar, com uma instituição de saúde, um método simples e replicável para identificar barreiras e implementar melhorias em um fluxo real.</p></CardContent></Card>
        <Card className="bg-accent-light/55"><CardContent className="p-7"><Layers3 className="h-8 w-8 text-accent" /><h3 className="mt-5 text-xl font-extrabold">Visão de longo prazo</h3><p className="mt-3 leading-7 text-muted-foreground">Tornar-se uma organização de impacto capaz de oferecer metodologias, formação, ferramentas, tecnologia e oportunidades em saúde e trabalho.</p></CardContent></Card>
      </div>
    </section>

    <section className="rounded-[2rem] bg-muted/55 p-8 md:p-12">
      <div className="mx-auto max-w-4xl text-center">
        <span className="section-kicker">Problema e oportunidade</span>
        <h2 className="mt-5 text-4xl font-extrabold md:text-5xl">Barreiras pequenas podem produzir consequências enormes.</h2>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Espera sem previsão, mudanças não explicadas, luz intensa, ruído, múltiplas filas, linguagem ambígua e equipes sem referência prática podem ampliar ansiedade, sobrecarga e dependência. Muitas melhorias iniciais podem estar em comunicação, antecipação, sinalização, alternativas de espera e condutas simples — mas cada hipótese precisa ser testada no contexto real.
        </p>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-7 shadow-sm"><Eye className="h-7 w-7 text-primary" /><h3 className="mt-5 text-xl font-extrabold">Sensorial e ambiental</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Ruído, luz, cheiros, aglomeração, toque inesperado e ausência de alternativas.</p></div>
        <div className="rounded-3xl bg-white p-7 shadow-sm"><MessageSquareText className="h-7 w-7 text-primary" /><h3 className="mt-5 text-xl font-extrabold">Comunicação e informação</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Orientações rápidas, exclusivamente verbais, sem sequência, duração ou confirmação de compreensão.</p></div>
        <div className="rounded-3xl bg-white p-7 shadow-sm"><Layers3 className="h-7 w-7 text-primary" /><h3 className="mt-5 text-xl font-extrabold">Processo e cultura</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Repetição, mudanças de ambiente, julgamento, infantilização e falta de integração entre equipes.</p></div>
      </div>
    </section>

    <section>
      <div className="mx-auto max-w-3xl text-center">
        <span className="section-kicker">Limites claros</span>
        <h2 className="mt-5 text-4xl font-extrabold md:text-5xl">O que a Inclu@tech é — e o que não é.</h2>
      </div>
      <div className="mt-12 overflow-hidden rounded-3xl border bg-white shadow-sm">
        {isAndIsNot.map((item, index) => (
          <div key={item.is} className={`grid gap-4 p-6 md:grid-cols-2 md:p-7 ${index > 0 ? "border-t" : ""}`}>
            <div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><p className="font-semibold">{item.is}</p></div>
            <div className="flex gap-3"><XCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" /><p className="text-muted-foreground">{item.not}</p></div>
          </div>
        ))}
      </div>
    </section>

    <section className="rounded-[2rem] bg-[hsl(var(--foreground))] p-8 text-white md:p-12">
      <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <span className="section-kicker section-kicker-dark">Princípios de atuação</span>
          <h2 className="mt-5 text-4xl font-extrabold">A forma de construir importa tanto quanto a solução.</h2>
          <p className="mt-6 leading-8 text-white/65">
            Neuroinclusão exige participação, responsabilidade e disposição para revisar decisões. Nenhuma ferramenta será tratada como universal.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {principles.map((principle) => (
            <div key={principle.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <Lightbulb className="h-5 w-5 text-accent" />
              <h3 className="mt-4 font-extrabold">{principle.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/65">{principle.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section>
      <div className="mx-auto max-w-3xl text-center">
        <span className="section-kicker">Caminho de desenvolvimento</span>
        <h2 className="mt-5 text-4xl font-extrabold md:text-5xl">Começar pequeno para construir algo relevante.</h2>
      </div>
      <div className="mt-12 grid gap-5 lg:grid-cols-5">
        {roadmap.map((item) => (
          <article key={item.stage} className="rounded-3xl border bg-white p-6 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-lg font-extrabold text-white">{item.stage}</span>
            <h3 className="mt-5 text-lg font-extrabold">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="grid gap-10 rounded-[2rem] bg-primary-light/55 p-8 md:p-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
      <div className="mx-auto flex aspect-square w-full max-w-xs items-center justify-center rounded-[28%] bg-primary p-14 text-white shadow-xl">
        <HeartHandshake className="h-full w-full" />
      </div>
      <div>
        <span className="section-kicker">Origem e liderança</span>
        <h2 className="mt-5 text-4xl font-extrabold">Jean, Joaquim e uma inquietação que precisava virar ação.</h2>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          A iniciativa nasceu da convergência entre a paternidade atípica e mais de 13 anos de experiência em ambiente hospitalar. A vivência revelou obstáculos que muitas vezes são tratados como inevitáveis, embora possam ser reduzidos por escolhas melhores de ambiente, comunicação e processo.
        </p>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          Jean atua como fundador, articulador e gestor do método. O projeto reconhece que legitimidade pessoal não substitui especialização: por isso, busca revisão técnica, participação social, governança institucional e transparência sobre limites.
        </p>
      </div>
    </section>

    <section className="rounded-[2rem] bg-primary p-8 text-center text-white shadow-xl md:p-14">
      <Scale className="mx-auto h-12 w-12" />
      <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold md:text-5xl">Importância social e sustentabilidade não são opostos.</h2>
      <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/75">
        O objetivo é desenvolver um empreendimento social capaz de gerar trabalho, remunerar conhecimento, ampliar acesso e reinvestir na missão. A sustentabilidade econômica só terá valor se proteger a dignidade e produzir benefício verificável.
      </p>
      <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
        <Button variant="secondary" size="lg" asChild><Link to="/participar">Conhecer formas de participar<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
        <Button variant="outline" size="lg" asChild className="border-white/40 bg-transparent text-white hover:bg-white hover:text-primary"><Link to="/blog">Explorar conteúdos</Link></Button>
      </div>
    </section>
  </div>
);

export default About;
