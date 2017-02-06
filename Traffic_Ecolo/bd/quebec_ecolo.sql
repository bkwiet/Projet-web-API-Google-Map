-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Jeu 06 Mars 2014 à 07:40
-- Version du serveur: 5.6.12-log
-- Version de PHP: 5.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `quebec_ecolo`
--
CREATE DATABASE IF NOT EXISTS `quebec_ecolo` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `quebec_ecolo`;

-- --------------------------------------------------------

--
-- Structure de la table `centres`
--

CREATE TABLE IF NOT EXISTS `centres` (
  `No` tinyint(3) unsigned NOT NULL,
  `Emplacement` varchar(100) NOT NULL,
  `Adresse` varchar(100) NOT NULL,
  `Ville` varchar(100) NOT NULL,
  `CodePostal` varchar(7) NOT NULL,
  `Telephone` varchar(50) NOT NULL,
  `Fax` varchar(50) DEFAULT NULL,
  `Type` enum('s','e') NOT NULL COMMENT 'Type de centre: ''s'' = standard et ''e'' = entrepôt',
  `Lat` double NOT NULL COMMENT 'Position géographique (latitude) du centre',
  `Lng` double NOT NULL COMMENT 'Position géographique (longitude) du centre',
  `URL` varchar(256) NOT NULL COMMENT 'Lien vers la page donnant de l''information sur le centre',
  PRIMARY KEY (`No`),
  KEY `Type` (`Type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `centres`
--

INSERT INTO `centres` (`No`, `Emplacement`, `Adresse`, `Ville`, `CodePostal`, `Telephone`, `Fax`, `Type`, `Lat`, `Lng`, `URL`) VALUES
(1, 'Écocentre Lévis', '3443, rue de Vulcain', 'Lévis', 'G6W 7X6', '1-800-563-4511 et (418) 833-4511', '(418) 833-7966', 's', 46.752035, -71.178728, 'http://www.ville.levis.qc.ca/Fr/Actualites/20120612-Ouverture-ecocentre.asp'),
(2, 'Écocentre Beauport', '425, boul. Raymond', 'Québec', 'G1C 7R1', '1-800-563-6282 et (418) 666-4411', '(418) 667-7968', 's', 46.887255, -71.186303, 'http://www.ville.quebec.qc.ca/citoyens/matieresresiduelles/index.aspx'),
(3, 'Écocentre Loretteville', '1811, chemin Saint Barthélemy', 'Québec', 'G2A 1K6', '1-800-563-4411 et (418) 871-4411', '(418) 871-5755', 's', 46.866001, -71.351548, 'http://www.ville.quebec.qc.ca/citoyens/matieresresiduelles/index.aspx'),
(4, 'Écocentre des Rivières', '1700, rue Provinciale', 'Québec', 'G1N 4S9', '1-877-506-0111 et (418) 650-0111', NULL, 's', 46.800515, -71.271511, 'http://www.ville.quebec.qc.ca/citoyens/matieresresiduelles/index.aspx'),
(5, 'Écocentre Hêtrière', '3381, rue de l''Hêtrière', 'Québec', 'G3A 2A7', '1-800-826-4829 & (418) 847-4411', '(418) 847-4848', 'e', 46.749036, -71.387199, 'http://www.ville.quebec.qc.ca/citoyens/matieresresiduelles/index.aspx');

-- --------------------------------------------------------

--
-- Structure de la table `icones`
--

CREATE TABLE IF NOT EXISTS `icones` (
  `Type` enum('s','e','r','b','v') NOT NULL COMMENT 'Type de centre ou de camion: ''s'' = standard, ''r'' = camion pour matières dangereuses, ''b'' = camion pour recyclage, ''v'' = camion pour résidus verts et ''e'' = entrepôt',
  `FichierIcone` varchar(100) NOT NULL COMMENT 'Nom du fichier pour l''icône',
  PRIMARY KEY (`Type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `icones`
--

INSERT INTO `icones` (`Type`, `FichierIcone`) VALUES
('s', 'apartment.png'),
('e', 'home.png'),
('r', 'truck-red.png'),
('b', 'truck-blue.png'),
('v', 'truck-green.png');

-- --------------------------------------------------------

--
-- Structure de la table `vehicules`
--

CREATE TABLE IF NOT EXISTS `vehicules` (
  `VehiNo` tinyint(3) unsigned NOT NULL,
  `VehiType` enum('r','b','v') NOT NULL,
  `VehiLat` double NOT NULL COMMENT 'Position géographique (latitude) du véhicule',
  `VehiLng` double NOT NULL COMMENT 'Position géographique (longitude) du véhicule',
  PRIMARY KEY (`VehiNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `vehicules`
--

INSERT INTO `vehicules` (`VehiNo`, `VehiType`, `VehiLat`, `VehiLng`) VALUES
(1, 'r', 46.748476, -71.292816),
(2, 'b', 46.712604, -71.62983),
(3, 'r', 46.772348, -71.144329),
(5, 'v', 47.003091, -70.815704),
(8, 'b', 46.903573, -71.198059),
(13, 'b', 46.92444169037625, -71.3909953652344),
(21, 'r', 46.711206, -71.355472),
(34, 'v', 46.657491, -71.106842),
(55, 'v', 46.85015321395269, -71.79827268554686),
(89, 'r', 46.793888, -71.288782);

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `centres`
--
ALTER TABLE `centres`
  ADD CONSTRAINT `centres_ibfk_1` FOREIGN KEY (`Type`) REFERENCES `icones` (`Type`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
