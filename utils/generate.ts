import { fstat } from "fs";
import { writeFile } from "fs/promises";
import { Asset } from "../src/entities/assets";
const OWNER = "SolxzZGy3OgjrZ0NrFQX_A7maUoES4BvWEIuUlu_rBU";
function generatePixelCombinations(): [boolean, boolean, boolean][] {
  const result: [boolean, boolean, boolean][] = [];
  for (let i = 0; i < 1 << 3; i++) {
    const boolArr = [];

    for (let j = 3 - 1; j >= 0; j--) {
      boolArr.push(Boolean(i & (1 << j)));
    }

    result.push(boolArr as [boolean, boolean, boolean]);
  }
  return result;
}

// Generates inital state file
async function main() {
  const assets: Map<string, Asset> = new Map();
  const combinations = generatePixelCombinations();
  for(const i of combinations) {
      for(const j of combinations) {
          for(const k of combinations) {
              assets.set((Date.now() + Math.random()).toString(16), {
                owner: OWNER,
                data: [i, j, k]
              })
          }
      }
  }
  const state = {
      name: "3x3 NFT",
      assets: Object.fromEntries(assets.entries())
  };
  await writeFile("./state.json", JSON.stringify(state));
}
(async () => await main())();
