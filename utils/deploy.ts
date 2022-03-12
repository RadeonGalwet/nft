import Arweave from "arweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import {
  LoggerFactory,
  RedstoneGatewayInteractionsLoader,
  SmartWeaveNodeFactory,
} from "redstone-smartweave";
const CWD = process.cwd();
async function deploy(testNet: boolean) {
  LoggerFactory.INST.logLevel("debug");
  const contractSource = (await readFile(join(CWD, "dist/contract.js"))).toString("utf-8");
  const initalState = (await readFile(join(CWD, "state.json"))).toString("utf-8");
  const arweave = Arweave.init({
    host: testNet ? "testnet.redstone.tools" : "arweave.net",
    port: 443,
    protocol: "https",
  });
  const smartweave = SmartWeaveNodeFactory.memCachedBased(
    // @ts-ignore typings bug
    arweave,
  )
    .setInteractionsLoader(
      new RedstoneGatewayInteractionsLoader("https://gateway.redstone.finance")
    )
    .build();
  const wallet = JSON.parse((await readFile(join(CWD, "wallet/jwk.json"))).toString(
    "utf-8"
  )) as JWKInterface;
  const contractId = await smartweave.createContract.deploy({
    wallet,
    src: contractSource,
    initState: initalState,
  });
  console.log(`Successful deployment!\nContract identifier: ${contractId}`);
}
(async () => {
    const testNet = process.argv.includes("test-net");
    await deploy(testNet);
})();