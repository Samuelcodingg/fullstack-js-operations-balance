import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuhenticated } from '../../api/auth';
import Swal from 'sweetalert2';
import { createOperation, getOPerationsById } from '../../api/operation';
import { getBalanceInfo } from '../../api/user';

export const HomePage = () => {

  const dateToday = new Date();

  const [valuesOperation, setValuesOperation] = useState({
    concept: '',
    amount: '',
    type_id: 2,
    date: `${dateToday.getFullYear()}-${dateToday.getMonth() + 1}-${dateToday.getDate()}`
  });

  const [operating, setOperating] = useState(false);

  const { concept, amount, type_id, date } = valuesOperation;

  const { user } = isAuhenticated();

  const [balanceInfo, setBalanceInfo] = useState({
    money: 0
  });

  const { money } = balanceInfo;

  const [operations, setOperations] = useState([]);

  const redirectUser = () => {
    if(!user) {
      return <Redirect to='/authentication' />
    }
  }

  useEffect(()=> {
    getBalanceInfo(user.id)
      .then(data => {
        setBalanceInfo({...balanceInfo, money: data.money});
      }
      )
      .catch(err => {
        console.log(err);
      }
      );

    getOPerationsById(user.id)
      .then(data => {
        setOperations(data);
      }
      )
      .catch(err => {
        console.log(err);
      }
      );
  },[operating]);

  const logout = () => {
    localStorage.removeItem('jwt');

    window.location.href = '/authentication';
  }

  const handleChange = name => event => {
    setValuesOperation({ ...valuesOperation, [name]: event.target.value });
  }

  const clickSubmit = event => {
    event.preventDefault();

    console.log(valuesOperation);

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

        setValuesOperation({ ...valuesOperation, concept: '', amount: '', type_id: '', date: `${dateToday.getFullYear()}-${dateToday.getMonth() + 1}-${dateToday.getDate()}` });
      
        setOperating(!operating);
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
              Hi, {user.name}!
            </h1>
            <div className='container my-5'>
              <div className='row'>
                <div className='rounded border border-secondary col-12 col-md-6 mx-auto py-5'>
                  <h2 className='text-center'>Your balance</h2>
                  <h1 className='text-center'>${money}</h1>
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
                  {
                    operations.map((operation, index) => (
                      <tr key={index}>
                        <th scope='row'>{index + 1}</th>
                        <td>{operation.concept}</td>
                        <td>{ operation.type_id === 1 ? '+' : '-' }${operation.amount}</td>
                        <td>{operation.date.substring(0,10)}</td>
                      </tr>
                    ))
                  }
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
                  value={type_id}
                  onChange={handleChange('type_id')}
                >
                  <option selected value={2}>Expense</option>
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
