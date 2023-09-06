import React from 'react';
import { Card } from 'primereact/card';

const RecetteRandom = (props) => {
    const { randomRecipe } = props;
    // console.log(randomRecipe);

    return (
        <Card title={randomRecipe.title} style={{ width: '100%' }}>
            <img className='card__image' src={randomRecipe.image} alt={randomRecipe.title} />
            <p>temps de préparation : {randomRecipe.tempsDePreparation} minutes</p>
            <p>temps de cuisson : {randomRecipe.tempsDeCuisson} minutes</p>

            <h3>Ingrédients</h3>
            <ul>
                {randomRecipe.ingredients && randomRecipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>

            <h3>Instructions</h3>
            <ol>
                {randomRecipe.instructions && randomRecipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                ))}
            </ol>

            <p>Bon appétit !</p>
        </Card>
    );
}

export default RecetteRandom;