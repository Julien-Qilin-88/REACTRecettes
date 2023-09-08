// Importations des modules et composants nécessaires
import './App.css';
import Accueil from './components/home/Accueil';
import Layout from './components/layout/Layout';
import ListRecette from './components/recettes/ListRecette';
import Creation from './components/creation/Creation';
import EditRecette from './components/recettes/EditRecette';
import MenuDuMois from './components/menu_du_mois/MenuDuMois';
import { AuthProvider } from './components/layout/AuthProvider';

import axios from 'axios'; // Importe le module Axios pour les requêtes HTTP
import { useState, useEffect } from 'react'; // Importe les modules React nécessaires

// Composant principal de l'application
function App() {
    // États pour gérer la page actuelle, les recettes et la recette sélectionnée
    const [page, setPage] = useState('home');
    const [filteredRecettes, setFilteredRecettes] = useState([]);
    const [recettes, setRecettes] = useState([]);
    const [selectedRecette, setSelectedRecette] = useState(null);
    const [showRecetteDetails, setShowRecetteDetails] = useState(false);
    const [editMode, setEditMode] = useState(false);
    // const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [randomRecipe, setRandomRecipe] = useState([]);

    // je voudrais recuperer le name de l'utilisateur connecté
    const [user, setUser] = useState(localStorage.getItem('user'));

    // Effet pour récupérer les recettes à partir de l'API au chargement de l'application
    useEffect(() => {
        const fetchRecettes = async () => {
            try {
                const response = await axios.get('http://localhost:3002/api/recettes');
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
            const response = await axios.get(`http://localhost:3002/api/recettes/${id}`);
            setSelectedRecette(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
        }
    };

    // Effet pour récupérer une recettes aleatoire à partir de l'API au chargement de l'application
    useEffect(() => {
        const fetchRandomRecipe = async () => {
            try {
                const response = await axios.get('http://localhost:3002/api/recette-du-jour');
                setRandomRecipe(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération de la recette aléatoire :', error);
            }
        };

        fetchRandomRecipe();
    }, []);

    // Fonction pour gérer la création d'une nouvelle recette
    const handleRecetteCreation = () => {
        setPage('recettes');
        setSelectedRecette(null);
    };

    const activateEditMode = () => {
        setEditMode(true);
    };

    // Fonction pour gérer la modification d'une recette
    const handleEditRecette = (recetteId) => {
        const selectedRecette = recettes.find((recette) => recette.id === recetteId);
        setSelectedRecette(selectedRecette);
        activateEditMode();
        setPage('recettes');
    };

    // Rendu du composant principal de l'application
    return (
        <AuthProvider>
        <Layout setPage={setPage} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setUser={setUser} >
            {page === 'home' && <Accueil randomRecipe={randomRecipe} user={user} />}
            {page === 'recettes' && !editMode && (
                <ListRecette
                    fetchRecetteById={fetchRecetteById}
                    recettes={recettes}
                    selectedRecette={selectedRecette}
                    showRecetteDetails={showRecetteDetails}
                    setShowRecetteDetails={setShowRecetteDetails}
                    handleEditRecette={handleEditRecette}
                    setPage={setPage}
                    page={page}
                    filteredRecettes={filteredRecettes}
                    setFilteredRecettes={setFilteredRecettes}
                    isAuthenticated={isAuthenticated}
                />
            )}
            {page === 'recettes' && editMode && (
                <EditRecette
                    recettes={recettes}
                    setRecettes={setRecettes}
                    handleEditRecette={handleEditRecette}
                    showRecetteDetails={showRecetteDetails}
                    setShowRecetteDetails={setShowRecetteDetails}
                    selectedRecette={selectedRecette}
                    setSelectedRecette={setSelectedRecette}
                    setPage={setPage}
                    page={page}
                    filteredRecettes={filteredRecettes}
                    setFilteredRecettes={setFilteredRecettes}
                />
            )}
            {page === 'creation' && <Creation recettes={recettes} setRecettes={setRecettes} handleRecetteCreation={handleRecetteCreation} />}

            {page === 'menu' && <MenuDuMois />}
        </Layout>
        </AuthProvider>
    );
}

export default App; // Exporte le composant principal de l'application