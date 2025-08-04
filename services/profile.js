const path = require('path');

module.exports = {
  profile: {
    universite: {
      "keyDirectoryPath": path.join(__dirname, '/../../AutomobileNetwork/organizations/peerOrganizations/uac.auto.com/peers/peer0.uac.auto.com/tls/keystore'),
      "certPath": path.join(__dirname, '/../../AutomobileNetwork/organizations/peerOrganizations/uac.auto.com/peers/peer0.uac.auto.com/tls/signcerts/cert.pem'),
      "tlsCertPath": path.join(__dirname, '/../../AutomobileNetwork/organizations/peerOrganizations/uac.auto.com/peers/peer0.uac.auto.com/tls/ca.crt'),
      "peerEndpoint": "localhost:7051",
      "peerHostAlias": "peer0.uac.auto.com",
      "mspId": "UacMSP"
    },
    etudiant: {
      // Configuration similaire pour l'organisation étudiant si nécessaire
    }
  }
};