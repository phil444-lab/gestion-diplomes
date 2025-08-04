// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // --- Universités ---
  const universites = await prisma.universite.createMany({
    data: [
      {
        nom: 'Université d’Abomey-Calavi',
        localisation: 'Cotonou',
        email: 'uac@bj.edu',
        motDePasseHash: 'hash123',
      },
      {
        nom: 'Université de Parakou',
        localisation: 'Parakou',
        email: 'up@bj.edu',
        motDePasseHash: 'hash456',
      },
    ],
  });

  // --- Étudiants ---
  const etudiants = await prisma.etudiant.createMany({
    data: [
      {
        nom: 'Kouassi',
        prenom: 'Jean',
        dateNaissance: new Date('1998-05-14'),
      },
      {
        nom: 'Dossou',
        prenom: 'Amina',
        dateNaissance: new Date('1999-11-30'),
      },
    ],
  });

  console.log('✅ Données insérées avec succès !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
