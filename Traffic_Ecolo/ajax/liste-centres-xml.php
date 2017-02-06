<?php
// Retourne du contenu en format XML.
header("Content-type: text/xml; charset=utf-8");

// Force l'expiration immédiate de la page au niveau du navigateur Web; elle n'est pas conservée en cache.
header("Expires: Thu, 19 Nov 1981 08:52:00 GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0");
header("Pragma: no-cache");

try{
	
	// include des paramétres de connections a la base de données 
	include("../include/param_bd.inc");
	
	// Connection a la Base de données et selection de la table
	$bdd = new PDO('mysql:host='.$dbHote.';dbname='.$dbNom, $dbUtilisateur, $dbMotPasse );
		
	// Récupération des inforfamations sur les centres contenu dans la table
	$reponse_centres = $bdd->query("SELECT *  FROM centres");
	$reponse_icones = $bdd->query("SELECT * FROM icones");
	$icones = $reponse_icones->fetchALL();
	
	// Creation du fichier xml 
	$xml = new DOMDocument('1.0','UTF-8');
	$centres_xml = $xml->createElement("centres");
	$centres_xml = $xml->appendChild($centres_xml);
		
	while($centres = $reponse_centres->fetch())
	{
		$i = -1;
		do {
		    $i++;
		} while ($centres['Type'] != $icones[$i]['Type']);
		
		$chemin_icone = $icones[$i]['FichierIcone'];
				
		$centre = $xml->createElement("centre");
		$centre = $centres_xml->appendChild($centre);
		$centre->appendChild($xml->createElement('no',htmlspecialchars($centres['No'])));
		$centre->appendChild($xml->createElement('emplacement',utf8_encode($centres['Emplacement'])));
		$centre->appendChild($xml->createElement('adresse',utf8_encode($centres['Adresse'])));
		$centre->appendChild($xml->createElement('ville',utf8_encode($centres['Ville'])));
		$centre->appendChild($xml->createElement('codepostal',htmlspecialchars($centres['CodePostal'])));
		$centre->appendChild($xml->createElement('telephone',htmlspecialchars($centres['Telephone'])));
		$centre->appendChild($xml->createElement('fax',htmlspecialchars($centres['Fax'])));
		$centre->appendChild($xml->createElement('type',htmlspecialchars($centres['Type'])));
		$centre->appendChild($xml->createElement('lat',htmlspecialchars($centres['Lat'])));
		$centre->appendChild($xml->createElement('lng',htmlspecialchars($centres['Lng'])));
		$centre->appendChild($xml->createElement('url',htmlspecialchars($centres['URL'])));
		$centre->appendChild($xml->createElement('icone',htmlspecialchars($chemin_icone)));
	}

	$bdd = null;
	$xml->formatOutput = true;
	echo $xml->saveXML();
	
}
catch (Exception $e)
{
	header("Content-type: application/json; charset=utf-8");
	
	$erreur_json = "garneau.qe.msgErreurCentre=\"Erreur de chargement des données sur les centres : ".$e->getMessage()."\";";
	echo $erreur_json;
}


?>