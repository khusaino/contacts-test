import React, { useState, useContext, useEffect} from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from "../context/AuthContext";
import { useMessage } from '../hooks/message.hook';

export const CreatePage = ()=>{
  const [form, setForm] = useState({
    firstName: '', phone: '', email: ''
  })
  const {request, loading} = useHttp()
  const auth = useContext(AuthContext)
  const message = useMessage()


  const submitHandler = async (event) => {
    event.preventDefault()
   
      try {
        const data = await request('/api/contact/generate', 'POST', {...form, userId:auth.userId}, )  
        message(data.message)
      } catch (e) {}
  }

  const handleChange = (event) =>{
    setForm({...form, [event.target.name]: event.target.value})
  }

  useEffect(()=>{
    window.M.updateTextFields()
  })

  return(
    <div className="row">
    <form className="col s12" onSubmit={submitHandler}>
      <div className="row">
        <div className="input-field col s6">
          <i className="material-icons prefix">account_circle</i>
          <input id="icon_prefix" type="text" className="validate" name="firstName" onChange={handleChange}/>
          <label htmlFor="icon_prefix">Имя</label>
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix">phone</i>
          <input id="icon_telephone" type="tel" className="validate" name="phone" onChange={handleChange}/>
          <label htmlFor="icon_telephone">Телефон</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input id="email" type="email" className="validate" name="email" onChange={handleChange}/>
          <label htmlFor="email">Email</label>
        </div>
      </div>
      <button className="btn waves-effect waves-light" type="submit" name="action" disabled={loading}>Создать
        <i className="material-icons right">send</i>
      </button>
    </form>
  </div>
  )
}