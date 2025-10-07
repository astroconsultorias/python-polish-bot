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
import { Loader2 } from "lucide-react";

const applicationSchema = z.object({
  cover_letter: z.string().min(50, "A carta de apresentação deve ter no mínimo 50 caracteres").max(1000, "Máximo 1000 caracteres"),
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

export const ApplicationDialog = ({ 
  jobId, 
  jobTitle, 
  companyName, 
  open, 
  onOpenChange,
  onSuccess 
}: ApplicationDialogProps) => {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      cover_letter: "",
    },
  });

  const onSubmit = async (values: ApplicationFormValues) => {
    if (!user) {
      toast.error("Você precisa estar logado para se candidatar");
      return;
    }

    setSubmitting(true);
    try {
      // Verificar se o usuário tem perfil de talento
      const { data: talentData, error: talentError } = await supabase
        .from("talents")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (talentError || !talentData) {
        toast.error("Complete seu perfil profissional antes de se candidatar");
        return;
      }

      // Verificar se já não se candidatou
      const { data: existingApplication } = await supabase
        .from("applications")
        .select("id")
        .eq("talent_id", talentData.id)
        .eq("job_id", jobId)
        .single();

      if (existingApplication) {
        toast.error("Você já se candidatou a esta vaga");
        return;
      }

      // Criar candidatura
      const { error: applicationError } = await supabase
        .from("applications")
        .insert({
          talent_id: talentData.id,
          job_id: jobId,
          cover_letter: values.cover_letter,
          status: "pendente",
        });

      if (applicationError) throw applicationError;

      toast.success("Candidatura enviada com sucesso!");
      form.reset();
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Erro ao enviar candidatura");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Candidatar-se para {jobTitle}</DialogTitle>
          <DialogDescription>
            {companyName} • Complete sua carta de apresentação abaixo
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cover_letter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Carta de Apresentação *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Conte por que você é o candidato ideal para esta vaga, suas experiências relevantes e o que você pode contribuir para a empresa..."
                      className="min-h-[200px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-sm text-muted-foreground">
                    {field.value?.length || 0}/1000 caracteres
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={submitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Enviar Candidatura
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
