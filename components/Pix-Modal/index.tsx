"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";

type Props = {
  open: boolean;
  onClose: () => void;
  pixKey: string;
  copied: boolean;
  onCopy: () => void;
};

export function PixModal({ open, onClose, pixKey, copied, onCopy }: Props) {
  const [qr, setQr] = useState("");
  const [picpayLink, setPicpayLink] = useState("");

  // 🔥 Gera QR Code automaticamente
  useEffect(() => {
    if (!open || !pixKey) return;

    QRCode.toDataURL(pixKey, {
      width: 512,
      margin: 4, // importante pro banco ler
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    })
      .then(setQr)
      .catch(() => setQr(""));
  }, [open, pixKey]);

  // 🔥 Busca link do PicPay via API route
  useEffect(() => {
    if (!open) return;

    fetch("/api/picpay")
      .then((res) => res.json())
      .then((data) => setPicpayLink(data.link ?? ""))
      .catch(() => setPicpayLink(""));
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm flex flex-col gap-5 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-900">Apoiar o UnFalou 💙</span>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 hover:cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* TEXTO */}
        <p className="text-sm text-gray-500">
          Se o UnFalou te ajudou, considere fazer uma doação via Pix ou PicPay.
        </p>

        {/* QR CODE */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-48 h-48 bg-white rounded-xl border p-3 flex items-center justify-center">
            {qr ? (
              <Image
                src={qr}
                alt="QR Code Pix"
                width={300}
                height={300}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-xs text-gray-400">Gerando QR...</span>
            )}
          </div>
          <span className="text-xs text-gray-400">
            Escaneie com o app do banco
          </span>
        </div>

        {/* PIX KEY */}
        <div className="flex flex-col gap-2">
          <span className="text-xs text-gray-500 font-medium">
            Ou copie a chave Pix:
          </span>

          <div className="flex items-center gap-2 bg-gray-50 border rounded-xl px-4 py-3">
            {pixKey ? (
              <span className="text-sm text-gray-700 flex-1 truncate">
                {pixKey}
              </span>
            ) : (
              <span className="text-sm text-gray-400 flex-1">Carregando...</span>
            )}

            <button
              onClick={onCopy}
              disabled={!pixKey}
              className="text-xs font-semibold text-white bg-black px-3 py-1.5 rounded-lg hover:bg-gray-800 hover:cursor-pointer transition disabled:opacity-40"
            >
              {copied ? "Copiado!" : "Copiar"}
            </button>
          </div>
        </div>

        {/* BOTÃO PICPAY */}
        <button
          onClick={() => picpayLink && window.open(picpayLink, "_blank")}
          disabled={!picpayLink}
          className="w-full py-2 border rounded-lg text-sm bg-green-600 text-white hover:bg-green-700 hover:cursor-pointer transition disabled:opacity-40"
        >
          Pagar via PicPay
        </button>

        {/* BOTÃO FECHAR */}
        <button
          onClick={onClose}
          className="w-full py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:cursor-pointer transition"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}