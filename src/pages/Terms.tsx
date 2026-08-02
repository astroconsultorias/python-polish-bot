import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, BriefcaseBusiness, Building2, FileCheck2, HeartHandshake, Mail, Scale, ShieldCheck, UserRound } from "lucide-react";

const responsibilities = [
  {
    icon: UserRound,
    title: "Pessoas e talentos",
    items: [
      "Fornecer informações verdadeiras e atualizar o perfil quando necessário.",
      "Compartilhar somente dados que considere necessários para cada finalidade.",
      "Ler as condições da vaga e agir com respeito durante contatos e processos seletivos.",
      "Não utilizar identidade, currículo ou informações de terceiros sem autorização.",
    ],
  },
  {
    icon: Building2,
    title: "Organizações",
    items: [
      "Publicar vagas reais, autorizadas e descritas com clareza.",
      "Informar condições, requisitos, faixa salarial e benefícios com transparência sempre que possível.",
      "Tratar candidaturas e dados pessoais somente para a finalidade do processo correspondente.",
      "Evitar discriminação, perguntas invasivas e exigências de diagnóstico sem fundamento legítimo.",
      "Manter as pessoas informadas sobre as etapas e encerrar processos de forma respeitosa.",
    ],
  },
];

const prohibited = [
  "Conteúdo falso, fraudulento, abusivo, discriminatório ou que incentive violência e assédio.",
  "Vagas inexistentes, esquemas de cobrança indevida, coleta de dados sem finalidade ou ofertas incompatíveis com a legislação.",
  "Tentativas de acessar contas, dados, painéis ou recursos sem autorização.",
  "Raspagem massiva, revenda de dados, envio de spam ou uso da plataforma para vigilância de pessoas.",
  "Uso da causa da inclusão para enganar, explorar vulnerabilidades ou atribuir certificações e parcerias inexistentes.",
];

