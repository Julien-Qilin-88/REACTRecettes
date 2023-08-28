import React, { useState } from 'react';
import { DataScroller } from 'primereact/datascroller';
import ItemTemplate from './ItemRecette.jsx';
import Recette from './Recette';

export default function ListRecette({ fetchRecetteById, recettes, selectedRecette }) {
    const [showRecetteDetails, setShowRecetteDetails] = useState(false); // État pour afficher les détails de la recette


    return (
        <>
            {showRecetteDetails ? (
                // Afficher les détails de la recette si showRecetteDetails est true
                <Recette selectedRecette={selectedRecette} setShowRecetteDetails={setShowRecetteDetails} />
            ) : (
                // Sinon, afficher la liste des recettes avec le DataScroller
                <div className="card">
                    <DataScroller
                        value={recettes}
                        itemTemplate={(props) => (
                            <ItemTemplate
                                {...props}
                                fetchRecetteById={fetchRecetteById}
                                selectedRecette={selectedRecette}
                                setShowRecetteDetails={setShowRecetteDetails}
                                
                            />
                        )}
                        rows={8}
                        inline
                        scrollHeight="700px"
                        header="Liste des recettes"
                    />
                </div>
            )}
        </>
    );
}
