import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ImagePickerProps {
  className: string
}

export const ImagePicker = ({ className }: ImagePickerProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>("/lowpolyduck.jpg")

  const inputRef = useRef<HTMLInputElement>(null)

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = inputRef.current?.files
    if (files) {
      setPreviewUrl(URL.createObjectURL(files[0]))
      return () => URL.revokeObjectURL(previewUrl)
    }
  }

  return (
    <div className={className}>
      <input ref={inputRef} onChange={(e) => handleImagePreview(e)} />
      <Image width={100} height={100} src={previewUrl} alt="/lario.jpg" />
      <Button>Upload</Button>
    </div>
  )
}
