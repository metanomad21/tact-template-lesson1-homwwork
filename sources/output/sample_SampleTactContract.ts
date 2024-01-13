import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type Add = {
    $$type: 'Add';
    amount: bigint;
}

export function storeAdd(src: Add) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2278832834, 32);
        b_0.storeUint(src.amount, 32);
    };
}

export function loadAdd(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2278832834) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadUintBig(32);
    return { $$type: 'Add' as const, amount: _amount };
}

function loadTupleAdd(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'Add' as const, amount: _amount };
}

function storeTupleAdd(source: Add) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserAdd(): DictionaryValue<Add> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeAdd(src)).endCell());
        },
        parse: (src) => {
            return loadAdd(src.loadRef().beginParse());
        }
    }
}

export type Sub = {
    $$type: 'Sub';
    amount1: bigint;
    amount2: bigint;
}

export function storeSub(src: Sub) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(163694598, 32);
        b_0.storeUint(src.amount1, 32);
        b_0.storeUint(src.amount2, 32);
    };
}

export function loadSub(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 163694598) { throw Error('Invalid prefix'); }
    let _amount1 = sc_0.loadUintBig(32);
    let _amount2 = sc_0.loadUintBig(32);
    return { $$type: 'Sub' as const, amount1: _amount1, amount2: _amount2 };
}

function loadTupleSub(source: TupleReader) {
    let _amount1 = source.readBigNumber();
    let _amount2 = source.readBigNumber();
    return { $$type: 'Sub' as const, amount1: _amount1, amount2: _amount2 };
}

function storeTupleSub(source: Sub) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount1);
    builder.writeNumber(source.amount2);
    return builder.build();
}

function dictValueParserSub(): DictionaryValue<Sub> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSub(src)).endCell());
        },
        parse: (src) => {
            return loadSub(src.loadRef().beginParse());
        }
    }
}

export type Mul = {
    $$type: 'Mul';
    amount1: bigint;
    amount2: bigint;
}

export function storeMul(src: Mul) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1610576521, 32);
        b_0.storeUint(src.amount1, 32);
        b_0.storeUint(src.amount2, 32);
    };
}

export function loadMul(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1610576521) { throw Error('Invalid prefix'); }
    let _amount1 = sc_0.loadUintBig(32);
    let _amount2 = sc_0.loadUintBig(32);
    return { $$type: 'Mul' as const, amount1: _amount1, amount2: _amount2 };
}

function loadTupleMul(source: TupleReader) {
    let _amount1 = source.readBigNumber();
    let _amount2 = source.readBigNumber();
    return { $$type: 'Mul' as const, amount1: _amount1, amount2: _amount2 };
}

function storeTupleMul(source: Mul) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount1);
    builder.writeNumber(source.amount2);
    return builder.build();
}

function dictValueParserMul(): DictionaryValue<Mul> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMul(src)).endCell());
        },
        parse: (src) => {
            return loadMul(src.loadRef().beginParse());
        }
    }
}

export type Div = {
    $$type: 'Div';
    amount1: bigint;
    amount2: bigint;
}

export function storeDiv(src: Div) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(271325691, 32);
        b_0.storeUint(src.amount1, 32);
        b_0.storeUint(src.amount2, 32);
    };
}

export function loadDiv(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 271325691) { throw Error('Invalid prefix'); }
    let _amount1 = sc_0.loadUintBig(32);
    let _amount2 = sc_0.loadUintBig(32);
    return { $$type: 'Div' as const, amount1: _amount1, amount2: _amount2 };
}

function loadTupleDiv(source: TupleReader) {
    let _amount1 = source.readBigNumber();
    let _amount2 = source.readBigNumber();
    return { $$type: 'Div' as const, amount1: _amount1, amount2: _amount2 };
}

function storeTupleDiv(source: Div) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount1);
    builder.writeNumber(source.amount2);
    return builder.build();
}

function dictValueParserDiv(): DictionaryValue<Div> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDiv(src)).endCell());
        },
        parse: (src) => {
            return loadDiv(src.loadRef().beginParse());
        }
    }
}

 type SampleTactContract_init_args = {
    $$type: 'SampleTactContract_init_args';
    owner: Address;
}

