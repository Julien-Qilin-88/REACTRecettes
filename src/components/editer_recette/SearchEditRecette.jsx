import { useState } from 'react';

import { InputText } from 'primereact/inputtext';
import { DataScroller } from 'primereact/datascroller';

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
        console.log(filteredRecettes);
    };

    const handleChangeSearchEdit = (e) => {
        const value = e.target.value;
        setSearchTermEdit(value);
        handleSearchEdit(value);
    };

    console.log(searchTermEdit);

    return (
        <>
            <div className='flex gap-4'>
                <InputText placeholder="Rechercher une recette" value={searchTermEdit} onChange={handleChangeSearchEdit} />
            </div>

            <DataScroller
                ref={dsEdit}
                value={filteredRecettes} // Utilisez les recettes filtrées
                itemTemplate={(recette) => (
                    <div className='flex gap-4'>
                        <div className='card'>
                            <img className='card__image' src={recette.image} alt={recette.title} />
                            <div className='card__body'>
                                <h2 className='card__title'>{recette.title}</h2>
                                <p className='card__description'>{recette.description}</p>
                                <button onClick={() => setSelectedRecette(recette)}>Éditer</button> {/* Bouton d'édition */}
                            </div>
                        </div>
                    </div>
                )}
                rows={5}
                inline
                scrollHeight="500px"
            />
            />

        </>


    );
};

export default SearchEditRecette;