const Terms = () => (
  <div className="mx-auto max-w-5xl space-y-10">
    <section className="relative overflow-hidden rounded-[2rem] bg-[hsl(var(--foreground))] p-8 text-white shadow-xl md:p-12">
      <div className="dot-grid absolute inset-0 opacity-10" aria-hidden="true" />
      <div className="relative z-10 max-w-4xl">
        <Badge className="bg-white/10 text-white hover:bg-white/10">Atualizados em 1º de agosto de 2026</Badge>
        <Scale className="mt-7 h-12 w-12 text-accent" />
        <h1 className="mt-5 text-4xl font-extrabold md:text-6xl">Termos para uma plataforma em construção responsável.</h1>
        <p className="mt-6 text-lg leading-8 text-white/75">
          Estes termos organizam o uso da Inclu@tech, definem responsabilidades e deixam claros os limites entre projeto social, plataforma de oportunidades e futuras atividades institucionais.
        </p>
      </div>
    </section>

    <section className="rounded-3xl border bg-primary-light/45 p-6 md:p-8">
      <div className="flex items-start gap-4">
        <ShieldCheck className="mt-1 h-7 w-7 shrink-0 text-primary" />
        <div>
          <h2 className="text-2xl font-extrabold">Ao criar conta ou utilizar funções autenticadas</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Você declara que leu estes Termos e a Política de Privacidade, que utilizará a plataforma para finalidades legítimas e que as informações fornecidas são verdadeiras de acordo com seu conhecimento.
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-3xl font-extrabold">1. O que é a Inclu@tech</h2>
      <div className="mt-5 space-y-4 leading-7 text-muted-foreground">
        <p>
          A Inclu@tech é um projeto de tecnologia social em estruturação. Sua plataforma reúne conteúdo institucional, perfis profissionais e organizacionais, publicação de vagas, candidaturas, acompanhamento de etapas e ferramentas administrativas.
        </p>
        <p>
          O foco de validação institucional inicial está em um possível micro-piloto de atendimento neuroinclusivo em saúde. Essa frente não está automaticamente vinculada às funções de vagas e não representa parceria, pesquisa, protocolo clínico ou autorização de qualquer hospital ou organização.
        </p>
      </div>
    </section>

    <section className="grid gap-5 md:grid-cols-2">
      <div className="rounded-3xl border bg-white p-7 shadow-sm">
        <HeartHandshake className="h-8 w-8 text-primary" />
        <h2 className="mt-5 text-2xl font-extrabold">A plataforma pode</h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
          <li>• Organizar perfis, vagas e candidaturas.</li>
          <li>• Facilitar contatos e acompanhamento de etapas.</li>
          <li>• Publicar conteúdos e caminhos de participação.</li>
          <li>• Apoiar aprendizagem e desenvolvimento do projeto.</li>
        </ul>
      </div>
      <div className="rounded-3xl border bg-white p-7 shadow-sm">
        <AlertTriangle className="h-8 w-8 text-accent" />
        <h2 className="mt-5 text-2xl font-extrabold">A plataforma não garante</h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
          <li>• Contratação, entrevista, renda ou resultado profissional.</li>
          <li>• Qualidade, legalidade ou inclusão efetiva de toda organização cadastrada.</li>
          <li>• Resultado clínico, prevenção de crises ou orientação individual de saúde.</li>
          <li>• Certificação, selo ou parceria institucional não formalizada.</li>
        </ul>
      </div>
    </section>

    <section>
      <h2 className="text-3xl font-extrabold">2. Cadastro, idade e segurança da conta</h2>
      <div className="mt-5 space-y-4 leading-7 text-muted-foreground">
        <p>
          Para utilizar recursos autenticados, é necessário criar uma conta com informações válidas e proteger a senha. Cada pessoa ou organização deve manter uma única identidade coerente com sua finalidade de uso e comunicar suspeitas de acesso indevido.
        </p>
        <p>
          A plataforma não é destinada a crianças. Pessoas de 16 ou 17 anos somente devem utilizar recursos profissionais com conhecimento e autorização de responsável legal e dentro das regras aplicáveis ao trabalho de adolescentes. A Inclu@tech poderá limitar ou suspender funções quando não houver condições adequadas de proteção.
        </p>
      </div>
    </section>

    <section>
      <h2 className="text-3xl font-extrabold">3. Responsabilidades por tipo de participação</h2>
      <div className="mt-7 grid gap-6 lg:grid-cols-2">
        {responsibilities.map((group) => {
          const Icon = group.icon;
          return (
            <article key={group.title} className="rounded-3xl border bg-white p-7 shadow-sm">
              <Icon className="h-8 w-8 text-primary" />
              <h3 className="mt-5 text-2xl font-extrabold">{group.title}</h3>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
                {group.items.map((item) => <li key={item} className="flex gap-3"><span className="font-extrabold text-primary">•</span>{item}</li>)}
              </ul>
            </article>
          );
        })}
      </div>
    </section>

    <section className="rounded-[2rem] bg-primary p-7 text-white md:p-10">
      <BriefcaseBusiness className="h-10 w-10" />
      <h2 className="mt-5 text-3xl font-extrabold">4. Vagas, candidaturas e decisões</h2>
      <div className="mt-5 space-y-4 leading-7 text-white/75">
        <p>
          A organização que publica uma vaga é responsável pelo conteúdo, pela existência da oportunidade, pelas condições oferecidas, pelo processo seletivo, pelos contatos e por cumprir a legislação trabalhista, antidiscriminatória, de acessibilidade e de proteção de dados.
        </p>
        <p>
          A Inclu@tech organiza o envio e o acompanhamento de candidaturas, mas não participa automaticamente da decisão de contratar. O status exibido no painel representa a etapa informada pela organização e pode não refletir todas as comunicações externas.
        </p>
        <p>
          A pessoa candidata continua responsável por avaliar a oportunidade, verificar a identidade da organização e não realizar pagamentos ou fornecer informações financeiras para participar de processos seletivos.
        </p>
      </div>
    </section>

    <section>
      <h2 className="text-3xl font-extrabold">5. Uso proibido</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {prohibited.map((item) => (
          <div key={item} className="flex gap-3 rounded-2xl border p-4 text-sm leading-6 text-muted-foreground">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            {item}
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2 className="text-3xl font-extrabold">6. Conteúdo publicado pelos usuários</h2>
      <div className="mt-5 space-y-4 leading-7 text-muted-foreground">
        <p>
          Você mantém os direitos sobre informações e conteúdos que inserir, mas autoriza seu tratamento e exibição dentro das funções necessárias à plataforma — por exemplo, apresentar uma vaga, enviar uma candidatura ou administrar um perfil.
        </p>
        <p>
          Não publique material protegido de terceiros sem autorização. Conteúdos poderão ser removidos quando houver denúncia fundamentada, violação destes termos, risco à comunidade ou obrigação aplicável.
        </p>
      </div>
    </section>

    <section>
      <h2 className="text-3xl font-extrabold">7. Conteúdo e propriedade da Inclu@tech</h2>
      <p className="mt-4 leading-7 text-muted-foreground">
        Marca, símbolo, textos institucionais, estrutura visual, metodologia e materiais próprios da Inclu@tech não podem ser copiados, vendidos, apresentados como certificação ou utilizados para sugerir parceria sem autorização. Referências, citações e compartilhamentos legítimos devem preservar autoria e contexto.
      </p>
    </section>

    <section>
      <h2 className="text-3xl font-extrabold">8. Dados pessoais</h2>
      <p className="mt-4 leading-7 text-muted-foreground">
        O tratamento de dados segue a <Link className="font-bold text-primary hover:underline" to="/privacidade">Política de Privacidade</Link>. Organizações que recebem dados de candidaturas devem utilizá-los somente para a oportunidade correspondente, adotar medidas de proteção e respeitar os direitos das pessoas.
      </p>
    </section>

    <section>
      <h2 className="text-3xl font-extrabold">9. Moderação, suspensão e encerramento</h2>
      <div className="mt-5 space-y-4 leading-7 text-muted-foreground">
        <p>
          Contas, vagas, candidaturas ou conteúdos podem ser limitados, pausados ou removidos quando houver indício de fraude, abuso, discriminação, risco à segurança, violação destes termos ou necessidade de proteger pessoas e a plataforma. Sempre que viável, haverá oportunidade de esclarecimento.
        </p>
        <p>
          Usuários podem solicitar encerramento da conta pelo canal de contato. A exclusão de dados seguirá a Política de Privacidade e poderá respeitar hipóteses legais de conservação.
        </p>
      </div>
    </section>

    <section>
      <h2 className="text-3xl font-extrabold">10. Disponibilidade e evolução</h2>
      <p className="mt-4 leading-7 text-muted-foreground">
        A plataforma está em desenvolvimento e pode passar por testes, alterações, indisponibilidades, correções ou encerramento de funções. Buscaremos preservar dados e comunicar mudanças relevantes, mas não prometemos operação contínua, ausência de falhas ou manutenção permanente de recursos gratuitos.
      </p>
    </section>

    <section>
      <h2 className="text-3xl font-extrabold">11. Responsabilidade e legislação aplicável</h2>
      <div className="mt-5 space-y-4 leading-7 text-muted-foreground">
        <p>
          Cada participante responde por seus atos, conteúdos, decisões e obrigações. A Inclu@tech poderá responder nos limites estabelecidos pela legislação aplicável, sem excluir direitos que não possam ser afastados contratualmente.
        </p>
        <p>
          Estes termos são interpretados de acordo com as leis brasileiras. Eventuais conflitos serão tratados pelo foro competente definido pela legislação, preservados direitos do consumidor e outras regras obrigatórias quando aplicáveis.
        </p>
      </div>
    </section>

    <section>
      <h2 className="text-3xl font-extrabold">12. Alterações</h2>
      <p className="mt-4 leading-7 text-muted-foreground">
        Os termos poderão ser atualizados conforme a plataforma, o projeto ou as obrigações evoluírem. A versão e a data serão informadas nesta página. Alterações que afetem significativamente o uso poderão ser comunicadas dentro da plataforma ou exigir nova concordância.
      </p>
    </section>

    <section className="rounded-3xl border bg-white p-7 shadow-sm md:p-9">
      <div className="flex items-start gap-4">
        <Mail className="mt-1 h-7 w-7 shrink-0 text-primary" />
        <div>
          <h2 className="text-2xl font-extrabold">Contato, denúncia ou esclarecimento</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            E-mail: <a className="font-bold text-primary hover:underline" href="mailto:astroconsultorias@gmail.com?subject=Inclu%40tech%20-%20termos%20ou%20den%C3%BAncia">astroconsultorias@gmail.com</a>
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Inclua, quando possível, o link da vaga, conta ou conteúdo relacionado e uma descrição objetiva do problema.</p>
        </div>
      </div>
    </section>

    <div className="flex flex-col gap-3 border-t pt-7 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">Versão 1.0 · 1º de agosto de 2026</p>
      <Button variant="outline" asChild><Link to="/privacidade">Consultar a Política de Privacidade</Link></Button>
    </div>
  </div>
);

export default Terms;
