import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';
import { authenticate, isAuhenticated, signin } from '../../api/auth';

export const LoginForm = ({ setFormState }) => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        redirectToReferrer: false
    })

    const { email, password, redirectToReferrer } = values;

    const token = isAuhenticated();

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    }

    const clickSubmit = event => {
        event.preventDefault();

        if(email === '' || password === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'All fields are required!',
            })
            return;
        }

        const user = {
            email,
            password
        }

        signin(user)
            .then(data => {
                if(data.error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.error,
                    })
                    return;
                }

                authenticate(data, () => {
                    setValues({ ...values, redirectToReferrer: true });
                })
                
            }
            );

    }

    const redirectUser = () => {
        if(redirectToReferrer || token) {
            return <Redirect to='/' />
        }
    }

    return (
        <form>
            {redirectUser()}
            <h5 className='text-center'>Log in and check your account</h5>

            <div className='form-group mt-4'>
                <input
                    type="email"
                    placeholder="Email"
                    className='form-control border-dark just-border-bottom remove-focus'
                    name='email'
                    value={email}
                    onChange={handleChange('email')}
                />
            </div>
            <div className='form-group mt-4'>
                <input
                    type="password"
                    placeholder="Password"
                    className='form-control border-dark just-border-bottom remove-focus'
                    name='password'
                    value={password}
                    onChange={handleChange('password')}
                />
            </div>
            <div className='form-group mt-4'>
                <button 
                    className='w-100 rounded border-0 bg-principal text-white py-2'
                    onClick={clickSubmit}
                >
                    Log in
                </button>
            </div>
            <div className='mt-3 text-center'>
                Don't have an account? <span
                    className='pointer text-decoration-underline color-principal'
                    onClick={() => setFormState(1)}
                >Sign up</span>
            </div>
        </form>
    )
}
