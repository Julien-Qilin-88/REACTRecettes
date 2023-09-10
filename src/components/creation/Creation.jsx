import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import axios from 'axios';

function Creations({ recettes, setRecettes, handleRecetteCreation }) {
    const [selectedCategories, setSelectedCategories] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [recette, setRecette] = useState({
        title: '',
        description: '',
        tempsDePreparation: 0,
        tempsDeCuisson: 0,
        ingredients: [''],
        instructions: [''],
        image: '', // État pour stocker l'extension de l'image
        categorie: '', // État pour stocker la catégorie
    });

    const categorie = ['Entrée', 'Salade', 'Plat', 'Dessert', 'Boisson', 'Sauce', 'Autre'];

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Vérifiez si la catégorie est sélectionnée
        if (!selectedCategories) {
            console.error('Veuillez sélectionner une catégorie.');
            return;
        }

        // Ensuite, ajoutez la recette
        await addRecette();

        // Téléchargez l'image ici avant d'ajouter la recette
        await handleImageUpload();


    };

    const handleIngredientChange = (index, value) => {
        const updatedIngredients = [...recette.ingredients];
        updatedIngredients[index] = value;
        setRecette(prevState => ({
            ...prevState,
            ingredients: updatedIngredients
        }));
    };

    const handleInstructionChange = (index, value) => {
        const updatedInstructions = [...recette.instructions];
        updatedInstructions[index] = value;
        setRecette(prevState => ({
            ...prevState,
            instructions: updatedInstructions
        }));
    };

    const handleTitlelChange = (e) => {
        const value = e.target.value;
        setRecette(prevState => ({
            ...prevState,
            title: value
        }));
    };

    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        setRecette(prevState => ({
            ...prevState,
            description: value
        }));
    };

    const handleTempsDePreparationChange = (e) => {
        const value = e.target.value;
        setRecette(prevState => ({
            ...prevState,
            tempsDePreparation: value
        }));
    };

    const handleTempsDeCuissonChange = (e) => {
        const value = e.target.value;
        setRecette(prevState => ({
            ...prevState,
            tempsDeCuisson: value
        }));
    };

    const addIngredient = () => {
        setRecette(prevState => ({
            ...prevState,
            ingredients: [...prevState.ingredients, '']
        }));
    };

    const addInstruction = () => {
        setRecette(prevState => ({
            ...prevState,
            instructions: [...prevState.instructions, '']
        }));
    };

    const handleImageUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('image', selectedImage);
            console.log(selectedImage);
            await axios.post('http://localhost:3002/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Obtenez le nom du fichier téléchargé à partir de la réponse
            const uploadedFileName = selectedImage.name;
            // Construisez le chemin complet de l'image en utilisant le nom du fichier
            const imagePath = `http://localhost:3002/images/${uploadedFileName}`;

            setRecette(prevState => ({
                ...prevState,
                image: imagePath, // Utilisez le chemin de l'image construit
            }));
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
        }
    };

    const addRecette = async () => {

        // recuperer l'id de la recette qui va etre créée
        const recetteId = recettes.length + 1;
        // recuperer l'extension de l'image
        const imageExtension = selectedImage.name.split('.').pop();
        // recuperer le nom de l'image sans l'extension
        const imageName = selectedImage.name.split('.').slice(0, -1).join('.');
        // construire le nom de l'image avec l'id de la recette et l'extension
        const imageFullName = `${imageName}-${recetteId}.${imageExtension}`;


        const imagePath = `http://localhost:3002/images/${imageFullName}`;


        try {
            const response = await axios.post('http://localhost:3002/api/recettes', {
                ...recette,
                categorie: selectedCategories,
                image: imagePath,


            });

            setRecettes([...recettes, response.data]);

            handleRecetteCreation();
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
        }
    };

    return (
        <>

            <h1>Créations</h1>

            <form onSubmit={handleSubmit} className="flex flex-row gap-4 flex-wrap" method="POST">

                <div className="col-6 col-sm-3">
                    <div className="flex flex-column gap-2 ">
                        <label htmlFor="title">Nom :</label>
                        <InputText id="title" name="title" required onChange={handleTitlelChange} />
                    </div>
                    <div className="flex flex-column gap-2 ">
                        <label htmlFor="description">Description :</label>
                        <InputText id="description" name="description" required onChange={handleDescriptionChange} />
                    </div>
                </div>

                <div className="col-6 col-sm-3">
                    <div className="flex flex-column gap-2 ">
                        <label htmlFor="tempsDePreparation">Temps de préparation :</label>
                        <InputText id="tempsDePreparation" name="tempsDePreparation" required onChange={handleTempsDePreparationChange} />
                    </div>
                    <div className="flex flex-column gap-2 ">
                        <label htmlFor="tempsDeCuisson">Temps de cuisson :</label>
                        <InputText id="tempsDeCuisson" name="tempsDeCuisson" required onChange={handleTempsDeCuissonChange} />
                    </div>
                </div>

                <div className="col-6 col-sm-3">
                    <div className="flex flex-column gap-2 ">
                        <label htmlFor="ingredients">Ingrédients :</label>
                        {recette.ingredients.map((ingredient, index) => (
                            <div key={index}>
                                <InputText value={ingredient} onChange={e => handleIngredientChange(index, e.target.value)} />
                            </div>

                        ))}
                        <Button type="button" onClick={addIngredient} label="Ajouter Ingrédient" />
                    </div>
                    <div className="flex flex-column gap-2 ">
                        <label htmlFor="instructions">Instructions :</label>
                        {recette.instructions.map((instruction, index) => (
                            <div key={index}>
                                <InputText value={instruction} onChange={e => handleInstructionChange(index, e.target.value)} />
                            </div>
                        ))}
                        <Button type="button" onClick={addInstruction} label="Ajouter Instruction" />
                    </div>
                </div>

                <div className="col-6 col-sm-3">
                    <div className="flex flex-column gap-2 ">
                        <label htmlFor="image">Image :</label>
                        <FileUpload mode='basic' name="image" accept="image/*" maxFileSize={1000000} onSelect={(e) => setSelectedImage(e.files[0])} />
                    </div>
                    <div className="flex flex-column gap-2 ">
                        <label htmlFor="categorie">Catégorie :</label>
                        <Dropdown
                            name='categorie' value={selectedCategories} options={categorie} onChange={(e) => setSelectedCategories(e.value)} placeholder="Sélectionner une catégorie" />

                    </div>
                    <Button type="submit" label="Envoyer" />
                </div>

            </form>
        </>
    );
}

export default Creations;