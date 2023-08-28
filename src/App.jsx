import './App.css';
import Accueil from './components/home/Accueil';
import Layout from './components/layout/Layout';
import ListRecette from './components/recettes/ListRecette';
import Creation from './components/creation/Creation';

import axios from 'axios';
import { useState, useEffect } from 'react';


function App() {
    const [page, setPage] = useState('home');
    const [recettes, setRecettes] = useState([]);
    const [selectedRecette, setSelectedRecette] = useState(null); // Utiliser un état pour la recette sélectionnée

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

    const fetchRecetteById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/recettes/${id}`);
            setSelectedRecette(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
        }
    };

    const handleRecetteCreation = () => {
        setPage('listrecette');
        setSelectedRecette(null);
    };


    return (
        <Layout setPage={setPage}>
            {page === 'home' && <Accueil />}
            {page === 'listrecette' && <ListRecette fetchRecetteById={fetchRecetteById} recettes={recettes} selectedRecette={selectedRecette} />}
            {page === 'creation' && <Creation recettes={recettes} setRecettes={setRecettes} handleRecetteCreation={handleRecetteCreation} />}             </Layout>
            );
}

export default App;