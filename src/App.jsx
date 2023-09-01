// Importations des modules et composants nécessaires
import './App.css';
import Accueil from './components/home/Accueil';
import Layout from './components/layout/Layout';
import ListRecette from './components/recettes/ListRecette';
import Creation from './components/creation/Creation';
import EditRecette from './components/editer_recette/EditRecette';
import axios from 'axios'; // Importe le module Axios pour les requêtes HTTP
import { useState, useEffect } from 'react'; // Importe les modules React nécessaires

// Composant principal de l'application
function App() {
    // États pour gérer la page actuelle, les recettes et la recette sélectionnée
    const [page, setPage] = useState('home');
    const [recettes, setRecettes] = useState([]);
    const [selectedRecette, setSelectedRecette] = useState(null);
    const [showRecetteDetails, setShowRecetteDetails] = useState(false);


    // Effet pour récupérer les recettes à partir de l'API au chargement de l'application
    useEffect(() => {
        const fetchRecettes = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/recettes');
                setRecettes(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };

        fetchRecettes();
    }, []);

    // Fonction pour récupérer une recette par son ID
    const fetchRecetteById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/recettes/${id}`);
            setSelectedRecette(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
        }
    };

    // Fonction pour gérer la création d'une nouvelle recette
    const handleRecetteCreation = () => {
        setPage('listrecette');
        setSelectedRecette(null);
    };

    // Fonction pour gérer la modification d'une recette
    const handleEditRecette = (recetteId) => {
        const selectedRecette = recettes.find(recette => recette.id === recetteId);
        setSelectedRecette(selectedRecette);
        setPage('edit');
    };

    // Rendu du composant principal de l'application
    return (
        <Layout setPage={setPage}>
            {page === 'home' && <Accueil />}
            {page === 'listrecette' && (
                <ListRecette
                    fetchRecetteById={fetchRecetteById}
                    recettes={recettes}
                    selectedRecette={selectedRecette}
                    showRecetteDetails={showRecetteDetails}
                    setShowRecetteDetails={setShowRecetteDetails}
                    handleEditRecette={handleEditRecette}
                    setPage={setPage}
                    page={page}
                />
            )}
            {page === 'creation' && <Creation recettes={recettes} setRecettes={setRecettes} handleRecetteCreation={handleRecetteCreation} />}
            {page === 'edit' && selectedRecette && (
                <EditRecette
                    recettes={recettes}
                    setRecettes={setRecettes}
                    handleEditRecette={handleEditRecette}
                    showRecetteDetails={showRecetteDetails}
                    setShowRecetteDetails={setShowRecetteDetails}
                    selectedRecette={selectedRecette}
                    setSelectedRecette={setSelectedRecette}
                    setPage={setPage}


                />
            )}
        </Layout>
    );
}

export default App; // Exporte le composant principal de l'application
