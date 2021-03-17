export const ContactList = ({ contacts, removeContact, changeContact, handleChange }) =>{

  return(
    <>
    <div className="row">
        <div className="input-field col s6">
          <i className="material-icons prefix">account_circle</i>
          <input id="icon_prefix" type="text" className="validate" onChange={handleChange}/>
          <label htmlFor="icon_prefix">Поиск</label>
        </div>
      </div>
    <table className="highlight">
        <thead>
          <tr>
              <th>Имя</th>
              <th>Телефон</th>
              <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((contact) => {
              return(
              <tr key={contact._id}>
                <td>{contact.firstName}</td>
                <td><a href="tel::">{contact.phone}</a></td>
                <td><a href="mailto::">{contact.email}</a></td>
                <td>
                  <button className="waves-effect waves-light btn-small" onClick={changeContact} data-id={contact._id}>Изменить</button>
                  <button className="waves-effect waves-light btn-small red darken-1" onClick={removeContact} data-id={contact._id} style={{marginLeft: "10px"}}>Удалить</button>
                </td>
              </tr>
              )
          })}
        </tbody>
      </table>
      </>
  )
}