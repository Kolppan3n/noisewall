"use client"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useCallback, useState } from "react"
import Image from "next/image"
import { useDropzone } from "react-dropzone"

const NoiseWall = () => {
  type Tile = { weight: number; url: string }
  type Wall = { rows: number; cols: number; size: number; tiles: Tile[] }

  const nRows: number = 3
  const nCols: number = 5

  const tileList: Tile[] = [
    { weight: 1, url: "Star" },
    { weight: 1, url: "Ball" },
    { weight: 1, url: "Cloud" },
  ]

  const [tiles, settiles] = useState<Tile[]>([])
  const [wall, setWall] = useState<Wall>({
    rows: nRows,
    cols: nCols,
    size: nRows * nCols,
    tiles: tileList,
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
        index == id ? { weight: tile.weight > 0 ? tile.weight - 1 : 0, url: tile.url } : tile
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

  const [bricks, setBricks] = useState<String[]>([])

  const createWall = () => {
    /* Math based on Weighted Division */

    const array: string[] = []

    const totalWeight = tileList.map((tileList) => tileList.weight).reduce((prev, curr) => prev + curr, 0)

    tileList.map((tileList) => {
      const nTextures = Math.round(wall.size * (tileList.weight / totalWeight))
      const fart: string[] = new Array(nTextures).fill(tileList.url)
      array.push(...fart)
    })

    shuffleArray(array)
    setBricks(array)
    console.log(bricks)
  }

  return (
    <div className="grid justify-center p-20 h-screen overflow-scroll bg-slate-700">
      <main className="flex flex-col items-center">
        <div key="Header" className="p-2 text-2xl bg-orange-500 mb-6">
          Odsiggo:3
        </div>
        <div className="flex flex-col items-center bg-orange-300 p-2 mb-6">
          <Button variant="outline" onClick={() => createWall()}>
            Create Array
          </Button>
          <div key="TheWall" className="grid grid-rows-3 grid-cols-5 gap-2 p-2 bg-orange-300">
            {bricks != undefined
              ? bricks.map((item, id) => (
                  <div key={id} className="w-20 h-20 bg-zinc-800">
                    {item}
                  </div>
                ))
              : ""}
          </div>
        </div>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Open Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="flex">
              <div className="grid justify-items-center bg-indigo-950">
                <DrawerHeader>
                  <DrawerTitle>Wall Settings</DrawerTitle>
                  <DrawerDescription>Edit the height and widts of the wall</DrawerDescription>
                </DrawerHeader>
              </div>
              <div className="grid justify-items-center bg-green-950 ">
                <DrawerHeader>
                  <DrawerTitle>Tile Settings</DrawerTitle>
                  <DrawerDescription>
                    Load tiles and choose their weight value. Higher weight increases their portion of whole.
                  </DrawerDescription>
                </DrawerHeader>
                <ul className="flex gap-2 items-center max-w-full h-auto py-8">
                  {tiles.map((tile: Tile, id: number) => (
                    <li key={id} className="flex relative w-[120px] h-[120px]">
                      <Image className="border-4 rounded-xl" width={120} height={120} src={tile.url} alt="/lario.jpg" />
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
                  <li className="flex justify-center items-center border-4 text-sm border-dashed rounded-xl w-[120px] h-[120px] p-1">
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p className="text-primary font-medium text-center">Drop the files here ...</p>
                      ) : (
                        <p className="text-secondary-foreground font-medium text-center">
                          Drop tiles here or browse files
                        </p>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </main>
    </div>
  )
}

export default NoiseWall
