import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, ShieldCheck } from "lucide-react";

const applicationSchema = z.object({
  cover_letter: z.string().min(40, "Escreva ao menos 40 caracteres sobre sua experiência e interesse").max(1200, "Máximo 1200 caracteres"),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

interface ApplicationDialogProps {
  jobId: string;
  jobTitle: string;
  companyName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const ApplicationDialog = ({ jobId, jobTitle, companyName, open, onOpenChange, onSuccess }: ApplicationDialogProps) => {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: { cover_letter: "" },
  });

  const onSubmit = async (values: ApplicationFormValues) => {
    if (!user) {
      toast.error("Entre na sua conta para se candidatar");
      return;
    }

    setSubmitting(true);
    try {
      const { data: talentData, error: talentError } = await supabase
        .from("talents")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (talentError) throw talentError;
      if (!talentData) {
        toast.error("Complete o perfil profissional antes de enviar a candidatura");
        return;
      }

      const { data: existingApplication, error: existingError } = await supabase
        .from("applications")
        .select("id")
        .eq("talent_id", talentData.id)
        .eq("job_id", jobId)
        .maybeSingle();

      if (existingError) throw existingError;
      if (existingApplication) {
        toast.info("Você já se candidatou a esta vaga");
        return;
      }

      const { error: applicationError } = await supabase
        .from("applications")
        .insert({
          talent_id: talentData.id,
          job_id: jobId,
          cover_letter: values.cover_letter.trim(),
          status: "pendente",
        });

      if (applicationError) throw applicationError;

      toast.success("Candidatura enviada. Você poderá acompanhar a etapa no seu painel.");
      form.reset();
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Não foi possível enviar a candidatura");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Candidatura para {jobTitle}</DialogTitle>
          <DialogDescription className="text-base">{companyName} · apresente sua trajetória com suas próprias palavras.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField control={form.control} name="cover_letter" render={({ field }) => (
              <FormItem>
                <FormLabel>Por que esta oportunidade faz sentido para você?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Conte sobre experiências, habilidades, interesses ou projetos relacionados à vaga. Não é necessário informar diagnóstico. Caso deseje, acomodações podem ser descritas no seu perfil profissional."
                    className="min-h-[220px] resize-none"
                    {...field}
                  />
                </FormControl>
                <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground"><span>Escreva de forma objetiva e autêntica.</span><span>{field.value?.length || 0}/1200</span></div>
                <FormMessage />
              </FormItem>
            )} />

            <div className="flex gap-3 rounded-2xl bg-primary-light/55 p-4 text-sm leading-6 text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              A candidatura será compartilhada com a organização responsável pela vaga. Evite inserir informações sensíveis que não sejam necessárias para o processo.
            </div>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>Cancelar</Button>
              <Button type="submit" disabled={submitting}>{submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Enviar candidatura</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
