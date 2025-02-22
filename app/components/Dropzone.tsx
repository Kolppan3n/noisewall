import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"

const Dropzone = () => {
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className="flex flex-col justify-center items-center border-4 border-dashed rounded-3xl w-[150px] h-full p-2">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-zinc-800 font-medium text-center">Drop the files here ...</p>
        ) : (
          <p className="text-zinc-800 font-medium text-center">Drag 'n' drop images here, or click to select files</p>
        )}
      </div>
    </div>
  )
}

export default Dropzone
