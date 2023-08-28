import React, { useState, useRef, useEffect } from 'react';

import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';

import ItemTemplate from './ItemRecette.jsx';
import Recette from './Recette';
import SearchRecette from './SearchRecette';

export default function ListRecette({ fetchRecetteById, recettes, selectedRecette }) {
  const [showRecetteDetails, setShowRecetteDetails] = useState(false);
  const [filteredRecettes, setFilteredRecettes] = useState([]);

  const ds = useRef(null);

  useEffect(() => {
    setFilteredRecettes(recettes);
  }, [recettes]);



  const footer = (
    <Button type="text" icon="pi pi-plus" label="Load" onClick={() => ds.current.load()} />
  );

  return (
    <>
      <SearchRecette
        recettes={recettes}
        selectedRecette={selectedRecette}
        setFilteredRecettes={setFilteredRecettes} // Assurez-vous de transmettre la fonction de mise à jour ici
        ds={ds} // Transmettez la référence à DataScroller
      />
      {showRecetteDetails ? (
        <Recette selectedRecette={selectedRecette} setShowRecetteDetails={setShowRecetteDetails} />
      ) : (
        <DataScroller
          ref={ds}
          value={filteredRecettes} // Utiliser les recettes filtrées
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
      )}
    </>
  );
}
