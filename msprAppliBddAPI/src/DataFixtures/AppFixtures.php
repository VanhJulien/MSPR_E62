<?php

namespace App\DataFixtures;

use App\Entity\Account;
use App\Entity\Maintenance;
use App\Entity\Place;
use App\Entity\Plant;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
    $faker = Faker\Factory::create('fr_FR');
    $states = ['Germination', 'Croissance', 'Floraison', 'Fructification', 'Fanée'];

        $accounts = Array();
        for ($i = 0; $i < 4; $i++) {
            $accounts[$i] = new Account();
            $accounts[$i]->setEmail($faker->email);
            $accounts[$i]->setFirstName($faker->firstName);
            $accounts[$i]->setLastName($faker->lastName);
            $accounts[$i]->setRoles(['ROLE_USER']);
            $accounts[$i]->setPlainPassword($faker->password);
            $manager->persist($accounts[$i]);

            $places = Array();

            for ($j = 0; $j < 2; $j++) {
                $places[$j] = new Place();
                $places[$j]->setLibelle("test");
                $places[$j]->setAddress($faker->address);
                $places[$j]->setLongitude($faker->longitude);
                $places[$j]->setLatitude($faker->latitude);
                $places[$j]->setOwner($accounts[$i]);
                $manager->persist($places[$j]);

                $plants = Array();
                for ($k = 0; $k < 2; $k++) {
                    $plants[$k] = new Plant();
                    $plants[$k]->setSpecie("test");
                    $plants[$k]->setStatus($states[array_rand($states)]);
                    $plants[$k]->setPlace($places[$j]);
                    // $plants[$k]->setPicture($faker->imageUrl(640, 480, 'animals', true));
                    $manager->persist($plants[$k]);
    
                    
                }
            }
        }

        $biologists = Array();
        for ($l = 0; $l < 4; $l++) {
            $biologists[$l] = new Account();
            $biologists[$l]->setEmail($faker->email);
            $biologists[$l]->setFirstName($faker->firstName);
            $biologists[$l]->setLastName($faker->lastName);
            $biologists[$l]->setRoles(['ROLE_BIOLOGIST']);
            $biologists[$l]->setPlainPassword($faker->password);
            $manager->persist($biologists[$l]);

            $maintenance = new Maintenance();
            $maintenance->setDateMaintenance(new \DateTime('2022-01-01'));
            $maintenance->setDescription('Fixed leaky faucet in bathroom.');
            $maintenance->setMaintainer($biologists[$l]);
            $maintenance->setPlant($plants[array_rand($plants)]);
            $manager->persist($maintenance);
        }

        $manager->flush();
    }
}
