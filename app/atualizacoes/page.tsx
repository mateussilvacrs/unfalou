"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";


type Update = {
  version: string;
  date: string;
  tag: "Nova" | "Melhoria" | "Correção";
  changes: React.ReactNode[];
};

const updates: Update[] = [
  {
    version: "1.0.0",
    date: "10/04/2026",
    tag: "Nova",
    changes: [
      <>
      <strong>Lançamento inicial do UnFalou</strong>
      </>,
      "Upload de arquivo ZIP exportado do Instagram",
      "Listagem de quem não te segue de volta",
      "Listagem de quem te segue de volta",
      "Listagem de quem você segue",
      "Listagem de todos os usuários",
      "Link direto para o perfil de cada usuário no Instagram",
      "Apoio via Pix com QR Code e link do PicPay",
      "Design responsivo para desktop, tablet e mobile",
      "Processamento 100% local no navegador, sem envio de dados para servidores",
      "Vídeo tutorial passo a passo para ajudar os usuários a exportar seus dados do Instagram e usar a ferramenta",
    ],
  },
];

const TAG_STYLES = {
  Nova: "bg-green-100 text-green-700",
  Melhoria: "bg-blue-100 text-blue-700",
  Correção: "bg-yellow-100 text-yellow-700",
};

export default function AtualizacoesPage() {
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const openRef = useRef<number | null>(null);

  function toggle(index: number) {
    const el = contentRefs.current[index];
    if (!el) return;

    const isOpen = el.style.maxHeight && el.style.maxHeight !== "0px";

    contentRefs.current.forEach((ref, i) => {
      if (ref) {
        ref.style.maxHeight = "0px";
        ref.style.opacity = "0";
        const chevron = document.getElementById(`chevron-${i}`);
        if (chevron) chevron.style.transform = "rotate(0deg)";
      }
    });

    if (!isOpen) {
      el.style.maxHeight = el.scrollHeight + "px";
      el.style.opacity = "1";
      const chevron = document.getElementById(`chevron-${index}`);
      if (chevron) chevron.style.transform = "rotate(180deg)";
      openRef.current = index;
    } else {
      openRef.current = null;
    }
  }

  return (
    <div className="flex flex-col gap-16 bg-gray-50 min-h-screen pb-20">

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto text-center px-4 pt-16"
      >
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
          Changelog
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Atualizações do UnFalou
        </h1>
        <p className="text-gray-500 mt-4 text-sm md:text-lg">
          Acompanhe tudo que foi melhorado, corrigido e adicionado em cada versão.
        </p>
      </motion.section>

      {/* ACCORDION */}
      <section className="max-w-3xl mx-auto w-full  px-4 flex flex-col gap-3">
        {updates.map((update, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="bg-white border rounded-2xl overflow-hidden shadow-sm"
          >
            {/* HEADER */}
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between px-6 hover:cursor-pointer  py-4 hover:bg-gray-50 transition-colors duration-200 text-left"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-extrabold text-gray-900 text-base">
                  v{update.version}
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TAG_STYLES[update.tag]}`}
                >
                  {update.tag}
                </span>
                <span className="text-xs text-gray-400">{update.date}</span>
              </div>
              <ChevronDown
                id={`chevron-${i}`}
                className="w-4 h-4 text-gray-400 shrink-0 ml-4 transition-transform duration-300"
              />
            </button>

            {/* CONTENT */}
            <div
              ref={(el) => { contentRefs.current[i] = el; }}
              style={{
                maxHeight: "0px",
                opacity: 0,
                overflow: "hidden",
                transition: "max-height 0.35s ease, opacity 0.3s ease",
              }}
            >
              <ul className="px-6 pb-5 flex flex-col gap-2">
                {update.changes.map((change, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </section>

    </div>
  );
}