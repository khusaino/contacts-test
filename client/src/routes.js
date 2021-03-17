import React from "react"
import {Switch, Route, Redirect} from 'react-router-dom'
import { ContactsPage } from "./pages/ContactsPage"
import { CreatePage } from "./pages/CreatePage"
import { AuthPage } from "./pages/AuthPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Changepage } from "./pages/ChangePage";


export  const useRoutes = isAuthenticated =>{
  if(isAuthenticated){
    return(
      <Switch>
          <Route path="/list" exact>
            <ContactsPage/>
          </Route>
        <Route path="/create" exact>
          <CreatePage/>
        </Route>
        <Route path="/change/:id" exact>
          <Changepage/>
        </Route>
        <Redirect to="/create" />
      </Switch>
    )
  }
  return(
    <Switch>
      <Route path="/" exact >
        <AuthPage/>
      </Route>
      <Route path="/register" exact>
        <RegisterPage/>
      </Route>
      <Redirect to="/"/> 
    </Switch>
  )
}