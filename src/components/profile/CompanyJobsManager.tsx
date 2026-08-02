import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, Eye, EyeOff, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Company {
  id: string;
  company_name: string;
}

interface Job {
  id: string;
  title: string;
  description: string;
  responsibilities: string | null;
  requirements: string | null;
  location: string | null;
  work_model: string | null;
  salary_range: string | null;
  benefits: string[] | null;
  is_active: boolean | null;
  created_at: string;
}

interface JobFormState {
  title: string;
  description: string;
  responsibilities: string;
  requirements: string;
  location: string;
  work_model: string;
  salary_range: string;
  benefits: string;
  is_active: boolean;
}

const emptyForm: JobFormState = {
  title: "",
  description: "",
  responsibilities: "",
  requirements: "",
  location: "",
  work_model: "hibrido",
  salary_range: "",
  benefits: "",
  is_active: true,
};

export const CompanyJobsManager = ({ userId }: { userId: string }) => {
  const [company, setCompany] = useState<Company | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [form, setForm] = useState<JobFormState>(emptyForm);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: companyData, error: companyError } = await supabase
        .from("companies")
        .select("id, company_name")
        .eq("user_id", userId)
        .maybeSingle();

      if (companyError) throw companyError;
      setCompany(companyData);

      if (!companyData) {
        setJobs([]);
        return;
      }

      const { data: jobsData, error: jobsError } = await supabase
        .from("jobs")
        .select("*")
        .eq("company_id", companyData.id)
        .order("created_at", { ascending: false });

      if (jobsError) throw jobsError;
      setJobs(jobsData || []);
    } catch (error) {
      console.error("Error loading company jobs:", error);
      toast.error("Não foi possível carregar as vagas da empresa");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateField = <K extends keyof JobFormState>(field: K, value: JobFormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const openCreate = () => {
    setEditingJob(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (job: Job) => {
    setEditingJob(job);
    setForm({
      title: job.title,
      description: job.description,
      responsibilities: job.responsibilities || "",
      requirements: job.requirements || "",
      location: job.location || "",
      work_model: job.work_model || "hibrido",
      salary_range: job.salary_range || "",
      benefits: job.benefits?.join(", ") || "",
      is_active: job.is_active ?? true,
    });
    setDialogOpen(true);
  };

  const saveJob = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!company) {
      toast.error("Complete o perfil da empresa antes de publicar uma vaga");
      return;
    }

    if (form.title.trim().length < 3 || form.description.trim().length < 30) {
      toast.error("Informe um título e uma descrição com pelo menos 30 caracteres");
      return;
    }

    setSaving(true);
    const payload = {
      company_id: company.id,
      title: form.title.trim(),
      description: form.description.trim(),
      responsibilities: form.responsibilities.trim() || null,
      requirements: form.requirements.trim() || null,
      location: form.location.trim() || null,
      work_model: form.work_model || null,
      salary_range: form.salary_range.trim() || null,
      benefits: form.benefits
        ? form.benefits.split(",").map((item) => item.trim()).filter(Boolean)
        : [],
      is_active: form.is_active,
    };

    try {
      if (editingJob) {
        const { error } = await supabase
          .from("jobs")
          .update(payload)
          .eq("id", editingJob.id)
          .eq("company_id", company.id);
        if (error) throw error;
        toast.success("Vaga atualizada com sucesso");
      } else {
        const { error } = await supabase.from("jobs").insert(payload);
        if (error) throw error;
        toast.success("Vaga criada com sucesso");
      }

      setDialogOpen(false);
      setEditingJob(null);
      setForm(emptyForm);
      await loadData();
    } catch (error) {
      console.error("Error saving company job:", error);
      toast.error("Não foi possível salvar a vaga. Verifique suas permissões e tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (job: Job) => {
    if (!company) return;
    try {
      const { error } = await supabase
        .from("jobs")
        .update({ is_active: !(job.is_active ?? false) })
        .eq("id", job.id)
        .eq("company_id", company.id);
      if (error) throw error;
      toast.success(job.is_active ? "Vaga pausada" : "Vaga publicada");
      await loadData();
    } catch (error) {
      console.error("Error toggling company job:", error);
      toast.error("Não foi possível alterar o status da vaga");
    }
  };

  const deleteJob = async (job: Job) => {
    if (!company || !window.confirm(`Excluir a vaga “${job.title}”?`)) return;
    try {
      const { error } = await supabase
        .from("jobs")
        .delete()
        .eq("id", job.id)
        .eq("company_id", company.id);
      if (error) throw error;
      toast.success("Vaga excluída");
      await loadData();
    } catch (error) {
      console.error("Error deleting company job:", error);
      toast.error("Não foi possível excluir a vaga");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!company) {
    return (
      <Card className="border-dashed bg-primary-light/40">
        <CardContent className="py-12 text-center">
          <Briefcase className="mx-auto mb-4 h-12 w-12 text-primary" />
          <h3 className="text-xl font-extrabold">Primeiro, apresente sua organização</h3>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Complete a aba “Perfil da organização”. Isso cria a identidade institucional necessária para publicar oportunidades com transparência.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl bg-primary-light/60 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-primary">Painel da organização</p>
          <h3 className="mt-1 text-2xl font-extrabold">Vagas de {company.company_name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Publique oportunidades com informações claras sobre trabalho, benefícios e práticas de inclusão.
          </p>
        </div>
        <Button onClick={openCreate} className="shrink-0 font-bold">
          <Plus className="mr-2 h-4 w-4" />
          Nova vaga
        </Button>
      </div>

      {jobs.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <Briefcase className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-xl font-bold">Nenhuma vaga cadastrada</h3>
            <p className="mt-2 text-muted-foreground">
              Crie a primeira oportunidade quando sua organização estiver pronta para receber candidaturas.
            </p>
            <Button onClick={openCreate} variant="outline" className="mt-5 border-2">
              Criar primeira vaga
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5">
          {jobs.map((job) => (
            <Card key={job.id} className="overflow-hidden transition hover:shadow-lg">
              <CardContent className="p-0">
                <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-xl font-extrabold">{job.title}</h4>
                      <Badge variant={job.is_active ? "default" : "secondary"}>
                        {job.is_active ? "Publicada" : "Pausada"}
                      </Badge>
                      {job.work_model && <Badge variant="outline">{job.work_model}</Badge>}
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {job.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-muted-foreground">
                      <span>{job.location || "Local a definir"}</span>
                      <span>{job.salary_range || "Faixa salarial não informada"}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEdit(job)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => toggleActive(job)}>
                      {job.is_active ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                      {job.is_active ? "Pausar" : "Publicar"}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteJob(job)} aria-label={`Excluir ${job.title}`}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editingJob ? "Editar vaga" : "Criar nova vaga"}</DialogTitle>
            <DialogDescription>
              Transparência também é acessibilidade. Descreva expectativas, rotina e condições de forma objetiva.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={saveJob} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="job-title">Título da vaga *</Label>
              <Input id="job-title" value={form.title} onChange={(event) => updateField("title", event.target.value)} placeholder="Ex.: Assistente administrativo" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="job-description">Descrição da oportunidade *</Label>
              <Textarea id="job-description" value={form.description} onChange={(event) => updateField("description", event.target.value)} className="min-h-32" placeholder="Explique o propósito da função, a rotina e como a pessoa contribuirá." />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="job-responsibilities">Responsabilidades</Label>
                <Textarea id="job-responsibilities" value={form.responsibilities} onChange={(event) => updateField("responsibilities", event.target.value)} className="min-h-28" placeholder="Principais atividades e entregas." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-requirements">Requisitos</Label>
                <Textarea id="job-requirements" value={form.requirements} onChange={(event) => updateField("requirements", event.target.value)} className="min-h-28" placeholder="Separe requisitos essenciais de conhecimentos desejáveis." />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <div className="space-y-2 md:col-span-1">
                <Label>Modelo de trabalho</Label>
                <Select value={form.work_model} onValueChange={(value) => updateField("work_model", value)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="presencial">Presencial</SelectItem>
                    <SelectItem value="hibrido">Híbrido</SelectItem>
                    <SelectItem value="remoto">Remoto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-location">Localização</Label>
                <Input id="job-location" value={form.location} onChange={(event) => updateField("location", event.target.value)} placeholder="Cidade/UF ou remoto" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-salary">Faixa salarial</Label>
                <Input id="job-salary" value={form.salary_range} onChange={(event) => updateField("salary_range", event.target.value)} placeholder="Ex.: R$ 2.500 a R$ 3.200" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="job-benefits">Benefícios</Label>
              <Input id="job-benefits" value={form.benefits} onChange={(event) => updateField("benefits", event.target.value)} placeholder="Vale-alimentação, plano de saúde, horário flexível (separados por vírgula)" />
            </div>

            <label className="flex items-start gap-3 rounded-2xl border bg-muted/40 p-4">
              <input type="checkbox" checked={form.is_active} onChange={(event) => updateField("is_active", event.target.checked)} className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]" />
              <span>
                <span className="block font-bold">Publicar imediatamente</span>
                <span className="text-sm text-muted-foreground">Desmarque para salvar a vaga como pausada enquanto revisa o conteúdo.</span>
              </span>
            </label>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} disabled={saving}>Cancelar</Button>
              <Button type="submit" disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingJob ? "Salvar alterações" : "Criar vaga"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
