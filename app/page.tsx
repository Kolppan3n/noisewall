import { cn } from "@/lib/utils"
import { it } from "node:test"

const NoiseWall = () => {
  type Texture = { id: number; weight: number; url: string }
  type Wall = { rows: number; cols: number; size: number }

  const nRows: number = 3
  const nCols: number = 5

  const textureList: Texture[] = [
    { id: 0, weight: 5, url: "Star" },
    { id: 1, weight: 10, url: "Ball" },
    { id: 2, weight: 22, url: "Cloud" },
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

  const createArray = (textureList: Texture[], wall: Wall) => {
    /*Suppose that the test scores are x1,x2,…,x10. Let t be the sum of the test scores;
  then the first person’s share of the total is x1 / t, the second’s is x2 / t, and so on.
  These ten fractions add up to 1, so just give person k (for k=1,2,…,10)
  10000 * xk / t dollars.*/

    const array: string[] = []

    const totalWeight = textureList.map((texture) => texture.weight).reduce((prev, curr) => prev + curr, 0)

    textureList.map((texture) => {
      const nTextures = Math.round(wall.size * (texture.weight / totalWeight))
      const fart: string[] = new Array(nTextures).fill(texture.url)
      array.push(...fart)
    })

    return array
  }

  const pirkko: string[] = createArray(textureList, wall)

  shuffleArray(pirkko)

  console.log(pirkko)

  return (
    <div className="grid justify-center p-20 h-screen overflow-scroll bg-slate-700">
      <main className="flex flex-col items-center bg-orange-500">
        <div>Odsiggo:3</div>

        <div key="TheWall" className="grid grid-rows-3 grid-cols-5 gap-2">
          {pirkko.map((item, id) => (
            <div key={id}>{item}</div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default NoiseWall
