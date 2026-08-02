import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Briefcase, Building2, Calendar, ExternalLink, Route } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Application {
  id: string;
  status: string;
  cover_letter: string;
  created_at: string;
  jobs: {
    id: string;
    title: string;
    work_model: string;
    companies: { company_name: string };
  };
}

const statusLabels: Record<string, string> = {
  pendente: "Recebida",
  em_analise: "Em análise",
  aceita: "Avançou",
  rejeitada: "Encerrada",
};

const statusClasses: Record<string, string> = {
  pendente: "bg-amber-100 text-amber-800",
  em_analise: "bg-blue-100 text-blue-800",
  aceita: "bg-emerald-100 text-emerald-800",
  rejeitada: "bg-slate-100 text-slate-700",
};

export const ApplicationsList = ({ userId }: { userId: string }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const { data: talentData, error: talentError } = await supabase
          .from("talents")
          .select("id")
          .eq("user_id", userId)
          .maybeSingle();

        if (talentError) throw talentError;
        if (!talentData) {
          setApplications([]);
          return;
        }

        const { data, error } = await supabase
          .from("applications")
          .select(`
            id,
            status,
            cover_letter,
            created_at,
            jobs (
              id,
              title,
              work_model,
              companies (company_name)
            )
          `)
          .eq("talent_id", talentData.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setApplications((data || []) as Application[]);
      } catch (error) {
        console.error("Error loading applications:", error);
        toast.error("Não foi possível carregar suas candidaturas");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [userId]);

  if (loading) {
    return <div className="flex items-center justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  if (applications.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-14 text-center">
          <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-extrabold">Você ainda não enviou candidaturas</h3>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Complete seu perfil, leia as condições de cada oportunidade e candidate-se apenas quando a vaga fizer sentido para sua trajetória.</p>
          <Button className="mt-6" asChild><Link to="/vagas">Explorar oportunidades</Link></Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-3xl bg-primary-light/55 p-6">
        <p className="text-sm font-bold uppercase tracking-wider text-primary">Acompanhamento</p>
        <h3 className="mt-1 text-2xl font-extrabold">Minhas candidaturas</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">As etapas são atualizadas pela organização responsável. “Encerrada” indica que o processo não avançou nesta oportunidade e não reduz o valor da sua trajetória.</p>
      </div>

      {applications.map((application) => (
        <Card key={application.id} className="transition hover:shadow-lg">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle className="text-xl">{application.jobs.title}</CardTitle>
                <CardDescription className="mt-2 flex items-center gap-2"><Building2 className="h-4 w-4" />{application.jobs.companies.company_name}</CardDescription>
              </div>
              <Badge className={statusClasses[application.status] || statusClasses.pendente}>{statusLabels[application.status] || "Recebida"}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Calendar className="h-4 w-4" />Enviada em {format(new Date(application.created_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
              <Badge variant="outline">{application.jobs.work_model || "Modelo a definir"}</Badge>
            </div>

            <div className="rounded-2xl bg-muted/50 p-5">
              <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-primary">Sua apresentação</p>
              <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">{application.cover_letter}</p>
            </div>

            <Button variant="outline" size="sm" asChild><Link to={`/vagas#${application.jobs.id}`}>Rever oportunidade<ExternalLink className="ml-2 h-4 w-4" /></Link></Button>
          </CardContent>
        </Card>
      ))}

      <div className="flex gap-3 rounded-2xl border bg-muted/30 p-5 text-sm leading-6 text-muted-foreground"><Route className="mt-0.5 h-5 w-5 shrink-0 text-primary" />A plataforma ajuda a organizar etapas, mas decisões e contatos são responsabilidade da organização que publicou a vaga.</div>
    </div>
  );
};
