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
                setLoginVisible(true);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.error('Erreur lors de la demande d\'inscription:', error);
            setError('Une erreur s\'est produite lors de l\'inscription.');
        }
    };

    return (
        <div className="p-d-flex p-flex-column p-jc-center p-ai-center p-mb-5">
            <form onSubmit={handleSubmit} className="p-d-flex p-flex-column p-fluid">

                <div className="p-field mb-3">
                    <label htmlFor="username">Pseudo :</label>
                        <InputText
                            id="username"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            autoComplete="username"

                    />

                </div>

                <div className="p-field mb-3">
                    <label htmlFor="password">Mot de passe :</label>
                        <Password
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                            toggleMask
                    />

                </div>

                <div className="p-field mb-3">
                    <label htmlFor="confirmPassword">Confirmer mot de passe :</label>
                        <Password
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            autoComplete="new-password"
                            toggleMask
                        />

                </div>

                <div className="p-field mb-3">
                    <label htmlFor="email">Email :</label>
                        <InputText
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                </div>

                <div className="p-field mb-3">
                    <label htmlFor="confirmEmail">Confirmer Email :</label>
                        <InputText
                            id="confirmEmail"
                            type="email"
                            name="confirmEmail"
                            autoComplete="email"
                            value={formData.confirmEmail}
                            onChange={handleChange}
                        />

                </div>

                    {error && <div className="p-error">{error}</div>}

                <div className='flex gap-2'>
                        <Button type="submit" label="Valider" className="p-mt-2" />
                        <Button type="button" label="J'ai déjà un compte" onClick={() => { setSignupVisible(false); setLoginVisible(true) }} />
                    </div>

            </form>
        </div>
    );
}
