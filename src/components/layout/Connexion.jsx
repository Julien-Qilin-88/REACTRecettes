import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import axios from 'axios';

export default function Connexion({ setIsAuthenticated }) { // Renommé la fonction pour commencer par une majuscule

    const [FormDataConnexion, setFormDataConnexion] = useState({
        name: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDataConnexion({ ...FormDataConnexion, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/user/connexion', {
                name: FormDataConnexion.name, // Utilisez 'name' au lieu de 'name' pour correspondre à votre champ d'entrée
                password: FormDataConnexion.password,
            });

            if (response.status === 200) {
                console.log('Connexion réussie !');
                setIsAuthenticated(true); // Définissez l'état isAuthenticated sur true
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Erreur lors de la demande de connexion:', error);
        }
    };

    return (
        <div>
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="name">name</label>
                        <InputText
                            id="name"
                            type="text"
                            name="name"
                            value={FormDataConnexion.name} // Utilisez 'name' au lieu de 'name'
                            onChange={handleChange}
                            autoComplete="name"
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="password">Password</label>
                        <Password
                            id="password"
                            name="password"
                            type="password"
                            value={FormDataConnexion.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                        />
                    </div>
                    <Button type="submit" label="Submit" />
                </div>
            </form>
        </div>
    );
}
