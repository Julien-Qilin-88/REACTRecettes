import React, { useState, useRef, useEffect } from 'react';

import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';

import ItemTemplate from './ItemRecette.jsx';
import Recette from './Recette';
import SearchRecette from './SearchRecette';

export default function ListRecette({ fetchRecetteById, recettes, selectedRecette }) {
  const [showRecetteDetails, setShowRecetteDetails] = useState(false);
  const [filteredRecettes, setFilteredRecettes] = useState([]);
  const [loadedRecettesCount, setLoadedRecettesCount] = useState(0);
  const [allRecettesLoaded, setAllRecettesLoaded] = useState(false);

  const ds = useRef(null);

  useEffect(() => {
    setFilteredRecettes(recettes);
    setLoadedRecettesCount(0);
    setAllRecettesLoaded(false);
  }, [recettes]);

  useEffect(() => {
    if (loadedRecettesCount >= recettes.length) {
      setAllRecettesLoaded(true);
    }
  }, [loadedRecettesCount, recettes]);

  const handleLoadMore = () => {
    ds.current.load();
    setLoadedRecettesCount(prevCount => prevCount + 5);
  };

  const footer = (
    <div>{allRecettesLoaded ? "Toutes les recettes chargées" : <Button type="text" icon="pi pi-plus" label="Charger" onClick={handleLoadMore} />}</div>
  );

  return (
    <>
      {showRecetteDetails ? (
        <Recette selectedRecette={selectedRecette} setShowRecetteDetails={setShowRecetteDetails} />
      ) : (
        <>
          <SearchRecette
            recettes={recettes}
            selectedRecette={selectedRecette}
            setFilteredRecettes={setFilteredRecettes}
            ds={ds}
          />
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
              />
            )}
          />
        </>
      )}
    </>
  );
}
