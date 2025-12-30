<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251224070212 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE articles (id INT AUTO_INCREMENT NOT NULL, image_couverture VARCHAR(255) NOT NULL, titre VARCHAR(255) NOT NULL, slug VARCHAR(255) NOT NULL, contenu LONGTEXT NOT NULL, meto_titre VARCHAR(255) DEFAULT NULL, meta_description VARCHAR(255) DEFAULT NULL, date_publication DATETIME NOT NULL, actif TINYINT(1) NOT NULL, date_creation DATETIME NOT NULL, autheur VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE articles_categories (articles_id INT NOT NULL, categories_id INT NOT NULL, INDEX IDX_DE004A0E1EBAF6CC (articles_id), INDEX IDX_DE004A0EA21214B7 (categories_id), PRIMARY KEY(articles_id, categories_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE avis (id INT AUTO_INCREMENT NOT NULL, note INT NOT NULL, commentaire LONGTEXT NOT NULL, date_publication DATETIME NOT NULL, statut VARCHAR(255) NOT NULL, client_id INT DEFAULT NULL, circuit_id INT DEFAULT NULL, UNIQUE INDEX UNIQ_8F91ABF019EB6921 (client_id), INDEX IDX_8F91ABF0CF2182C8 (circuit_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE categories (id INT AUTO_INCREMENT NOT NULL, icone VARCHAR(255) NOT NULL, nom VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, couleur VARCHAR(255) NOT NULL, ordre_affichage INT NOT NULL, date_creation DATETIME NOT NULL, actif TINYINT(1) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE circuits (id INT AUTO_INCREMENT NOT NULL, titre VARCHAR(255) NOT NULL, image VARCHAR(255) NOT NULL, slug VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, meto_titre VARCHAR(255) DEFAULT NULL, meta_description VARCHAR(255) DEFAULT NULL, duree_jours DOUBLE PRECISION NOT NULL, prix_base DOUBLE PRECISION NOT NULL, difficulte INT NOT NULL, score_ecotourisme DOUBLE PRECISION NOT NULL, actif TINYINT(1) NOT NULL, date_creation DATETIME NOT NULL, localisation VARCHAR(255) NOT NULL, is_populare TINYINT(1) NOT NULL, conservation_contribution LONGTEXT DEFAULT NULL, point_fort JSON DEFAULT NULL, actions_durables JSON DEFAULT NULL, periode JSON DEFAULT NULL, range_min DOUBLE PRECISION NOT NULL, range_max DOUBLE PRECISION NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE circuits_circuits (circuits_source INT NOT NULL, circuits_target INT NOT NULL, INDEX IDX_FE0884AE35BDB90C (circuits_source), INDEX IDX_FE0884AE2C58E983 (circuits_target), PRIMARY KEY(circuits_source, circuits_target)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE circuits_categories (circuits_id INT NOT NULL, categories_id INT NOT NULL, INDEX IDX_A1ED34227201D625 (circuits_id), INDEX IDX_A1ED3422A21214B7 (categories_id), PRIMARY KEY(circuits_id, categories_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE circuits_services (circuits_id INT NOT NULL, services_id INT NOT NULL, INDEX IDX_A99289E27201D625 (circuits_id), INDEX IDX_A99289E2AEF5A6C1 (services_id), PRIMARY KEY(circuits_id, services_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE clients (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, prenom VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, mot_de_passe VARCHAR(255) NOT NULL, telephone INT NOT NULL, adresse VARCHAR(255) NOT NULL, ville VARCHAR(255) NOT NULL, pays VARCHAR(255) NOT NULL, date_creation DATETIME NOT NULL, actif TINYINT(1) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE clients_tokens (id INT AUTO_INCREMENT NOT NULL, token VARCHAR(255) NOT NULL, expire_le VARCHAR(255) DEFAULT NULL, type VARCHAR(255) NOT NULL, client_id INT DEFAULT NULL, INDEX IDX_AF8DC56919EB6921 (client_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE devis (id INT AUTO_INCREMENT NOT NULL, reference_devis VARCHAR(255) NOT NULL, nom_client VARCHAR(255) DEFAULT NULL, email VARCHAR(255) DEFAULT NULL, telephone VARCHAR(255) DEFAULT NULL, nombres_adultes INT NOT NULL, nombre_enfants INT NOT NULL, nombre_bebes INT NOT NULL, statut VARCHAR(255) NOT NULL, dates_souhaitees DATETIME NOT NULL, date_creation DATETIME NOT NULL, client_id INT DEFAULT NULL, UNIQUE INDEX UNIQ_8B27C52B5D86A53B (reference_devis), INDEX IDX_8B27C52B19EB6921 (client_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE devis_circuits (devis_id INT NOT NULL, circuits_id INT NOT NULL, INDEX IDX_46E71F6141DEFADA (devis_id), INDEX IDX_46E71F617201D625 (circuits_id), PRIMARY KEY(devis_id, circuits_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE devis_services (devis_id INT NOT NULL, services_id INT NOT NULL, INDEX IDX_117D122D41DEFADA (devis_id), INDEX IDX_117D122DAEF5A6C1 (services_id), PRIMARY KEY(devis_id, services_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE favoris (id INT AUTO_INCREMENT NOT NULL, date_ajout DATETIME NOT NULL, client_id INT NOT NULL, circuit_id INT NOT NULL, INDEX IDX_8933C43219EB6921 (client_id), INDEX IDX_8933C432CF2182C8 (circuit_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE galerie_medias (id INT AUTO_INCREMENT NOT NULL, titre VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, nom_ficher VARCHAR(255) NOT NULL, chemin_fichier VARCHAR(255) NOT NULL, type_media VARCHAR(100) NOT NULL, tags JSON DEFAULT NULL, ordre_affichage INT NOT NULL, date_upload DATETIME DEFAULT NULL, actif TINYINT(1) NOT NULL, circuit_id INT NOT NULL, service_id INT DEFAULT NULL, INDEX IDX_BEF1FFFCF2182C8 (circuit_id), INDEX IDX_BEF1FFFED5CA9E6 (service_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE messages_contact (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, telephone VARCHAR(255) NOT NULL, message LONGTEXT NOT NULL, date_envoi DATETIME NOT NULL, statut VARCHAR(255) NOT NULL, client_id INT DEFAULT NULL, INDEX IDX_55C9B2E319EB6921 (client_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE reservations (id INT AUTO_INCREMENT NOT NULL, date_debut DATETIME NOT NULL, date_fin DATETIME DEFAULT NULL, nombre_adultes INT NOT NULL, nombre_enfants INT NOT NULL, nombre_bebes INT NOT NULL, statut TINYINT(1) NOT NULL, date_creation DATETIME NOT NULL, circuit_id INT NOT NULL, client_id INT DEFAULT NULL, INDEX IDX_4DA239CF2182C8 (circuit_id), INDEX IDX_4DA23919EB6921 (client_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE reservations_services (reservations_id INT NOT NULL, services_id INT NOT NULL, INDEX IDX_12D426C8D9A7F869 (reservations_id), INDEX IDX_12D426C8AEF5A6C1 (services_id), PRIMARY KEY(reservations_id, services_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE services (id INT AUTO_INCREMENT NOT NULL, icone VARCHAR(255) NOT NULL, nom VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, ordre_affichage INT NOT NULL, actif TINYINT(1) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE users (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE articles_categories ADD CONSTRAINT FK_DE004A0E1EBAF6CC FOREIGN KEY (articles_id) REFERENCES articles (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE articles_categories ADD CONSTRAINT FK_DE004A0EA21214B7 FOREIGN KEY (categories_id) REFERENCES categories (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE avis ADD CONSTRAINT FK_8F91ABF019EB6921 FOREIGN KEY (client_id) REFERENCES clients (id)');
        $this->addSql('ALTER TABLE avis ADD CONSTRAINT FK_8F91ABF0CF2182C8 FOREIGN KEY (circuit_id) REFERENCES circuits (id)');
        $this->addSql('ALTER TABLE circuits_circuits ADD CONSTRAINT FK_FE0884AE35BDB90C FOREIGN KEY (circuits_source) REFERENCES circuits (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE circuits_circuits ADD CONSTRAINT FK_FE0884AE2C58E983 FOREIGN KEY (circuits_target) REFERENCES circuits (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE circuits_categories ADD CONSTRAINT FK_A1ED34227201D625 FOREIGN KEY (circuits_id) REFERENCES circuits (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE circuits_categories ADD CONSTRAINT FK_A1ED3422A21214B7 FOREIGN KEY (categories_id) REFERENCES categories (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE circuits_services ADD CONSTRAINT FK_A99289E27201D625 FOREIGN KEY (circuits_id) REFERENCES circuits (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE circuits_services ADD CONSTRAINT FK_A99289E2AEF5A6C1 FOREIGN KEY (services_id) REFERENCES services (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE clients_tokens ADD CONSTRAINT FK_AF8DC56919EB6921 FOREIGN KEY (client_id) REFERENCES clients (id)');
        $this->addSql('ALTER TABLE devis ADD CONSTRAINT FK_8B27C52B19EB6921 FOREIGN KEY (client_id) REFERENCES clients (id)');
        $this->addSql('ALTER TABLE devis_circuits ADD CONSTRAINT FK_46E71F6141DEFADA FOREIGN KEY (devis_id) REFERENCES devis (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE devis_circuits ADD CONSTRAINT FK_46E71F617201D625 FOREIGN KEY (circuits_id) REFERENCES circuits (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE devis_services ADD CONSTRAINT FK_117D122D41DEFADA FOREIGN KEY (devis_id) REFERENCES devis (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE devis_services ADD CONSTRAINT FK_117D122DAEF5A6C1 FOREIGN KEY (services_id) REFERENCES services (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE favoris ADD CONSTRAINT FK_8933C43219EB6921 FOREIGN KEY (client_id) REFERENCES clients (id)');
        $this->addSql('ALTER TABLE favoris ADD CONSTRAINT FK_8933C432CF2182C8 FOREIGN KEY (circuit_id) REFERENCES circuits (id)');
        $this->addSql('ALTER TABLE galerie_medias ADD CONSTRAINT FK_BEF1FFFCF2182C8 FOREIGN KEY (circuit_id) REFERENCES circuits (id)');
        $this->addSql('ALTER TABLE galerie_medias ADD CONSTRAINT FK_BEF1FFFED5CA9E6 FOREIGN KEY (service_id) REFERENCES services (id)');
        $this->addSql('ALTER TABLE messages_contact ADD CONSTRAINT FK_55C9B2E319EB6921 FOREIGN KEY (client_id) REFERENCES clients (id)');
        $this->addSql('ALTER TABLE reservations ADD CONSTRAINT FK_4DA239CF2182C8 FOREIGN KEY (circuit_id) REFERENCES circuits (id)');
        $this->addSql('ALTER TABLE reservations ADD CONSTRAINT FK_4DA23919EB6921 FOREIGN KEY (client_id) REFERENCES clients (id)');
        $this->addSql('ALTER TABLE reservations_services ADD CONSTRAINT FK_12D426C8D9A7F869 FOREIGN KEY (reservations_id) REFERENCES reservations (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE reservations_services ADD CONSTRAINT FK_12D426C8AEF5A6C1 FOREIGN KEY (services_id) REFERENCES services (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE articles_categories DROP FOREIGN KEY FK_DE004A0E1EBAF6CC');
        $this->addSql('ALTER TABLE articles_categories DROP FOREIGN KEY FK_DE004A0EA21214B7');
        $this->addSql('ALTER TABLE avis DROP FOREIGN KEY FK_8F91ABF019EB6921');
        $this->addSql('ALTER TABLE avis DROP FOREIGN KEY FK_8F91ABF0CF2182C8');
        $this->addSql('ALTER TABLE circuits_circuits DROP FOREIGN KEY FK_FE0884AE35BDB90C');
        $this->addSql('ALTER TABLE circuits_circuits DROP FOREIGN KEY FK_FE0884AE2C58E983');
        $this->addSql('ALTER TABLE circuits_categories DROP FOREIGN KEY FK_A1ED34227201D625');
        $this->addSql('ALTER TABLE circuits_categories DROP FOREIGN KEY FK_A1ED3422A21214B7');
        $this->addSql('ALTER TABLE circuits_services DROP FOREIGN KEY FK_A99289E27201D625');
        $this->addSql('ALTER TABLE circuits_services DROP FOREIGN KEY FK_A99289E2AEF5A6C1');
        $this->addSql('ALTER TABLE clients_tokens DROP FOREIGN KEY FK_AF8DC56919EB6921');
        $this->addSql('ALTER TABLE devis DROP FOREIGN KEY FK_8B27C52B19EB6921');
        $this->addSql('ALTER TABLE devis_circuits DROP FOREIGN KEY FK_46E71F6141DEFADA');
        $this->addSql('ALTER TABLE devis_circuits DROP FOREIGN KEY FK_46E71F617201D625');
        $this->addSql('ALTER TABLE devis_services DROP FOREIGN KEY FK_117D122D41DEFADA');
        $this->addSql('ALTER TABLE devis_services DROP FOREIGN KEY FK_117D122DAEF5A6C1');
        $this->addSql('ALTER TABLE favoris DROP FOREIGN KEY FK_8933C43219EB6921');
        $this->addSql('ALTER TABLE favoris DROP FOREIGN KEY FK_8933C432CF2182C8');
        $this->addSql('ALTER TABLE galerie_medias DROP FOREIGN KEY FK_BEF1FFFCF2182C8');
        $this->addSql('ALTER TABLE galerie_medias DROP FOREIGN KEY FK_BEF1FFFED5CA9E6');
        $this->addSql('ALTER TABLE messages_contact DROP FOREIGN KEY FK_55C9B2E319EB6921');
        $this->addSql('ALTER TABLE reservations DROP FOREIGN KEY FK_4DA239CF2182C8');
        $this->addSql('ALTER TABLE reservations DROP FOREIGN KEY FK_4DA23919EB6921');
        $this->addSql('ALTER TABLE reservations_services DROP FOREIGN KEY FK_12D426C8D9A7F869');
        $this->addSql('ALTER TABLE reservations_services DROP FOREIGN KEY FK_12D426C8AEF5A6C1');
        $this->addSql('DROP TABLE articles');
        $this->addSql('DROP TABLE articles_categories');
        $this->addSql('DROP TABLE avis');
        $this->addSql('DROP TABLE categories');
        $this->addSql('DROP TABLE circuits');
        $this->addSql('DROP TABLE circuits_circuits');
        $this->addSql('DROP TABLE circuits_categories');
        $this->addSql('DROP TABLE circuits_services');
        $this->addSql('DROP TABLE clients');
        $this->addSql('DROP TABLE clients_tokens');
        $this->addSql('DROP TABLE devis');
        $this->addSql('DROP TABLE devis_circuits');
        $this->addSql('DROP TABLE devis_services');
        $this->addSql('DROP TABLE favoris');
        $this->addSql('DROP TABLE galerie_medias');
        $this->addSql('DROP TABLE messages_contact');
        $this->addSql('DROP TABLE reservations');
        $this->addSql('DROP TABLE reservations_services');
        $this->addSql('DROP TABLE services');
        $this->addSql('DROP TABLE users');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
