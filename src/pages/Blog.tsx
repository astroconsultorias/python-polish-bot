import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, BookOpen, User } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  published_at: string;
  profiles: {
    full_name: string;
  } | null;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(`
          *,
          profiles (
            full_name
          )
        `)
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Erro ao carregar conteúdos");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse rounded-3xl">
            <CardHeader>
              <div className="h-6 w-3/4 rounded bg-muted" />
              <div className="mt-2 h-4 w-1/2 rounded bg-muted" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-5/6 rounded bg-muted" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-10">
      <section className="rounded-[2rem] bg-gradient-hero px-7 py-12 text-white shadow-2xl md:px-12 md:py-16">
        <BookOpen className="mb-5 h-10 w-10" aria-hidden="true" />
        <h1 className="text-4xl font-extrabold md:text-5xl">Conteúdos Inclu@tech</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-white/85">
          Reflexões e aprendizados sobre neuroinclusão, atendimento em saúde,
          empreendedorismo social e ambientes de trabalho mais humanos.
        </p>
      </section>

      {posts.length === 0 ? (
        <Card className="rounded-3xl border-2 border-dashed">
          <CardContent className="py-16 text-center">
            <h2 className="text-2xl font-extrabold">Conteúdo em preparação</h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg leading-7 text-muted-foreground">
              O projeto está sendo estruturado antes de iniciar uma rotina pública de
              conteúdo. Os primeiros textos serão publicados junto com os aprendizados
              da validação e da construção institucional.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col rounded-3xl transition-all hover:-translate-y-1 hover:shadow-xl">
              <CardHeader>
                <Badge variant="secondary" className="mb-2 w-fit">
                  Artigo
                </Badge>
                <CardTitle className="line-clamp-2 text-2xl">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3 text-base leading-7">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {post.profiles && (
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.profiles.full_name}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(post.published_at), "dd/MM/yyyy", {
                      locale: ptBR,
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
