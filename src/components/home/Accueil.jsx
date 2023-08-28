import { useState } from 'react';
import { Button } from 'primereact/button';

export default function Accueil() {

    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    }

    return (
        <>
            <h1>Accueil</h1>
            <p>Bienvenue sur le site de recettes de cuisine</p>
            <p>Vous avez cliqué {count} fois</p>
            <Button label="Click" onClick={increment} />
        </>
    );
} 