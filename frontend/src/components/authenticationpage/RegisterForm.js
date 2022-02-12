import React from 'react';

export const RegisterForm = ({setFormState}) => {
  return (
    <form>
        <h5 className='text-center'>Sign up and take a control of your money</h5>
        <div className='form-group mt-4'>
            <input 
                type="text" 
                placeholder="Name" 
                className='form-control border-dark just-border-bottom remove-focus'    
            />    
        </div>
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
            <input
                type="password"
                placeholder="Confirm password"
                className='form-control border-dark just-border-bottom remove-focus'
            />
        </div>
        <div className='form-group mt-4'>
            <button className='w-100 rounded border-0 bg-principal text-white py-2'>Sign up</button>
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
