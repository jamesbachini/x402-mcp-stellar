import { config as loadEnv } from "dotenv";
loadEnv({ path: new URL("./.env", import.meta.url).pathname });

import { wrapFetchWithPayment, x402Client, x402HTTPClient } from "@x402/fetch";
import { STELLAR_TESTNET_CAIP2 } from "./src/stellar/constants.js";
import { ExactStellarScheme } from "./src/stellar/exact/client/scheme.js";
import { createEd25519Signer } from "./src/stellar/signer.js";

async function main() {
  const signer = createEd25519Signer(process.env.STELLAR_SECRET_KEY!, STELLAR_TESTNET_CAIP2);
  console.error("signer address:", signer.address);
  const client = new x402Client().register("stellar:*", new ExactStellarScheme(signer));
  const httpClient = new x402HTTPClient(client);
  const fetchPay = wrapFetchWithPayment(fetch, httpClient);

  const url = "https://xlm402.com/testnet/weather/current?latitude=19.4326&longitude=-99.1332&timezone=auto";
  console.error("fetching", url);
  try {
    const res = await fetchPay(url);
    console.error("status", res.status);
    for (const [k, v] of res.headers) console.error("  header:", k, "=", v.slice(0, 200));
    const text = await res.text();
    console.error("body", text.slice(0, 1000));
    try {
      const receipt = httpClient.getPaymentSettleResponse(h => res.headers.get(h));
      console.error("receipt", JSON.stringify(receipt));
    } catch (e: any) {
      console.error("no receipt:", e?.message || e);
    }
  } catch (e: any) {
    console.error("ERROR:", e?.message || e);
    console.error(e?.stack || "");
  }
}

main();
