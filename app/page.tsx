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
import { useState } from "react"
import DrawerMenu from "./components/DrawerMenu"

const NoiseWall = () => {
  type Texture = { id: number; weight: number; url: string }
  type Wall = { rows: number; cols: number; size: number }

  const nRows: number = 3
  const nCols: number = 5

  const textureList: Texture[] = [
    { id: 0, weight: 1, url: "Star" },
    { id: 1, weight: 1, url: "Ball" },
    { id: 2, weight: 1, url: "Cloud" },
  ]

  const wall: Wall = {
    rows: nRows,
    cols: nCols,
    size: nRows * nCols,
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

  const [images, setImages] = useState<File[]>([])
  const [bricks, setBricks] = useState<String[]>([])

  const createArray = () => {
    /* Math based on Weighted Division */

    const array: string[] = []

    const totalWeight = textureList.map((texture) => texture.weight).reduce((prev, curr) => prev + curr, 0)

    textureList.map((texture) => {
      const nTextures = Math.round(wall.size * (texture.weight / totalWeight))
      const fart: string[] = new Array(nTextures).fill(texture.url)
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
          <Button variant="outline" onClick={() => createArray()}>
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
      </main>
    </div>
  )
}

/* <Drawer>
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
                <DrawerMenu className="flex items-center" />
              </div>
            </div>
          </DrawerContent>
        </Drawer> */

export default NoiseWall
