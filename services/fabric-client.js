const { profile } = require('./profile');
const { promises: fs } = require('fs');
const path = require('path');
const crypto = require('crypto');
const grpc = require('@grpc/grpc-js');
const { connect, signers } = require('@hyperledger/fabric-gateway');

class clientApplication {
  async submitTxn(organization, channelName, chaincodeName, contractName, txnType, transientData, txnName, ...args) {
    const orgProfile = profile[organization];
    
    // Établir la connexion gRPC
    const client = await this.newGrpcConnection(
      orgProfile.tlsCertPath,
      orgProfile.peerEndpoint,
      orgProfile.peerHostAlias
    );

    const gateway = connect({
      client,
      identity: await this.newIdentity(orgProfile.certPath, orgProfile.mspId),
      signer: await this.newSigner(orgProfile.keyDirectoryPath),
    });

    try {
      const network = gateway.getNetwork(channelName);
      const contract = network.getContract(chaincodeName, contractName);

      let result;
      if (txnType === "invokeTxn") {
        result = await contract.submitTransaction(txnName, ...args);
      } else if (txnType === "queryTxn") {
        result = await contract.evaluateTransaction(txnName, ...args);
      }

      return result;

    } finally {
      gateway.close();
      client.close();
    }
  }

  async newGrpcConnection(tlsCertPath, peerEndpoint, peerHostAlias) {
    const tlsRootCert = await fs.readFile(tlsCertPath);
    const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
    return new grpc.Client(peerEndpoint, tlsCredentials, {
      'grpc.ssl_target_name_override': peerHostAlias
    });
  }

  async newIdentity(certPath, mspId) {
    const credentials = await fs.readFile(certPath);
    return { mspId, credentials };
  }

  async newSigner(keyDirectoryPath) {
    const files = await fs.readdir(keyDirectoryPath);
    const keyPath = path.resolve(keyDirectoryPath, files[0]);
    const privateKeyPem = await fs.readFile(keyPath);
    const privateKey = crypto.createPrivateKey(privateKeyPem);
    return signers.newPrivateKeySigner(privateKey);
  }
}

module.exports = { clientApplication };