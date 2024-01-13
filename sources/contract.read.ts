import * as fs from "fs";
import * as path from "path";
import { Address, contractAddress } from "@ton/core";
import { TonClient4 } from "@ton/ton";
import { SampleTactContract } from "./output/sample_SampleTactContract";
import { prepareTactDeployment } from "@tact-lang/deployer";

(async () => {
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com", // 🔴 Test-net API endpoint
    });

    // Parameters
    let contarctAddr = Address.parse("kQCYTUUHFSRZefVJZy_Ey5lX6qqekO-Y1Ef8XXzevt1iVopm");
    let client_open = client.open(SampleTactContract.fromAddress(contarctAddr));

    // Prepareing
    console.log("Reading Contract Info...");
    console.log(contarctAddr);

    // Input the contract address
    console.log("Counter Value: " + (await client_open.getCounter()));
    console.log("Owber Value: " + (await client_open.getGetOwner()).toString());
})();
