
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  onAnalyzeClick?: () => void;
};

export default function ContainerHome({ onAnalyzeClick }: Props) {
  const router = useRouter();

  const cards = [
    {
      title: "Pare de seguir quem não te valoriza",
      description:
        "Identifique rapidamente quem não te segue de volta e limpe seu perfil com poucos cliques.",
      button: "Analisar seguidores",
      primary: true,
      gradient: "from-blue-500/10 via-transparent to-orange-500/10",
      action: onAnalyzeClick,
    },
    {
      title: "Aprenda em minutos",
      description:
        "Um passo a passo simples e direto para você começar agora sem complicação.",
      button: "Ver tutorial",
      primary: false,
      gradient: "from-purple-500/10 via-transparent to-pink-500/10",
      action: () => router.push("/como-usar"), // ✅ redireciona
    },
  ];

  return (
    <div className=" flex flex-col gap-16">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900">
          Controle total do seu Instagram
        </h1>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm md:text-lg">
          Descubra quem não te segue de volta, analise seus seguidores e organize
          seu perfil em segundos. Sem complicação.
        </p>
      </motion.div>

      {/* CARDS GRID */}
      <div className="grid gap-10 md:grid-cols-2 items-stretch">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="relative overflow-hidden rounded-3xl  w-s border bg-white p-8 shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 h-full"
          >
            <div
              className={`absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700 bg-linear-to-br ${card.gradient}`}
            />

            <div className="relative z-10 flex flex-col gap-6 items-center text-center h-full justify-between">
              <div className="flex flex-col gap-4 items-center">
                <h2 className="text-xl md:text-3xl font-bold text-gray-900">
                  {card.title}
                </h2>
                <p className="text-sm md:text-base text-gray-600 max-w-xs">
                  {card.description}
                </p>
              </div>

              <Button
                onClick={card.action} // ✅ agora funciona
                className={`mt-4 w-full md:w-auto px-6 h-12 rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg flex items-center justify-center gap-2 ${
                  card.primary
                    ? "bg-black text-white hover:bg-gray-900"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                {card.button} <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}