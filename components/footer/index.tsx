"use client";

import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { PixModal } from "@/components/Pix-Modal";

export type FooterRef = {
  openPix: () => void;
};

const Footer = forwardRef<FooterRef>(function Footer(_, ref) {
  const [showPix, setShowPix] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pixKey, setPixKey] = useState("");

  // Busca a chave só quando o modal abre
useEffect(() => {
  if (!showPix) return;

  if (!pixKey) {
    fetch("/api/pix")
      .then((r) => r.json())
      .then((data) => setPixKey(data.key ?? ""))
      .catch(() => setPixKey(""));
  }
}, [showPix, pixKey]);
  useImperativeHandle(ref, () => ({
    openPix: () => setShowPix(true),
  }));

async function copyPix() {
  try {
    // tentativa moderna
    await navigator.clipboard.writeText(pixKey);
  } catch {
    // fallback para mobile antigo
    const textarea = document.createElement("textarea");
    textarea.value = pixKey;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      document.execCommand("copy");
    } catch (err) {
      alert("Não foi possível copiar. Copie manualmente.");
    }

    document.body.removeChild(textarea);
  }

  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
}

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
            onClick={() => setShowPix(true)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg hover:cursor-pointer bg-white/10 hover:bg-white/20 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14.5h-2v-5h2v5zm0-7h-2V7h2v2.5z"/>
            </svg>
            Apoiar
          </button>

          <a
            href="https://www.instagram.com/poros.tec"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584-.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.333.013 7.053.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.053.013 8.333 0 8.741 0 12c0 3.259.013 3.667.072 4.947.085 1.856.601 3.698 1.942 5.039 1.341 1.341 3.183 1.857 5.039 1.942C8.333 23.987 8.741 24 12 24s3.667-.013 4.947-.072c1.856-.085 3.698-.601 5.039-1.942 1.341-1.341 1.857-3.183 1.942-5.039.059-1.28.072-1.688.072-4.947 0-3.259-.013-3.667-.072-4.947-.085-1.856-.601-3.698-1.942-5.039C20.698.673 18.856.157 17 .072 15.667.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
            </svg>
            @poros.tec
          </a>
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
});

export default Footer;