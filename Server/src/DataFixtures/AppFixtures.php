<?php

namespace App\DataFixtures;

use App\Entity\Articles;
use App\Entity\ArticlesTraductions;
use App\Entity\CategoriesCircuits;
use App\Entity\CategoriesCirculations;
use App\Entity\CategoriesTraductions;
use App\Entity\Circuit;
use App\Entity\CircuitsTraductions;
use App\Entity\CircuitTraductions;
use App\Entity\DemandesDevis;
use App\Entity\Galerie;
use App\Entity\GalerieTags;
use App\Entity\GalerieTraductions;
use App\Entity\Profile;
use App\Entity\Service;
use App\Entity\ServicesTraductions;
use App\Entity\Tags;
use App\Entity\TagsTraductions;
use App\Entity\User;
use App\Entity\Descriptions;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        // ====================================================
        // USERS + PROFILES
        // ====================================================

        // $users = [];
        // for ($i = 0; $i < 5; $i++) {
        //     $user = new User();
        //     $user->setEmail($faker->unique()->email());
        //     $user->setPassword(password_hash('password', PASSWORD_BCRYPT));
        //     $user->setRoles(['ROLE_USER']);

        //     $profile = new Profile();
        //     $profile->setNom($faker->firstName());
        //     $profile->setPrenom($faker->lastName());
        //     $profile->setTelephone($faker->phoneNumber());
        //     $profile->setDateNaissance(new \DateTimeImmutable());
        //     $profile->setNationalite(nationalite: $faker->country());
        //     $profile->setBio($faker->bothify());

        //     $profile->setUser($user);
        //     $user->setProfile($profile);

        //     $manager->persist($profile);
        //     $manager->persist($user);

        //     $users[] = $user;
        // }

        // // ====================================================
        // // TAGS + TRADUCTIONS
        // // ====================================================

        // $tags = [];
        // for ($i = 0; $i < 8; $i++) {
        //     $tag = new Tags();
        //     $tag->setSlug($faker->slug());
        //     $tag->setCouleur($faker->hexColor());

        //     $manager->persist($tag);
        //     $tags[] = $tag;

        //     foreach (['fr', 'en'] as $lang) {
        //         $tr = new TagsTraductions();
        //         $tr->setLangue($lang);
        //         $tr->setNom($faker->word());
        //         $tr->setTags($tag);

        //         $manager->persist($tr);
        //     }
        // }

        // ====================================================
        // SERVICES + TRADUCTIONS
        // ====================================================

        // $services = [];
        // for ($i = 0; $i < 6; $i++) {
        //     $service = new Service();

        //     $manager->persist($service);
        //     $services[] = $service;

        //     foreach (['fr', 'en'] as $lang) {
        //         $tr = new ServicesTraductions();
        //         $tr->setLangue($lang);
        //         $tr->setNom($faker->sentence(3));
        //         $tr->setDescription($faker->paragraph());
        //         $tr->setService($service);

        //         $manager->persist($tr);
        //     }
        // }

        // // ====================================================
        // // CATEGORIES + TRADUCTIONS
        // // ====================================================

        // $categories = [];
        // for ($i = 0; $i < 5; $i++) {
        //     $cat = new CategoriesCircuits();

        //     $manager->persist($cat);
        //     $categories[] = $cat;

        //     foreach (['fr', 'en'] as $lang) {
        //         $tr = new CategoriesTraductions();
        //         $tr->setLangue($lang);
        //         $tr->setNom($faker->word());

        //         $manager->persist($tr);
        //     }
        // }



        // // ====================================================
        // // ARTICLES + TRADUCTIONS
        // // ====================================================

        // for ($i = 0; $i < 10; $i++) {
        //     $article = new Articles();

        //     $manager->persist($article);

        //     foreach (['fr', 'en'] as $lang) {
        //         $tr = new ArticlesTraductions();
        //         $tr->setLangue($lang);
        //         $tr->setTitre($faker->sentence());
        //         $tr->setContenu($faker->paragraph(5));

        //         $manager->persist($tr);
        //     }
        // }

        // // ====================================================
        // // CIRCUITS + TRADUCTIONS + DESCRIPTIONS
        // // ====================================================

        // $circuits = [];
        // for ($i = 0; $i < 6; $i++) {
        //     $c = new Circuit();
        //     $c->setDureeJours(rand(3, 15));

        //     $manager->persist($c);
        //     $circuits[] = $c;

        //     foreach (['fr', 'en'] as $lang) {
        //         $tr = new CircuitsTraductions();
        //         $tr->setLangue($lang);
        //         $tr->setTitre($faker->sentence(3));
        //         $tr->setDescriptionCourte($faker->paragraph(3));
        //         $tr->setDescriptionLongue($faker->paragraph());
        //         $tr->setCircuit($c);

        //         $manager->persist($tr);
        //     }
        // }


        // // ====================================================
        // // GALERIE + TRADUCTIONS + TAGS
        // // ====================================================

        // for ($i = 0; $i < 12; $i++) {
        //     $g = new Galerie();
        //     $g->setNomFichier($faker->imageUrl());
        //     $g->setTypeMedia('image');
        //     $g->setStatut(true);

        //     $manager->persist($g);

        //     foreach (['fr', 'en'] as $lang) {
        //         $tr = new GalerieTraductions();
        //         $tr->setLangue($lang);
        //         $tr->setLegende($faker->sentence(3));
        //         $tr->setDescription($faker->sentence());
        //         $tr->setCreditPhoto(rand(3, 15));
        //         $tr->setGalerie($g);

        //         $manager->persist($tr);
        //     }
        // }

        // // ====================================================
        // // DEMANDES DE DEVIS
        // // ====================================================

        // for ($i = 0; $i < 10; $i++) {
        //     $d = new DemandesDevis();
        //     $d->setNomClient($faker->name());
        //     $d->setEmailClient($faker->email());
        //     $d->setTelephoneClient($faker->phoneNumber());
        //     $d->setNombreAdultes($faker->numberBetween(1, 10));
        //     $d->setNombreEnfants($faker->numberBetween(1, 10));
        //     $d->setNombreBebes($faker->numberBetween(1, 10));
        //     $d->setBudgetEstime($faker->numberBetween(10000, 1000000000));
        //     $d->setMessagePersonnalise($faker->paragraph());


        //     $manager->persist(object: $d);
        // }
        // ====================================================
        // FLUSH FINAL
        // ====================================================
        $manager->flush();
    }
}
