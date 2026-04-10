import { Horizon, Keypair, TransactionBuilder, Operation, Networks } from '@stellar/stellar-sdk';

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
  private horizonServer: Horizon.Server;
  private networkPassphrase: string;
  public currentNetwork: 'testnet' | 'mainnet' = 'testnet';

  constructor() {
    this.horizonServer = new Horizon.Server(stellarConfig.testnet.horizonUrl);
    this.networkPassphrase = stellarConfig.testnet.networkPassphrase;
  }

  public initialize(): void {
    console.log(`Connected to Stellar ${this.currentNetwork} network`);
  }

  public switchNetwork(network: 'testnet' | 'mainnet'): void {
    this.currentNetwork = network;
    this.horizonServer = new Horizon.Server(stellarConfig[network].horizonUrl);
    this.networkPassphrase = stellarConfig[network].networkPassphrase;
  }

  public async getAccount(accountId: string): Promise<Horizon.AccountResponse> {
    try {
      return await this.horizonServer.loadAccount(accountId);
    } catch (error:any) {
      throw new Error(`Account not found: ${error.message}`);
    }
  }

  public createAccount(): { publicKey: string; secret: string } {
    const keypair = Keypair.random();
    return {
      publicKey: keypair.publicKey(),
      secret: keypair.secret()
    };
  }

  public async buildTransaction(
    source: string,
    operations: any[],
    signers: Keypair[]
  ): Promise<string> {
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

  public submitTransaction(transactionXdr: string): Promise<any> {
    const transaction = TransactionBuilder.fromXDR(transactionXdr, this.networkPassphrase);
    return this.horizonServer.submitTransaction(transaction);
  }
}