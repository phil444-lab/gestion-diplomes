const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// POST /universites
router.post("/", async (req, res) => {
  const { nom, localisation, email, motDePasseHash } = req.body;
  try {
    const universite = await prisma.universite.create({
      data: {
        nom,
        localisation,
        email,
        motDePasseHash,
      },
    });
    res.json(universite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
