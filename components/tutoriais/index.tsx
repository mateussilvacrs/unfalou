export function Tutorial() {
  return (
    <div className="flex flex-col items-center gap-3 px-4 pt-6 pb-2 w-full max-w-sm mx-auto">
      <h1 className="text-xl font-bold text-center leading-tight">
        Descubra quem não te segue de volta
      </h1>
      <p className="text-sm text-muted-foreground text-center">
        Faça upload do seu arquivo do Instagram e veja tudo em segundos.
      </p>
      <div className="w-full rounded-xl shadow-md border overflow-hidden">
        <video autoPlay controls preload="auto" className="w-full h-auto">
          <source src="/unfalou.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}