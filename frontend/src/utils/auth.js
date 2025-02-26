import Cookies from 'js-cookie'
import Config from '@/settings'

const TokenKey = Config.TokenKey

const IdTokenKey = Config.IdTokenKey

const AccessTokenKey = Config.AccessTokenKey

const linkTokenKey = Config.LinkTokenKey

export function getIdToken() {
  return Cookies.get(IdTokenKey)
}

export function getToken() {
  // return Cookies.get(TokenKey)
  return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NDA1NjczNzYsInVzZXJJZCI6MzAsInVzZXJuYW1lIjoiMzcwMTE1MTk5NzEyMTI5NDczIn0.ZGioO2BJLK8b9zhVDs90opizkhKOMOEwzcreZah8u8Q'
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  Cookies.remove(IdTokenKey)
  Cookies.remove(AccessTokenKey)
  return Cookies.remove(TokenKey)
}

export function getLinkToken() {
  return Cookies.get(linkTokenKey)
}

export function setLinkToken(token) {
  return Cookies.set(linkTokenKey, token)
}

export function removeLinkToken() {
  return Cookies.remove(linkTokenKey)
}

export function setSysUI(uiInfo) {
  return Cookies.set('sysUiInfo', uiInfo ? JSON.stringify(uiInfo) : null)
}

export function getSysUI() {
  const json = Cookies.get('sysUiInfo')
  return json ? JSON.parse(json) : null
}

export function getTimeOut() {
  const val = Cookies.get('request-time-out')
  return val
}

