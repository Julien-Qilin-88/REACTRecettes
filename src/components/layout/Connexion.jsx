import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import axios from 'axios';
import { useAuth } from '../layout/AuthProvider';

export default function Connexion({ setSignupVisible, setLoginVisible }) {
    const { login } = useAuth();

    const [error, setError] = useState(null);

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

        // Valider les champs
        if (!FormDataConnexion.name || !FormDataConnexion.password) {
            setError('Veuillez remplir tous les champs.');
            return; // Arrêtez le traitement ici, mais ne provoquez pas de re-rendu
        }

        try {
            const response = await axios.post(
                'http://localhost:3001/user/connexion',
                {
                name: FormDataConnexion.name,
                password: FormDataConnexion.password,
                }
            );

            if (response.status === 200) {
                console.log('Connexion réussie !');
                login(FormDataConnexion.name);
                window.location.reload();
            } else {
                setError(response.data.message)
            }
        } catch (error) {
            console.error('Erreur lors de la demande de connexion:', error);
            setError('Mot de passe ou pseudo incorrect.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} method="POST"> 
                <div className="flex flex-column gap-5 p-mb-5 justify-content-center align-items-center">
                    <span className="p-float-label mt-4">
                        <InputText
                            id="name"
                            type="text"
                            name="name"
                            value={FormDataConnexion.name}
                            onChange={handleChange}
                            autoComplete="name"
                        />
                        <label htmlFor="name">Pseudo</label>
                    </span>

                    <span className="p-float-label">
                        <Password
                            id="password"
                            name="password"
                            type="password"
                            value={FormDataConnexion.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                            feedback={false}
                            toggleMask
                        />
                        <label htmlFor="password">Mot de passe</label>
                    </span>

                    {error && <div className="p-error">{error}</div>}

                    <div>
                        <Button type="submit" label="Valider" />
                        <Button
                            type="button"
                            label="Inscription"
                            onClick={() => {
                                setSignupVisible(true);
                                setLoginVisible(false);
                            }}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
