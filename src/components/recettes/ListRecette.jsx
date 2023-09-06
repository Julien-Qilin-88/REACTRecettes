import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import ItemTemplate from './ItemRecette.jsx'; // Importe le modèle d'élément de recette
import Recette from './Recette'; // Importe le composant de détails de recette
import SearchRecette from './SearchRecette'; // Importe le composant de recherche de recette

// Composant de liste de recettes
export default function ListRecette({ fetchRecetteById, recettes, selectedRecette, showRecetteDetails, setShowRecetteDetails, setPage, handleEditRecette, page, filteredRecettes, setFilteredRecettes, isAuthenticated, ...props }) {

  // États pour gérer la liste filtrée de recettes et la pagination

  const [loadedRecettesCount, setLoadedRecettesCount] = useState(0);
  const [allRecettesLoaded, setAllRecettesLoaded] = useState(false);

  // Référence pour le composant DataScroller
  const ds = useRef(null);

  // Effet pour initialiser la liste filtrée de recettes et la pagination
  useEffect(() => {
    setFilteredRecettes(recettes);
    setLoadedRecettesCount(0);
    setAllRecettesLoaded(false);
  }, [recettes, setFilteredRecettes]);

  // Effet pour déterminer si toutes les recettes ont été chargées
  useEffect(() => {
    if (loadedRecettesCount >= recettes.length) {
      setAllRecettesLoaded(true);
    }
  }, [loadedRecettesCount, recettes]);

  // Gestionnaire pour charger plus de recettes
  const handleLoadMore = () => {
    ds.current.load();
    setLoadedRecettesCount(prevCount => prevCount + 5);
  };

  // Pied de la liste (bouton de chargement ou message "Toutes les recettes chargées")
  const footer = (
    <div>
      {allRecettesLoaded ? "Toutes les recettes chargées" : <Button type="text" icon="pi pi-plus" label="Charger" onClick={handleLoadMore} />}
    </div>
  );

  // Rendu du composant
  return (
    <>
      {showRecetteDetails ? (
        <Recette selectedRecette={selectedRecette} setShowRecetteDetails={setShowRecetteDetails} setPage={setPage} handleEditRecette={handleEditRecette} page={props.page} isAuthenticated={isAuthenticated} />
      ) : (
        <>
          {/* Composant de recherche de recette */}
          <SearchRecette
            recettes={recettes}
            selectedRecette={selectedRecette}
            setFilteredRecettes={setFilteredRecettes}
            ds={ds}
          />
          {/* Composant DataScroller pour afficher la liste paginée de recettes */}
          <DataScroller
            ref={ds}
            value={filteredRecettes}
            rows={5}
            footer={footer}
            itemTemplate={(recette) => (
              <ItemTemplate
                fetchRecetteById={fetchRecetteById}
                setShowRecetteDetails={setShowRecetteDetails}
                {...recette}
                handleEditRecette={handleEditRecette}
                isAuthenticated={isAuthenticated}
              />
            )}
          />
        </>
      )}
    </>
  );
}
