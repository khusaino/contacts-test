import { createContext } from "react";

function noop(){}

export const AuthContext = createContext({
  userId: null,
  login: noop,
  logout: noop,
  firstName: '',
  lastName: '',
  isAuthenticated: false,
})