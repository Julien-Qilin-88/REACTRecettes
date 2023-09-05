import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import axios from 'axios'; // Importez axios ici

export default function Inscription() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        confirmEmail: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Assurez-vous que les mots de passe correspondent
        if (formData.password !== formData.confirmPassword) {
            console.error('Les mots de passe ne correspondent pas.');
            return; // Arrêtez le traitement si les mots de passe ne correspondent pas.
        }

        try {
            const response = await axios.post('http://localhost:3001/user/inscription', {
                name: formData.username,
                password: formData.password,
                email: formData.email,
            });

            if (response.status === 201) { // Vérifiez le code de statut HTTP
                // L'inscription a réussi, redirigez l'utilisateur vers une page de confirmation ou connectez automatiquement l'utilisateur.
                console.log('Inscription réussie !');
                // Vous pouvez ajouter ici la redirection ou la connexion automatique.
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Erreur lors de la demande d\'inscription:', error);
        }
    };

    return (
        <div>
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="username">Username</label>
                        <InputText
                            id="username"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            autoComplete="username"
                        />

                        <label htmlFor="password">Password</label>
                        <Password
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                        />

                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <Password
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            autoComplete="new-password"
                        />

                        <label htmlFor="email">Email</label>
                        <InputText
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <label htmlFor="confirmEmail">Confirm Email</label>
                        <InputText
                            id="confirmEmail"
                            type="email"
                            name="confirmEmail"
                            autoComplete="email"
                            value={formData.confirmEmail}
                            onChange={handleChange}
                        />

                        <button type="submit">Inscription</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
