import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface DrawerMenuProps {
  className: string
}

const DrawerMenu = ({ className }: DrawerMenuProps) => {
  const [images, setImages] = useState<string[]>([])

  const onDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles?.length) {
      setImages((previousImages) => [
        ...previousImages,
        ...acceptedFiles.map((file: File) => URL.createObjectURL(file)),
      ])
    }
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleDelete = (id: number) => {
    setImages((images) => images.filter((image, index) => index != id))
  }

  return (
    <div className={className}>
      <ul className="flex gap-2 items-center max-w-full h-auto py-8">
        {images.map((image: string, id: number) => (
          <li key={id} className="flex relative w-[120px] h-[120px]">
            <Image className="border-4 rounded-xl" width={120} height={120} src={image} alt="/lario.jpg" />
            <div className="flex absolute -top-8 w-full rounded-xl justify-evenly border-2 px-1">
              <Button variant="ghost" className="w-1/4 text-center h-6">
                -
              </Button>
              <div className="w-1/2 text-center">5</div>
              <Button variant="ghost" className="w-1/4 text-center h-6">
                +
              </Button>
            </div>
            <Button
              variant="destructive"
              className="absolute -bottom-7 left-0 right-0 m-auto rounded-full size-6 -px-1"
              onClick={() => handleDelete(id)}
            >
              X
            </Button>
          </li>
        ))}
        <li className="flex justify-center items-center border-4 text-sm border-dashed rounded-xl w-[120px] h-[120px] p-1">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-primary font-medium text-center">Drop the files here ...</p>
            ) : (
              <p className="text-secondary-foreground font-medium text-center">Drop images here or browse files</p>
            )}
          </div>
        </li>
      </ul>
    </div>
  )
}

export default DrawerMenu
