import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, Eye, FileCheck2, LockKeyhole, Mail, ShieldCheck, UserRound } from "lucide-react";

const dataGroups = [
  {
    icon: UserRound,
    title: "Conta e contato",
    text: "Nome, e-mail, telefone, cidade, estado, tipo de participação e informações necessárias para autenticar e administrar a conta.",
  },
  {
    icon: FileCheck2,
    title: "Perfil e participação",
    text: "Formação, experiências, competências, preferências profissionais, perfil da organização, vagas, benefícios, candidaturas e comunicações inseridas por você.",
  },
  {
    icon: ShieldCheck,
    title: "Informações opcionais de inclusão",
    text: "Categorias de deficiência ou neurodivergência e necessidades de acomodação, somente quando você decidir fornecê-las para uma finalidade relacionada à participação na plataforma.",
  },
  {
    icon: Database,
    title: "Dados técnicos essenciais",
    text: "Registros necessários para sessão, segurança, prevenção de abuso, diagnóstico de falhas e funcionamento da aplicação. Não utilizamos esses dados para vender publicidade direcionada.",
  },
];

const rights = [
  "Confirmar se seus dados são tratados e solicitar acesso.",
  "Corrigir informações incompletas, inexatas ou desatualizadas.",
  "Pedir informações sobre finalidades e compartilhamentos.",
  "Revogar consentimento quando ele for a base utilizada.",
  "Solicitar anonimização, bloqueio ou eliminação quando cabível.",
  "Solicitar portabilidade e revisão de decisões automatizadas, conforme regulamentação e aplicabilidade.",
  "Apresentar oposição ou reclamação quando considerar que o tratamento desrespeita a legislação.",
];

