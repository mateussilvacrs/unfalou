// components/Footer.tsx
"use client";

import { useState } from "react";
import { PixModal } from "@/components/Pix-Modal";

export default function Footer() {
  const [showPix, setShowPix] = useState(false);
  const [pixKey, setPixKey] = useState("");
  const [copied, setCopied] = useState(false);

  // ✅ Função para abrir o modal somente se a chave Pix for carregada
  const handlePixClick = async () => {
    try {
      const res = await fetch("/api/pix");
      const data = await res.json();

      if (!data.key) {
        alert("Não foi possível gerar a chave Pix. Tente novamente mais tarde.");
        return;
      }

      setPixKey(data.key);
      setShowPix(true); // abre modal apenas se a chave existir
    } catch (err) {
      alert("Não foi possível gerar a chave Pix. Verifique sua conexão e tente novamente.");
    }
  };

  const copyPix = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Não foi possível copiar a chave. Copie manualmente.");
    }
  };

  return (
    <footer className="bg-linear-to-r from-black to-[#010b97] text-white">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-sm font-semibold tracking-wide">UnFalou</span>

        <p className="text-xs text-white/60 text-center">
          Todos os direitos reservados &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://www.instagram.com/poros.tec"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white underline underline-offset-2 transition"
          >
            Poros.tec
          </a>
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePixClick}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg hover:cursor-pointer bg-white/10 hover:bg-white/20 transition"
          >
            💙 Apoiar
          </button>
        </div>
      </div>

      <PixModal
        open={showPix}
        onClose={() => setShowPix(false)}
        pixKey={pixKey}
        copied={copied}
        onCopy={copyPix}
      />
    </footer>
  );
}