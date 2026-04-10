import { Address, rpc, scValToNative, xdr } from '@stellar/stellar-sdk';
import { decodeEntryKey } from '../ledger_entry_helper.js';
/**
 * Ledger data for the Comet BLND/USDC LP
 */
export class BackstopToken {
    id;
    blnd;
    usdc;
    shares;
    blndPerLpToken;
    usdcPerLpToken;
    lpTokenPrice;
    constructor(
    /**
     * The address of the comet pool
     */
    id, 
    /**
     * The amount of BLND in the comet LP
     */
    blnd, 
    /**
     * The amount of USDC in the comet LP
     */
    usdc, 
    /**
     * The number of shares in the comet LP
     */
    shares, 
    /**
     * The amount of BLND per LP token
     */
    blndPerLpToken, 
    /**
     * The amount of USDC per LP token
     */
    usdcPerLpToken, 
    /**
     * The price of the LP token in USDC
     */
    lpTokenPrice) {
        this.id = id;
        this.blnd = blnd;
        this.usdc = usdc;
        this.shares = shares;
        this.blndPerLpToken = blndPerLpToken;
        this.usdcPerLpToken = usdcPerLpToken;
        this.lpTokenPrice = lpTokenPrice;
    }
    /**
     * Load the backstop token data from the ledger
     * @param network - The network information to load the backstop from
     * @param id - The contract address of the backstop
     * @returns - The backstop token object
     */
    static async load(network, id, blndTkn, usdcTkn) {
        const stellarRpc = new rpc.Server(network.rpc, network.opts);
        const recordDataKey = xdr.LedgerKey.contractData(new xdr.LedgerKeyContractData({
            contract: Address.fromString(id).toScAddress(),
            key: xdr.ScVal.scvVec([xdr.ScVal.scvSymbol('AllRecordData')]),
            durability: xdr.ContractDataDurability.persistent(),
        }));
        const totalSharesKey = xdr.LedgerKey.contractData(new xdr.LedgerKeyContractData({
            contract: Address.fromString(id).toScAddress(),
            key: xdr.ScVal.scvVec([xdr.ScVal.scvSymbol('TotalShares')]),
            durability: xdr.ContractDataDurability.persistent(),
        }));
        const ledgerEntriesResp = await stellarRpc.getLedgerEntries(recordDataKey, totalSharesKey);
        let blnd;
        let usdc;
        let totalShares;
        for (const entry of ledgerEntriesResp.entries) {
            const ledgerData = entry.val;
            const key = decodeEntryKey(ledgerData.contractData().key());
            switch (key) {
                case 'AllRecordData': {
                    const records = scValToNative(ledgerData.contractData().val());
                    if (records != undefined) {
                        blnd = records[blndTkn]?.balance;
                        usdc = records[usdcTkn]?.balance;
                    }
                    break;
                }
                case 'TotalShares':
                    totalShares = scValToNative(ledgerData.contractData().val());
                    break;
                default:
                    throw new Error(`Invalid backstop pool key: should not contain ${key}`);
            }
        }
        if (blnd === undefined || usdc === undefined || totalShares === undefined) {
            throw new Error('Invalid backstop token data');
        }
        const blndPerLpToken = Number(blnd) / Number(totalShares);
        const usdcPerLpToken = Number(usdc) / Number(totalShares);
        const lpTokenPrice = (Number(usdc) * 5) / Number(totalShares);
        return new BackstopToken(id, blnd, usdc, totalShares, blndPerLpToken, usdcPerLpToken, lpTokenPrice);
    }
}
