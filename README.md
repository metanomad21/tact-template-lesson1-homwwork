# homework project

This project is homework of TON bootcamp, typescript + jest with [tact-emulator](https://github.com/tact-lang/tact-emulator), example how to do tests.

```bash
yarn test # To test contract
yarn build # To build contract
yarn deploy # To deploy contract
```
## Deployment

To deploy contract you should:

1) Specify `contract.tact` that will be used as entry point of your contract
2) Configure `contract.deploy.ts` according to your `contract.tact` to generate a deployment link. In particular, it is necessary to correctly call the Init() function from the contract.

If you renamed `contract.tact` to something else, you need to update `tact.config.json` correspondingly. For more information , see [Tact Documentation](https://docs.tact-lang.org/language/guides/config)
## Testing

Example of contract tests are in `contract.spec.ts`. For more information about testing, see [Tact Documentation](https://docs.tact-lang.org/language/guides/debug)

To add new test files to contract you should create `*.spec.ts` files similar to template's one and they would be automatically included in testing.

## Branch
`1.lesson1

`修改SampleTactContract合约,增加一个getter方法,重新部署,并调用此新方法
新增了getter函数：getOwner
调用脚本：sources/contract.read.ts

`修改SampleTactContract合约,增加一个消息处理方法,重新部署,并发送此新消息
新增了receive函数：decrement
调用脚本：sources/contract.write.ts
合约地址：kQBUWdjuAFMORI8nd4Nu9963AZLCef-Daesq_rv2FF81gcKe
调用decrement：https://testnet.tonviewer.com/transaction/92c68ece937275a2cc09d53d998c5c8a9fb51e1a9c5f7a979172992c450e2146

`2.lesson2

## Licence

MIT
