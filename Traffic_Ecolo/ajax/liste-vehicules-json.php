<?php
// Retourne du contenu en format JSON.
header("Content-type: application/json; charset=utf-8");

// Force l'expiration immédiate de la page au niveau du navigateur Web; elle n'est pas conservée en cache.
header("Expires: Thu, 19 Nov 1981 08:52:00 GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0");
header("Pragma: no-cache");

try{
	
	// include des paramétres de connections a la base de données 
	include("../include/param_bd.inc");
	
	// Connection a la Base de données et selection de la table
	$bdd = new PDO('mysql:host='.$dbHote.';dbname='.$dbNom, $dbUtilisateur, $dbMotPasse );
		
	// Récupération des inforfamations sur les vehicules contenu dans la table
	$reponse_vehicules = $bdd->query("SELECT *  FROM vehicules ORDER BY `vehicules`.`VehiNo` ASC");
	$reponse_icones = $bdd->query("SELECT * FROM icones");
	$icones = $reponse_icones->fetchALL();
	
	// Creation de la liste d'objets vehicules 
	$vehicules_json = "garneau.qe.lstVehicules = [";
	
	while($vehicules = $reponse_vehicules->fetch())
	{
		$i = -1;
		do {
		    $i++;
		} while ($vehicules['VehiType'] != $icones[$i]['Type']);
		
		$chemin_icone = $icones[$i]['FichierIcone'];

		$vehicules_json .="new garneau.qe.Vehicule(\"".$vehicules['VehiNo']."\",\"".$vehicules['VehiType']."\",".
		"\"".$vehicules['VehiLat']."\",\"".$vehicules['VehiLng']."\",\"".$chemin_icone."\"),";
	}
	
	$vehicules_json = rtrim($vehicules_json,",");
	$vehicules_json .= "];";
	
	$bdd = null;
	echo $vehicules_json;
	
}
catch (Exception $e)
{
	$erreur_json = " garneau.qe.msgErreurVehicule=\"Erreur de chargement des données sur les vehicules : ".$e->getMessage()."\";";
	echo $erreur_json;
}

?>