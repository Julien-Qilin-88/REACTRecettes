import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

export default function Recette(props) {
    const { selectedRecette } = props;

    if (!selectedRecette || selectedRecette.length === 0) {
        return null; // Rien à afficher si selectedRecette n'est pas défini ou est vide
    }

    const handleClick = () => {
        props.setShowRecetteDetails(false);
    }

    return (
        <Card title={selectedRecette.title} style={{ width: '100%' }}>
            <img className='card__image' src={selectedRecette.image} alt={selectedRecette.title} />
            <p>temps de préparation : {selectedRecette.tempsDePreparation} minutes</p>
            <p>temps de cuisson : {selectedRecette.tempsDeCuisson} minutes</p>

            <h3>Ingrédients</h3>
            <ul>
                {selectedRecette.ingredients && selectedRecette.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>

            <h3>Instructions</h3>
            <ol>
                {selectedRecette.instructions && selectedRecette.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                ))}
            </ol>
            <p>Bon appétit !</p>
            <Button label="Retour" onClick={handleClick} />
        </Card>
    );
}
