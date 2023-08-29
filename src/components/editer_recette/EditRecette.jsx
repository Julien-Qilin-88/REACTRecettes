import Recette from '../recettes/Recette';

const EditRecette = ({ recettes, setRecettes, handleEditRecette, showRecetteDetails, setShowRecetteDetails, selectedRecette, setPage }) => {


    const onClick = (e) => {
        e.preventDefault();
        console.log('Enregistrer les modifications');
    };


    return (
        <>
            <h1>Editer recette</h1>
            {selectedRecette && (
                <Recette
                    selectedRecette={selectedRecette}
                    showRecetteDetails={showRecetteDetails}
                    setShowRecetteDetails={setShowRecetteDetails}
                    setPage={setPage}
                />
            )}

            <button onClick={onClick}>Enregistrer les modifications</button>
        </>
    );
};

export default EditRecette;