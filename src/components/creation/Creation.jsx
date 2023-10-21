import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import axios from 'axios';
import './creation.css'


function Creations({ recettes, setRecettes, handleRecetteCreation }) {
    const [selectedCategories, setSelectedCategories] = useState(null);
    const [recette, setRecette] = useState({
        title: '',
        description: '',
        tempsDePreparation: 0,
        tempsDeCuisson: 0,
        ingredients: [''],
        instructions: [''],
        image: '',
    });

    const categorie = ['Entrée', 'Salade', 'Plat', 'Dessert', 'Boisson', 'Sauce', 'Autre'];
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Assurez-vous que les données du formulaire sont formatées en tant qu'objet JSON
        // Assurez-vous que les données du formulaire sont formatées en tant qu'objet JSON
        const userId = Number(localStorage.getItem('userId')); // Récupérez l'ID de l'utilisateur à partir du localStorage
        const user = localStorage.getItem('user');
        const formData = {
            idUser: userId, // Récupérez l'ID de l'utilisateur à partir du localStorage
            title: recette.title,
            description: recette.description,
            tempsDePreparation: recette.tempsDePreparation,
            tempsDeCuisson: recette.tempsDeCuisson,
            ingredients: recette.ingredients,
            instructions: recette.instructions,
            image: recette.image,
            categorie: selectedCategories,
            auteur: user
        };

        try {
            // Utilisez Axios pour envoyer les données au serveur au format JSON
            const token = localStorage.getItem('token');

            const response = await axios.post('http://localhost:3002/api/recettes', formData, {
                headers: {
                    'Content-Type': 'application/json', // Indiquez que le contenu est au format JSON
                    'Authorization': `Bearer ${token}` // Attachez le token d'authentification à l'en-tête de la requête
                }
            });

            // Faites quelque chose avec la réponse si nécessaire
            console.log('Réponse du serveur:', response.data);

            // Mettez à jour l'état ou effectuez toute autre action nécessaire
            setRecettes([...recettes, response.data]);
            handleRecetteCreation();
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données :', error);
            // Gérez l'erreur ici, affichez un message d'erreur à l'utilisateur, etc.
        }
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

    const handleImageChange = (e) => {
        const value = e.target.value;
        setRecette(prevState => ({
            ...prevState,
            image: value
        }));
    };


    return (
        <div className='creation'>

            <h1>Créations</h1>
            <span className='creation__obligatoire'>* champs obligatoire</span>
            <form onSubmit={handleSubmit} className="flex flex-row gap-4 flex-wrap" method="POST">

                <div className="col-6 col-sm-3">
                    <div className="flex flex-column gap-2 ">
                        <label htmlFor="title">Titre <span className='creation__obligatoire'>*</span> :</label>
                        <InputText id="title" name="name" required onChange={handleTitlelChange} />
                    </div>
                    <div className="flex flex-column gap-2 ">
                        <label htmlFor="description">Description <span className='creation__obligatoire'>*</span> :</label>
                        <InputText id="description" name="description" required onChange={handleDescriptionChange} />
                    </div>
                </div>

                <div className="col-6 col-sm-3">
                    <div className="flex flex-column gap-2 ">
                        <label htmlFor="tempsDePreparation">Temps de préparation <span className='creation__obligatoire'>*</span> :</label>
                        <InputText id="tempsDePreparation" name="tempsDePreparation" required onChange={handleTempsDePreparationChange} />
                    </div>
                    <div className="flex flex-column gap-2 ">
                        <label htmlFor="tempsDeCuisson">Temps de cuisson <span className='creation__obligatoire'>*</span> :</label>
                        <InputText id="tempsDeCuisson" name="tempsDeCuisson" required onChange={handleTempsDeCuissonChange} />
                    </div>
                </div>

                <div className="col-6 col-sm-3">
                    <div className="flex flex-column gap-2 ">
                        <label htmlFor="ingredients">Ingrédients <span className='creation__obligatoire'>*</span> :</label>
                        {recette.ingredients.map((ingredient, index) => (
                            <div key={index}>
                                <InputText value={ingredient} onChange={e => handleIngredientChange(index, e.target.value)} />
                            </div>

                        ))}
                        <Button type="button" onClick={addIngredient} label="Ajouter Ingrédient" />
                    </div>
                    <div className="flex flex-column gap-2 ">
                        <label htmlFor="instructions">Instructions <span className='creation__obligatoire'>*</span> :</label>
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
                        <span className='creation__obligatoire'>exemple : https://www.exemple.com/images/monimage.png/</span>
                        <InputText id="image" name="image" onChange={handleImageChange} />
                    </div>

                    <div className="flex flex-column gap-2 ">
                        <label htmlFor="categorie">Catégorie <span className='creation__obligatoire'>*</span> :</label>
                        <Dropdown
                            name='categorie' value={selectedCategories} options={categorie} onChange={(e) => setSelectedCategories(e.value)} placeholder="Sélectionner une catégorie" />

                    </div>
                    <Button type="submit" label="Envoyer" />
                </div>

            </form>
            {error && <div className="p-error">{error}</div>}
        </div>
    );
}

export default Creations;