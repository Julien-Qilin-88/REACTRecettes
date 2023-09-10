import React from 'react';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';


// Composant fonctionnel pour afficher un élément de recette
const ItemTemplate = (props) => {
    const { fetchRecetteById, setShowRecetteDetails, isAuthenticated } = props;

    // Gestionnaire de clic pour afficher les détails de la recette
    function handleClick() {
        fetchRecetteById(props.id); // Appelle la fonction fetchRecetteById avec l'ID de la recette
        setShowRecetteDetails(true); // Affiche les détails de la recette
    }

    // Gestionnaire de clic pour modifier la recette
    const handleClickChangeRecette = () => {
        props.handleEditRecette(props.id); // Utilise props.handleEditRecette pour appeler la fonction de modification de recette
    }


    // Rendu du composant
    return (
        <>
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-2 gap-4">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:flex mx-auto border-round" src={props.image} alt={props.title} />
                    <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                        <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                            <div className="flex flex-column gap-1">
                                <div className="text-2xl font-bold text-900">{props.title}</div>
                                <div className="text-700">{props.description}</div>
                            </div>
                            <div className="flex flex-column gap-2">
                                {/* Affichage de la note de la recette */}
                                <Rating value={4} readOnly cancel={false}></Rating>
                                <span className="flex align-items-center gap-2">
                                    {/* Affichage de la catégorie de la recette */}
                                    <span className="font-semibold">{props.categorie}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row lg:flex-row align-items-center lg:align-items-end gap-4 lg:gap-2">
                            {/* Bouton pour voir les détails de la recette */}
                            <Button label="Voir la recette" onClick={handleClick} />
                            {/* Bouton pour modifier la recette */}
                            {isAuthenticated && <Button label="Modifier la recette" onClick={handleClickChangeRecette} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ItemTemplate;
