import { useCallback, useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { ContactList } from "../components/ContactList"
import { Loader } from "../components/Loade"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"



export const ContactsPage = ()=>{
  const {request, loading} = useHttp()
  const {userId} = useContext(AuthContext)
  const [contacts, setContacts] = useState([])
  const [filterData, setFilteerData] = useState([])
  const [search, serSearch] = useState()
  const history = useHistory()
  const message = useMessage()


  const fetchContacts = useCallback(async ()=>{
    try {
      const data = await request('/api/contact/contacts', 'POST', {userId: userId})
      setContacts(data)
      setFilteerData(data)
    } catch (error) {}
  }, [userId, request])

  useEffect(()=>{
    fetchContacts()
  }, [fetchContacts])

  const removeContact = async(event) =>{
    let idRemove = event.target.dataset.id
    try {
      const response = await request('/api/contact/remove', "POST", {id:idRemove})
      let res = contacts.filter(element => {
        return element._id !== idRemove 
      });
      setContacts(res)
      message(response.message)
    } catch (error) {}
  }

  const changeContact = (event)=>{
    let idChange = event.target.dataset.id
    history.push(`/change/${idChange}`)
  }

  const handleChange = (event) =>{
    serSearch(event.target.value)
  }
  
  const searchContact = useCallback(() =>{
    let res = filterData.filter((elem)=>{
      return elem.firstName.toLowerCase().match(search.toLowerCase())
    })
    setContacts(res)
  },[search])

  useEffect(()=>{
    searchContact()
  }, [searchContact])

  if(loading){
    <Loader/>
  }

  if(!filterData || filterData.length === 0){
    return <h3 className="center" > Увас пока нет контактов</h3>
  }

  return(
    <>
      {!loading && <ContactList 
      contacts={contacts} 
      changeContact={changeContact} 
      removeContact={removeContact}
      handleChange={handleChange}/>}
    </>
  )
}