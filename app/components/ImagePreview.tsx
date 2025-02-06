import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ImagePickerProps {
  image: File
  className: string
}

export const ImagePicker = ({ image, className }: ImagePickerProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>("/lowpolyduck.jpg")

  useEffect(() => {
    console.log("useEffect")
    updatePreview()
  }, [previewUrl])

  const inputRef = useRef<HTMLInputElement>(null)

  const updatePreview = () => {
    if (image != undefined) {
      console.log("useEffect Inside IF-clause")
      setPreviewUrl(URL.createObjectURL(image))
      return () => URL.revokeObjectURL(previewUrl)
    }
  }

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("theChangeHappened")
    const files = inputRef.current?.files
    if (files) {
      //setPreviewUrl(files[0])
      console.log(previewUrl)
    }
  }

  return (
    <div className={className}>
      <Image width={100} height={100} src={previewUrl} alt="/lario.jpg" />
    </div>
  )
}
