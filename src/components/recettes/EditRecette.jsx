import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import ElementRecette from './editer_recette/ElementRecette';
import axios from 'axios';
import SearchEditRecette from './editer_recette/SearchEditRecette';

const EditRecette = ({ selectedRecette, recettes, filteredRecettes, setFilteredRecettes }) => {
    const [updatedRecette, setUpdatedRecette] = useState(selectedRecette);
    const dsEdit = useRef(null);

    const handleUpdateRecette = async (updatedData, recetteId) => {
        try {
            await axios.put(`http://localhost:3002/api/recettes/${recetteId}`, updatedData);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la recette :', error);
        }
    };

    useEffect(() => {
        document.title = updatedRecette ? updatedRecette.title : 'Édition de recette';
    }, [updatedRecette]);

    return (
        <>
            {selectedRecette && (
                <Card style={{ width: '100%' }}>
                    <div className='flex gap-4'>
                        <ElementRecette
                            label="Titre"
                            value={updatedRecette.title}
                            onSave={(newValue) => {
                                setUpdatedRecette({ ...updatedRecette, title: newValue });
                                handleUpdateRecette({ title: newValue }, updatedRecette.id);
                            }}
                            elementType="h2"
                            updateRecette={handleUpdateRecette}
                            recetteId={updatedRecette.id}
                        />
                    </div>

                    <div className='flex gap-4'>
                        <ElementRecette
                            label="Image"
                            value={<img className='card__image' src={updatedRecette.image} alt={updatedRecette.title} />}

                            onSave={(newValue) => {
                                setUpdatedRecette({ ...updatedRecette, image: newValue });
                                handleUpdateRecette({ image: newValue }, updatedRecette.id);
                            }}
                            elementType="img"
                            updateRecette={handleUpdateRecette}
                            recetteId={updatedRecette.id}
                        />
                    </div>

                    <div className='flex gap-4'>
                        <ElementRecette
                            label="Temps de préparation"
                            value={updatedRecette.tempsDePreparation + ' minutes'}
                            onSave={(newValue) => {
                                setUpdatedRecette({ ...updatedRecette, tempsDePreparation: parseInt(newValue) });
                                handleUpdateRecette({ tempsDePreparation: parseInt(newValue) }, updatedRecette.id);
                            }}
                            elementType="p"
                            updateRecette={handleUpdateRecette}
                            recetteId={updatedRecette.id}
                        />
                    </div>

                    <div className='flex gap-4'>
                        <ElementRecette
                            label="Temps de cuisson"
                            value={updatedRecette.tempsDeCuisson + ' minutes'}
                            onSave={(newValue) => {
                                setUpdatedRecette({ ...updatedRecette, tempsDeCuisson: parseInt(newValue) });
                                handleUpdateRecette({ tempsDeCuisson: parseInt(newValue) }, updatedRecette.id);
                            }}
                            elementType="p"
                            updateRecette={handleUpdateRecette}
                            recetteId={updatedRecette.id}
                        />
                    </div>

                    <div className='flex flex-column gap-4'>
                        <h3>Ingrédients</h3>
                        <ul>
                            {updatedRecette.ingredients && updatedRecette.ingredients.map((ingredient, index) => (
                                <ElementRecette
                                    key={index}
                                    value={ingredient}
                                    onSave={(newValue) => {
                                        const newIngredients = [...updatedRecette.ingredients];
                                        newIngredients[index] = newValue;
                                        setUpdatedRecette({ ...updatedRecette, ingredients: newIngredients });
                                        handleUpdateRecette({ ingredients: newIngredients }, updatedRecette.id);
                                    }}
                                    elementType="li"
                                    updateRecette={handleUpdateRecette}
                                    recetteId={updatedRecette.id}
                                />
                            ))}
                        </ul>
                    </div>

                    <div className='flex flex-column gap-4'>
                        <h3>Instructions</h3>
                        <ol>
                            {updatedRecette.instructions && updatedRecette.instructions.map((instruction, index) => (
                                <ElementRecette
                                    key={index}
                                    value={instruction}
                                    onSave={(newValue) => {
                                        const newInstructions = [...updatedRecette.instructions];
                                        newInstructions[index] = newValue;
                                        setUpdatedRecette({ ...updatedRecette, instructions: newInstructions });
                                        handleUpdateRecette({ instructions: newInstructions }, updatedRecette.id);
                                    }}
                                    elementType="li"
                                    updateRecette={handleUpdateRecette}
                                    recetteId={updatedRecette.id}
                                />
                            ))}
                        </ol>
                    </div>

                    <p>Bon appétit !</p>
                </Card>
            )}

            {!selectedRecette && (
                <>
                    <p>Veuillez sélectionner une recette à éditer</p>
                    <SearchEditRecette recettes={recettes} dsEdit={dsEdit} filteredRecettes={filteredRecettes} setFilteredRecettes={setFilteredRecettes} setSelectedRecette={setUpdatedRecette} />
                </>
            )}
        </>
    );
};

export default EditRecette;
