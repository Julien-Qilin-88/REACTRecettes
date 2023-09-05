import React, { useState, useEffect } from 'react'; // Importe les modules React nécessaires
import { Card } from 'primereact/card'; // Importe le composant Card de PrimeReact
import { Button } from 'primereact/button'; // Importe le composant Button de PrimeReact
import ButtonBack from '../Elements/ButtonBack'; // Importe le composant ButtonBack personnalisé

// Composant de détails de recette
export default function Recette(props) {
    const { selectedRecette, setShowRecetteDetails, setPage, handleEditRecette, page } = props; // Déstructure les props pour accéder facilement à leurs valeurs
    const [showEditButton, setShowEditButton] = useState(''); // État local pour contrôler la visibilité du bouton "Modifier"

    // Effet pour gérer la visibilité du bouton "Modifier" en fonction de la page actuelle
    useEffect(() => {
        if (page === 'edit') {
            setShowEditButton('none'); // Cache le bouton "Modifier" si la page est en mode d'édition
        } else {
            setShowEditButton(''); // Affiche le bouton "Modifier" dans les autres cas
        }
    }, [page]);

    // Vérifie s'il y a une recette sélectionnée à afficher, sinon retourne "null"
    if (!selectedRecette || selectedRecette.length === 0) {
        return null;
    }

    // Gestionnaire de clic pour le bouton "Modifier" de la recette
    const handleClickChangeRecette = () => {
        handleEditRecette(selectedRecette.id); // Appelle la fonction pour modifier la recette
    }

    // Rendu du composant de détails de recette
    return (
        <Card title={selectedRecette.title} style={{ width: '100%' }}>
            <img className='card__image' src={selectedRecette.image} alt={selectedRecette.title} />
            <p>temps de préparation : {selectedRecette.tempsDePreparation} minutes</p>
            <p>temps de cuisson : {selectedRecette.tempsDeCuisson} minutes</p>

            <h3>Ingrédients</h3>
            <ul>
                {selectedRecette.ingredients && selectedRecette.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>

            <h3>Instructions</h3>
            <ol>
                {selectedRecette.instructions && selectedRecette.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                ))}
            </ol>
            <p>Bon appétit !</p>

            {/* Affiche le bouton de retour et de navigation si les fonctions sont fournies en props */}
            {setShowRecetteDetails && setPage && <ButtonBack setShowRecetteDetails={setShowRecetteDetails} setPage={setPage} />}

            {/* Affiche le bouton "Modifier" si la fonction handleEditRecette est fournie en props */}
            {handleEditRecette && <Button label="Modifier" onClick={handleClickChangeRecette} style={{ display: showEditButton }} />}

        </Card>
    );
}
