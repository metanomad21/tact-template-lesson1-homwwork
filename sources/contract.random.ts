import { Address, contractAddress, toNano } from "@ton/core";
import { TonClient4, WalletContractV4 } from "@ton/ton";
import { SampleTactContract, Add, Sub, Mul, Div } from "./output/sample_SampleTactContract";
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
    let contract_address = Address.parse("kQCYTUUHFSRZefVJZy_Ey5lX6qqekO-Y1Ef8XXzevt1iVopm");
    let contract = SampleTactContract.fromAddress(contract_address);
    let contract_open = client.open(contract);

    const a:bigint = BigInt(Math.floor(Math.random() * 100)); // 随机生成 0 到 100 之间的数
    const b:bigint = BigInt(Math.floor(Math.random() * 100)); // 随机生成 0 到 100 之间的数

    let msg = randomOperation(a, b)

    console.log(`A:${a} B:${b} ... msg:`, msg)
    await contract_open.send(walletSender, { value: toNano("0.03") }, msg);

})();

function randomOperation(a: bigint, b: bigint): any {
    //
    const operations = [
        "Add",
        "Sub",
        "Mul",
        "Div"
    ];
    const randomOp = operations[Math.floor(Math.random() * operations.length)];
    return {
        $$type: randomOp,
        amount1: a,
        amount2: b
    };
}


