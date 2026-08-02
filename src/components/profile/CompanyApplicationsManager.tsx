import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, Calendar, ExternalLink, Loader2, MapPin, Phone, UserRound } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface CompanyApplication {
  id: string;
  status: string;
  cover_letter: string | null;
  created_at: string;
  jobTitle: string;
  profileName: string;
  phone: string | null;
  city: string | null;
  state: string | null;
  course: string | null;
  skills: string[] | null;
  linkedinUrl: string | null;
}

const statusLabels: Record<string, string> = {
  pendente: "Pendente",
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

export const CompanyApplicationsManager = ({ userId }: { userId: string }) => {
  const [applications, setApplications] = useState<CompanyApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasCompany, setHasCompany] = useState(false);
  const [hasJobs, setHasJobs] = useState(false);

  const loadApplications = useCallback(async () => {
    setLoading(true);
    try {
      const { data: company, error: companyError } = await supabase
        .from("companies")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

      if (companyError) throw companyError;
      setHasCompany(!!company);

      if (!company) {
        setApplications([]);
        setHasJobs(false);
        return;
      }

      const { data: jobs, error: jobsError } = await supabase
        .from("jobs")
        .select("id, title")
        .eq("company_id", company.id);

      if (jobsError) throw jobsError;
      setHasJobs(!!jobs?.length);

      if (!jobs?.length) {
        setApplications([]);
        return;
      }

      const jobMap = new Map(jobs.map((job) => [job.id, job.title]));
      const { data, error } = await supabase
        .from("applications")
        .select(`
          id,
          status,
          cover_letter,
          created_at,
          job_id,
          talents (
            user_id,
            course,
            skills,
            linkedin_url
          )
        `)
        .in("job_id", jobs.map((job) => job.id))
        .order("created_at", { ascending: false });

      if (error) throw error;

      const enriched = await Promise.all(
        (data || []).map(async (application: any) => {
          const talent = application.talents;
          const { data: profile } = await supabase
            .from("profiles")
            .select("full_name, phone, city, state")
            .eq("id", talent.user_id)
            .maybeSingle();

          return {
            id: application.id,
            status: application.status || "pendente",
            cover_letter: application.cover_letter,
            created_at: application.created_at,
            jobTitle: jobMap.get(application.job_id) || "Vaga",
            profileName: profile?.full_name || "Candidatura sem nome",
            phone: profile?.phone || null,
            city: profile?.city || null,
            state: profile?.state || null,
            course: talent.course || null,
            skills: talent.skills || null,
            linkedinUrl: talent.linkedin_url || null,
          } satisfies CompanyApplication;
        })
      );

      setApplications(enriched);
    } catch (error) {
      console.error("Error loading company applications:", error);
      toast.error("Não foi possível carregar as candidaturas");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const updateStatus = async (applicationId: string, status: string) => {
    try {
      const { error } = await supabase
        .from("applications")
        .update({ status })
        .eq("id", applicationId);

      if (error) throw error;
      setApplications((current) => current.map((item) => item.id === applicationId ? { ...item, status } : item));
      toast.success("Etapa da candidatura atualizada");
    } catch (error) {
      console.error("Error updating application status:", error);
      toast.error("Não foi possível atualizar a candidatura");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!hasCompany || !hasJobs || applications.length === 0) {
    const title = !hasCompany
      ? "Complete o perfil da organização"
      : !hasJobs
        ? "Publique uma vaga para começar"
        : "Ainda não há candidaturas";
    const description = !hasCompany
      ? "O perfil institucional é necessário para relacionar vagas e candidaturas à sua organização."
      : !hasJobs
        ? "Quando uma vaga estiver publicada, as candidaturas aparecerão aqui."
        : "As candidaturas recebidas serão organizadas por vaga e etapa do processo.";

    return (
      <Card className="border-dashed">
        <CardContent className="py-12 text-center">
          <UserRound className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="text-xl font-extrabold">{title}</h3>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-3xl bg-primary-light/60 p-6">
        <p className="text-sm font-bold uppercase tracking-wider text-primary">Seleção com respeito</p>
        <h3 className="mt-1 text-2xl font-extrabold">Candidaturas recebidas</h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Avalie competências, experiências e necessidades de acomodação sem reduzir a pessoa ao diagnóstico. Atualize as etapas para oferecer previsibilidade durante o processo.
        </p>
      </div>

      {applications.map((application) => (
        <Card key={application.id} className="overflow-hidden transition hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h4 className="text-xl font-extrabold">{application.profileName}</h4>
                  <Badge className={statusClasses[application.status] || statusClasses.pendente}>
                    {statusLabels[application.status] || "Pendente"}
                  </Badge>
                </div>

                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    {application.jobTitle}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(application.created_at), "dd 'de' MMMM", { locale: ptBR })}
                  </span>
                  {(application.city || application.state) && (
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {[application.city, application.state].filter(Boolean).join("/ ")}
                    </span>
                  )}
                </div>

                {application.course && (
                  <p className="mt-4 text-sm"><span className="font-bold">Formação:</span> {application.course}</p>
                )}

                {!!application.skills?.length && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {application.skills.slice(0, 8).map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                )}

                {application.cover_letter && (
                  <div className="mt-5 rounded-2xl bg-muted/50 p-5">
                    <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-primary">Apresentação</p>
                    <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">{application.cover_letter}</p>
                  </div>
                )}
              </div>

              <div className="w-full space-y-3 lg:w-52">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Etapa</p>
                  <Select value={application.status} onValueChange={(value) => updateStatus(application.id, value)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pendente">Pendente</SelectItem>
                      <SelectItem value="em_analise">Em análise</SelectItem>
                      <SelectItem value="aceita">Avançou</SelectItem>
                      <SelectItem value="rejeitada">Encerrada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {application.phone && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href={`tel:${application.phone}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      Contatar
                    </a>
                  </Button>
                )}

                {application.linkedinUrl && (
                  <Button variant="ghost" className="w-full" asChild>
                    <a href={application.linkedinUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      LinkedIn
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
