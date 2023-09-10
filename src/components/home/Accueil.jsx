import RecetteRandom from './RecetteRandom';

export default function Accueil({ randomRecipe, user }) {


    return (
        <>
            <h1 className='text-center p-4 mt-0' style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>Bienvenue {user} sur le site d'organisation de recettes</h1>
            <div className='flex flex-row justify-content-around'>

                <div>
                    <h2>Menu de la semaine</h2>
                    <p>Vous pouvez ici créer votre menu de la semaine</p>

                </div>

                <div>
                    <h2>Recette du jour</h2>

                    <RecetteRandom randomRecipe={randomRecipe} />
                </div>

            </div>
        </>

    );
}
