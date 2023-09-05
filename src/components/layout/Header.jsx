import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Connexion from './Connexion';
import Inscription from './Inscription';

export default function Header(props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [visible, setVisible] = useState(false);
    const isAuthenticated = props.isAuthenticated;

    const handleLogout = () => {
        // Gérez la déconnexion ici
        props.setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated', 'false');
    };

    const menuItemsUnauthenticated = [
        { label: 'Accueil', icon: 'pi pi-fw pi-home', page: 'home' },
        { label: 'Liste des recettes', icon: 'pi pi-fw pi-calendar', page: 'recettes' },
        { label: 'Menu semaine', icon: 'pi pi-fw pi-pencil', page: 'menu' },
        // { label: 'Connexion', icon: 'pi pi-fw pi-sign-in', page: 'connexion' },
        // { label: 'Inscription', icon: 'pi pi-fw pi-user-plus', page: 'inscription' }
    ];

    const menuItemsAuthenticated = [
        { label: 'Accueil', icon: 'pi pi-fw pi-home', page: 'home' },
        { label: 'Liste des recettes', icon: 'pi pi-fw pi-calendar', page: 'recettes' },
        { label: 'Ajouter une recette', icon: 'pi pi-fw pi-file', page: 'creation' },
        { label: 'Menu semaine', icon: 'pi pi-fw pi-pencil', page: 'menu' },
        // { label: 'Profil', icon: 'pi pi-fw pi-user', page: 'profil' },
    ];

    const items = isAuthenticated ? menuItemsAuthenticated : menuItemsUnauthenticated;


    return (
        <div className='flex flex-row justify-content-between'>
            <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => {
                setActiveIndex(e.index);
                props.setPage(e.value.page);
            }} />
            {isAuthenticated ?
                <div className='flex gap-2'>
                    <Button label='Deconnexion' onClick={handleLogout} />
                    <Button label='profil' onClick={() => props.setPage('profil')} />
                </div>
                :
                <div className='flex gap-2'>
                    <Button label="Connexion" icon="pi pi-external-link" onClick={() => setVisible(true)} />
                    <Dialog header="Connexion" visible={visible} onHide={() => setVisible(false)}
                        style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                        <Connexion setIsAuthenticated={props.setIsAuthenticated} />
                    </Dialog>

                    <Button label="Inscription" icon="pi pi-external-link" onClick={() => setVisible(true)} />
                    <Dialog header="Inscription" visible={visible} onHide={() => setVisible(false)}
                        style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                        <Inscription setVisible={setVisible} />
                    </Dialog>
                </div>
            }
            <div className="card flex justify-content-center">

            </div>


        </div>
    )
}
