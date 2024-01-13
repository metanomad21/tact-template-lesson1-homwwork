import { Address, contractAddress, toNano } from "@ton/core";
import { TonClient4, WalletContractV4 } from "@ton/ton";
import { SampleTactContract } from "./output/sample_SampleTactContract";
import { mnemonicToPrivateKey } from "@ton/crypto";

const Sleep = (ms: number)=> {
    return new Promise(resolve=>setTimeout(resolve, ms))
}

(async () => {
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com", // 🔴 Test-net API endpoint
    });

    // open wallet v4 (notice the correct wallet version here)
    const mnemonic = (process.env.mnemonics_test || "").toString();
    const key = await mnemonicToPrivateKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });
    
    // open wallet and read the current seqno of the wallet
    const walletContract = client.open(wallet);
    const walletSender = walletContract.sender(key.secretKey);

    // open the contract address
    let contract_address = Address.parse("kQBUWdjuAFMORI8nd4Nu9963AZLCef-Daesq_rv2FF81gcKe");
    let contract = SampleTactContract.fromAddress(contract_address);
    let contract_open = client.open(contract);

    // send message to contract
    await contract_open.send(walletSender, { value: toNano("0.1") }, "increment");
    
    await Sleep(5000);
    console.log("After increment Counter Value: " + (await contract_open.getCounter()));

    // await contract_open.send(walletSender, { value: toNano("0.1") }, "decrement");
    
    // await Sleep(5000);
    // console.log("After decrement Counter Value: " + (await contract_open.getCounter()));
})();

