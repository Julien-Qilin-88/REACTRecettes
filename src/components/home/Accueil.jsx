import RecetteRandom from './RecetteRandom';

export default function Accueil({ randomRecipe }) {


    return (
        <>
            <h1 className='text-center p-4 mt-0' style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>Bienvenue sur le site d'organisation de repas</h1>
            <div className='flex flex-row justify-content-around'>

                <div>
                    <h2>Menu de la semaine</h2>
                </div>

                <div>
                    <h2>Recette du jour</h2>

                    <RecetteRandom randomRecipe={randomRecipe} />
                </div>

            </div>
        </>

    );
}