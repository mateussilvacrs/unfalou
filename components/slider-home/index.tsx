"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true }),
  );

  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Container com proporção responsiva */}
      <div className="aspect-[video] w-full">
        <Carousel
          className="h-full"
          opts={{ loop: true }}
          plugins={[plugin.current]}
          onMouseEnter={() => plugin.current.stop()}
          onMouseLeave={() => plugin.current.reset()}
          setApi={(api) => {
            if (!api) return;

            setActiveIndex(api.selectedScrollSnap());

            api.on("select", () => {
              setActiveIndex(api.selectedScrollSnap());
            });
          }}
        >
          <CarouselContent className="h-full">
            {/* Slide 1 */}
            <CarouselItem className="h-full">
              <CardContent className="p-0 h-full">
                <div className="relative aspect-video flex h-full items-center rounded-xl overflow-hidden">
                  {/* imagem de fundo */}
                  <Image
                    src="/home-slider.png"
                    alt="home"
                    fill
                    className="object-cover z-50"
                    priority
                    unoptimized
                    quality={100}
                  />

                  {/* overlay gradient */}
                  <div className="absolute inset-0 bg-linear-320 from-[#0050FC] via-[#D84C00] via-[#8d4c03] to-[#D84C00] z-10" />

                  {/* conteúdo */}
                  <div className="relative flex flex-col w-[55%] md:w-[50%] p-2 text-[12px]  ml-auto gap-4 md:ml-auto z-50 md:px-10 text-white font-bold text-center justify-center md:gap-10 lg:w-2xl md:h-full">
                    <div>
                      <h1 className="md:text-2xl lg:text-4xl">
                        Pare de seguir pessoas que não seguem você de volta!
                      </h1>
                    </div>

                    <div>
                      <h1 className="md:text-2xl lg:text-4xl">
                        Analise seus seguidores em segundos. Sem login e
                        totalmente gratuito.
                      </h1>
                    </div>
                    <div className="md:mt-6">
                      <Button className="transition-all duration-700 hover:bg-[#000000] text-[12px] md:w-50 md:text-xl md:h-10 lg:w-80 lg:h-15 lg:text-2xl bg-[#353535] cursor-pointer">
                        ANALISAR
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </CarouselItem>

            {/* Slide 2 */}
            <CarouselItem className="h-full">
              <CardContent className="p-0 h-full">
                <div className="relative h-full overflow-hidden rounded-xl">
                  <Image
                    src="/unfalou-vs-others.png"
                    alt="slide-1"
                    width={1980}
                    height={1280}
                    className="object-cover"
                    priority
                    unoptimized
                    quality={100}
                  />
                </div>
              </CardContent>
            </CarouselItem>

          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
