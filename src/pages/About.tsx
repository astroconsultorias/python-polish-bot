import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Award } from "lucide-react";
import missionImage from "@/assets/about-mission.jpg";

const About = () => {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-2xl shadow-xl">
        <div className="absolute inset-0">
          <img 
            src={missionImage} 
            alt="Missão e Visão Inclu@Tech" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-accent/95 to-accent/70" />
        </div>
        <div className="relative z-10 px-8 py-16 text-center md:px-16 md:py-20">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Sobre o Inclu@Tech
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/95 md:text-xl">
            Conectando talentos neurodivergentes e pessoas com deficiência a
            empresas inclusivas no Rio Grande do Sul
          </p>
        </div>
      </section>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <p className="text-lg text-muted-foreground">
            O <strong className="text-foreground">Inclu@Tech</strong> é uma
            plataforma dedicada a promover a inclusão profissional de pessoas
            neurodivergentes e com deficiência no mercado de trabalho gaúcho.
          </p>
          <p className="text-lg text-muted-foreground">
            Acreditamos que a diversidade não é apenas um valor ético, mas também
            um diferencial competitivo para as empresas. Através da nossa
            plataforma, facilitamos a conexão entre talentos qualificados e
            empresas comprometidas com práticas verdadeiramente inclusivas.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-8 md:grid-cols-3">
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Missão</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Promover a inclusão profissional através da conexão entre talentos
              diversos e empresas comprometidas com a acessibilidade e inclusão
              real.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-accent/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Eye className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Visão</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Ser a principal referência em inclusão profissional no Rio Grande
              do Sul, transformando o mercado de trabalho em um espaço mais
              diverso e acessível.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-success/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                <Award className="h-6 w-6 text-success" />
              </div>
              <CardTitle>Valores</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Inclusão genuína</li>
              <li>Respeito à diversidade</li>
              <li>Acessibilidade universal</li>
              <li>Igualdade de oportunidades</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="text-2xl">Nosso Compromisso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            No Inclu@Tech, estamos comprometidos em:
          </p>
          <ul className="space-y-3">
            {[
              "Garantir que todas as vagas publicadas sejam verdadeiramente inclusivas",
              "Oferecer suporte personalizado tanto para talentos quanto para empresas",
              "Promover educação sobre neurodiversidade e acessibilidade",
              "Criar uma comunidade de apoio mútuo e networking",
              "Monitorar e celebrar histórias de sucesso em inclusão",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10">
                  <div className="h-2 w-2 rounded-full bg-success" />
                </div>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
