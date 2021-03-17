import React, { useState, useEffect, useContext, useCallback} from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from "../context/AuthContext";
import { useHistory, useParams } from "react-router-dom";
import { useMessage } from '../hooks/message.hook';

export const Changepage = ()=>{
  const [form, setForm] = useState({
    firstName: '', phone: '', email: ''
  })
  const {request, loading} = useHttp()
  const auth = useContext(AuthContext)
  const message = useMessage()
  const id = useParams().id
  const history = useHistory()

  const submitHandler = async (event) => {
    event.preventDefault()
   
      try {
        const data = await request('/api/contact/change', 'POST', {...form, userId:auth.userId, id}, )  
        history.push(`/list`)
        message(data.message)
      } catch (e) {}
  }

  const getContact = useCallback(async()=>{
    try {
      const contact = await request('/api/contact/id', "POST", {id: id})
      setForm({firstName: contact.firstName, phone: contact.phone, email: contact.email})
    } catch (error) {}
  },[id, request])

  useEffect(()=>{
    getContact()
  }, [getContact])

  useEffect(()=>{
    window.M.updateTextFields()
  })

  const handleChange = (event) =>{
    setForm({...form, [event.target.name]: event.target.value})
  }

  

  return(
    <div className="row">
    <form className="col s12" onSubmit={submitHandler}>
      <div className="row">
        <div className="input-field col s6">
          <i className="material-icons prefix">account_circle</i>
          <input 
            id="icon_prefix" 
            type="text" 
            className="validate" 
            name="firstName"
            value={ form.firstName } 
            onChange={handleChange}/>
          <label htmlFor="icon_prefix">Имя</label>
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix">phone</i>
          <input 
            id="icon_telephone" 
            type="tel" 
            className="validate" 
            name="phone" 
            value={form.phone}
            onChange={handleChange}/>
          <label htmlFor="icon_telephone">Телефон</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input 
            id="email" 
            type="email" 
            className="validate" 
            name="email" 
            value={form.email}
            onChange={handleChange}/>
          <label htmlFor="email">Email</label>
        </div>
      </div>
      <button className="btn waves-effect waves-light" type="submit" name="action" disabled={loading}>Сохранить
        <i className="material-icons right">send</i>
      </button>
    </form>
  </div>
  )
}