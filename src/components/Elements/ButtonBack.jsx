import React from 'react';
import { Button } from 'primereact/button';

const ButtonBack = (props) => {

    const handleClickBack = () => {
        props.setShowRecetteDetails(false);
        props.setPage('recettes');
    }

    return (
        <Button label="Retour sur la liste des recettes" onClick={handleClickBack} />
    );

}

export default ButtonBack;
