import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import axios from 'axios'; // Importez axios ici
import { Button } from 'primereact/button';

export default function Inscription({ setSignupVisible, setLoginVisible }) {
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

            if (response.status === 200) { // Vérifiez le code de statut HTTP
                // L'inscription a réussi, redirigez l'utilisateur vers une page de confirmation ou connectez automatiquement l'utilisateur.
                console.log('Inscription réussie !');
                // Vous pouvez ajouter ici la redirection ou la connexion automatique.
                setSignupVisible(false);
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Erreur lors de la demande d\'inscription:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <div className="p-field flex flex-column gap-5 p-mb-5 justify-content-center align-items-center">

                    <span className="p-float-label mt-4">
                        <InputText
                            id="username"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            autoComplete="username"
                        />
                        <label htmlFor="username">Pseudo</label>
                    </span>

                    <span className="p-float-label">
                        <Password
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                            toggleMask
                        />
                        <label htmlFor="password">Mot de passe</label>
                    </span>

                    <span className="p-float-label">
                        <Password
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            autoComplete="new-password"
                            toggleMask
                        />
                        <label htmlFor="confirmPassword">Confirme mot de passe</label>
                    </span>

                    <span className="p-float-label">

                        <InputText
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <label htmlFor="email">Email</label>
                    </span>

                    <span className="p-float-label">
                        <InputText
                            id="confirmEmail"
                            type="email"
                            name="confirmEmail"
                            autoComplete="email"
                            value={formData.confirmEmail}
                            onChange={handleChange}
                        />
                        <label htmlFor="confirmEmail">Confirme Email</label>
                    </span>

                    <div>
                        <Button type="submit" label="Valider" className="p-mt-2" />
                        <Button type="button" label="J'ai deja un compte" onClick={() => { setSignupVisible(false); setLoginVisible(true) }} />

                    </div>

                </div>

            </form>
        </div>
    );
}
