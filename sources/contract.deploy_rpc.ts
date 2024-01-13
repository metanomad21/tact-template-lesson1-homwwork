
import * as fs from "fs";
import * as path from "path";
import { Address, contractAddress, internal, toNano } from "@ton/core";
import { TonClient4, WalletContractV4 } from "@ton/ton";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { SampleTactContract } from "./output/sample_SampleTactContract";
import { prepareTactDeployment } from "@tact-lang/deployer";

(async () => {
    const client4 = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com", // 🔴 Test-net API endpoint
    });

    // open wallet v4 (notice the correct wallet version here)
    const mnemonic = (process.env.mnemonics_test || "").toString();
    const key = await mnemonicToPrivateKey(mnemonic.split(" "));
    const secretKey = key.secretKey;
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });
    
    // open wallet and read the current seqno of the wallet
    const walletContract = client4.open(wallet);
    const walletSender = walletContract.sender(secretKey);
    // Parameters
    let testnet = true;
    let packageName = "sample_SampleTactContract.pkg";
    let owner = wallet.address;
    let init = await SampleTactContract.init(owner);
    console.log("Owner address ... ", owner);

    // Load required data
    let callingContract = contractAddress(0, init);
    let data = init.data.toBoc();
    let pkg = fs.readFileSync(path.resolve(__dirname, "output", packageName));
    let deployAmount = toNano("0.1");
    let seqno: number = await walletContract.getSeqno();
    console.log("calling contract address ... ", callingContract)
    
    await walletContract.sendTransfer({
        seqno,
        secretKey,
        messages: [
            internal({
                to: callingContract,
                value: deployAmount,
                bounce: true,
                init: {
                    code: init.code,
                    data: init.data,
                },
            }),
        ],
    });
    
})();
