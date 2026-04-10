import { Address, xdr } from '@stellar/stellar-sdk';
export * from './emitter_config.js';
export * from './emitter_contract.js';
export * from './emitter_events.js';
export function EmitterDataKeyToXDR(emitterDataKey) {
    if (!emitterDataKey) {
        return xdr.ScVal.scvVoid();
    }
    const res = [];
    switch (emitterDataKey.tag) {
        case 'Dropped':
            res.push(((i) => xdr.ScVal.scvSymbol(i))('Dropped'));
            res.push(...((i) => [((i) => Address.fromString(i).toScVal())(i[0])])(emitterDataKey.values));
            break;
        case 'LastDistro':
            res.push(((i) => xdr.ScVal.scvSymbol(i))('LastDistro'));
            res.push(...((i) => [((i) => Address.fromString(i).toScVal())(i[0])])(emitterDataKey.values));
            break;
    }
    return xdr.ScVal.scvVec(res);
}
