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
import TextType from "../TextType";

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
        delay: 10000,
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
<div className="relative aspect-video w-full rounded-xl overflow-hidden">

  {/* GIF só na metade esquerda */}
  <div className="absolute md:mt-5 inset-y-0 left-0 md:w-[50%] w-[45%] h-full z-310">
    <Image
      src="/foguete-2.gif"
      alt="home"
      fill
      className=" object-cover z-100 "
      priority
      unoptimized
    />
  </div>

  {/* Overlay */}
  <div className="absolute inset-0 bg-linear-to-br from-[#010b97] via-[#000000] to-[#1a0050] opacity-90 z-10" />

  {/* Conteúdo */}
  <div className="absolute inset-0 flex items-center justify-end z-20">
    <div className="flex flex-col  w-[70%]  md:w-[60%] items-center p-3 md:px-10 text-white font-bold text-center gap-2 md:gap-8">
      <span className="text-xs md:text-xs font-semibold tracking-widest md:uppercase bg-green-500 text-black px-3 py-1 rounded-full">
        Novidades
      </span>
      <h1 className="text-xs md:text-2xl lg:text-4xl">
        Veja as últimas atualizações do UnFalou e o que vem por aí!
      </h1>
      <p className="text-xs md:text-2xl text-white/70 font-normal">
        Estamos sempre trabalhando para melhorar o UnFalou. Clicando no botão abaixo, você fica por dentro das últimas atualizações.
      </p>
      <Button
        onClick={() => router.push("/atualizacoes")}
        className="text-xs mt-2 md:mt-6 bg-[#353535] text-white px-6 py-2 md:px-10 md:py-3 h-8 md:h-10 md:w-60 rounded-xl hover:bg-black transition-all duration-500"
      >
        ATUALIZAÇÕES
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
                  <div className="flex flex-col w-full items-center p-3 md:px-10 text-white font-bold text-center gap-4 md:gap-8">
                    <span className="text-[10px] md:text-xs font-semibold tracking-widest uppercase bg-white/10 px-3 py-1 rounded-full">
                      Apoie o projeto
                    </span>





<TextType className="w-[80%] text-xs md:text-3xl"
  text={["A Unfalou é um projeto totalmente gratuíto e independente","Mas você pode ajudar a manter o site no ar fazendo uma doação via Pix. Qualquer valor é super bem-vindo e ajuda muito!"]}
  typingSpeed={50}
  deletingSpeed={40}
  pauseDuration={1500}
  showCursor={true}
  cursorCharacter="_"
/>

                    <Button
                      onClick={() => onPixClick?.()}
                      className="w-24 text-[12px] md:mt-6 bg-[#353535] text-white px-6 py-2 md:px-10 md:py-3 md:h-10 md:w-60 rounded-xl hover:bg-black transition-all duration-500"
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
