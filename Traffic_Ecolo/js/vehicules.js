// Fonctions et variables pour la gestions des véhicules
// ******************************************************************

// Objet vehicule
garneau.qe.Vehicule = function (numero,type,latitude,longitude,icone)
{
	// Attributs vehicule
	this.numero = numero;
	this.type = type;
	this.latitude = latitude;
	this.longitude = longitude;	
	this.icone = icone;
	
	this.MarkerInfo = function()
	{
		var info = " Vehicule numéro "+ this.numero;			
		return info;	
				 
	};
};

// Permet de charger les données sur les vehicules a partir du serveur
garneau.qe.ChargerDonneeVehicule = function()
{
	chargerScriptAsync('ajax/liste-vehicules-json.php',function(){
		console.log('Chargement données vehicules');	
		garneau.qe.controleurChargement("donneeVehicules");});	
};

// Permet de creer les markers et d'afficher les vehicules sur la map 
garneau.qe.AfficherVehicule = function(lstVehicules)
{
	garneau.qe.lstMarkerVehicule = [];
		
	for(var i=0; i < lstVehicules.length; i++)
	{
		var posVehicule = new google.maps.LatLng(lstVehicules[i].latitude,lstVehicules[i].longitude);
		var latitude = parseFloat(lstVehicules[i].latitude);
		var longitude = parseFloat(lstVehicules[i].longitude);
		markerVehicule = new google.maps.Marker({"position": posVehicule, "map": garneau.qe.carte,
		"draggable":true,"icon": 'images/icones/'+lstVehicules[i].icone, "title":lstVehicules[i].MarkerInfo()});
		markerVehicule.setZIndex(i);
		
		google.maps.event.addListener(markerVehicule, 'click', (function() {garneau.qe.carte.setCenter(this.getPosition() );}));
		google.maps.event.addListener(markerVehicule, 'dragend', (function() {garneau.qe.DeplacerVehicule(this);}));
		
		garneau.qe.lstMarkerVehicule.push(markerVehicule);
	}
	
};

// Permet de masquer tous les vehicules sur la map
garneau.qe.MasquerMarkerVehicules = function()
{
	for(var i = 0 ; i < garneau.qe.lstMarkerVehicule.length ; i++ )
	{
		var btnVehiculeId = 'btnVehicule_'+i;
		var btnVehicule = document.getElementById(btnVehiculeId);
		btnVehicule.setAttribute('class','masque');
		
		garneau.qe.lstMarkerVehicule[i].setVisible(false);
	}
};

// Permet d'afficher tous les vehicules sur la map
garneau.qe.AfficherMarkerVehicules = function()
{
	for(var i = 0 ; i < garneau.qe.lstMarkerVehicule.length ; i++ )
	{	
		if(!garneau.qe.lstMarkerVehicule[i].getVisible())
		{
			var btnVehiculeId = 'btnVehicule_'+i;
			var btnVehicule = document.getElementById(btnVehiculeId);
			btnVehicule.setAttribute('class','affiche');
			
			garneau.qe.lstMarkerVehicule[i].setVisible(true);
		}
	}
};

// Permet de generer dynamiquement la liste des vehicules pésents sur la map
garneau.qe.ChargerListeVehicule = function()
{
	var liste = document.getElementById("lstVehi");
	
	for(var i=0; i < garneau.qe.lstVehicules.length; i++)
	{
		var puceVehicule = document.createElement('li');
		var btnVehicule = document.createElement('button');
		var	btnIDAtrrib = 'btnVehicule_'+i;
		var btnCssAttrib = 'affiche';
		var btnOnclickAttrib = 'garneau.qe.MasquerAfficherMarkerVehicule('+i+')';
		
		btnVehicule.innerHTML = garneau.qe.lstVehicules[i].numero ;
		btnVehicule.setAttribute('id',btnIDAtrrib);
		btnVehicule.setAttribute('class',btnCssAttrib);		
		btnVehicule.setAttribute('onclick',btnOnclickAttrib);
		puceVehicule.appendChild(btnVehicule);
		liste.appendChild(puceVehicule);
	}
};

// Permet de masquer ou afficher un vehicule sur la map
garneau.qe.MasquerAfficherMarkerVehicule = function(index)
{
	var btnVehiculeId = 'btnVehicule_'+index;
	var btnVehicule = document.getElementById(btnVehiculeId);
	
	if(garneau.qe.lstMarkerVehicule[index].getVisible() == true)
	{
		garneau.qe.lstMarkerVehicule[index].setVisible(false);
		btnVehicule.setAttribute('class','masque');
	}	
	else
	{
		garneau.qe.lstMarkerVehicule[index].setVisible(true);
		btnVehicule.setAttribute('class','affiche');
	}
};

// Permet de gerer le deplacement d'un vehicule et de gerer l'enregistrement
// des nouvelles coordoonnées si il est deplacé
garneau.qe.DeplacerVehicule = function(marker)
{	
	var index = marker.getZIndex();
	
	var boiteConfirmation=confirm("Confirmez vous le déplacement du véhicule no."+ 
		garneau.qe.lstVehicules[index].numero);
	
	
	if(boiteConfirmation == false)
	{
		var posVehicule = 
		new google.maps.LatLng(garneau.qe.lstVehicules[index].latitude,
			garneau.qe.lstVehicules[index].longitude);
		marker.setPosition(posVehicule);
	}
	else
	{
		// Changement de la position dans l'objet'
		var positionVehicule = marker.getPosition();
		garneau.qe.lstVehicules[index].latitude = positionVehicule.lat();
		garneau.qe.lstVehicules[index].longitude = positionVehicule.lng();
		
		// Enregistrement de la position dans la base de données
		var xhttp = new XMLHttpRequest();
		var postUrl ='ajax/modif-coord-vehicule-json.php';
		var PostParam = 
			'vehiNumero='+ garneau.qe.lstVehicules[index].numero
			+'&vehiLat='+ garneau.qe.lstVehicules[index].latitude
			+'&vehiLng='+ garneau.qe.lstVehicules[index].longitude;
		
		// Creation de la requete
		xhttp.open("POST",postUrl,true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.setRequestHeader("Content-length", PostParam.length);
		
		// Affichage de la confirmation d'enregistrement
		xhttp.onreadystatechange = function() {
		    if(xhttp.readyState == 4 && xhttp.status == 200) 
		    {
		    	var divMsgConfirm = document.getElementById("msgConfirm");		    	
				var btnMsgConfirm = document.createElement('button');
				var	btnIDAtrrib = 'btnMsgConfirm';
				var btnOnclickAttrib = 'hide("msgConfirm")';
								
				btnMsgConfirm.innerHTML = "ok";
				btnMsgConfirm.setAttribute('id',btnIDAtrrib);	
				btnMsgConfirm.setAttribute('onclick',btnOnclickAttrib);
				
				// choix du message selon la reponse du serveur  		    	
		        if(xhttp.responseText == "reussi")
		        {
		        	divMsgConfirm.setAttribute('class','msgSucces');
					divMsgConfirm.innerHTML ="Mise à jour de la position du vehicule no "+ 
					garneau.qe.lstVehicules[index].numero +" effectuée";
		        }
		        else
		        {
		        	divMsgConfirm.setAttribute('class','msgErreur');
					divMsgConfirm.innerHTML ="Mise a jour de la position du vehicule no "+ 
					garneau.qe.lstVehicules[index].numero +" échouée";
		        }
		        
		        divMsgConfirm.appendChild(btnMsgConfirm);
		        
		    }	
		};
		xhttp.send(PostParam);
		
	}
	
};


