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
import { useRouter } from "next/navigation";

type Props = {
  onAnalyzeClick?: () => void;
  onPixClick?: () => void;
};

export function CarouselPlugin({ onAnalyzeClick, onPixClick }: Props) {
  const router = useRouter();

  // ✅ Autoplay estável
  const plugin = React.useMemo(
    () =>
      Autoplay({
        delay: 5000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    [],
  );

  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div className="w-full max-w-7xl mx-auto mt-2 p-4 ">
      <Carousel
        opts={{ loop: true }}
        plugins={[plugin]}
        onPointerLeave={() => plugin.reset()}
        onPointerDown={() => plugin.stop()}
        setApi={(api) => {
          if (!api) return;

          const update = () => setActiveIndex(api.selectedScrollSnap());

          update();
          api.on("select", update);
        }}
      >
        <CarouselContent>
          {/* SLIDE 1 */}
          <CarouselItem>
            <CardContent className="p-0">
              <div className="relative aspect-video w-full rounded-xl overflow-hidden">
                <Image
                  src="/home-slider.png"
                  alt="home"
                  fill
                  className="object-cover"
                  priority
                />

                <div className="absolute inset-0 bg-linear-320 from-[#0050FC] via-[#D84C00] via-[#8d4c03] to-[#D84C00] opacity-80" />

                <div className="absolute inset-0 flex items-center justify-end">
                  <div className="flex flex-col w-[60%] items-center p-3 md:px-10 text-white font-bold text-center gap-4 md:gap-8">
                    <h1 className="text-sm md:text-2xl lg:text-4xl">
                      Pare de seguir pessoas que não seguem você de volta!
                    </h1>
                    <h1 className="text-sm md:text-2xl lg:text-4xl">
                      Analise seus seguidores em segundos. Sem login e
                      totalmente gratuito.
                    </h1>

                    <Button
                      onClick={() => onAnalyzeClick?.()}
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
                <Image
                  src="/unfalou-vs-others.png"
                  alt="slide-2"
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                  quality={100}
                />
              </div>
            </CardContent>
          </CarouselItem>

          {/* SLIDE 3 */}
          <CarouselItem>
            <CardContent className="p-0">
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gray-900">
                <div className="absolute inset-0 bg-linear-to-br from-[#010b97] via-[#000000] to-[#1a0050] opacity-90" />

                <div className="absolute inset-0 flex items-center justify-end">
                  <div className="flex flex-col w-[60%] items-center p-3 md:px-10 text-white font-bold text-center gap-4 md:gap-8">
                    <span className="text-[10px] md:text-xs font-semibold tracking-widest uppercase bg-white/10 px-3 py-1 rounded-full">
                      Novidades
                    </span>

                    <h1 className="text-sm md:text-2xl lg:text-4xl">
                      Confira as últimas atualizações do UnFalou!
                    </h1>

                    <p className="text-[10px] md:text-sm text-white/70 font-normal">
                      Melhorias, correções e novos recursos a cada versão.
                    </p>

                    <Button
                      onClick={() => router.push("/atualizacoes")}
                      className="w-20 text-[12px] mt-4 md:mt-6 bg-[#353535] text-white px-6 py-2 md:px-10 md:py-3 md:h-10 md:w-60 rounded-xl hover:bg-black transition-all duration-500"
                    >
                      VER ATUALIZAÇÕES
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </CarouselItem>

          {/* SLIDE 4 */}
          <CarouselItem>
            <CardContent className="p-0">
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gray-900">
                <div className="absolute inset-0 bg-linear-to-br from-[#004d00] via-[#000000] to-[#004d40] opacity-90" />

                <div className="absolute inset-0 flex items-center justify-end">
                  <div className="flex flex-col w-[60%] items-center p-3 md:px-10 text-white font-bold text-center gap-4 md:gap-8">
                    <span className="text-[10px] md:text-xs font-semibold tracking-widest uppercase bg-white/10 px-3 py-1 rounded-full">
                      Apoie o projeto
                    </span>

                    <h1 className="text-sm md:text-2xl lg:text-4xl">
                      O UnFalou é gratuito e feito com muito carinho 💙
                    </h1>

                    <p className="text-[10px] md:text-sm text-white/70 font-normal">
                      Se te ajudou, considere fazer uma doação via Pix para
                      manter o projeto vivo.
                    </p>

                    <Button
                      onClick={() => onPixClick?.()}
                      className="w-20 text-[12px] mt-4 md:mt-6 bg-[#353535] text-white px-6 py-2 md:px-10 md:py-3 md:h-10 md:w-60 rounded-xl hover:bg-black transition-all duration-500"
                    >
                      APOIAR 💙
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      {/* 🔥 Indicadores (bolinhas) */}
      <div className="flex justify-center mt-4 gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition-all ${
              activeIndex === i ? "bg-black w-4" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
