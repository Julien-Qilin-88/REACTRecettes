import { useState } from 'react';

import { InputText } from 'primereact/inputtext';
import { DataScroller } from 'primereact/datascroller';
import ItemRecette from '../ItemRecette';

const SearchEditRecette = ({ recettes, filteredRecettes, setFilteredRecettes, dsEdit, setSelectedRecette }) => {
    const [searchTermEdit, setSearchTermEdit] = useState('');

    const handleSearchEdit = (searchTermEdit) => {
        const filteredRecettes = recettes.filter((recette) =>
            recette.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(searchTermEdit.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
        );
        setFilteredRecettes(filteredRecettes);
        if (dsEdit.current) {
            dsEdit.current.reset();
        }

    };

    const handleChangeSearchEdit = (e) => {
        const value = e.target.value;
        setSearchTermEdit(value);
        handleSearchEdit(value);
    };


    return (
        <>
            <div className='flex gap-4'>
                <InputText placeholder="Rechercher une recette" value={searchTermEdit} onChange={handleChangeSearchEdit} />
            </div>

            <DataScroller
                ref={dsEdit}
                value={filteredRecettes} // Utilisez les recettes filtrées
                rows={filteredRecettes.length} // Nombre de recettes à afficher
                inline
                scrollHeight="500px"
                itemTemplate={(recette) => (
                    <ItemRecette
                        {...recette}
                        setSelectedRecette={setSelectedRecette}

                    />
                )}
            />


        </>


    );
};

export default SearchEditRecette;