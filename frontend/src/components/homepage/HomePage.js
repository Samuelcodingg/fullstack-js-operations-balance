import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuhenticated } from '../../api/auth';
import Swal from 'sweetalert2';
import { createOperation } from '../../api/operation';

export const HomePage = () => {

  const dateToday = new Date();

  const [valuesOperation, setValuesOperation] = useState({
    concept: '',
    amount: '',
    type_id: '',
    date: `${dateToday.getFullYear()}-${dateToday.getMonth() + 1}-${dateToday.getDate()}`
  });

  const { concept, amount, type_id, date } = valuesOperation;

  const { user } = isAuhenticated();

  const redirectUser = () => {
    if(!user) {
      return <Redirect to='/authentication' />
    }
  }

  const logout = () => {
    localStorage.removeItem('jwt');

    window.location.href = '/authentication';
  }

  const handleChange = name => event => {
    setValuesOperation({ ...valuesOperation, [name]: event.target.value });
  }

  const clickSubmit = event => {
    event.preventDefault();

    if(concept === '' || amount === '' || type_id === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields are required!',
      })
      return;
    }

    const operation = {
      concept,
      amount: parseInt(amount),
      type_id: parseInt(type_id),
      date
    }

    createOperation({...operation, user_id: user.id})
      .then(data => {
        if(data.error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.error,
          })
          return;
        }

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Operation created successfully!',
        })
      }
      );
  }



  return (
    <div className='bg-principal min-vh-100'>
      {redirectUser()}
      <div className='container py-5'>
        <div className='text-white d-flex align-items-center mb-4 pointer'
          onClick={logout}>
          <i className="fa-solid fa-right-from-bracket"></i> &nbsp;
          <h5 className='mb-0'>Logout</h5>
        </div>
        <div className='row'>
          <div className='col-md-8 bg-white rounded px-4 order-2 order-md-1 mt-5 mt-md-0'>
            <h1 className='mt-4'>
              Hi, Samuel!
            </h1>
            <div className='container my-5'>
              <div className='row'>
                <div className='rounded border border-secondary col-12 col-md-6 mx-auto py-5'>
                  <h2 className='text-center'>Your balance</h2>
                  <h1 className='text-center'>$0.00</h1>
                  <p className='mb-0'>Last operation: -12.00</p>
                </div>  
              </div>
            </div>
            <div className='my-5'>
              <h4>History</h4>
              <table className='table table-striped table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Concept</th>
                    <th scope='col'>Amount</th>
                    <th scope='col'>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope='row'>1</th>
                    <td>Salary</td>
                    <td>$12.00</td>
                    <td>12/12/2020</td>
                  </tr>
                  <tr>
                    <th scope='row'>2</th>
                    <td>Salary</td>
                    <td>$12.00</td>
                    <td>12/12/2020</td>
                  </tr>
                  <tr>
                    <th scope='row'>3</th>
                    <td>Salary</td>
                    <td>$12.00</td>
                    <td>12/12/2020</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
          </div>
          <div className='offset-md-1 col-md-3 bg-white rounded form-operations order-1 order-md-2'>
            <form className='my-5'>
              <h5 className='text-center'>
                Add operation
              </h5>
              <div className='form-group mt-4'>
                <input 
                  type='text' 
                  className='form-control' 
                  placeholder='Concept' 
                  name='concept'
                  value={concept}
                  onChange={handleChange('concept')}
                />
              </div>
              <div className='form-group mt-4'>
                <input 
                  type='text' 
                  className='form-control' 
                  placeholder='Amount' 
                  name='amount'
                  value={amount}
                  onChange={handleChange('amount')}
                />
              </div>
              <div className='form-group mt-4'>
                <select 
                  className='form-control'
                  name='type_id'
                  value={type_id}
                  onChange={handleChange('type_id')}
                >
                  <option value={2}>Expense</option>
                  <option value={1}>Income</option>
                </select>
              </div>
              <div className='form-group mt-4'>
                <button 
                    className='w-100 rounded border-0 bg-principal text-white py-2'
                    onClick={clickSubmit}
                >
                    Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
