import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Briefcase, Building2, MapPin, Search, ShieldCheck, SlidersHorizontal, WalletCards } from "lucide-react";
import { toast } from "sonner";
import { ApplicationDialog } from "@/components/jobs/ApplicationDialog";
import { JobDetailsDialog, PublicJob } from "@/components/jobs/JobDetailsDialog";

const Jobs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<PublicJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [workModel, setWorkModel] = useState("todos");
  const [selectedJob, setSelectedJob] = useState<PublicJob | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [applicationJob, setApplicationJob] = useState<PublicJob | null>(null);
  const [applicationDialogOpen, setApplicationDialogOpen] = useState(false);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select(`
          id,
          title,
          description,
          responsibilities,
          requirements,
          location,
          work_model,
          salary_range,
          benefits,
          created_at,
          companies (
            company_name,
            description,
            accessibility_practices,
            website
          )
        `)
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setJobs((data || []) as PublicJob[]);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Não foi possível carregar as vagas");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    const term = search.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesModel = workModel === "todos" || job.work_model === workModel;
      const searchable = [job.title, job.description, job.location, job.companies.company_name]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return matchesModel && (!term || searchable.includes(term));
    });
  }, [jobs, search, workModel]);

  const openDetails = (job: PublicJob) => {
    setSelectedJob(job);
    setDetailsOpen(true);
  };

  const beginApplication = (job: PublicJob) => {
    setDetailsOpen(false);
    if (!user) {
      toast.info("Crie uma conta ou entre para enviar sua candidatura");
      navigate("/auth?signup=true&type=talent");
      return;
    }
    setApplicationJob(job);
    setApplicationDialogOpen(true);
  };

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[2rem] bg-primary p-8 text-white shadow-xl md:p-12">
        <div className="dot-grid absolute inset-0 opacity-10" aria-hidden="true" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em]">
              <Briefcase className="h-4 w-4" />
              Oportunidades profissionais
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">
              Trabalho pode gerar renda, pertencimento e futuro.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">
              Consulte oportunidades publicadas por organizações cadastradas. Leia as condições com atenção, apresente sua trajetória e compartilhe necessidades de acomodação apenas quando considerar adequado.
            </p>
          </div>
          <Button variant="secondary" size="lg" asChild className="font-bold">
            <Link to="/auth?signup=true&type=company">Publicar uma vaga<ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      <section className="rounded-3xl border bg-white p-5 shadow-sm md:p-6">
        <div className="grid gap-4 md:grid-cols-[1fr_220px]">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Busque por função, organização ou cidade" className="h-12 pl-12" />
          </div>
          <Select value={workModel} onValueChange={setWorkModel}>
            <SelectTrigger className="h-12"><SlidersHorizontal className="mr-2 h-4 w-4" /><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os modelos</SelectItem>
              <SelectItem value="presencial">Presencial</SelectItem>
              <SelectItem value="hibrido">Híbrido</SelectItem>
              <SelectItem value="remoto">Remoto</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          {isLoading ? "Carregando oportunidades..." : `${filteredJobs.length} ${filteredJobs.length === 1 ? "oportunidade encontrada" : "oportunidades encontradas"}`}
        </p>
      </section>

      {isLoading ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {[1, 2, 3, 4].map((item) => <div key={item} className="h-72 animate-pulse rounded-3xl bg-muted" />)}
        </div>
      ) : filteredJobs.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-16 text-center">
            <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-4 text-2xl font-extrabold">Nenhuma vaga corresponde aos filtros</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Altere a busca ou volte em outro momento. A plataforma está em desenvolvimento e novas organizações poderão publicar oportunidades gradualmente.
            </p>
            <Button variant="outline" className="mt-6" onClick={() => { setSearch(""); setWorkModel("todos"); }}>Limpar filtros</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {filteredJobs.map((job) => (
            <Card key={job.id} id={job.id} className="group overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <CardContent className="flex h-full flex-col p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-primary">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <Badge>{job.work_model || "Modelo a definir"}</Badge>
                </div>

                <p className="mt-6 text-sm font-bold text-primary">{job.companies.company_name}</p>
                <h2 className="mt-2 text-2xl font-extrabold leading-tight">{job.title}</h2>
                <p className="mt-4 line-clamp-4 flex-1 leading-7 text-muted-foreground">{job.description}</p>

                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" />{job.location || "Local a definir"}</span>
                  {job.salary_range && <span className="inline-flex items-center gap-2"><WalletCards className="h-4 w-4" />{job.salary_range}</span>}
                </div>

                {!!job.benefits?.length && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.benefits.slice(0, 4).map((benefit) => <Badge key={benefit} variant="secondary">{benefit}</Badge>)}
                    {job.benefits.length > 4 && <Badge variant="outline">+{job.benefits.length - 4}</Badge>}
                  </div>
                )}

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button variant="outline" className="flex-1 border-2" onClick={() => openDetails(job)}>Ver detalhes</Button>
                  <Button className="flex-1" onClick={() => beginApplication(job)}>Candidatar-se</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <section className="grid gap-6 rounded-[2rem] bg-muted/60 p-7 md:grid-cols-[auto_1fr_auto] md:items-center md:p-9">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary shadow-sm"><ShieldCheck className="h-7 w-7" /></div>
        <div>
          <h2 className="text-2xl font-extrabold">Inclusão não termina na publicação da vaga</h2>
          <p className="mt-2 leading-7 text-muted-foreground">Organizações são convidadas a oferecer comunicação clara, previsibilidade, critérios objetivos e abertura para adaptações razoáveis durante todo o processo.</p>
        </div>
        <Button variant="outline" asChild className="border-2"><Link to="/participar">Nossos princípios</Link></Button>
      </section>

      <JobDetailsDialog job={selectedJob} open={detailsOpen} onOpenChange={setDetailsOpen} onApply={beginApplication} />

      {applicationJob && (
        <ApplicationDialog
          jobId={applicationJob.id}
          jobTitle={applicationJob.title}
          companyName={applicationJob.companies.company_name}
          open={applicationDialogOpen}
          onOpenChange={setApplicationDialogOpen}
          onSuccess={fetchJobs}
        />
      )}
    </div>
  );
};

export default Jobs;
