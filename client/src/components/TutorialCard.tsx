import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp } from "lucide-react";

interface TutorialCardProps {
  title: string;
  brand: string;
  readTime: string;
  difficulty: "Fácil" | "Médio" | "Avançado";
  href: string;
  isPopular?: boolean;
}

export default function TutorialCard({
  title,
  brand,
  readTime,
  difficulty,
  href,
  isPopular = false,
}: TutorialCardProps) {
  const difficultyColor = {
    Fácil: "bg-green-500/10 text-green-700 dark:text-green-400",
    Médio: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    Avançado: "bg-red-500/10 text-red-700 dark:text-red-400",
  };

  return (
    <Link href={href}>
      <Card className="hover-elevate active-elevate-2 transition-all duration-200 cursor-pointer h-full" data-testid={`card-tutorial-${href}`}>
        <CardHeader>
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge variant="secondary" data-testid="badge-brand">{brand}</Badge>
            {isPopular && (
              <Badge className="bg-primary/10 text-primary" data-testid="badge-popular">
                <TrendingUp className="w-3 h-3 mr-1" />
                Popular
              </Badge>
            )}
          </div>
          <CardTitle className="text-lg line-clamp-2" data-testid="text-tutorial-title">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span data-testid="text-read-time">{readTime}</span>
            </div>
            <Badge className={difficultyColor[difficulty]} data-testid="badge-difficulty">
              {difficulty}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
