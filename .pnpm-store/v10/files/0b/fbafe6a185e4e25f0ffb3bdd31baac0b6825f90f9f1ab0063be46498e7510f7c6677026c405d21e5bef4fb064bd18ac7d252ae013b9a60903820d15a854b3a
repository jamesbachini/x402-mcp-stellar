"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulateAndParse = void 0;
const stellar_sdk_1 = require("@stellar/stellar-sdk");
async function simulateAndParse(network, operation, parser) {
    const stellarRpc = new stellar_sdk_1.rpc.Server(network.rpc, network.opts);
    const account = new stellar_sdk_1.Account('GDMVSPSKEUOTRFSJH2SXVUNB2JGORKDTWBMOP5OZJZP4GKRQUQWFJO4Y', '123');
    const txBuilder = new stellar_sdk_1.TransactionBuilder(account, {
        networkPassphrase: network.passphrase,
        fee: stellar_sdk_1.BASE_FEE,
        timebounds: { maxTime: stellar_sdk_1.TimeoutInfinite, minTime: 0 },
    }).addOperation(stellar_sdk_1.xdr.Operation.fromXDR(operation, 'base64'));
    const transaction = txBuilder.build();
    const simulation = await stellarRpc.simulateTransaction(transaction);
    if (stellar_sdk_1.rpc.Api.isSimulationSuccess(simulation) && simulation.result.retval) {
        return {
            result: parser(simulation.result.retval.toXDR('base64')),
            latestLedger: simulation.latestLedger,
        };
    }
}
exports.simulateAndParse = simulateAndParse;
