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
            case 'img':
                return <img className='card__image' src={editedValue} alt={label} />;
            default:
                return <p>{label}: {editedValue}</p>;
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setEditedValue(reader.result);
        };
        console.log(file);

    };

    return (
        <>
            {editing ? (
                <div>
                    {elementType !== 'img' && (
                        <>
                            <label htmlFor="title">Modifier {label}</label>
                            <InputText value={editedValue} onChange={(e) => setEditedValue(e.target.value)} />
                        </>
                    )}
                    {elementType === 'img' && (
                        <>
                            <input type="file" name="image" onChange={(e) => handleFileUpload(e)} />
                        </>
                    )}
                    <Button label="Mettre à jour" icon="pi pi-check" iconPos="right" text onClick={handleSaveClick} />
                    <Button label="Annuler" icon="pi pi-times" iconPos="right" text onClick={handleCancelClick} />
                </div>
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
