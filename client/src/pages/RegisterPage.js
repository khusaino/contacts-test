import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Nav } from '../components/Nav';
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook';

export const RegisterPage = ()=>{
  const message = useMessage()  
  const {loading, request, error, clearError} = useHttp(); 

  const [form, setForm] = useState({
    email: "", password: "", firstName:"", lastName: "", 
  })

  useEffect(()=>{
    message(error)
    clearError()
  },[error, message, clearError])
  useEffect(()=>{
    window.M.updateTextFields()
  })


  const changeHandler = event =>{
    setForm({
      ...form, [event.target.name]: event.target.value,
    })
  }

  
  const registerHandler = async (e) =>{
    e.preventDefault();
    try {
      const data = await request('/api/auth/register', 'POST', form)
      message(data.message)
    }catch(error){}
  }

  const link = <NavLink to='/'>Войти</NavLink>
  
  return(
  <>
    <Nav title={'Регистрация'} link={link}/>
    <div className="row">
      <form className="col s12" onSubmit={registerHandler}>
        <div className="row">
          <div className="input-field col s6">
            <input id="first_name" type="text" className="validate" name="firstName" onChange={changeHandler}/>
            <label htmlFor="first_name">Имя</label>
          </div>
          <div className="input-field col s6">
            <input id="last_name" type="text" className="validate" name="lastName" onChange={changeHandler}/>
            <label htmlFor="last_name">Фамилия</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="password" type="password" className="validate" name="password" onChange={changeHandler}/>
            <label htmlFor="password">Придумайте пароль</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="email" type="email" className="validate" name="email" onChange={changeHandler}/>
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <button className="btn waves-effect waves-light" type="submit" name="action" disabled={loading}>Зарегестрироватся
           <i className="material-icons right"></i>
         </button>
      </form>
    </div>
  </>
  )
}