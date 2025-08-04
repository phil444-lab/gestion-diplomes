const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// POST /etudiants
router.post("/", async (req, res) => {
  const { nom, prenom, dateNaissance } = req.body;
  try {
    const etudiant = await prisma.etudiant.create({
      data: {
        nom,
        prenom,
        dateNaissance: new Date(dateNaissance),
      },
    });
    res.json(etudiant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /etudiants/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const etudiant = await prisma.etudiant.findUnique({
      where: { id: parseInt(id) },
      include: { certifications: true },
    });
    if (!etudiant) return res.status(404).json({ error: "Non trouvé" });
    res.json(etudiant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
