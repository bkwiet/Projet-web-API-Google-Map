<?php
// Retourne du contenu en format JSON.
header("Content-type: application/json; charset=utf-8");

// Force l'expiration immédiate de la page au niveau du navigateur Web; elle n'est pas conservée en cache.
header("Expires: Thu, 19 Nov 1981 08:52:00 GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0");
header("Pragma: no-cache");

// include des paramétres de connections a la base de données 
include("../include/param_bd.inc");

// Connection a la Base de données et selection de la table
$bdd = new PDO('mysql:host='.$dbHote.';dbname='.$dbNom, $dbUtilisateur, $dbMotPasse );

// Initialisation des variables
$numero = htmlspecialchars($_POST['vehiNumero']);
$latitude = htmlspecialchars($_POST['vehiLat']);
$longitude = htmlspecialchars($_POST['vehiLng']);

// Requête d'ajout de l'enregistrement à la table
$requete = $bdd->prepare('UPDATE vehicules SET VehiNo= :numero, VehiLat= :latitude, VehiLng= :longitude WHERE VehiNo= :numero ');
$reponse = $requete->execute(array('numero' => $numero, 'latitude' => $latitude, 'longitude' => $longitude));

if($reponse)
{
	echo "reussi";
}
else
{
	echo "echec";
} 
?>