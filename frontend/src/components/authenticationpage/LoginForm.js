import React from 'react';

export const LoginForm = ({setFormState}) => {
  return (
    <form>
        <h5 className='text-center'>Log in and check your account</h5>

        <div className='form-group mt-4'>
            <input 
                type="text" 
                placeholder="Email" 
                className='form-control border-dark just-border-bottom remove-focus'    
            />    
        </div>
        <div className='form-group mt-4'>
            <input
                type="password"
                placeholder="Password"
                className='form-control border-dark just-border-bottom remove-focus'
            />
        </div>
        <div className='form-group mt-4'>
            <button className='w-100 rounded border-0 bg-principal text-white py-2'>Log in</button>
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
