import { AspectRatio } from "@/components/ui/aspect-ratio"

export function Tutorial() {
  return (
    <div className="flex flex-col items-center m-3 h-[60%] wpx-2">

      <h1 className="text-2xl font-bold m-5 text-center">
        Como usar o Unfalou
      </h1>

      <div className=" h-full w-[60%] bg-card rounded-xl shadow-lg p-1 border md:w-auto">


          <iframe
            className="w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/Uhp_6C7tQfY"
            title="Tutorial Unfalou"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />


      </div>

    </div>
  )
}