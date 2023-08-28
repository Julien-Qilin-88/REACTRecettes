import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';

export default function Header(props) {
    const [activeIndex, setActiveIndex] = useState(0);
    
    const items = [
        { label: 'Home', icon: 'pi pi-fw pi-home', page: 'home' },
        { label: 'Recettes', icon: 'pi pi-fw pi-calendar', page: 'listrecette' },
        { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
        { label: 'Creation', icon: 'pi pi-fw pi-file', page: 'creation' },
        { label: 'Settings', icon: 'pi pi-fw pi-cog' }
    ];

    return (

        <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => {
            setActiveIndex(e.index);
            props.setPage(e.value.page);
        }} />

    )
}