import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { Card } from 'primereact/card';

const EditRecette = ({ selectedRecette, setSelectedRecette }) => {
    const [editingTitle, setEditingTitle] = useState(false);

    const handleTitleSave = async function () {
        try {
            // Effectuer la requête PUT pour mettre à jour le titre
            const response = await axios.put(`http://localhost:3001/api/recettes/${selectedRecette.id}`, selectedRecette);
            setSelectedRecette(response.data); // Mettre à jour l'état avec les données mises à jour
            setEditingTitle(false); // Sortir du mode d'édition du titre
        } catch (error) {
            console.error('Erreur lors de la mise à jour du titre :', error);
        }
    }

    // useEffect(() => {
    //     document.title = selectedRecette ? selectedRecette.title : 'Édition de recette';
    // }, [selectedRecette]);

    return (

        <>
            <Card style={{ width: '100%' }}>
                <div className='flex gap-4'>
                    {editingTitle ? (
                        <>
                            <InputText value={selectedRecette.title} onChange={(e) => setSelectedRecette({ ...selectedRecette, title: e.target.value })} />
                            <Button label="Valider" icon="pi pi-check" iconPos="right" text onClick={handleTitleSave} />
                            <Button label="Annuler" icon="pi pi-times" iconPos="right" text onClick={() => setEditingTitle(false)} />
                        </>
                    ) : (
                        <>
                            <h1>{selectedRecette.title}</h1>
                            <Button label="Editer" icon="pi pi-file-edit" iconPos="right" text onClick={() => setEditingTitle(true)} />
                        </>
                    )}
                </div>

                <div className='flex gap-4'>
                    <img className='card__image' src={selectedRecette.image} alt={selectedRecette.title} />
                    <Button label="Editer" icon="pi pi-file-edit" iconPos="right" text />
                </div>

                <div className='flex gap-4'>
                    <p>temps de préparation : {selectedRecette.tempsDePreparation} minutes</p>
                    <Button label="Editer" icon="pi pi-file-edit" iconPos="right" text />
                </div>

                <div className='flex gap-4'>
                    <p>temps de cuisson : {selectedRecette.tempsDeCuisson} minutes</p>
                    <Button label="Editer" icon="pi pi-file-edit" iconPos="right" text />
                </div>
                <div className='flex gap-4'>
                    <div>
                        <h3>Ingrédients</h3>
                        <Button label="Editer" icon="pi pi-file-edit" iconPos="right" text />
                    </div>
                    <ul>
                        {selectedRecette.ingredients && selectedRecette.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>

                <div className='flex gap-4'>
                    <div>
                        <h3>Instructions</h3>
                        <Button label="Editer" icon="pi pi-file-edit" iconPos="right" text />
                    </div>
                    <ol>
                        {selectedRecette.instructions && selectedRecette.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ol>
                </div>

                <p>Bon appétit !</p>
            </Card>
        </>
    );
};

export default EditRecette;
