import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
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
      toast.error("Erro ao carregar posts");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
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
          Blog Inclu@Tech
        </h1>
        <p className="text-lg text-muted-foreground">
          Conteúdos sobre inclusão, neurodiversidade e mercado de trabalho
        </p>
      </div>

      {posts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg text-muted-foreground">
              Nenhum post publicado ainda. Em breve teremos novidades!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="transition-all hover:shadow-lg flex flex-col">
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">
                  Artigo
                </Badge>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
