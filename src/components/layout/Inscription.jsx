import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import axios from 'axios';
import { Button } from 'primereact/button';

export default function Inscription({ setSignupVisible, setLoginVisible }) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        confirmEmail: '',
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Valider les champs
        if (!formData.username || !formData.email || !formData.password) {
            setError('Veuillez remplir tous les champs.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        if (formData.password.length < 10) {
            setError('Le mot de passe doit contenir au moins 10 caractères.');
            return;
        }

        if (formData.email !== formData.confirmEmail) {
            setError('Les adresses email ne correspondent pas.');
            return;
        }



        try {
            const response = await axios.post('http://localhost:3001/user/inscription', {
                name: formData.username,
                password: formData.password,
                email: formData.email,
            });

            if (response.status === 200) {
                console.log('Inscription réussie !');
                setSignupVisible(false);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.error('Erreur lors de la demande d\'inscription:', error);
            setError('Une erreur s\'est produite lors de l\'inscription.');
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

                    {error && <div className="p-error">{error}</div>}

                    <div>
                        <Button type="submit" label="Valider" className="p-mt-2" />
                        <Button type="button" label="J'ai déjà un compte" onClick={() => { setSignupVisible(false); setLoginVisible(true) }} />
                    </div>
                </div>
            </form>
        </div>
    );
}
