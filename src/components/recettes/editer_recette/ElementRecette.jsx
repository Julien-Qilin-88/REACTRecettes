import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const ElementRecette = ({ label, value, onSave, elementType, onDelete, onSelect }) => {
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

    const handleDeleteClick = () => {
        onDelete();
    };

    const renderValueElement = () => {
        switch (elementType) {
            case 'h2':
                return <h2>{label}: {value}</h2>;
            case 'li':
                return (
                    <div>
                        <li>{value}</li>

                    </div>
                );
            case 'img':
                return (
                    <img className='card__image' src={value} alt={label} />
                );
            default:
                return <p>{label}: {value}</p>;
        }
    };

    return (
        <>
            {editing ? (
                <div>
                    {elementType && (
                        <>
                            <label htmlFor="title">Modifier {label}</label>
                            <InputText value={editedValue} onChange={(e) => setEditedValue(e.target.value)} />
                        </>
                    )}

                    <Button label="Mettre à jour" icon="pi pi-check" iconPos="right" text onClick={handleSaveClick} />
                    <Button label="Annuler" icon="pi pi-times" iconPos="right" text onClick={handleCancelClick} />
                </div>
            ) : (
                <>
                    {renderValueElement()}
                    <Button label="Editer" icon="pi pi-file-edit" iconPos="right" text onClick={handleEditClick} />
                        {elementType === 'li' && (
                            <Button label="Supprimer" icon="pi pi-trash" iconPos="right" text onClick={handleDeleteClick} />
                        )}
                </>
            )}
        </>
    );
};

export default ElementRecette;
