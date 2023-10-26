import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import ElementRecette from './editer_recette/ElementRecette';
import axios from 'axios';

const EditRecette = ({ selectedRecette }) => {
    // États locaux pour gérer la recette, les ingrédients, les instructions, etc.
    const [recette, setRecette] = useState(selectedRecette);
    const [ingredient, setIngredient] = useState("");
    const [instruction, setInstruction] = useState("");


    // Fonction pour mettre à jour la recette
    const handleUpdateRecette = (field, value, shouldUpdate = true) => {
        // Mettez à jour la recette en fonction du champ et de la valeur fournis
        setRecette((oldRecette) => {
            const updatedRecette = { ...oldRecette, [field]: value };
            if (shouldUpdate) {
                updateRecette(updatedRecette); // Appelez la fonction d'API pour mettre à jour la recette
            }
            return updatedRecette;
        });
    };

    // Fonction pour supprimer un élément de la recette (ingrédient ou instruction)
    const handleDeleteElement = (field, index) => {
        // Supprimez l'élément du champ spécifié à l'index donné
        setRecette((oldRecette) => {
            const updatedField = [...oldRecette[field]];
            updatedField.splice(index, 1);
            const updatedRecette = { ...oldRecette, [field]: updatedField };
            updateRecette(updatedRecette); // Appelez la fonction d'API pour mettre à jour la recette
            return updatedRecette;
        });
    };

    // Fonction pour mettre à jour la recette via une requête API
    const updateRecette = async (updatedRecette) => {
        try {
            // Effectuez une requête PUT vers le serveur avec la recette mise à jour
            await axios.put(`http://localhost:3002/api/recettes/${updatedRecette.id}`, updatedRecette);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la recette:', error);
            // Traitez les erreurs ici, par exemple, affichez un message d'erreur à l'utilisateur.
        }
    };


    const handleDeleteRecette = async () => {
        await axios.delete(`http://localhost:3002/api/recettes/${recette.id}`);
    }

    //recuperer l'id de l'utilisateur connecté
    const userId = Number(localStorage.getItem('userId'));
    const user = localStorage.getItem('user');


    //je dois pouvoir supprimer uniquement mes recettes
    const isOwner = recette && (recette.idUser === userId || user === 'admin');

    return (
        <>
            {recette && (
                <Card style={{ width: '100%' }}>
                    <div className='flex gap-4'>
                        <ElementRecette
                            label="Titre"
                            value={recette.title}
                            onSave={(newValue) => {
                                handleUpdateRecette('title', newValue, true)
                            }}
                            elementType="input"
                        />
                    </div>
                    <div className='flex gap-4'>
                        <ElementRecette
                            label="Image"
                            value={recette.image}
                            onSave={(newValue) => {
                                handleUpdateRecette('image', newValue, true)
                            }}
                            elementType="input"
                        />
                    </div>

                    <div className='flex gap-4'>
                        <ElementRecette
                            label="Description"
                            value={recette.description}
                            onSave={(newValue) => {
                                handleUpdateRecette('description', newValue, true)
                            }}
                            elementType="input"
                        />
                    </div>

                    <div className='flex gap-4'>
                        <ElementRecette
                            label="Temps de préparation"
                            value={recette.tempsDePreparation + ' minutes'}
                            onSave={(newValue) => {
                                handleUpdateRecette('tempsDePreparation', newValue, true)
                            }}
                            elementType="input"
                        />
                    </div>

                    <div className='flex gap-4'>
                        <ElementRecette
                            label="Temps de cuisson"
                            value={recette.tempsDeCuisson + ' minutes'}
                            onSave={(newValue) => {
                                handleUpdateRecette('tempsDeCuisson', newValue, true)
                            }}
                            elementType="input"
                        />
                    </div>

                    <div className='flex flex-column gap-4'>
                        <h3>Ingrédients</h3>
                        <ul>
                            {recette.ingredients && recette.ingredients.map((ingredient, index) => (
                                <ElementRecette
                                    key={index}
                                    value={ingredient}
                                    onSave={(newValue) => {
                                        let ingredients = [...recette.ingredients]
                                        ingredients[index] = ingredient;
                                        handleUpdateRecette('ingredients', ingredients, true)
                                    }}
                                    elementType="li"
                                    onDelete={() => handleDeleteElement('ingredients', index)}
                                />
                            ))}
                        </ul>
                        <div>
                            <InputText
                                type="text"
                                placeholder="Ajouter un ingrédient"
                                value={ingredient}
                                onChange={(e) => setIngredient(e.target.value)}
                            />
                            <Button
                                onClick={() => {
                                    handleUpdateRecette('ingredients', [...recette.ingredients, ingredient], true);
                                    setIngredient("");
                                }}
                                label="Ajouter" />
                        </div>
                    </div>

                    <div className='flex flex-column gap-4'>
                        <h3>Instructions</h3>
                        <ol>
                            {recette.instructions && recette.instructions?.map((instruction, index) => (
                                <ElementRecette
                                    key={index}
                                    value={instruction}
                                    onSave={(newValue) => {
                                        let instructions = [...recette.instructions];
                                        instructions[index] = instruction;
                                        handleUpdateRecette('instructions', instructions, true);
                                    }}
                                    elementType="li"
                                    onDelete={() => handleDeleteElement('instructions', index)}
                                />
                            ))}
                        </ol>
                        <div>
                            <InputText
                                type="text"
                                placeholder="Ajouter une instruction"
                                value={instruction}
                                onChange={(e) => setInstruction(e.target.value)}
                            />
                            <Button onClick={() => {
                                handleUpdateRecette('instructions', [...recette.instructions, instruction], true);
                                setInstruction("");
                            }} label="Ajouter" />
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <Button onClick={handleDeleteRecette} label="Supprimer la recette" disabled={!isOwner} />
                    </div>
                    <p>Bon appétit !</p>
                </Card>
            )}
        </>
    );
};

export default EditRecette;
