import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Nav } from '../components/Nav';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook';

export const AuthPage = ()=>{
  const auth = useContext(AuthContext) // auth  =  {token, userId, login, logout, isAuthenticated,}
  const message = useMessage()  // высвечивает сообщение
  const {loading, request, error, clearError} = useHttp(); // функции и переменные с хука отправки запроса

  const [form, setForm] = useState({
    email: "", password: ""
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


  const loginHandler = async () =>{
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.userId, data.firstName, data.lastName) 
    }catch(error){}
  }


  const link = <NavLink to='/register'>зарегестрироватся</NavLink>
  
  return(
    <>
    <Nav title={"Авторизация"} link={link}/>
    <div className="row"> 
      <div className="col s6 offset-s3">
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <div>
              <div className="input-field">
                <input
                  placeholder="введите email"
                  id="email"
                  type='text'  
                  name="email"
                  onChange={changeHandler}
                  value={form.email}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="введите пароль"
                  id="password"
                  type='password'
                  name="password"  
                  onChange={changeHandler}
                  value={form.password}
                />
                <label htmlFor="email">пароль</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button 
              className="btn yellow darken-4"
              disabled={loading}
              onClick={loginHandler}
            >Войти</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}