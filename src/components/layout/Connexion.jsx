import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useAuth } from '../layout/AuthProvider';

export default function Connexion({ setSignupVisible, setLoginVisible }) {
    const { login } = useAuth();

    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Valider les champs
        if (!formData.name || !formData.password) {
            setError('Veuillez remplir tous les champs.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/user/connexion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    password: formData.password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const { user, token } = data;

                // Stocker le token dans localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('userId', user.id);

                // Effectuer l'authentification côté client
                login(user.name);

                // Recharger la page pour mettre à jour l'état de l'authentification
                window.location.reload();
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Nom d\'utilisateur ou mot de passe incorrect.');
            }
        } catch (error) {
            setError('Une erreur s\'est produite lors de la connexion. Veuillez réessayer plus tard.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <InputText
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                autoComplete="username"
                            />
                            <label htmlFor="name">Pseudo</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <Password
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                feedback={false}
                                toggleMask
                            />
                            <label htmlFor="password">Mot de passe</label>
                        </span>
                    </div>
                </div>

                {error && <div className="p-error">{error}</div>}

                <div className="p-mt-3">
                    <Button type="submit" label="Valider" className="p-mr-2" />
                    <Button
                        type="button"
                        label="Inscription"
                        onClick={() => {
                            setSignupVisible(true);
                            setLoginVisible(false);
                        }}
                    />
                </div>
            </form>
        </div>
    );
}
