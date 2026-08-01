import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Building2, CheckCircle2, MapPin, WalletCards } from "lucide-react";

export interface PublicJob {
  id: string;
  title: string;
  description: string;
  responsibilities: string | null;
  requirements: string | null;
  location: string | null;
  work_model: string | null;
  salary_range: string | null;
  benefits: string[] | null;
  created_at: string;
  companies: {
    company_name: string;
    description?: string | null;
    accessibility_practices?: string | null;
    website?: string | null;
  };
}

interface JobDetailsDialogProps {
  job: PublicJob | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (job: PublicJob) => void;
}

export const JobDetailsDialog = ({ job, open, onOpenChange, onApply }: JobDetailsDialogProps) => {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge>{job.work_model || "Modelo a definir"}</Badge>
            {job.salary_range && <Badge variant="outline">{job.salary_range}</Badge>}
          </div>
          <DialogTitle className="text-2xl md:text-3xl">{job.title}</DialogTitle>
          <DialogDescription className="flex flex-wrap gap-x-5 gap-y-2 pt-2 text-sm">
            <span className="inline-flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              {job.companies.company_name}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {job.location || "Localização a definir"}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-7 pt-3">
          <section>
            <h3 className="mb-3 text-lg font-extrabold">Sobre a oportunidade</h3>
            <p className="whitespace-pre-wrap leading-7 text-muted-foreground">{job.description}</p>
          </section>

          {job.responsibilities && (
            <section>
              <h3 className="mb-3 text-lg font-extrabold">Responsabilidades</h3>
              <p className="whitespace-pre-wrap leading-7 text-muted-foreground">{job.responsibilities}</p>
            </section>
          )}

          {job.requirements && (
            <section>
              <h3 className="mb-3 text-lg font-extrabold">Requisitos e conhecimentos</h3>
              <p className="whitespace-pre-wrap leading-7 text-muted-foreground">{job.requirements}</p>
            </section>
          )}

          {!!job.benefits?.length && (
            <section>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-extrabold">
                <WalletCards className="h-5 w-5 text-primary" />
                Benefícios
              </h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {job.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-2 rounded-xl bg-muted/50 p-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {benefit}
                  </div>
                ))}
              </div>
            </section>
          )}

          {(job.companies.description || job.companies.accessibility_practices) && (
            <section className="rounded-2xl bg-primary-light/55 p-5">
              <h3 className="mb-3 text-lg font-extrabold">Sobre a organização</h3>
              {job.companies.description && (
                <p className="leading-7 text-muted-foreground">{job.companies.description}</p>
              )}
              {job.companies.accessibility_practices && (
                <div className="mt-4 border-t border-primary/15 pt-4">
                  <p className="mb-1 text-xs font-extrabold uppercase tracking-wider text-primary">Práticas informadas pela organização</p>
                  <p className="text-sm leading-6 text-muted-foreground">{job.companies.accessibility_practices}</p>
                </div>
              )}
            </section>
          )}

          <div className="rounded-2xl border border-coral-200 bg-accent-light/40 p-4 text-sm leading-6 text-muted-foreground">
            A Inclu@tech organiza a conexão, mas cada organização é responsável pelas informações da vaga e por conduzir um processo respeitoso, acessível e compatível com a legislação.
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Fechar</Button>
            <Button onClick={() => onApply(job)}>Quero me candidatar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
