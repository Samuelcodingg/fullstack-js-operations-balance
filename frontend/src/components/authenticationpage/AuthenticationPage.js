import React, { useState } from 'react';
import person from './login-image.png';

import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export const AuthenticationPage = () => {

    const [formState, setFormState] = useState(0);

    return (
        <div className='bg-principal min-vh-100'>
            <div className='container me-0'>
                <div className='row'>
                    <div className='d-none d-lg-block col-lg-3'>
                        <img src={person} alt="person" className="position-relative person-auth" />
                    </div>
                    <div className='col-lg-9 bg-white d-flex flex-column justify-content-center align-items-center min-vh-100 rounded-left remove-rounded-left'>
                        <h1 className='text-center'>Alkemy Challenge Fullstack JS</h1>
                        { formState === 0 ? <LoginForm setFormState={setFormState} /> : <RegisterForm setFormState={setFormState} /> }
                    </div>
                </div>
            </div>
        </div>
    )
}
