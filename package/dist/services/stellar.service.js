import { Horizon, Keypair, TransactionBuilder } from '@stellar/stellar-sdk';
const stellarConfig = {
    testnet: {
        horizonUrl: 'https://horizon-testnet.stellar.org',
        networkPassphrase: 'Test SDF Network ; September 2015',
    },
    mainnet: {
        horizonUrl: 'https://horizon.stellar.org',
        networkPassphrase: 'Public Global Stellar Network ; September 2015',
    },
};
export class StellarService {
    constructor() {
        this.currentNetwork = 'testnet';
        this.horizonServer = new Horizon.Server(stellarConfig.testnet.horizonUrl);
        this.networkPassphrase = stellarConfig.testnet.networkPassphrase;
    }
    initialize() {
        console.log(`Connected to Stellar ${this.currentNetwork} network`);
    }
    switchNetwork(network) {
        this.currentNetwork = network;
        this.horizonServer = new Horizon.Server(stellarConfig[network].horizonUrl);
        this.networkPassphrase = stellarConfig[network].networkPassphrase;
    }
    async getAccount(accountId) {
        try {
            return await this.horizonServer.loadAccount(accountId);
        }
        catch (error) {
            throw new Error(`Account not found: ${error.message}`);
        }
    }
    createAccount() {
        const keypair = Keypair.random();
        return {
            publicKey: keypair.publicKey(),
            secret: keypair.secret()
        };
    }
    async buildTransaction(source, operations, signers) {
        const account = await this.getAccount(source);
        const transaction = new TransactionBuilder(account, {
            fee: '100',
            networkPassphrase: this.networkPassphrase,
        });
        operations.forEach(op => transaction.addOperation(op));
        const builtTransaction = transaction.setTimeout(30).build();
        signers.forEach(signer => builtTransaction.sign(signer));
        return builtTransaction.toXDR();
    }
    submitTransaction(transactionXdr) {
        const transaction = TransactionBuilder.fromXDR(transactionXdr, this.networkPassphrase);
        return this.horizonServer.submitTransaction(transaction);
    }
}
