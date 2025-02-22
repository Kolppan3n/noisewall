import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface PreviewItemProps {
  url: string
}

export const PreviewItem = ({ url }: PreviewItemProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>("/lowpolyduck.jpg")

  useEffect(() => {
    setPreviewUrl(url)
  }, [url])

  return (
    <div className="flex flex-col items-center bg-green-300 gap-1">
      <div className="flex w-full rounded-xl justify-evenly border-2 px-1">
        <div className="w-1/4 text-center">-</div>
        <div className="w-1/2 text-center">5</div>
        <div className="w-1/4 text-center">+</div>
      </div>
      <Image className="border-4 rounded-xl" width={120} height={120} src={previewUrl} alt="/lario.jpg" />
      <Button className="rounded-full size-5">x</Button>
    </div>
  )
}
