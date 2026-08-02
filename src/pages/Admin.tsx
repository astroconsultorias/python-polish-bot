import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Users, Briefcase, FileText, UserCog, FileCheck2, ShieldCheck } from "lucide-react";
import { BlogManager } from "@/components/admin/BlogManager";
import { UsersManager } from "@/components/admin/UsersManager";
import { JobsManager } from "@/components/admin/JobsManager";
import { RolesManager } from "@/components/admin/RolesManager";
import { ApplicationsManager } from "@/components/admin/ApplicationsManager";

const Admin = () => {
  const navigate = useNavigate();
  const { isAdmin, isLoading } = useAdmin();

  useEffect(() => {
    if (!isLoading && !isAdmin) navigate("/");
  }, [isAdmin, isLoading, navigate]);

  if (isLoading) {
    return <div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  if (!isAdmin) return null;

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] bg-[hsl(var(--foreground))] p-8 text-white shadow-xl md:p-10">
        <div className="dot-grid absolute inset-0 opacity-10" aria-hidden="true" />
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.16em] text-white/60"><ShieldCheck className="h-5 w-5 text-accent" />Governança da plataforma</div>
            <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">Administração Inclu@tech</h1>
            <p className="mt-4 max-w-3xl leading-7 text-white/70">
              Revise conteúdo, pessoas, organizações, vagas, candidaturas e permissões. Acesso administrativo exige cuidado com dados, rastreabilidade e finalidade legítima.
            </p>
          </div>
        </div>
      </section>

      <Tabs defaultValue="jobs" className="space-y-6">
        <TabsList className="flex h-auto w-full justify-start gap-1 overflow-x-auto rounded-2xl bg-muted p-1.5">
          <TabsTrigger value="jobs" className="gap-2 whitespace-nowrap"><Briefcase className="h-4 w-4" />Vagas</TabsTrigger>
          <TabsTrigger value="applications" className="gap-2 whitespace-nowrap"><FileCheck2 className="h-4 w-4" />Candidaturas</TabsTrigger>
          <TabsTrigger value="blog" className="gap-2 whitespace-nowrap"><FileText className="h-4 w-4" />Conteúdos</TabsTrigger>
          <TabsTrigger value="users" className="gap-2 whitespace-nowrap"><Users className="h-4 w-4" />Usuários</TabsTrigger>
          <TabsTrigger value="roles" className="gap-2 whitespace-nowrap"><UserCog className="h-4 w-4" />Permissões</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs">
          <Card><CardHeader><CardTitle>Vagas da plataforma</CardTitle><CardDescription>Ative, pause ou remova oportunidades. A criação e edição também estão disponíveis no painel da própria organização.</CardDescription></CardHeader><CardContent><JobsManager /></CardContent></Card>
        </TabsContent>

        <TabsContent value="applications"><ApplicationsManager /></TabsContent>

        <TabsContent value="blog">
          <Card><CardHeader><CardTitle>Conhecimento e comunicação</CardTitle><CardDescription>Crie, revise e publique conteúdos derivados da base oficial do projeto e de aprendizados documentados.</CardDescription></CardHeader><CardContent><BlogManager /></CardContent></Card>
        </TabsContent>

        <TabsContent value="users">
          <Card><CardHeader><CardTitle>Pessoas e organizações cadastradas</CardTitle><CardDescription>Visualize contas e tipos de participação. Evite acessar ou utilizar dados fora da finalidade da plataforma.</CardDescription></CardHeader><CardContent><UsersManager /></CardContent></Card>
        </TabsContent>

        <TabsContent value="roles">
          <Card><CardHeader><CardTitle>Permissões administrativas</CardTitle><CardDescription>Conceda acesso administrativo somente a pessoas autorizadas e responsáveis pela governança da plataforma.</CardDescription></CardHeader><CardContent><RolesManager /></CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
