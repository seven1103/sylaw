import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const Login = 'ads'
export function setLogin(login) {
  return Cookies.set(Login, login)
}
export function getLogin() {
  return JSON.parse(Cookies.get(Login))
}
export function removeLogin() {
  return Cookies.remove(Login)
}