import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import data from './data.json'; // Assurez-vous d'importer correctement vos données JSON

const Profil = () => {
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [newEmail, setNewEmail] = useState('');
    const [editMode, setEditMode] = useState(null);
    const [message, setMessage] = useState('');
    const [messageError, setMessageError] = useState('');


    const handleEmailChange = async () => {
        const token = localStorage.getItem('token');
        const userId = Number(localStorage.getItem('userId'));
        // Vérifiez d'abord le mot de passe (côté client, pour l'exemple)

        try {

            const response = await fetch(`http://localhost:3001/user/${userId}/email`, {
                method: 'PUT', // Indiquez que c'est une requête PUT
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    password: passwords.oldPassword, // Envoyez l'ancien mot de passe dans le corps de la requête
                    email: newEmail // Envoyez le nouvel e-mail dans le corps de la requête
                })
            });
            if (response.ok) {
                resetFields();
                setEditMode(null);
                setMessage('Adresse e-mail mise à jour avec succès.');
                setMessageError('');
            } else {
                const errorData = await response.json();
                setMessageError(`Erreur : ${errorData.message}`);
                setMessage('');
            }
        } catch (error) {
            console.log(error);
            alert('Erreur lors de la mise à jour de l\'adresse e-mail.');
        }

    };

    const handlePasswordChange = async () => {
        console.log('Ancien mot de passe:', passwords.oldPassword);
        console.log('Nouveau mot de passe:', passwords.newPassword);
        const token = localStorage.getItem('token');
        const userId = Number(localStorage.getItem('userId'));
        try {
            const response = await fetch(`http://localhost:3001/user/${userId}/password`, {
                method: 'PUT', // Indiquez que c'est une requête PUT
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    password: passwords.oldPassword, // Envoyez l'ancien mot de passe dans le corps de la requête
                    newPassword: passwords.newPassword // Envoyez le nouveau mot de passe dans le corps de la requête
                })
            });
            if (response.ok) {
                resetFields();
                setEditMode(null);
                setMessage('Mot de passe mis à jour avec succès.');
                setMessageError('');
            } else {
                const errorData = await response.json();
                setMessageError(`Erreur : ${errorData.message}`);
                setMessage('');
            }
        } catch (error) {
            console.log(error);
            alert('Erreur lors de la mise à jour du mot de passe.');
        }
    };

    const resetFields = () => {
        setPasswords({
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        setNewEmail('');
    };

    const user = localStorage.getItem('user');

    return (
        <div className='d-flex p-5'>
            <h1>Profil de {user}</h1>
            {message && <div className='notError'>{message}</div>}
            {messageError && <div className='error'>{messageError}</div>}


            {editMode === 'password' && (
                <form className="card flex gap-2">
                    {/* Obligatoire pour des raison d'accessibilité */}
                    <div className="hidden">
                        <label htmlFor="username">Nom d'utilisateur :</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={user}
                            readOnly
                            autoComplete="username"
                        />
                    </div>
                    <label htmlFor="oldpassword" className="font-bold block mb-2">Ancien mot de passe :</label>
                    <Password
                        id="oldpassword"
                        value={passwords.oldPassword}
                        onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                        toggleMask
                        autoComplete="current-password"  // Ajoutez cet attribut
                    />
                    <label htmlFor="newpassword" className="font-bold block mb-2">Nouveau mot de passe :</label>
                    <Password
                        id="newpassword"
                        value={passwords.newPassword}
                        onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                        toggleMask
                        autoComplete="new-password"  // Ajoutez cet attribut
                    />
                    <label htmlFor="confirmpassword" className="font-bold block mb-2">Confirmer le mot de passe :</label>
                    <Password
                        id="confirmpassword"
                        value={passwords.confirmPassword}
                        onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                        toggleMask
                        autoComplete="new-password"  // Ajoutez cet attribut
                    />
                    <button onClick={handlePasswordChange}>Changer le mot de passe</button>
                    <button onClick={() => { setEditMode(null); resetFields(); }}>Annuler</button>
                </form>
            )}

            {editMode === 'email' && (
                <form className="flex flex-column gap-5">

                    <div className='flex align-items-center gap-2'>
                        <label htmlFor="email" className="font-bold block mb-2">Nouvelle adresse e-mail :</label>
                        <InputText id="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            keyfilter="email"
                            autoComplete='email'
                        />
                    </div>
                    <div className='flex align-items-center gap-2'>
                        <label htmlFor="password" className="font-bold block mb-2">Mot de passe :</label>
                        <Password
                            id="password"
                            value={passwords.oldPassword}
                            onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                            toggleMask
                            autoComplete="current-password" // Ajoutez cet attribut pour résoudre l'erreur d'accessibilité
                        />
                    </div>
                    <div className='flex align-items-center gap-2'>
                        <button onClick={handleEmailChange}>Changer l'adresse e-mail</button>
                        <button onClick={() => { setEditMode(null); resetFields(); }}>Annuler</button>
                    </div>

                </form>
            )}

            {!editMode && (
                <div className="card flex gap-2">
                    <button onClick={() => setEditMode('password')}>Changer le mot de passe</button>
                    <button onClick={() => setEditMode('email')}>Changer l'adresse e-mail</button>
                </div>
            )}
        </div>
    );
};

export default Profil;
