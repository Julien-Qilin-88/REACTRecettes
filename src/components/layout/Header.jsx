import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';

export default function Header(props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const isAuthenticated = props.isAuthenticated; // Supposons que vous avez un état qui indique si l'utilisateur est connecté

    const items = [
        { label: 'Accueil', icon: 'pi pi-fw pi-home', page: 'home' },
        { label: 'Liste des recettes', icon: 'pi pi-fw pi-calendar', page: 'recettes' },
        { label: 'Ajouter une recette', icon: 'pi pi-fw pi-file', page: 'creation' },
        { label: 'Menu semaine', icon: 'pi pi-fw pi-pencil', page: 'edit' },
    ];

    if (isAuthenticated) {
        // Si l'utilisateur est connecté, affichez "Déconnexion" et masquez "Connexion" et "Inscription"
        items.push({ label: 'Déconnexion', icon: 'pi pi-fw pi-sign-out', page: 'deconnexion' });
    } else {
        // Si l'utilisateur n'est pas connecté, affichez "Connexion" et "Inscription" et masquez "Déconnexion"
        items.push({ label: 'Connexion', icon: 'pi pi-fw pi-sign-in', page: 'connexion' });
        items.push({ label: 'Inscription', icon: 'pi pi-fw pi-user-plus', page: 'inscription' });
    }

    return (
        <>
            <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => {
                setActiveIndex(e.index);
                props.setPage(e.value.page);
            }} />
        </>
    )
}
