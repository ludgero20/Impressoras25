import { useCallback, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import useEmblaCarousel from "embla-carousel-react";
import BrandCard from "@/components/BrandCard";
import type { Brand } from "@shared/schema";

interface BrandCarouselProps {
  brands: Brand[];
  onCanScrollChange?: (canScroll: boolean) => void;
}

export interface BrandCarouselRef {
  scrollPrev: () => void;
  scrollNext: () => void;
  canScroll: boolean;
}

const BrandCarousel = forwardRef<BrandCarouselRef, BrandCarouselProps>(
  ({ brands, onCanScrollChange }, ref) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    });

    const [scrollProgress, setScrollProgress] = useState(0);
    const [canScroll, setCanScroll] = useState(false);

    const onScroll = useCallback(() => {
      if (!emblaApi) return;

      const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
      setScrollProgress(progress * 100);
    }, [emblaApi]);

    const updateCanScroll = useCallback(() => {
      if (!emblaApi) return;

      const canScrollNext = emblaApi.canScrollNext();
      const canScrollPrev = emblaApi.canScrollPrev();
      const newCanScroll = canScrollNext || canScrollPrev;
      
      setCanScroll(newCanScroll);
      onCanScrollChange?.(newCanScroll);
    }, [emblaApi, onCanScrollChange]);

    useEffect(() => {
      if (!emblaApi) return;

      onScroll();
      updateCanScroll();

      emblaApi.on("scroll", onScroll);
      emblaApi.on("reInit", () => {
        onScroll();
        updateCanScroll();
      });
      emblaApi.on("select", updateCanScroll);

      return () => {
        emblaApi.off("scroll", onScroll);
        emblaApi.off("reInit", onScroll);
        emblaApi.off("select", updateCanScroll);
      };
    }, [emblaApi, onScroll, updateCanScroll]);

    const scrollPrev = useCallback(() => {
      if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    useImperativeHandle(ref, () => ({
      scrollPrev,
      scrollNext,
      canScroll,
    }), [scrollPrev, scrollNext, canScroll]);

    if (brands.length === 0) {
      return null;
    }

    return (
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="flex-none w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.667rem)] md:w-[calc(25%-0.75rem)] lg:w-[calc(20%-0.8rem)] xl:w-[calc(16.666%-0.833rem)]"
              >
                <BrandCard {...brand} />
              </div>
            ))}
          </div>
        </div>

        {canScroll && (
          <div className="mt-6 h-1 w-full bg-border/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary/60 rounded-full transition-all duration-300"
              style={{ width: `${scrollProgress}%` }}
              data-testid="carousel-scrollbar"
            />
          </div>
        )}
      </div>
    );
  }
);

BrandCarousel.displayName = "BrandCarousel";

export default BrandCarousel;