function initSampleTactContract_init_args(src: SampleTactContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function SampleTactContract_init(owner: Address) {
    const __code = Cell.fromBase64('te6ccgECJAEABHQAART/APSkE/S88sgLAQIBYgIDAtTQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxa2zzy4ILI+EMBzH8BygBZWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFssfye1UHwQCAVgYGQSk7aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEIfUOsK6jpUw0x8BghCH1DrCuvLggdMfATHbPH/gIIIQCcHIBrrjAiCCEF//com64wIgghAQLBn7uhAFBgcDQjDTHwGCEAnByAa68uCB0x/TH1lsEts8MIj4QgF/bds8fwgJFQNCMNMfAYIQX/9yibry4IHTH9MfWWwS2zwwiPhCAX9t2zx/CgsVBFiPoTDTHwGCEBAsGfu68uCB0x/TH1lsEts8MIj4QgF/bds8f+AgghCUapi2ugwNFQ4AAqEADgAAAABTdWIAAqgADgAAAABNdWwAEiDDAJKpBOBbcAAOAAAAAERpdgJkjqgw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4MAAkTDjDXAVDwS2+QEggvDE+NcjEu3971t77HgzvbsWLRURvXipEq7Q8mN69lVyrrqPjzBx2zyI+EIBf23bPH/bMeCC8IWRWxv1lD/ShTu2YDOKys+uOdH3NVSc75IiVamUWsw+uhARFRIAAqAAHgAAAABpbmNyZW1lbnRlZAMij45x2zyI+EIBf23bPH/bMeATFBUAMvhBbyQQI18DI4ERTQLHBfL0XLyRoZJbcOIAHgAAAABkZWNyZW1lbnRlZAE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwWAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7ABcAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwCASAaGwIBSCIjAgEgHB0Albd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4ECrgDcAzscpnLB1XI5LZYcE4TsunLVmnZbmdB0s2yjN0UkAIRs6J2zzbPGwhgHx4CEbKGNs82zxsIYB8gAAIhAcDtRNDUAfhj0gABjiX6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMfWWwS4Pgo1wsKgwm68uCJ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHR2zwhAAIgAAJwABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbWRpZU1SaU42NkhHSlJ0akZ4UWdRVkVmVThncVMzVlRLektrcVdVQml6MmVqgg');
    const __system = Cell.fromBase64('te6cckECJgEABH4AAQHAAQEFoebTAgEU/wD0pBP0vPLICwMCAWIPBAIBWAgFAgFIBwYAdbJu40NWlwZnM6Ly9RbWRpZU1SaU42NkhHSlJ0akZ4UWdRVkVmVThncVMzVlRLektrcVdVQml6MmVqggABGwr7tRNDSAAGACASAKCQCVt3owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwThOy6ctWadluZ0HSzbKM3RSQAgEgDQsCEbKGNs82zxsIYCQMAAIgAhGzonbPNs8bCGAkDgACIQLU0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8Wts88uCCyPhDAcx/AcoAWVkg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbLH8ntVCQQBKTtou37AZIwf+BwIddJwh+VMCDXCx/eIIIQh9Q6wrqOlTDTHwGCEIfUOsK68uCB0x8BMds8f+AgghAJwcgGuuMCIIIQX/9yibrjAiCCEBAsGfu6Ix0aEQRYj6Ew0x8BghAQLBn7uvLggdMf0x9ZbBLbPDCI+EIBf23bPH/gIIIQlGqYtroZGB4SAmSOqDDTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gwACRMOMNcB4TBLb5ASCC8MT41yMS7f3vW3vseDO9uxYtFRG9eKkSrtDyY3r2VXKuuo+PMHHbPIj4QgF/bds8f9sx4ILwhZFbG/WUP9KFO7ZgM4rKz6450fc1VJzvkiJVqZRazD66IxceFAMij45x2zyI+EIBf23bPH/bMeAWFR4AHgAAAABkZWNyZW1lbnRlZAAy+EFvJBAjXwMjgRFNAscF8vRcvJGhkltw4gAeAAAAAGluY3JlbWVudGVkAA4AAAAARGl2ABIgwwCSqQTgW3ADQjDTHwGCEF//com68uCB0x/TH1lsEts8MIj4QgF/bds8fxwbHgAOAAAAAE11bAACqANCMNMfAYIQCcHIBrry4IHTH9MfWWwS2zwwiPhCAX9t2zx/IiEeATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPB8ByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAIACYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAAOAAAAAFN1YgACoQACoAHA7UTQ1AH4Y9IAAY4l+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTH1lsEuD4KNcLCoMJuvLgifpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0ds8JQACcHvpiYs=');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initSampleTactContract_init_args({ $$type: 'SampleTactContract_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const SampleTactContract_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    4429: { message: `Invalid sender` },
}

const SampleTactContract_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Add","header":2278832834,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Sub","header":163694598,"fields":[{"name":"amount1","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"amount2","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Mul","header":1610576521,"fields":[{"name":"amount1","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"amount2","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Div","header":271325691,"fields":[{"name":"amount1","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"amount2","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
]

const SampleTactContract_getters: ABIGetter[] = [
    {"name":"counter","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getOwner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const SampleTactContract_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"Add"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Sub"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Mul"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Div"}},
    {"receiver":"internal","message":{"kind":"text","text":"increment"}},
    {"receiver":"internal","message":{"kind":"text","text":"decrement"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class SampleTactContract implements Contract {
    
    static async init(owner: Address) {
        return await SampleTactContract_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const init = await SampleTactContract_init(owner);
        const address = contractAddress(0, init);
        return new SampleTactContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new SampleTactContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  SampleTactContract_types,
        getters: SampleTactContract_getters,
        receivers: SampleTactContract_receivers,
        errors: SampleTactContract_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: Add | Sub | Mul | Div | 'increment' | 'decrement' | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Add') {
            body = beginCell().store(storeAdd(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Sub') {
            body = beginCell().store(storeSub(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Mul') {
            body = beginCell().store(storeMul(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Div') {
            body = beginCell().store(storeDiv(message)).endCell();
        }
        if (message === 'increment') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'decrement') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getCounter(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('counter', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getOwner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}