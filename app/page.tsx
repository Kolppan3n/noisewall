import { cn } from "@/lib/utils"

const NoiseWall = () => {
  type Texture = { url: string; weight: number }
  type Wall = { rows: number; cols: number; size: number }

  const nRows: number = 3
  const nCols: number = 20

  const textureArray: Texture[] = []

  const wall: Wall = {
    rows: nRows,
    cols: nCols,
    size: nRows * nCols,
  }

  return (
    <div className="grid justify-center p-20 h-screen overflow-scroll">
      <main className="flex flex-col">
        <div></div>
        <div key="TheWall" className={`grid grid-rows-${nRows} grid-cols-${nCols}`}></div>
      </main>
    </div>
  )
}

export default NoiseWall
