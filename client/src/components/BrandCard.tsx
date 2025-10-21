import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BrandCardProps {
  name: string;
  slug: string;
  tutorialCount: number;
}

export default function BrandCard({ name, slug, tutorialCount }: BrandCardProps) {
  return (
    <Link href={`/marca/${slug}`}>
      <Card className="hover-elevate active-elevate-2 transition-all duration-200 cursor-pointer" data-testid={`card-brand-${slug}`}>
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-primary">{name.slice(0, 2)}</span>
          </div>
          <h3 className="font-semibold text-lg mb-2" data-testid={`text-brand-name-${slug}`}>{name}</h3>
          <Badge variant="secondary" data-testid={`badge-tutorial-count-${slug}`}>
            {tutorialCount} {tutorialCount === 1 ? 'tutorial' : 'tutoriais'}
          </Badge>
        </CardContent>
      </Card>
    </Link>
  );
}
