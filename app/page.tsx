"use client"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useCallback, useState } from "react"
import Image from "next/image"
import { useDropzone } from "react-dropzone"
import { Input } from "@/components/ui/input"

const NoiseWall = () => {
  type Tile = { weight: number; url: string }
  type Wall = { rows: number; cols: number; size: number; tiles: string[] }

  const [tiles, settiles] = useState<Tile[]>([])
  const [wall, setWall] = useState<Wall>({
    rows: 3,
    cols: 5,
    size: 3 * 5,
    tiles: [],
  })

  const onDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles?.length) {
      settiles((previoustiles) => [
        ...previoustiles,
        ...acceptedFiles.map((file: File) => ({ weight: 1, url: URL.createObjectURL(file) })),
      ])
    }
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleDelete = (id: number) => {
    settiles((tiles) => tiles.filter((tile, index) => index != id))
  }

  const handleIncrease = (id: number) => {
    settiles(
      tiles.map((tile: Tile, index: number) => (index == id ? { weight: tile.weight + 1, url: tile.url } : tile))
    )
  }

  const handleDecrease = (id: number) => {
    settiles(
      tiles.map((tile: Tile, index: number) =>
        index == id ? { weight: tile.weight > 1 ? tile.weight - 1 : 1, url: tile.url } : tile
      )
    )
  }

  const shuffleArray = <T,>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    console.log("! The Array has been shuffled !")
    return array
  }

  const createWall = () => {
    /* Math based on Weighted Division */

    if (tiles != undefined) {
      const totalWeight = tiles.map((tiles) => tiles.weight).reduce((prev, curr) => prev + curr, 0)

      const temp: string[] = []

      tiles.map((tile) => {
        const nTextures = Math.round(wall.size * (tile.weight / totalWeight))
        temp.push(...Array(nTextures).fill(tile.url))
      })

      shuffleArray(temp)
      setWall({ ...wall, tiles: temp })
      console.log(wall.tiles)
    }
  }

  return (
    <div className="grid justify-center p-20 h-screen overflow-scroll bg-slate-700">
      <main className="flex flex-col items-center">
        <div className="flex gap-10">
          <div className="flex items-center gap-2">
            <p>Number of rows:</p>
            <Input type="number" placeholder={`${wall.rows}`} className="w-20" />
          </div>
          <div className="flex items-center gap-2">
            <p>Number of columns:</p>
            <Input type="number" placeholder={`${wall.cols}`} className="w-20" />
          </div>
          <Button onClick={() => createWall()}>Generate</Button>
          <Drawer>
            <DrawerTrigger asChild>
              <Button>Choose Tiles</Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="flex flex-col mx-auto">
                <DrawerHeader>
                  <DrawerTitle>Tile Settings</DrawerTitle>
                  <DrawerDescription>
                    Upload images from your device to be used as tiles. Edit weight values to increase/decrease their
                    portion.
                  </DrawerDescription>
                </DrawerHeader>
                <ul className="flex flex-wrap gap-2 justify-center h-auto max-w-full">
                  {tiles.map((tile: Tile, id: number) => (
                    <li key={id} className="flex relative w-[120px] h-[120px] my-7">
                      <img className="border-4 rounded-xl object-fill" src={tile.url} alt="/lario.jpg" />
                      <div className="flex absolute -top-8 w-full rounded-xl justify-evenly border-2 px-1">
                        <Button variant="ghost" className="w-1/4 text-center h-6" onClick={() => handleDecrease(id)}>
                          -
                        </Button>
                        <div className="w-1/2 text-center">{tile.weight}</div>
                        <Button variant="ghost" className="w-1/4 text-center h-6" onClick={() => handleIncrease(id)}>
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
                  <li className="flex justify-center items-center border-4 text-sm border-dashed rounded-xl w-[120px] h-[120px] p-1 my-7">
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p className="text-primary font-medium text-center">Drop the files here ...</p>
                      ) : (
                        <p className="text-secondary-foreground font-medium text-center">
                          Click to browse or drag 'n' drop files here
                        </p>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        <div
          key="TheWall"
          className="grid bg-orange-300 m-10"
          style={{
            gridTemplateColumns: `repeat(${wall.cols}, 1fr)`,
            gridTemplateRows: `repeat(${wall.rows}, 1fr)`,
          }}
        >
          {wall.tiles.length > 0
            ? wall.tiles.map((tile, index) => (
                <img key={index} className="object-fill h-40 w-40" src={tile} alt="/lario.jpg" />
              ))
            : ""}
        </div>
      </main>
    </div>
  )
}

export default NoiseWall
