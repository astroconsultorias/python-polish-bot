import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, ShieldCheck, Sparkles } from "lucide-react";

const disabilityOptions = [
  { value: "neurodivergencia", label: "Neurodivergência" },
  { value: "visual", label: "Deficiência visual" },
  { value: "auditiva", label: "Deficiência auditiva" },
  { value: "fisica", label: "Deficiência física" },
  { value: "intelectual", label: "Deficiência intelectual" },
  { value: "psicossocial", label: "Deficiência psicossocial" },
  { value: "multipla", label: "Deficiência múltipla" },
  { value: "outro", label: "Outra condição" },
] as const;

type DisabilityType = Database["public"]["Enums"]["disability_type"];

const talentFormSchema = z.object({
  age: z.preprocess(
    (value) => value === "" || value === undefined ? undefined : Number(value),
    z.number().min(16, "Idade mínima: 16 anos").max(100, "Idade máxima: 100 anos").optional()
  ),
  bio: z.string().max(600, "Máximo 600 caracteres").optional(),
  education_level: z.enum([
    "fundamental_incompleto",
    "fundamental_completo",
    "medio_incompleto",
    "medio_completo",
    "superior_incompleto",
    "superior_completo",
    "pos_graduacao",
    "mestrado",
    "doutorado",
  ]).optional(),
  course: z.string().max(200).optional(),
  professional_experience: z.string().max(1500).optional(),
  skills: z.string().optional(),
  disability_types: z.array(z.enum(["visual", "auditiva", "fisica", "intelectual", "psicossocial", "multipla", "neurodivergencia", "outro"])).optional(),
  disability_description: z.string().max(800).optional(),
  linkedin_url: z.string().url("URL inválida").optional().or(z.literal("")),
  portfolio_url: z.string().url("URL inválida").optional().or(z.literal("")),
  availability: z.string().optional(),
  preferred_work_model: z.string().optional(),
});

type TalentFormValues = z.infer<typeof talentFormSchema>;

