const express = require('express');
const router = express.Router();
const { clientApplication } = require('../services/fabric-client');

// POST /certifications
router.post('/', async (req, res) => {
  try {
    const { nomDiplome, dateObtention, etudiantId, universiteId, fileHash } = req.body;
    
    const client = new clientApplication();
    const result = await client.submitTxn(
      "universite",         // Organisation
      "autochannel",    // Channel name
      "KBA-Automobile",  // Chaincode name
      "CertificateContract", // Contract name
      "invokeTxn",         // Transaction type
      "",                  // Transient data
      "createCertificate", // Function name
      fileHash,           // Hash du fichier
      nomDiplome,
      dateObtention,
      etudiantId
    );

    const decodedResult = Buffer.from(result).toString('utf8');
const parsedResult = JSON.parse(decodedResult); // ✅ Pas besoin de regex !

res.status(201).json({
  success: true,
  message: parsedResult.message,
  transactionId: parsedResult.txID
});

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error
    });
  }
});

// GET /certifications/:id
router.get('/:id', async (req, res) => {
  try {
    const client = new clientApplication();
    const result = await client.submitTxn(
      "UacMSP",
      "autochannel",
      "KBA-Automobile",
      "CertificationContract",
      "queryTxn",
      "",
      "queryCertificate",
      req.params.id
    );

    res.json({
      success: true,
      data: JSON.parse(result.toString())
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;