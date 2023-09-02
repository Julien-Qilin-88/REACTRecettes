import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

export default function connexion() {
    return (
        <div>
            <h2>connexion</h2>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="username">Username</label>
                    <InputText id="username" type="text" />

                    <label htmlFor="password">Password</label>
                    <Password id="password" />

                </div>
            </div>
        </div>
    )
}
