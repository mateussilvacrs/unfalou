
"use client"


import { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";




const videoUrl = "https://www.loom.com/embed/your-video-id"; // Substitua pelo URL do seu vídeo

const steps = [
  {
    number: "01",
    title: "Acesse o Instagram",
    description:
      'No app ou no site, vá em "Configurações" → pesquise por "Exportar suas Informações" → Clique em "Criar Exportação".',
  },
  {
    number: "02",
    title: "Solicite o export",
    description:
      'Selecione "Exportar para Dispositivo" → Em "Formato" escolha formato JSON → Em "Intervalo de Datas" selecione desde o inicio → clique em "Criar Arquivos".',
  },
  {
    number: "03",
    title: "Baixe o arquivo",
    description:
      "O Instagram vai te enviar um e-mail com o link para download. Pode demorar alguns minutos.",
  },
  {
    number: "04",
    title: "Envie aqui",
    description:
      'Com o arquivo .zip em mãos, volte para a página inicial, clique em "Analisar seguidores" e faça o upload.',
  },
];

const faqs = [
  {
    question: "Meus dados ficam salvos em algum servidor?",
    answer:
      "Não. Todo o processamento é feito direto no seu navegador. Nenhum dado é enviado para servidores externos.",
  },
  {
    question: "Quanto tempo leva para o Instagram enviar o arquivo?",
    answer:
      "Geralmente entre 1 e 30 minutos, dependendo do tamanho da conta. Você receberá um e-mail quando estiver pronto.",
  },

{
  question: "Arquivo grande detectado?",
  answer: (
    <>
      Em alguns celulares, o arquivo grande pode gerar travamentos. Se isso acontecer, faça o processo de exportar um arquivo menor.{" "}
      <Link href={videoUrl} target="_blank" className="text-blue-500 underline">
        Veja como
      </Link>
    </>
  ),
},
  {
    question: "O formato do arquivo precisa ser JSON?",
    answer:
      "Sim. Na hora de solicitar o export, selecione obrigatoriamente o formato JSON, não HTML.",
  },
  {
    question: "Funciona em contas privadas?",
    answer:
      "Sim. O arquivo exportado é gerado pelo próprio Instagram independente do tipo de conta.",
  },
  {
    question: "Posso usar no celular?",
    answer:
      "Sim, o site funciona no navegador do celular. Mas recomendamos usar no computador para facilitar o download e o upload do arquivo.",
  },
];

export default function TutorialPage() {
  const router = useRouter();
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);
  const openIndexRef = useRef<number | null>(null);

  function toggleFaq(index: number) {
    const current = faqRefs.current[index];
    if (!current) return;

    const isOpen = current.style.maxHeight && current.style.maxHeight !== "0px";

    // fecha todos
    faqRefs.current.forEach((el) => {
      if (el) el.style.maxHeight = "0px";
    });

    // abre o clicado se estava fechado
    if (!isOpen) {
      current.style.maxHeight = current.scrollHeight + "px";
      openIndexRef.current = index;
    } else {
      openIndexRef.current = null;
    }
  }

  return (
    <div className="flex flex-col gap-14 bg-gray-50 min-h-screen pb-12">

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto text-center  pt-6 px-4"
      >
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
          Tutorial
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Como usar em 4 passos simples
        </h1>
        <p className="text-gray-500 mt-4 text-sm md:text-lg">
          Assista ao vídeo ou siga o passo a passo abaixo. Em menos de 3 minutos
          você já saberá quem não te segue de volta.
        </p>
      </motion.section>

      {/* VÍDEO */}
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto w-full px-4"
      >
<div className="rounded-3xl p-5 overflow-hidden shadow-xl border bg-white flex justify-center">
  <video
    src="/unfalou.mp4"
    controls
    playsInline
    className="h-150 w-auto"
  />
</div>
      </motion.section>

      {/* PASSO A PASSO */}
      <section className="max-w-4xl mx-auto w-full px-4">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center"
        >
          Passo a passo
        </motion.h2>

        <div className="flex flex-col gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-6 items-start bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <span className="text-3xl font-extrabold text-gray-200 leading-none select-none min-w-12">
                {step.number}
              </span>
              <div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto w-full px-4">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center"
        >
          Perguntas frequentes
        </motion.h2>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white border rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleFaq(i)}
                className="w-full flex items-center justify-between px-6 py-4  hover:cursor-pointer text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="font-semibold text-sm md:text-base text-gray-900">
                  {faq.question}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 ml-4 transition-transform duration-300" />
              </button>

              <div
                ref={(el) => { faqRefs.current[i] = el; }}
                style={{ maxHeight: "0px", overflow: "hidden", transition: "max-height 0.35s ease" }}
              >
                <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center w-full px-4"
      >
        <div className="bg-white border rounded-3xl p-10 shadow-md flex flex-col items-center gap-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Pronto para começar?
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Agora que você já sabe como funciona, é só fazer o upload do seu
            arquivo e ver os resultados.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="bg-black text-white px-8 h-12 rounded-xl hover:bg-gray-900 transition flex items-center gap-2 shadow-sm hover:shadow-lg"
          >
            Analisar meu Instagram <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </motion.section>

    </div>
  );
}