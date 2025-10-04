import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, TrendingUp, Heart } from "lucide-react";
import heroImage from "@/assets/hero-inclusao.jpg";
import featureTalentos from "@/assets/feature-talentos.jpg";
import featureEmpresas from "@/assets/feature-empresas.jpg";
import featureCrescimento from "@/assets/feature-crescimento.jpg";
import featureInclusao from "@/assets/feature-inclusao.jpg";

const Home = () => {
  const features = [
    {
      icon: Users,
      image: featureTalentos,
      title: "Para Talentos",
      description:
        "Crie seu perfil e conecte-se com empresas que valorizam a diversidade e inclusão.",
    },
    {
      icon: Briefcase,
      image: featureEmpresas,
      title: "Para Empresas",
      description:
        "Encontre talentos qualificados e construa equipes mais diversas e inovadoras.",
    },
    {
      icon: TrendingUp,
      image: featureCrescimento,
      title: "Crescimento",
      description:
        "Acesse oportunidades de desenvolvimento profissional e networking.",
    },
    {
      icon: Heart,
      image: featureInclusao,
      title: "Inclusão Real",
      description:
        "Promovemos um ambiente onde todos têm oportunidades iguais de crescer.",
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl shadow-xl">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Equipe diversa e inclusiva" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
        </div>
        <div className="relative z-10 px-8 py-16 md:px-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Conectando Talentos Inclusivos a Oportunidades
            </h1>
            <p className="mb-8 text-lg text-white/95 md:text-xl">
              A plataforma que une pessoas neurodivergentes e com deficiência às
              empresas mais inclusivas do Rio Grande do Sul.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/auth?signup=true">Cadastre-se Gratuitamente</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white bg-white/10 text-white hover:bg-white/20" asChild>
                <Link to="/vagas">Ver Vagas</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Por que escolher o Inclu@Tech?
          </h2>
          <p className="text-lg text-muted-foreground">
            Uma plataforma pensada para promover inclusão verdadeira
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group overflow-hidden border-2 transition-all hover:shadow-lg hover:border-primary/50">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary shadow-lg">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="rounded-2xl bg-card p-8 shadow-lg md:p-12">
        <div className="grid gap-8 text-center md:grid-cols-3">
          <div>
            <div className="mb-2 text-4xl font-bold text-primary">500+</div>
            <div className="text-muted-foreground">Talentos Cadastrados</div>
          </div>
          <div>
            <div className="mb-2 text-4xl font-bold text-accent">100+</div>
            <div className="text-muted-foreground">Empresas Parceiras</div>
          </div>
          <div>
            <div className="mb-2 text-4xl font-bold text-success">1000+</div>
            <div className="text-muted-foreground">Conexões Realizadas</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-2xl bg-muted p-8 text-center md:p-12">
        <h2 className="mb-4 text-3xl font-bold text-foreground">
          Pronto para fazer a diferença?
        </h2>
        <p className="mb-8 text-lg text-muted-foreground">
          Junte-se a nós e faça parte de uma comunidade que valoriza a diversidade
        </p>
        <Button size="lg" asChild>
          <Link to="/auth?signup=true">Comece Agora</Link>
        </Button>
      </section>
    </div>
  );
};

export default Home;