export const TalentProfileForm = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const form = useForm<TalentFormValues>({
    resolver: zodResolver(talentFormSchema),
    defaultValues: {
      bio: "",
      course: "",
      professional_experience: "",
      skills: "",
      disability_types: [],
      disability_description: "",
      linkedin_url: "",
      portfolio_url: "",
      availability: "",
      preferred_work_model: "",
    },
  });

  useEffect(() => {
    const loadTalentData = async () => {
      try {
        const { data, error } = await supabase
          .from("talents")
          .select("*")
          .eq("user_id", userId)
          .maybeSingle();

        if (error) throw error;
        if (data) {
          form.reset({
            age: data.age || undefined,
            bio: data.bio || "",
            education_level: data.education_level || undefined,
            course: data.course || "",
            professional_experience: data.professional_experience || "",
            skills: data.skills?.join(", ") || "",
            disability_types: data.disability_types || [],
            disability_description: data.disability_description || "",
            linkedin_url: data.linkedin_url || "",
            portfolio_url: data.portfolio_url || "",
            availability: data.availability || "",
            preferred_work_model: data.preferred_work_model || "",
          });
        }
      } catch (error) {
        console.error("Error loading talent data:", error);
        toast.error("Não foi possível carregar o perfil profissional");
      } finally {
        setLoading(false);
      }
    };
    loadTalentData();
  }, [userId, form]);

  const onSubmit = async (values: TalentFormValues) => {
    setSaving(true);
    try {
      const talentData: Database["public"]["Tables"]["talents"]["Insert"] = {
        user_id: userId,
        age: values.age,
        bio: values.bio?.trim() || null,
        education_level: values.education_level,
        course: values.course?.trim() || null,
        professional_experience: values.professional_experience?.trim() || null,
        skills: values.skills ? values.skills.split(",").map((item) => item.trim()).filter(Boolean) : [],
        disability_types: values.disability_types as DisabilityType[] | undefined,
        disability_description: values.disability_description?.trim() || null,
        linkedin_url: values.linkedin_url || null,
        portfolio_url: values.portfolio_url || null,
        availability: values.availability || null,
        preferred_work_model: values.preferred_work_model || null,
      };

      const { error } = await supabase.from("talents").upsert([talentData], { onConflict: "user_id" });
      if (error) throw error;
      toast.success("Perfil profissional atualizado");
    } catch (error) {
      console.error("Error saving talent data:", error);
      toast.error("Não foi possível salvar o perfil");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary-light/45">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white"><Sparkles className="h-6 w-6" /></div>
          <div>
            <CardTitle className="text-2xl">Sua trajetória profissional</CardTitle>
            <CardDescription className="mt-2 max-w-3xl text-sm leading-6">
              Apresente competências, experiências e preferências com suas próprias palavras. Informações sobre deficiência e acomodações são opcionais e devem servir para ampliar autonomia — nunca para limitar oportunidades.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            <div className="grid gap-5 md:grid-cols-2">
              <FormField control={form.control} name="age" render={({ field }) => (
                <FormItem><FormLabel>Idade <span className="font-normal text-muted-foreground">(opcional)</span></FormLabel><FormControl><Input type="number" placeholder="Ex.: 28" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="education_level" render={({ field }) => (
                <FormItem><FormLabel>Nível de escolaridade</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl><SelectContent>
                  <SelectItem value="fundamental_incompleto">Fundamental incompleto</SelectItem><SelectItem value="fundamental_completo">Fundamental completo</SelectItem><SelectItem value="medio_incompleto">Médio incompleto</SelectItem><SelectItem value="medio_completo">Médio completo</SelectItem><SelectItem value="superior_incompleto">Superior incompleto</SelectItem><SelectItem value="superior_completo">Superior completo</SelectItem><SelectItem value="pos_graduacao">Pós-graduação</SelectItem><SelectItem value="mestrado">Mestrado</SelectItem><SelectItem value="doutorado">Doutorado</SelectItem>
                </SelectContent></Select><FormMessage /></FormItem>
              )} />
            </div>

            <FormField control={form.control} name="course" render={({ field }) => (
              <FormItem><FormLabel>Curso, formação ou área de interesse</FormLabel><FormControl><Input placeholder="Ex.: Administração, atendimento ao público, desenvolvimento web" {...field} /></FormControl><FormMessage /></FormItem>
            )} />

            <FormField control={form.control} name="bio" render={({ field }) => (
              <FormItem><FormLabel>Como você deseja se apresentar?</FormLabel><FormControl><Textarea placeholder="Conte sobre seus objetivos, interesses, forma de trabalhar e aquilo que gostaria que uma organização conhecesse sobre você." className="min-h-32" {...field} /></FormControl><FormMessage /></FormItem>
            )} />

            <FormField control={form.control} name="professional_experience" render={({ field }) => (
              <FormItem><FormLabel>Experiências e projetos</FormLabel><FormControl><Textarea placeholder="Inclua empregos, trabalhos informais, voluntariado, projetos pessoais, cursos práticos ou responsabilidades que demonstrem suas capacidades." className="min-h-36" {...field} /></FormControl><FormMessage /></FormItem>
            )} />

            <FormField control={form.control} name="skills" render={({ field }) => (
              <FormItem><FormLabel>Competências e habilidades</FormLabel><FormControl><Input placeholder="Ex.: organização, Excel, atendimento, escrita, programação (separadas por vírgula)" {...field} /></FormControl><FormMessage /></FormItem>
            )} />

            <div className="rounded-3xl border bg-muted/35 p-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                <div><h3 className="font-extrabold">Informações opcionais de inclusão</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">Você não precisa informar diagnóstico. Marque apenas categorias que considere úteis e descreva condições que ajudam você a participar com segurança e desempenho.</p></div>
              </div>

              <FormField control={form.control} name="disability_types" render={({ field }) => (
                <FormItem className="mt-6"><FormLabel>Como você prefere se identificar?</FormLabel><div className="grid gap-3 pt-2 sm:grid-cols-2 lg:grid-cols-4">
                  {disabilityOptions.map((option) => {
                    const checked = field.value?.includes(option.value) || false;
                    return <label key={option.value} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition ${checked ? "border-primary bg-primary-light" : "bg-white hover:bg-muted"}`}><input type="checkbox" checked={checked} onChange={(event) => {
                      const current = field.value || [];
                      field.onChange(event.target.checked ? [...current, option.value] : current.filter((item) => item !== option.value));
                    }} className="h-4 w-4 accent-[hsl(var(--primary))]" /><span>{option.label}</span></label>;
                  })}
                </div><FormMessage /></FormItem>
              )} />

              <FormField control={form.control} name="disability_description" render={({ field }) => (
                <FormItem className="mt-6"><FormLabel>Acomodações e condições que ajudam você</FormLabel><FormControl><Textarea placeholder="Ex.: instruções por escrito, ambiente com menos ruído, antecedência sobre mudanças, pausas, flexibilidade de horário ou tecnologia assistiva." className="min-h-28 bg-white" {...field} /></FormControl><p className="text-xs leading-5 text-muted-foreground">Compartilhe somente o que considerar necessário. A organização deve tratar essas informações com respeito e finalidade legítima.</p><FormMessage /></FormItem>
              )} />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <FormField control={form.control} name="linkedin_url" render={({ field }) => (
                <FormItem><FormLabel>LinkedIn</FormLabel><FormControl><Input placeholder="https://linkedin.com/in/seu-perfil" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="portfolio_url" render={({ field }) => (
                <FormItem><FormLabel>Portfólio ou projeto</FormLabel><FormControl><Input placeholder="https://seu-portfolio.com" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <FormField control={form.control} name="availability" render={({ field }) => (
                <FormItem><FormLabel>Disponibilidade</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl><SelectContent><SelectItem value="imediata">Imediata</SelectItem><SelectItem value="30_dias">Em até 30 dias</SelectItem><SelectItem value="60_dias">Em até 60 dias</SelectItem><SelectItem value="a_combinar">A combinar</SelectItem></SelectContent></Select><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="preferred_work_model" render={({ field }) => (
                <FormItem><FormLabel>Modelo de trabalho preferido</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl><SelectContent><SelectItem value="presencial">Presencial</SelectItem><SelectItem value="remoto">Remoto</SelectItem><SelectItem value="hibrido">Híbrido</SelectItem></SelectContent></Select><FormMessage /></FormItem>
              )} />
            </div>

            <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2"><Badge variant="secondary">Você controla seus dados</Badge><Badge variant="outline">Perfil atualizável</Badge></div>
              <Button type="submit" disabled={saving} className="font-bold">{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Salvar perfil profissional</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