const Privacy = () => (
  <div className="mx-auto max-w-5xl space-y-10">
    <section className="relative overflow-hidden rounded-[2rem] bg-primary p-8 text-white shadow-xl md:p-12">
      <div className="dot-grid absolute inset-0 opacity-10" aria-hidden="true" />
      <div className="relative z-10 max-w-4xl">
        <Badge className="bg-white/15 text-white hover:bg-white/15">Atualizada em 1º de agosto de 2026</Badge>
        <LockKeyhole className="mt-7 h-12 w-12" />
        <h1 className="mt-5 text-4xl font-extrabold md:text-6xl">Privacidade precisa ser compreensível e praticada.</h1>
        <p className="mt-6 text-lg leading-8 text-white/80">
          Esta política explica quais dados a Inclu@tech trata nesta fase, para que são utilizados, quando podem ser compartilhados e como você pode exercer seus direitos.
        </p>
      </div>
    </section>

    <section className="rounded-3xl border bg-primary-light/45 p-6 md:p-8">
      <div className="flex items-start gap-4">
        <Eye className="mt-1 h-7 w-7 shrink-0 text-primary" />
        <div>
          <h2 className="text-2xl font-extrabold">Resumo direto</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            A Inclu@tech não vende dados pessoais. Informações de saúde, deficiência, neurodivergência ou acomodação são opcionais e merecem proteção reforçada. Quando uma pessoa se candidata a uma vaga, os dados necessários do perfil e a apresentação são disponibilizados à organização responsável por aquela oportunidade.
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-3xl font-extrabold">1. Quem é responsável nesta fase</h2>
      <div className="mt-5 space-y-4 leading-7 text-muted-foreground">
        <p>
          A Inclu@tech é um projeto em estruturação, proposto e administrado por Jean César Villela Rodrigues. Para assuntos de privacidade, solicitações de titulares ou dúvidas sobre esta política, utilize o e-mail <a className="font-bold text-primary hover:underline" href="mailto:astroconsultorias@gmail.com?subject=Inclu%40tech%20-%20privacidade">astroconsultorias@gmail.com</a>.
        </p>
        <p>
          Prestadores de infraestrutura podem operar dados em nome do projeto para autenticação, banco de dados, hospedagem e segurança, conforme os serviços técnicos necessários ao funcionamento da plataforma.
        </p>
      </div>
    </section>

    <section>
      <h2 className="text-3xl font-extrabold">2. Dados tratados</h2>
      <p className="mt-4 leading-7 text-muted-foreground">
        Coletamos somente informações relacionadas às funções utilizadas. Você pode navegar por áreas públicas sem criar conta; recursos como perfil, publicação de vagas e candidatura exigem autenticação.
      </p>
      <div className="mt-7 grid gap-5 md:grid-cols-2">
        {dataGroups.map((group) => {
          const Icon = group.icon;
          return (
            <article key={group.title} className="rounded-3xl border bg-white p-6 shadow-sm">
              <Icon className="h-7 w-7 text-primary" />
              <h3 className="mt-5 text-xl font-extrabold">{group.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{group.text}</p>
            </article>
          );
        })}
      </div>
    </section>

    <section className="space-y-5">
      <h2 className="text-3xl font-extrabold">3. Finalidades e bases para o tratamento</h2>
      <p className="leading-7 text-muted-foreground">
        Os dados são utilizados para criar e manter contas, disponibilizar perfis, publicar e consultar vagas, registrar candidaturas, permitir acompanhamento de etapas, administrar conteúdos, proteger a plataforma, responder solicitações e cumprir obrigações aplicáveis.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-muted/50 p-5"><h3 className="font-extrabold">Execução do serviço solicitado</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Conta, perfil, vaga, candidatura e demais funções que você escolhe utilizar.</p></div>
        <div className="rounded-2xl bg-muted/50 p-5"><h3 className="font-extrabold">Consentimento específico, quando aplicável</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Especialmente para dados sensíveis opcionais informados voluntariamente.</p></div>
        <div className="rounded-2xl bg-muted/50 p-5"><h3 className="font-extrabold">Segurança e prevenção de abuso</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Registros técnicos e controles necessários para proteger contas e a integridade do serviço.</p></div>
        <div className="rounded-2xl bg-muted/50 p-5"><h3 className="font-extrabold">Obrigações e exercício de direitos</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Conservação ou uso limitado quando exigido por lei ou necessário para proteger direitos.</p></div>
      </div>
    </section>

    <section className="rounded-[2rem] bg-[hsl(var(--foreground))] p-7 text-white md:p-10">
      <h2 className="text-3xl font-extrabold">4. Dados sensíveis e autonomia</h2>
      <div className="mt-5 space-y-4 leading-7 text-white/70">
        <p>
          Informações relacionadas à saúde, deficiência ou neurodivergência podem constituir dados pessoais sensíveis. O cadastro de uma conta não exige diagnóstico. Os campos de identificação e acomodação são opcionais e devem ser preenchidos apenas quando a pessoa considerar que isso favorece sua participação.
        </p>
        <p>
          A recusa em fornecer esses dados não impede a criação da conta. Algumas formas de personalização ou comunicação sobre acomodações, contudo, dependem das informações que a própria pessoa decidir registrar.
        </p>
      </div>
    </section>

    <section>
      <h2 className="text-3xl font-extrabold">5. Quando ocorre compartilhamento</h2>
      <div className="mt-5 space-y-4 leading-7 text-muted-foreground">
        <p><strong className="text-foreground">Com organizações cadastradas:</strong> ao enviar uma candidatura, a organização responsável pela vaga poderá acessar a apresentação e os dados profissionais necessários para avaliar aquela candidatura. Ela não recebe acesso geral a todos os usuários.</p>
        <p><strong className="text-foreground">Com prestadores técnicos:</strong> serviços de autenticação, banco de dados, hospedagem e segurança podem processar dados para manter a plataforma funcionando, sob finalidades técnicas compatíveis.</p>
        <p><strong className="text-foreground">Por obrigação ou proteção de direitos:</strong> informações podem ser fornecidas quando houver obrigação legal, ordem válida ou necessidade de exercer direitos em procedimentos aplicáveis.</p>
        <p>A Inclu@tech não comercializa listas, perfis ou informações pessoais.</p>
      </div>
    </section>

    <section>
      <h2 className="text-3xl font-extrabold">6. Cookies e tecnologias semelhantes</h2>
      <p className="mt-4 leading-7 text-muted-foreground">
        A plataforma pode utilizar tecnologias estritamente necessárias para autenticação, manutenção de sessão, preferências essenciais e segurança. Nesta versão, não declaramos uso de cookies publicitários ou de rastreamento comportamental. Caso ferramentas adicionais sejam implementadas, esta política e os mecanismos de escolha serão atualizados antes do uso quando necessário.
      </p>
    </section>

    <section>
      <h2 className="text-3xl font-extrabold">7. Conservação e exclusão</h2>
      <p className="mt-4 leading-7 text-muted-foreground">
        Os dados são mantidos enquanto a conta ou a função correspondente estiver ativa e pelo período necessário às finalidades informadas. Após pedido de exclusão ou encerramento, dados podem ser eliminados ou anonimizados, observados limites técnicos, cópias de segurança e hipóteses legais de conservação, como cumprimento de obrigação ou exercício de direitos.
      </p>
    </section>

    <section>
      <h2 className="text-3xl font-extrabold">8. Segurança e limites</h2>
      <p className="mt-4 leading-7 text-muted-foreground">
        Utilizamos autenticação, políticas de acesso e separação de permissões para reduzir acessos indevidos. Nenhum sistema conectado à internet é isento de risco. Usuários devem proteger suas credenciais, evitar inserir dados desnecessários em campos abertos e comunicar suspeitas de acesso indevido.
      </p>
    </section>

    <section>
      <h2 className="text-3xl font-extrabold">9. Seus direitos</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {rights.map((right) => (
          <div key={right} className="flex gap-3 rounded-2xl border p-4 text-sm leading-6 text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            {right}
          </div>
        ))}
      </div>
      <p className="mt-5 leading-7 text-muted-foreground">
        Para solicitar atendimento, envie uma mensagem identificando a conta e o pedido. Poderemos solicitar informações mínimas para confirmar a identidade antes de fornecer ou alterar dados.
      </p>
    </section>

    <section>
      <h2 className="text-3xl font-extrabold">10. Adolescentes</h2>
      <p className="mt-4 leading-7 text-muted-foreground">
        A plataforma profissional não é destinada a crianças. Pessoas de 16 ou 17 anos somente devem criar conta com conhecimento e autorização de responsável legal, respeitando as regras aplicáveis ao trabalho de adolescentes e o melhor interesse da pessoa menor de idade. Funcionalidades poderão ser limitadas ou contas poderão ser suspensas quando não houver condições adequadas de proteção.
      </p>
    </section>

    <section>
      <h2 className="text-3xl font-extrabold">11. Atualizações desta política</h2>
      <p className="mt-4 leading-7 text-muted-foreground">
        A política poderá ser atualizada conforme o projeto evoluir, novas funções forem implantadas ou obrigações forem esclarecidas. Alterações relevantes serão indicadas pela data de atualização e, quando necessário, comunicadas dentro da plataforma.
      </p>
    </section>

    <section className="rounded-3xl border bg-white p-7 shadow-sm md:p-9">
      <div className="flex items-start gap-4">
        <Mail className="mt-1 h-7 w-7 shrink-0 text-primary" />
        <div>
          <h2 className="text-2xl font-extrabold">Contato sobre dados pessoais</h2>
          <p className="mt-3 leading-7 text-muted-foreground">E-mail: <a className="font-bold text-primary hover:underline" href="mailto:astroconsultorias@gmail.com?subject=Inclu%40tech%20-%20solicita%C3%A7%C3%A3o%20de%20dados">astroconsultorias@gmail.com</a></p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Porto Alegre, Rio Grande do Sul, Brasil.</p>
        </div>
      </div>
    </section>

    <div className="flex flex-col gap-3 border-t pt-7 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">Versão 1.0 · 1º de agosto de 2026</p>
      <Button variant="outline" asChild><Link to="/termos">Consultar os Termos de Uso</Link></Button>
    </div>
  </div>
);

export default Privacy;
