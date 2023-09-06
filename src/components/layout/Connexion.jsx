import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import axios from 'axios';

export default function Connexion({ setIsAuthenticated, setSignupVisible }) {

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
                name: FormDataConnexion.name,
                password: FormDataConnexion.password,
            });

            if (response.status === 200) {
                console.log('Connexion réussie !');
                setIsAuthenticated(true);
                localStorage.setItem('isAuthenticated', 'true');
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Erreur lors de la demande de connexion:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                    <div>
                        <Button type="submit" label="Valider" />
                        {/* je n'ai pas de compte */}
                        <Button type="button" label="Inscription" onClick={() => setSignupVisible(true)} />
                    </div>

                </div>
            </form>
        </div>
    );
}
