import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Briefcase, Building2, Calendar, ExternalLink } from "lucide-react";
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
    companies: {
      company_name: string;
    };
  };
}

export const ApplicationsList = ({ userId }: { userId: string }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, [userId]);

  const loadApplications = async () => {
    try {
      // Primeiro buscar o talent_id do usuário
      const { data: talentData, error: talentError } = await supabase
        .from("talents")
        .select("id")
        .eq("user_id", userId)
        .single();

      if (talentError || !talentData) {
        setApplications([]);
        return;
      }

      // Buscar candidaturas do talento
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
            companies (
              company_name
            )
          )
        `)
        .eq("talent_id", talentData.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error("Error loading applications:", error);
      toast.error("Erro ao carregar candidaturas");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aceita":
        return "bg-green-500";
      case "rejeitada":
        return "bg-red-500";
      case "em_analise":
        return "bg-blue-500";
      default:
        return "bg-yellow-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "aceita":
        return "Aceita";
      case "rejeitada":
        return "Rejeitada";
      case "em_analise":
        return "Em Análise";
      default:
        return "Pendente";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg text-muted-foreground">
            Você ainda não se candidatou a nenhuma vaga
          </p>
          <Button className="mt-4" asChild>
            <a href="/vagas">Ver Vagas Disponíveis</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <Card key={application.id} className="transition-all hover:shadow-md">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1 flex-1">
                <CardTitle className="text-xl">{application.jobs.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  {application.jobs.companies.company_name}
                </CardDescription>
              </div>
              <Badge className={getStatusColor(application.status)}>
                {getStatusLabel(application.status)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Candidatura enviada em {format(new Date(application.created_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </div>
              <Badge variant="outline">{application.jobs.work_model || "Não especificado"}</Badge>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">Carta de Apresentação:</p>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {application.cover_letter}
              </p>
            </div>

            <Button variant="outline" size="sm" asChild>
              <a href={`/vagas#${application.jobs.id}`}>
                Ver Vaga Completa
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
