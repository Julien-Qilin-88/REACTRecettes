import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

export default function inscription() {
    return (
        <div>
            <h2>inscription</h2>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="username">Username</label>
                    <InputText id="username" type="text" />

                    <label htmlFor="password">Password</label>
                    <Password id="password" />

                    <label htmlFor='passwordConfirm'>Confirm Password</label>
                    <Password id='passwordConfirm' />

                    <label htmlFor="email">Email</label>
                    <InputText id="email" type="text" />

                    <label htmlFor="emailConfirm">Confirm Email</label>
                    <InputText id="emailConfirm" type="text" />

                </div>
            </div>
        </div>
    )
}

