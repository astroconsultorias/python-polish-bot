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
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const talentFormSchema = z.object({
  age: z.coerce.number().min(16, "Idade mínima: 16 anos").max(100, "Idade máxima: 100 anos").optional(),
  bio: z.string().max(500, "Máximo 500 caracteres").optional(),
  education_level: z.enum([
    "fundamental_incompleto",
    "fundamental_completo",
    "medio_incompleto",
    "medio_completo",
    "superior_incompleto",
    "superior_completo",
    "pos_graduacao",
    "mestrado",
    "doutorado"
  ]).optional(),
  course: z.string().max(200).optional(),
  professional_experience: z.string().max(1000).optional(),
  skills: z.string().optional(),
  disability_types: z.string().optional(),
  disability_description: z.string().max(500).optional(),
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
    defaultValues: {},
  });

  useEffect(() => {
    const loadTalentData = async () => {
      try {
        const { data, error } = await supabase
          .from("talents")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (error && error.code !== "PGRST116") throw error;

        if (data) {
          form.reset({
            age: data.age || undefined,
            bio: data.bio || "",
            education_level: data.education_level || undefined,
            course: data.course || "",
            professional_experience: data.professional_experience || "",
            skills: data.skills?.join(", ") || "",
            disability_types: data.disability_types?.join(", ") || "",
            disability_description: data.disability_description || "",
            linkedin_url: data.linkedin_url || "",
            portfolio_url: data.portfolio_url || "",
            availability: data.availability || "",
            preferred_work_model: data.preferred_work_model || "",
          });
        }
      } catch (error) {
        console.error("Error loading talent data:", error);
        toast.error("Erro ao carregar dados do perfil");
      } finally {
        setLoading(false);
      }
    };

    loadTalentData();
  }, [userId, form]);

  const onSubmit = async (values: TalentFormValues) => {
    setSaving(true);
    try {
      const disabilityTypesArray = values.disability_types 
        ? values.disability_types.split(",").map(s => s.trim()) 
        : [];

      const talentData: Database["public"]["Tables"]["talents"]["Insert"] = {
        user_id: userId,
        age: values.age,
        bio: values.bio,
        education_level: values.education_level as Database["public"]["Enums"]["education_level"] | undefined,
        course: values.course,
        professional_experience: values.professional_experience,
        skills: values.skills ? values.skills.split(",").map(s => s.trim()) : [],
        disability_types: disabilityTypesArray as Database["public"]["Enums"]["disability_type"][] | undefined,
        disability_description: values.disability_description,
        linkedin_url: values.linkedin_url,
        portfolio_url: values.portfolio_url,
        availability: values.availability,
        preferred_work_model: values.preferred_work_model,
      };

      const { error } = await supabase
        .from("talents")
        .upsert([talentData], { onConflict: "user_id" });

      if (error) throw error;

      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Error saving talent data:", error);
      toast.error("Erro ao salvar perfil");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil Profissional</CardTitle>
        <CardDescription>
          Complete seu perfil para aparecer nas buscas das empresas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Idade</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="25" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="education_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nível de Escolaridade</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="fundamental_incompleto">Fundamental Incompleto</SelectItem>
                        <SelectItem value="fundamental_completo">Fundamental Completo</SelectItem>
                        <SelectItem value="medio_incompleto">Médio Incompleto</SelectItem>
                        <SelectItem value="medio_completo">Médio Completo</SelectItem>
                        <SelectItem value="superior_incompleto">Superior Incompleto</SelectItem>
                        <SelectItem value="superior_completo">Superior Completo</SelectItem>
                        <SelectItem value="pos_graduacao">Pós-graduação</SelectItem>
                        <SelectItem value="mestrado">Mestrado</SelectItem>
                        <SelectItem value="doutorado">Doutorado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Curso/Formação</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Análise e Desenvolvimento de Sistemas" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sobre mim</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Conte um pouco sobre você, suas experiências e objetivos..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="professional_experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experiência Profissional</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva suas experiências profissionais anteriores..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Habilidades</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: JavaScript, React, Node.js (separadas por vírgula)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="disability_types"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipos de Deficiência/Neurodivergência</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: TDAH, Autismo, Deficiência Visual (separadas por vírgula)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="disability_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição de Necessidades</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva adaptações ou acomodações que você precisa no ambiente de trabalho..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="linkedin_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl>
                      <Input placeholder="https://linkedin.com/in/seu-perfil" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="portfolio_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfólio</FormLabel>
                    <FormControl>
                      <Input placeholder="https://seu-portfolio.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Disponibilidade</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="imediata">Imediata</SelectItem>
                        <SelectItem value="30_dias">30 dias</SelectItem>
                        <SelectItem value="60_dias">60 dias</SelectItem>
                        <SelectItem value="a_combinar">A combinar</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferred_work_model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modelo de Trabalho Preferido</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="presencial">Presencial</SelectItem>
                        <SelectItem value="remoto">Remoto</SelectItem>
                        <SelectItem value="hibrido">Híbrido</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar Perfil
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
