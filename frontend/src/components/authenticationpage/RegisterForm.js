import React, { useState } from 'react';
import Swal from 'sweetalert2';


export const RegisterForm = ({ setFormState }) => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const { name, email, password, passwordConfirm } = values;

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    }

    const clickSubmit = event => {
        event.preventDefault();
        if(password !== passwordConfirm) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Passwords do not match!',
            })
            return;
        }

        if(name === '' || email === '' || password === '' || passwordConfirm === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'All fields are required!',
            })
            return;
        }

        if(password.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password must be at least 6 characters!',
            })
            return;
        }

        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'You have successfully registered!'
        })
    }

    return (
        <form>
            <h5 className='text-center'>Sign up and take a control of your money</h5>
            <div className='form-group mt-4'>
                <input
                    type="text"
                    placeholder="Name"
                    className='form-control border-dark just-border-bottom remove-focus'
                    name='name'
                    value={name}
                    onChange={handleChange('name')}
                />
            </div>
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
                <input
                    type="password"
                    placeholder="Confirm password"
                    className='form-control border-dark just-border-bottom remove-focus'
                    name='passwordConfirm'
                    value={passwordConfirm}
                    onChange={handleChange('passwordConfirm')}
                />
            </div>
            <div className='form-group mt-4'>
                <button 
                    className='w-100 rounded border-0 bg-principal text-white py-2'
                    onClick={clickSubmit}
                >
                    Sign up
                </button>
            </div>
            <div className='mt-3 text-center'>
                Already registered? <span
                    className='pointer text-decoration-underline color-principal'
                    onClick={() => setFormState(0)}
                >Log in</span>
            </div>
        </form>
    )
}
