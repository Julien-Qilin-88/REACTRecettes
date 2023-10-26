import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useAuth } from '../layout/AuthProvider';

const Profil = (props) => {
    const { setPage } = props;

    const { isAuthenticated, logout } = useAuth();
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [newEmail, setNewEmail] = useState('');
    const [editMode, setEditMode] = useState(null);
    const [message, setMessage] = useState('');
    const [messageError, setMessageError] = useState('');
    const [users, setUsers] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(false);

    // Utilisez useEffect pour déclencher la suppression du message après un certain délai
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage('');
            setMessageError('');
        }, 5000); 

        // Nettoyez le timer lorsqu'un nouveau message est affiché ou lorsque le composant est démonté
        return () => clearTimeout(timer);
    }, [message, messageError]);

    const handleEmailChange = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const userId = Number(localStorage.getItem('userId'));
        // Vérifiez d'abord le mot de passe (côté client, pour l'exemple)

        try {

            const response = await fetch(`http://localhost:3001/user/email/${userId}`, {
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
            setMessageError(`Erreur : ${error.message}, veuillez réessayer plus tard.`);
        }

    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        // Vérifiez si les nouveaux mots de passe correspondent
        if (passwords.newPassword !== passwords.confirmPassword) {
            setMessageError('Les nouveaux mots de passe ne correspondent pas.');
            setMessage('');
            return;
        }

        const token = localStorage.getItem('token');
        const userId = Number(localStorage.getItem('userId'));
        try {
            const response = await fetch(`http://localhost:3001/user/password/${userId}`, {
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
            setMessageError(`Erreur : ${error.message}, veuillez réessayer plus tard.`);
        }
    };

    const handleDeleteAccount = async (e) => {
        e.preventDefault()

        if (!confirmDelete) {
            // Affichez une boîte de dialogue de confirmation ici
            setConfirmDelete(true);
            return;
        }

        const token = localStorage.getItem('token');
        const userId = Number(localStorage.getItem('userId'));

        try {
            const response = await fetch(`http://localhost:3001/user/delete/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    password: passwords.oldPassword
                })
            });

            if (response.status === 204) {
                // Statut 204 signifie No Content, donc la suppression a réussi
                resetFields();
                setEditMode(null);
                setMessage('Compte supprimé avec succès.');
                setMessageError('');
                logout();
                setPage('home');

            } else if (response.status === 401) {
                // Statut 401 signifie Unauthorized, donc le mot de passe est incorrect
                console.error('Mot de passe incorrect');
                setMessageError(`Erreur : Mot de passe incorrect.`);
                setMessage('');
            } else {
                // Statut différent de 204 et 401 indique une autre erreur
                console.error('Erreur lors de la suppression du compte:', response.status);
                setMessageError(`Erreur : La suppression du compte a échoué.`);
                setMessage('');
            }
        } catch (error) {
            setMessageError(`Erreur : ${error.message}, veuillez réessayer plus tard.`);

        };
    };
    useEffect(() => {
        const fetchUsers = async () => {
            // Vérifiez d'abord le rôle de l'utilisateur
            const userRole = localStorage.getItem('userRole');
            if (userRole !== 'admin') {
                return;
            }
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:3001/user/allUsers', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    const errorData = await response.json();
                    setMessageError(`Erreur : ${errorData.message}`);
                    setMessage('');
                }
            } catch (error) {
                setMessageError(`Erreur : ${error.message}, veuillez réessayer plus tard.`);
            }
        };

        fetchUsers(); // Appeler la fonction pour récupérer les utilisateurs lors du chargement du composant
    }, []) // Assurez-vous de fournir un tableau vide en tant que dépendance pour s'assurer que cela se produit une seule fois au montage du composant

    const handleRoleChange = async (e, userId) => {

        const token = localStorage.getItem('token');
        const newRole = e.target.checked ? 'admin' : 'user';

        try {
            const response = await fetch(`http://localhost:3001/user/changerole/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    role: newRole
                })
            });

            if (response.ok) {
                const data = await response.json();
                // Mettre à jour l'état local avec les nouveaux utilisateurs après avoir modifié le rôle
                setUsers(prevUsers => prevUsers.map(user => {
                    if (user.id === userId) {
                        return { ...user, role: data.newRole };
                    }
                    return user;
                }));
            } else {
                const errorData = await response.json();
                setMessageError(`Erreur : ${errorData.message}`);
                setMessage('');
            }
        } catch (error) {
            setMessageError(`Erreur : ${error.message}, veuillez réessayer plus tard.`);
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
    const role = localStorage.getItem('userRole');

    return (
        <div className='d-flex p-5'>
            {isAuthenticated ? (
                <>
                    <h2>Profil de {user}</h2>
                    {message && <div className='notError'>{message}</div>}
                    {messageError && <div className='error'>{messageError}</div>}

                    {editMode === 'password' && (
                        <form onSubmit={handlePasswordChange} className="flex flex-column gap-3">
                            {/* Obligatoire pour des raisons d'accessibilité */}
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
                            <div className="flex flex-column gap-2">
                                <label htmlFor="oldpassword" >Ancien mot de passe :</label>
                                <div>
                                    <Password
                                        id="oldpassword"
                                        value={passwords.oldPassword}
                                        onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                                        toggleMask
                                        autoComplete="current-password"  // Ajoutez cet attribut
                    />
                                </div>

                            </div>
                            <div className="flex flex-column gap-2">
                                <label htmlFor="newpassword" >Nouveau mot de passe :</label>
                                <div>
                                    <Password
                                        id="newpassword"
                                        value={passwords.newPassword}
                                        onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                        toggleMask
                                        autoComplete="new-password"  // Ajoutez cet attribut
                                    /> 
                                </div>

                            </div>
                            <div className="flex flex-column gap-2">
                                <label htmlFor="confirmpassword">Confirmer le mot de passe :</label>
                                <div>
                    <Password
                                        id="confirmpassword"
                                        value={passwords.confirmPassword}
                                        onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                        toggleMask
                                        autoComplete="new-password"  // Ajoutez cet attribut
                    />
                                </div>

                            </div>
                            <div className='flex gap-2'>
                                <Button type='submit' severity="success" >Changer le mot de passe</Button>
                                <Button type='button' severity="danger" onClick={() => { setEditMode(null); resetFields(); }}>Annuler</Button>
                            </div>
                </form>
                    )}

                    {editMode === 'email' && (
                        <form onSubmit={handleEmailChange} className="flex flex-column gap-5">
                            <div className='flex align-items-center gap-2'>
                                <label htmlFor="email" className="font-bold block mb-2">Nouvelle adresse e-mail :</label>
                                <InputText
                                    id="email"
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
                            <div className='flex gap-2'>
                                <Button type='submit' severity="success" onClick={handleEmailChange}>Changer l'adresse e-mail</Button>
                                <Button type='button' severity="danger" onClick={() => { setEditMode(null); resetFields(); }}>Annuler</Button>
                            </div>
                        </form>
                    )}


                    {editMode === 'delete' && (
                        <form onSubmit={handleDeleteAccount} className="card flex-column gap-2">
                            <div className='flex gap-2 align-items-center'>
                                <label htmlFor="password" className="font-bold block mb-2">Mot de passe :</label>
                            <Password
                                id="password"
                                value={passwords.oldPassword}
                                onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                                toggleMask
                                    autoComplete="current-password"
                            />
                            <div className='flex gap-2'>
                                <Button type="submit" severity="success" >Supprimer le compte</Button>
                                <Button type="button" severity="danger" onClick={() => { setEditMode(null); resetFields(); }}>Annuler</Button>
                                </div> 
                            </div>


                            {confirmDelete && (
                                <div className="confirmation-dialog text-center">
                                    <p>Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.</p>
                                    <Button type="submit" severity="danger">Confirmer la suppression</Button>
                                    <Button type="button" severity="secondary" onClick={() => setConfirmDelete(false)}>Annuler</Button>
                                </div>
                            )}
                        </form>
                    )}

                    {!editMode && (
                        <>
                            <div className="flex gap-2">
                                <Button onClick={() => setEditMode('password')}>Changer mon mot de passe</Button>
                                <Button onClick={() => setEditMode('email')}>Changer mon adresse e-mail</Button>
                                <Button onClick={() => setEditMode('delete')}>Supprimer mon compte</Button>
                            </div>
                            {role === 'admin' && (
                            <div>
                                <h3>Tous les utilisateurs</h3>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Admin</th>
                                                <th>Nom</th>
                                                <th>Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map(user => (
                                                <tr key={user.id}>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            checked={user.role === 'admin'}
                                                            onChange={(e) => handleRoleChange(e, user.id)}
                                                        />
                                                    </td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                            </div>
                            )}
                        </>
                    )}

                </>
            ) : (
                <div>
                    <p>Connectez-vous pour accéder à votre profil</p>
                </div>
            )}
        </div>
    );

};



export default Profil;
