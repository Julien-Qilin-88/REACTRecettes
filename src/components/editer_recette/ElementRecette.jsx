import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const ElementRecette = ({ label, value, onSave, elementType }) => {
    const [editing, setEditing] = useState(false);
    const [editedValue, setEditedValue] = useState(value);

    const handleEditClick = () => {
        setEditedValue(value);
        setEditing(true);
    };

    const handleCancelClick = () => {
        setEditing(false);
    };

    const handleSaveClick = () => {
        onSave(editedValue);
        setEditing(false);
    };

    const renderValueElement = () => {
        switch (elementType) {
            case 'h2':
                return <h2>{label}: {editedValue}</h2>;
            case 'li':
                return <li>{editedValue}</li>;
            default:
                return <p>{label}: {editedValue}</p>;
        }
    };

    return (
        <>
            {editing ? (
                <>
                    <InputText value={editedValue} onChange={(e) => setEditedValue(e.target.value)} />
                    <Button label="Mettre à jour" icon="pi pi-check" iconPos="right" text onClick={handleSaveClick} />
                    <Button label="Annuler" icon="pi pi-times" iconPos="right" text onClick={handleCancelClick} />
                </>
            ) : (
                <>
                    {renderValueElement()}
                    <Button label="Editer" icon="pi pi-file-edit" iconPos="right" text onClick={handleEditClick} />

                </>

            )}
        </>
    );
};

export default ElementRecette;
