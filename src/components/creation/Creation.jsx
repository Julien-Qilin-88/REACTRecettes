import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import axios from 'axios';

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
        categorie: '',
    });

    const categorie = ['Entrée', 'Salade', 'Plat', 'Dessert', 'Boisson', 'Sauce', 'Autre'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addRecette();
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

    const onUpload = (e) => {
        if (e.target.files[0]) {
            fileToDataUri(e.target.files[0]).then(data =>
                setRecette(prevState => ({
                    ...prevState,
                    image: data
                }))
            )
        }

    };

    const fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result)
        };
        reader.readAsDataURL(file);
    });

    const addRecette = async () => {
        try {
            const response = await axios.post('http://localhost:3002/api/recettes',
                {
                    title: recette.title,
                    description: recette.description,
                    tempsDePreparation: recette.tempsDePreparation,
                    tempsDeCuisson: recette.tempsDeCuisson,
                    ingredients: recette.ingredients,
                    instructions: recette.instructions,
                    image: recette.image,
                    categorie: selectedCategories,
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

            <form onSubmit={handleSubmit} className="flex flex-row gap-4 flex-wrap">

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
                        <input type="file" name="image" onChange={onUpload} />
                    </div>
                    <div className="flex flex-column gap-2 ">
                        <label htmlFor="categorie">Catégorie :</label>
                        <Dropdown value={selectedCategories} options={categorie} onChange={(e) => setSelectedCategories(e.value)} placeholder="Sélectionner une catégorie" />
                        <Button type="submit" label="Envoyer" />
                    </div>
                </div>

            </form>
        </>
    );
}

export default Creations;