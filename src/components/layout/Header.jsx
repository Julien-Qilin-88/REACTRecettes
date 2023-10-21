import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Connexion from './Connexion';
import Inscription from './Inscription';
import { useAuth } from './AuthProvider';

export default function Header(props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [loginVisible, setLoginVisible] = useState(false); // Pour la boîte de dialogue de connexion
    const [signupVisible, setSignupVisible] = useState(false); // Pour la boîte de dialogue d'inscription
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        // Gérez la déconnexion ici
        logout(); // Utilisez la fonction logout du contexte d'authentification
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        // actualisez la page ici si nécessaire
        window.location.reload();
    };

    const menuItemsUnauthenticated = [
        { label: 'Accueil', icon: 'pi pi-fw pi-home', page: 'home' },
        { label: 'Liste des recettes', icon: 'pi pi-fw pi-calendar', page: 'recettes' },
        { label: 'Menu du mois', icon: 'pi pi-fw pi-pencil', page: 'menu' },
    ];

    const menuItemsAuthenticated = [
        { label: 'Accueil', icon: 'pi pi-fw pi-home', page: 'home' },
        { label: 'Liste des recettes', icon: 'pi pi-fw pi-calendar', page: 'recettes' },
        { label: 'Ajouter une recette', icon: 'pi pi-fw pi-file', page: 'creation' },
        { label: 'Menu semaine', icon: 'pi pi-fw pi-pencil', page: 'menu' },
    ];

    const items = isAuthenticated ? menuItemsAuthenticated : menuItemsUnauthenticated;

    return (
        <div className='flex flex-row justify-content-between'>
            <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => {
                setActiveIndex(e.index);
                props.setPage(e.value.page);
            }} />
            <div className='flex'>
                {isAuthenticated ?
                    <div className='flex gap-2'>
                        <Button className='m-2' label='Deconnexion' onClick={handleLogout} />
                        <Button className='m-2' label='Profil' onClick={() => props.setPage('profil')} />
                    </div>
                    :
                    <div className='flex gap-2'>
                        <Button className='m-2' label="Connexion" icon="pi pi-user" onClick={() => setLoginVisible(true)} />
                        <Dialog header="Connexion" visible={loginVisible} onHide={() => setLoginVisible(false)} style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                            <Connexion setIsAuthenticated={props.setIsAuthenticated} setSignupVisible={setSignupVisible} setLoginVisible={setLoginVisible} />
                        </Dialog>

                        <Button className='m-2' label="Inscription" icon="pi pi-user-edit" onClick={() => setSignupVisible(true)} />
                        <Dialog header="Inscription" visible={signupVisible} onHide={() => setSignupVisible(false)} style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                            <Inscription setSignupVisible={setSignupVisible} setLoginVisible={setLoginVisible} />
                        </Dialog>
                    </div>
                }
            </div>
        </div>
    );
}
