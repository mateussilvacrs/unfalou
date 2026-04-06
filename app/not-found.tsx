import SplitText from "@/components/ui/SplitText";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  text-center px-4">

      {/* VIDEO */}
      <div className="w-full max-w-md mb-8">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto mix-blend-multiply"
        >
          <source src="/error-404.webm" type="video/webm" />
        </video>
      </div>

      {/* TEXTO */}
      <SplitText
        text="Erro 404 — página não encontrada!"
        delay={80}
        duration={0.8}
        ease="power3.out"
        splitType="chars"
        textAlign="center"
        className="text-3xl md:text-4xl font-bold text-gray-900"
      />

      {/* SUBTEXTO */}
      <p className="mt-4 text-gray-500 max-w-md">
        Parece que você tentou acessar uma página que não existe ou foi removida.
      </p>

      {/* BOTÃO */}
      <Link
        href="/"
        className="mt-6 inline-block bg-black text-white px-6 py-3 rounded-xl hover:scale-105 transition"
      >
        Voltar para o início
      </Link>

    </div>
  );
}