import { AspectRatio } from "@/components/ui/aspect-ratio"

export function Tutorial() {
  return (
    <div className="flex justify-center mt-5">
      <div className="w-[280px] sm:w-[320px]">
        <AspectRatio ratio={9 / 16}>
        <h1 className="text-center text-3xl">Tutorial</h1>
          <video
            controls
            preload="metadata"
            className="rounded-md"
          >
            <iframe src="https://youtu.be/Uhp_6C7tQfY"/>
            Your browser does not support the video tag.
          </video>
        </AspectRatio>
      </div>
    </div>
  )
}