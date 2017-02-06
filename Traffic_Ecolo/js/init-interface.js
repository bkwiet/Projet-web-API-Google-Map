// Fonctions et variables pour l'initialisation et la gestion de l'interface
// *************************************************************************

// Vérification de l'existence de l'espace de noms "garneau".
if ( typeof garneau == "undefined" )
	var garneau = {} ; // Création de l'espace de noms "garneau" s'il n'existe pas déjà.
// Création du sous espace de noms "garneau.qe".
garneau.qe = {};


// =================================================================================
// Fonction appelée après le chargement de la page pour initialiser la carte Google.
// La fonction est ajoutée à l'espace de noms "garneau.qe".
// =================================================================================
garneau.qe.initCarteGoogle = function()
{
	// Position initiale du centre de la carte. 
	var posCentre = new google.maps.LatLng(46.811661,-71.254621);
	
	// Object JSON pour les options d'affichage.
	var optionsCarte = {
		zoom: 12,
		center: posCentre,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDoubleClickZoom : true,
		navigationControl : true,
		navigationControlOptions: {style: google.maps.NavigationControlStyle.DEFAULT},
		mapTypeControl: true,
		mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
		scaleControl: true
	};
	
	// Création de la carte Google à ajout de la variable "carte" à l'espace de nom "garneau.qe".
	garneau.qe.carte = new google.maps.Map(document.getElementById("divCarteGoogle"), optionsCarte);
  		
};

garneau.qe.elementsCharges = {"dom": false, "donneeVehicules":false,"donneeCentres":false};

// Permet de controler le chargement des données 
garneau.qe.controleurChargement = function (nouvElemCharge) {
	console.log('controleurChargement: Nouvel élément chargé "' + nouvElemCharge + '".');
	// Est-ce que c'est un élément dont le chargement doit être contrôlé ?
	if (typeof garneau.qe.elementsCharges[nouvElemCharge] != "undefined") {
		// Chargement effectué pour cet élément.
		garneau.qe.elementsCharges[nouvElemCharge] = true;
		// Est-ce que tous les éléments sont chargés ?
		var tousCharge = true;
		for (var elem in garneau.qe.elementsCharges) {
			if ( !garneau.qe.elementsCharges[elem] )
				tousCharge = false;
		}
		// Si tous les éléments ont été chargés, appelle de la fonction qui
		// fait le traitement post-chargement.
		if (tousCharge) {
			console.log('controleurChargement: Tous les éléments ont été chargés.');
			garneau.qe.initCarteGoogle();
			garneau.qe.AfficherVehicule(garneau.qe.lstVehicules);
			garneau.qe.AfficherCentres(garneau.qe.lstCentres);
			garneau.qe.ChargerListeVehicule();
			garneau.qe.carte.fitBounds(coordMarker());
						
		} else {
			console.log('controleurChargement: Il reste encore des éléments à charger.');
		}
	}
};

// Gestionnaire d'événements pour le chargement du DOM.
window.addEventListener('load', function() {
		console.log('DOM chargé.');
		// On informe le contrôleur (une simple fonction) que le DOM est chargé.
		garneau.qe.controleurChargement("dom");
		garneau.qe.ChargerDonneeVehicule();
		garneau.qe.ChargerDonneeCentre();
	}, false);
