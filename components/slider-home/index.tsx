"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Button } from "../ui/button";

type Props = {
  onAnalyzeClick?: () => void;
};

export function CarouselPlugin({ onAnalyzeClick }: Props) {
  const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div className="w-full max-w-7xl mx-auto mt-2 p-4 md:p-0">
      <Carousel
        opts={{ loop: true }}
        plugins={[plugin.current]}
        onMouseLeave={() => plugin.current.reset()}
        setApi={(api) => {
          if (!api) return;
          setActiveIndex(api.selectedScrollSnap());
          api.on("select", () => setActiveIndex(api.selectedScrollSnap()));
        }}
      >
        <CarouselContent>

          {/* SLIDE 1 */}
          <CarouselItem>
            <CardContent className="p-0">
              <div className="relative aspect-video w-full rounded-xl overflow-hidden">
                <Image src="/home-slider.png" alt="home" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-linear-320 from-[#0050FC] via-[#D84C00] via-[#8d4c03] to-[#D84C00] opacity-80" />
                <div className="absolute inset-0 flex items-center justify-end">
                  <div className="flex flex-col w-[60%] md:w-[60%] items-center  p-3 md:px-10 text-white font-bold text-center gap-4 md:gap-8">
                    <h1 className="text-sm md:text-2xl lg:text-4xl">
                      Pare de seguir pessoas que não seguem você de volta!
                    </h1>
                    <h1 className="text-sm md:text-2xl lg:text-4xl">
                      Analise seus seguidores em segundos. Sem login e totalmente gratuito.
                    </h1>
                    <Button
                      onClick={onAnalyzeClick}
                      className="w-20 text-[12px] mt-4 md:mt-6 bg-[#353535] text-white px-6 py-2 md:px-10 md:py-3 md:h-10 md:w-60 rounded-xl hover:bg-black transition-all duration-500"
                    >
                      ANALISAR
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </CarouselItem>

          {/* SLIDE 2 */}
          <CarouselItem>
            <CardContent className="p-0">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                <Image src="/unfalou-vs-others.png" alt="slide-2" fill className="object-cover" priority unoptimized quality={100}/>
              </div>
            </CardContent>
          </CarouselItem>

        </CarouselContent>
      </Carousel>
    </div>
  );
}