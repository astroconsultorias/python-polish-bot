import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Building2 } from "lucide-react";
import { toast } from "sonner";

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  work_model: string;
  salary_range: string;
  benefits: string[];
  created_at: string;
  companies: {
    company_name: string;
  };
}

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select(`
          *,
          companies (
            company_name
          )
        `)
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Erro ao carregar vagas");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 w-3/4 bg-muted rounded" />
              <div className="h-4 w-1/2 bg-muted rounded mt-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-5/6 bg-muted rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Vagas Inclusivas
        </h1>
        <p className="text-lg text-muted-foreground">
          Oportunidades em empresas comprometidas com a diversidade
        </p>
      </div>

      {jobs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">
              Nenhuma vaga disponível no momento. Volte em breve!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {jobs.map((job) => (
            <Card key={job.id} className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl">{job.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-base">
                      <Building2 className="h-4 w-4" />
                      {job.companies.company_name}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    {job.work_model || "Não especificado"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground line-clamp-3">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {job.location || "Localização não especificada"}
                  </div>
                  {job.salary_range && (
                    <Badge variant="outline">{job.salary_range}</Badge>
                  )}
                </div>

                {job.benefits && job.benefits.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {job.benefits.map((benefit, index) => (
                      <Badge key={index} variant="secondary">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button className="w-full sm:w-auto">Candidatar-se</Button>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Ver Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
