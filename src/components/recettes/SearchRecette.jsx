import React, { useState, useEffect, useCallback } from 'react';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';

const SearchComponent = ({ recettes, setFilteredRecettes, ds }) => {
  // États pour la recherche par titre et ingrédients
  const [searchTerm, setSearchTerm] = useState('');
  const [ingredientsSearchTerm, setIngredientsSearchTerm] = useState('');
  const [searchType, setSearchType] = useState(''); // État pour suivre le type de recherche
  const [selectedCategory, setSelectedCategory] = useState(''); // État pour la catégorie sélectionnée

  // Gestionnaire de recherche par titre
  const handleSearch = (searchTerm) => {
    // Filtrer les recettes en fonction du terme de recherche
    const filteredRecettes = recettes.filter((recette) =>
      recette.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
    );
    setFilteredRecettes(filteredRecettes); // Mettre à jour la liste des recettes filtrées
    ds.current.reset(); // Réinitialiser le composant de pagination
  };

  // Gestionnaire de changement pour la recherche par titre
  const handleChangeSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  // Utilisation du hook useCallback pour la fonction de recherche par ingrédients
  const handleSearchIngredients = useCallback((ingredients) => {
    const filteredRecettes = recettes.filter((recette) =>
      ingredients.some((ingredient) =>
        recette.ingredients
          .join(', ')
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(ingredient.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
      )
    );
    setFilteredRecettes(filteredRecettes); // Mettre à jour la liste des recettes filtrées
    ds.current.reset(); // Réinitialiser le composant de pagination
  }, [recettes, setFilteredRecettes, ds]);

  // Utilisation du hook useCallback pour la fonction de gestion du changement des ingrédients
  const handleChangeIngredients = useCallback((e) => {
    const value = e.target.value;
    const valueWithCommas = value.replace(/\s+/g, ',');
    setIngredientsSearchTerm(valueWithCommas);

    if (value.trim() === '') {
      setFilteredRecettes(recettes);
      ds.current.reset();
    } else {
      const ingredientsArray = valueWithCommas.split(',').map((ingredient) => ingredient.trim());
      handleSearchIngredients(ingredientsArray);
    }
  }, [recettes, setFilteredRecettes, ds, handleSearchIngredients]);

  // Effet pour la recherche par ingrédients
  useEffect(() => {
    if (ingredientsSearchTerm.trim() === '') {
      setFilteredRecettes(recettes);
      ds.current.reset();
    } else {
      const ingredientsArray = ingredientsSearchTerm
        .split(',')
        .map((ingredient) => ingredient.trim())
        .filter((ingredient) => ingredient !== '');
      handleSearchIngredients(ingredientsArray);
    }
  }, [ingredientsSearchTerm, recettes, setFilteredRecettes, ds, handleSearchIngredients]);

  // Utilisation du hook useEffect pour la recherche par catégories
  useEffect(() => {
    // Vérifier si une catégorie a été sélectionnée
    if (selectedCategory) {
      const filteredRecettes = recettes.filter((recette) =>
        recette.categorie.includes(selectedCategory)
      );
      setFilteredRecettes(filteredRecettes);
      ds.current.reset();
    }
  }, [selectedCategory, recettes, setFilteredRecettes, ds]);

  // Gestionnaire de changement pour la recherche par catégories
  const handleChangeCategories = (e) => {
    const value = e.target.value;
    setSelectedCategory(value); // Mettre à jour la catégorie sélectionnée

  };

  useEffect(() => {
    // Vérifier quel type de recherche est sélectionné
    if (searchType === 'categories') {
      // ... Votre logique pour le bouton "Recherche par catégories" ...
    } else if (searchType === 'titre') {
      // ... Votre logique pour le bouton "Recherche par titre" ...
    } else if (searchType === 'ingredients') {
      // ... Votre logique pour le bouton "Recherche par ingrédients" ...
    }
  }, [searchType, recettes, selectedCategory, searchTerm, ingredientsSearchTerm, setFilteredRecettes, ds]);

  // Classe CSS pour les boutons actifs (surbrillance)
  const activeButtonClass = 'p-button-outlined p-button-success';

  // Rendu du composant
  return (
    <div className="flex flex-row gap-2 m-4 search-container no-wrap">

      {/* Boutons pour les différents types de recherche */}
      <div className="flex flex-row gap-2">
        <Button
          label="Recherche par titre"
          className={searchType === 'titre' ? activeButtonClass : 'p-button-outlined'}
          onClick={() => setSearchType('titre')}
          aria-label="Recherche par titre"
        />
        <Button
          label="Recherche par ingrédients"
          className={searchType === 'ingredients' ? activeButtonClass : 'p-button-outlined'}
          onClick={() => setSearchType('ingredients')}
          aria-label="Recherche par ingrédients"
        />
        <Button
          label="Recherche par catégories"
          className={searchType === 'categories' ? activeButtonClass : 'p-button-outlined'}
          onClick={() => setSearchType('categories')}
          aria-label="Recherche par catégories"
        />
      </div>

      {/* Sélection de catégories */}
      {searchType === 'categories' && (
        <fieldset>
          <legend>Choisissez une catégorie :</legend>
          <div className="flex flex-wrap gap-3">
            {recettes
              .reduce((uniqueRecettes, recette) => {
                const isCategoryExists = uniqueRecettes.some(
                  (uniqueRecette) => uniqueRecette.categorie === recette.categorie
                );

                if (!isCategoryExists) {
                  uniqueRecettes.push(recette);
                }

                return uniqueRecettes;
              }, [])
              .map((uniqueRecette) => (
                <div key={uniqueRecette.id} className="flex align-items-center">
                  <RadioButton
                    inputId={uniqueRecette.id}
                    name="categorie"
                    value={uniqueRecette.categorie}
                    onChange={handleChangeCategories}
                    checked={selectedCategory === uniqueRecette.categorie}
                  />
                  <label htmlFor={uniqueRecette.id} className="ml-2">
                    {uniqueRecette.categorie}
                  </label>
                </div>
              ))}
          </div>
        </fieldset>
      )}
      {searchType === 'titre' && (
        <div className='flex flex-column'>

          {/* Champ de recherche par titre */}

          <label htmlFor="searchInput" className="search-label">
            Rechercher des recettes :
          </label>
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              id="searchInput"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={handleChangeSearch}
              aria-label="Champ de recherche de recettes"
            />
          </span>
        </div>
      )}
      {searchType === 'ingredients' && (
        <div className='flex flex-column'>
          {/* Champ de recherche par ingrédients */}
          <label htmlFor="searchIngredients" className="search-label">
            Rechercher des recettes par ingrédients :
          </label>
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              id="searchIngredients"
              placeholder="Rechercher..."
              value={ingredientsSearchTerm}
              onChange={handleChangeIngredients}
              aria-label="Champ de recherche de recettes par ingrédients"
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
