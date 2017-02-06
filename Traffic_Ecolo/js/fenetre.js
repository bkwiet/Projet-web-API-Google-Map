// Fichier contenant diverses fonctions utilitaires pour la gestion des fenêtres
// =============================================================================

// Fonction qui ouvre une nouvelle fenêtre avec tous les gadgets.
// Retourne une référence à la fenêtre crée.
function ouvrirFenetre(URL, nomFen)
{
	return window.open(URL, nomFen, "scrollbars=yes,resizable=yes,menubar=yes,toolbar=yes,location=yes,status=yes");
}

