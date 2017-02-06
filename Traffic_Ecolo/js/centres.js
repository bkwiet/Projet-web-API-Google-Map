// Fonctions et variables pour la gestions des centres
// ****************************************************

// Objet centre
garneau.qe.Centre = function(numero,emplacement,adresse,ville,codepostal,telephone,fax,type,latitude,longitude,url,icone)
{
	// Attributs centre
	this.numero = numero;
	this.emplacement = emplacement;
	this.adresse = adresse;
	this.ville = ville;
	this.codepostal = codepostal;
	this.telephone = telephone;
	this.fax = fax;
	this.type = type;
	this.latitude = latitude;
	this.longitude = longitude;
	this.url = url;
	this.icone = icone;
	
	this.MarkerInfo = function()
	{
		var info =
		'<div class="infoCentres">'
				+ '<img src="images/centres/centre-'+ this.numero +'.jpg" alt="image centre">'
				+ '<h1>' + this.emplacement + '</h1>'
				+ '<p>' + this.adresse +' '+ this.ville +', '+ this.codepostal + '</p>'
				+ '<p>Téléphone : ' + this.telephone +'</p>'
				+ '<p>Fax : ' + this.fax +'</p>'
				+ '<p><a href="#" onclick="ouvrirFenetre(\''+ this.url +'\',\''+
				this.emplacement +'\')">Informations supplémentaire</a></p>'+
		'</div>';
			
		return info;	
				 
	};
};

// Permet de charger les données sur les centres a partir du serveur 
// et de creer les objets centres
garneau.qe.ChargerDonneeCentre = function()
{
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", 'ajax/liste-centres-xml.php', false);
	xmlhttp.send(null);
	
	if(xmlDoc = new DOMParser().parseFromString(xmlhttp.responseText,'text/xml')) 
	{
		var centres = xmlDoc.getElementsByTagName("centre");
		garneau.qe.lstCentres = [];
		
		for(var i = 0; i< centres.length; i++)
		{
			
			garneau.qe.lstCentres.push(new garneau.qe.Centre(
				centres[i].getElementsByTagName("no")[0].textContent, 	//numero
				centres[i].getElementsByTagName("emplacement")[0].textContent,	//emplacement
				centres[i].getElementsByTagName("adresse")[0].textContent,	//adresse
				centres[i].getElementsByTagName("ville")[0].textContent,	//ville
				centres[i].getElementsByTagName("codepostal")[0].textContent,	//code postal
				centres[i].getElementsByTagName("telephone")[0].textContent,	//telephone
				centres[i].getElementsByTagName("fax")[0].textContent,	//fax
				centres[i].getElementsByTagName("type")[0].textContent,	//type
				centres[i].getElementsByTagName("lat")[0].textContent,	//latitude
				centres[i].getElementsByTagName("lng")[0].textContent,	//longitude
				centres[i].getElementsByTagName("url")[0].textContent,	//url
				centres[i].getElementsByTagName("icone")[0].textContent	//icone
			) );
		}
		
		console.log('Chargement données centres');	
		garneau.qe.controleurChargement("donneeCentres");	
	}
	else if(typeof garneau.qe.msgErreurCentre != "undefined" )
	{
		alert(garneau.qe.msgErreurCentre);
	}
	else
	{
		alert("une erreure lors du chargement des données des centres c'est produite");
	}
};

// Permet d'afficher tous les centres sur la map
garneau.qe.AfficherCentres = function(lstCentres)
{
	var infoCentre= new google.maps.InfoWindow(), markerCentre, i; 
	garneau.qe.lstMarkerCentres = [];
	
	for(var i=0; i < lstCentres.length; i++)
	{
		var posCentre = new google.maps.LatLng(lstCentres[i].latitude,lstCentres[i].longitude);
		
		markerCentre = new google.maps.Marker({"position": posCentre, "map": garneau.qe.carte,
		"icon": 'images/icones/'+lstCentres[i].icone});
		
		google.maps.event.addListener(markerCentre, 'click', (function(markerCentre,i) {return function(){infoCentre.setContent(lstCentres[i].MarkerInfo()); 
				infoCentre.open(garneau.qe.carte ,this);};})(markerCentre, i));
		
		garneau.qe.lstMarkerCentres.push(markerCentre);
	}
};
