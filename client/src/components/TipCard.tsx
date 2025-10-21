import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface TipCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

export default function TipCard({ icon: Icon, title, description, href }: TipCardProps) {
  return (
    <Card className="hover-elevate transition-all duration-200" data-testid={`card-tip-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader>
        <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-3">{description}</p>
        <Link href={href}>
          <Button variant="outline" data-testid={`button-read-more-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            Ler Mais
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
