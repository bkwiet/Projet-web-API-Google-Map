// Raccourci pour la fonction "getElementById".
// Retourne l'objet correspondant � l'identifiant (attribut id) re�u en param�tre.
function $(idElem) {
	return document.getElementById(idElem);
}

// Fonction permettant de voir le code HTML d'un objet DOM re�u en param�tre.
// Utile pour le debogage uniquement.
function voirCode(objDOM) {			
	// Utilisation de la propri�t� "outerHTML" si elle est disponible (nouveaut� HTML5).
	if ( typeof  objDOM.outerHTML  !=  "undefined" )
		alert("Code HTML de l'objet DOM\n" + objDOM.outerHTML);
	else
		// Utilisation de la propri�t� "innerHTML" vu que "outerHTML" n'est pas disponible.
		alert("Code HTML de l'int�rieur de l'objet DOM (EXCLUANT la racine de l'�l�ment)\n" + objDOM.innerHTML);
}

// Permet de charger un script de façon asynchrone
function chargerScriptAsync(urlFichier, callbackFct) {
	var script = document.createElement('script');
	script.src = urlFichier;
	script.async = true;
	// Fonction de callback (optionnel) après le chargement asynchrone du script.
	if (typeof callbackFct == "function") {
		script.addEventListener('load', callbackFct, false);
	}
	document.documentElement.firstChild.appendChild(script);
}

// Afficher ou masquer la couche traffic sur la map
function afficherMasquerTrafic()
{
	if ( typeof garneau.qe.trafficLayer == "undefined" )
	{
		garneau.qe.trafficLayer = new google.maps.TrafficLayer();
		garneau.qe.trafficLayer.setMap(garneau.qe.carte);
		document.getElementById("btnAfficherTraffic").innerHTML = "Masquer traffic";
	}
	else
	{
		garneau.qe.trafficLayer.setMap(null);
		delete garneau.qe.trafficLayer;
		document.getElementById("btnAfficherTraffic").innerHTML = "Afficher traffic";
	}
}

// Permet de cacher les elements entre une balise html
function hide(element)
{document.getElementById(element).innerHTML = "";}

// Permet de recuperer les coordoonnées de tous les markers et retourne
// un tableau de coordoonées 
function coordMarker()
{
	var latLngMarkers = new google.maps.LatLngBounds();
	
	for(var i = 0 ; i < garneau.qe.lstMarkerVehicule.length ; i++)
	{
		latLngMarkers.extend(garneau.qe.lstMarkerVehicule[i].getPosition());
	}
	
	for(var i = 0 ; i < garneau.qe.lstMarkerCentres.length ; i++)
	{
		latLngMarkers.extend(garneau.qe.lstMarkerCentres[i].getPosition());
	}
	
	return latLngMarkers;
}

console.log('util.js: Script synchrone chargé.');
