<?php

namespace App\DataFixtures;

use App\Entity\Articles;
use App\Entity\Avis;
use App\Entity\Categories;
use App\Entity\Circuits;
use App\Entity\Clients;
use App\Entity\ClientsTokens;
use App\Entity\Devis;
use App\Entity\GalerieMedias;
use App\Entity\MessagesContact;
use App\Entity\Reservations;
use App\Entity\Services;
use App\Entity\Users;
use App\Entity\ValueObject\Range;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    public function __construct(private UserPasswordHasherInterface $hasher)
    {
    }
    public function load(ObjectManager $manager): void
    {
        $faker = \Faker\Factory::create('fr_FR');


        // --- Users --- 
        $user = new Users();
        $user->setEmail('admin@gmail.com')
            ->setPassword($this->hasher->hashPassword($user, '123456'))
            ->setRoles(['ROLE_ADMIN']);
        $manager->persist($user);

        // --- Clients ---
        $clients = [];
        for ($i = 0; $i < 5; $i++) {
            $client = new Clients();
            $client->setNom($faker->lastName)
                ->setPrenom($faker->firstName)
                ->setEmail($faker->unique()->safeEmail)
                ->setMotDePasse(password_hash('password', PASSWORD_BCRYPT))
                ->setTelephone($faker->numberBetween(600000000, 699999999))
                ->setAdresse($faker->address)
                ->setVille($faker->city)
                ->setPays($faker->country)
                ->setDateCreation($faker->dateTimeBetween('-2 years', 'now'))
                ->setActif($faker->boolean(90));
            $manager->persist($client);
            $clients[] = $client;
        }

        // --- Categories ---
        $categories = [];
        for ($i = 0; $i < 3; $i++) {
            $cat = new Categories();
            $cat->setNom($faker->word)
                ->setDescription($faker->sentence)
                ->setIcone('fa-' . $faker->word)
                ->setCouleur($faker->hexColor)
                ->setOrdreAffichage($i + 1)
                ->setActif($faker->boolean(90))
                ->setDateCreation($faker->dateTimeBetween('-2 years', 'now'));
            $manager->persist($cat);
            $categories[] = $cat;
        }

        // --- Services ---
        $services = [];
        for ($i = 0; $i < 5; $i++) {
            $service = new Services();
            $service->setNom($faker->word)
                ->setDescription($faker->sentence(10))
                ->setIcone('fa-' . $faker->word)
                ->setActif($faker->boolean(90))
                ->setOrdreAffichage($i + 1);
            $manager->persist($service);
            $services[] = $service;
        }


        // --- Circuits ---
        $circuits = [];
        for ($i = 0; $i < 15; $i++) {
            $circuit = new Circuits();
            $randomServices = $faker->randomElements(
                $services,
                $faker->numberBetween(1, 3)
            );

            $circuit->setTitre($faker->sentence(3))
                ->setPointFort($faker->sentences(3))
                ->setConservationContribution(conservation_contribution: $faker->sentence(6))
                ->setLocalisation($faker->city)
                ->setIsPopulare($faker->boolean(50))
                ->setDescription($faker->paragraph)
                ->setMetoTitre($faker->sentence(2))
                ->setMetaDescription($faker->sentence(6))
                ->setDureeJours($faker->numberBetween(2, 15))
                ->setPrixBase($faker->randomFloat(2, 100, 2000))
                ->setDifficulte($faker->numberBetween(1, 5))
                ->setScoreEcotourisme($faker->randomFloat(1, 1, 5))
                ->setActif($faker->boolean(90))
                ->setDateCreation($faker->dateTimeBetween('-2 years', 'now'))
                ->setImage($faker->imageUrl(640, 480, 'nature'))
                ->setRange(new Range(
                    min: $faker->numberBetween(100, 500),
                    max: $faker->numberBetween(501, 2000)
                ))
                ->setPeriode($faker->randomElements([
                    'Printemps',
                    'Été',
                    'Automne',
                    'Hiver'
                ], $faker->numberBetween(1, 4)))
                ->setActionsDurables($faker->randomElements([
                    'Soutien aux communautés locales',
                    'Impact environnemental minimal',
                    'Protection de la biodiversité',
                    'Hébergements écologiques',
                    'Gestion des déchets responsables'
                ], count: $faker->numberBetween(1, 5)))
                ->setSlug($faker->slug);

            foreach ($randomServices as $service) {
                $circuit->addService($service);
            }

            $manager->persist($circuit);
            $circuits[] = $circuit;
        }

        // --- Articles ---
        for ($i = 0; $i < 15; $i++) {
            $article = new Articles();

            $randomCategorie = $faker->randomElements(
                $categories,
                $faker->numberBetween(1, 3)
            );

            $article->setImageCouverture($faker->imageUrl(640, 480, 'nature'))
                ->setTitre($faker->sentence(3))
                ->setAutheur($faker->name())
                ->setSlug($faker->slug)
                ->setContenu($faker->paragraph(5))
                ->setMetoTitre($faker->sentence(2))
                ->setMetaDescription($faker->sentence(6))
                ->setDatePublication($faker->dateTimeBetween('-1 years', 'now'))
                ->setActif($faker->boolean(90))
                ->setDateCreation($faker->dateTimeBetween('-2 years', 'now'));

            foreach ($randomCategorie as $categorie) {
                $article->addCategory($categorie);
            }
            $manager->persist($article);
        }

        // --- ClientsTokens ---
        foreach ($clients as $client) {
            for ($j = 0; $j < 2; $j++) {
                $token = new ClientsTokens();
                $token->setClient($client)
                    ->setToken($faker->sha256)
                    ->setExpireLe($faker->dateTimeBetween('now', '+1 month')->format('Y-m-d H:i:s'))
                    ->setType($faker->randomElement(['reset', 'auth']));
                $manager->persist($token);
            }
        }

        // --- Devis ---
        $devisList = [];
        foreach ($clients as $client) {
            $devis = new Devis();
            $devis->setClient($client)
                ->setReferenceDevis($faker->uuid)
                ->setNomClient($client->getNom())
                ->setEmail($client->getEmail())
                ->setTelephone((string) $client->getTelephone())
                ->setDatesSouhaitees($faker->dateTimeBetween('now', '+6 months'))
                ->setNombresAdultes($faker->numberBetween(1, 4))
                ->setNombreEnfants($faker->numberBetween(0, 3))
                ->setNombreBebes($faker->numberBetween(0, 2))
                ->setStatut($faker->randomElement(['en attente', 'validé', 'refusé']))
                ->setDateCreation($faker->dateTimeBetween('-1 years', 'now'));
            // Relations circuits/services
            foreach ($faker->randomElements($circuits, $faker->numberBetween(1, 2)) as $circuit) {
                $devis->addCircuit($circuit);
            }
            foreach ($faker->randomElements($services, $faker->numberBetween(1, 2)) as $service) {
                $devis->addService($service);
            }
            $manager->persist($devis);
            $devisList[] = $devis;
        }

        // --- GalerieMedias ---
        for ($i = 0; $i < 6; $i++) {
            $galerie = new GalerieMedias();
            $galerie->setTitre($faker->sentence(2))
                ->setDescription($faker->sentence(8))
                ->setNomFicher($faker->word . '.jpg')
                ->setCheminFichier('/uploads/' . $faker->word . '.jpg')
                ->setTypeMedia($faker->randomElement(['image', 'video']))
                ->setTags([$faker->word, $faker->word])
                ->setCircuit($faker->randomElement($circuits))
                ->setService($faker->randomElement($services))
                ->setOrdreAffichage($i + 1)
                ->setDateUpload($faker->dateTimeBetween('-1 years', 'now'))
                ->setActif($faker->boolean(90));
            $manager->persist($galerie);
        }

        // --- MessagesContact ---
        foreach ($clients as $client) {
            $msg = new MessagesContact();
            $msg->setClient($client)
                ->setNom($client->getNom())
                ->setEmail($client->getEmail())
                ->setTelephone((string) $client->getTelephone())
                ->setMessage($faker->sentence(15))
                ->setDateEnvoi($faker->dateTimeBetween('-1 years', 'now'))
                ->setStatut($faker->randomElement(['nouveau', 'lu', 'archivé']));
            $manager->persist($msg);
        }

        // --- Reservations ---
        foreach ($clients as $client) {
            $reservation = new Reservations();
            $reservation->setClient($client)
                ->setCircuit($faker->randomElement($circuits))
                ->setDateDebut($faker->dateTimeBetween('now', '+6 months'))
                ->setDateFin($faker->dateTimeBetween('+7 months', '+12 months'))
                ->setNombreAdultes($faker->numberBetween(1, 4))
                ->setNombreEnfants($faker->numberBetween(0, 3))
                ->setNombreBebes($faker->numberBetween(0, 2))
                ->setStatut($faker->boolean(90))
                ->setDateCreation($faker->dateTimeBetween('-1 years', 'now'));
            foreach ($faker->randomElements($services, $faker->numberBetween(1, 2)) as $service) {
                $reservation->addService($service);
            }
            $manager->persist($reservation);
        }

        // --- Avis ---
        foreach ($clients as $client) {
            $avis = new Avis();
            $avis->setClient($client)
                ->setCircuit($faker->randomElement($circuits))
                ->setNote($faker->numberBetween(1, 5))
                ->setCommentaire($faker->sentence(12))
                ->setDatetPublication($faker->dateTimeBetween('-1 years', 'now'))
                ->setStatut($faker->randomElement(['publié', 'en attente', 'refusé']));
            $manager->persist($avis);
        }

        $manager->flush();
    }
}
