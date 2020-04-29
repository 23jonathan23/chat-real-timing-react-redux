import { createStore } from 'redux'

//Estado inicial
const INITIAL_STATE = {
  user: '',
  isLogin: false,
  previousMessages: []
}

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      return { ...state, user: action.userlogin === '' ? 'Anônimo' : action.userlogin }
    case 'LOGIN_VISIBLE':
      return { ...state, isLogin: action.islogin === '' ? false : action.islogin }
    case 'PREVIOUS_MESSAGES':
      return { ...state, previousMessages: action.messages ? action.messages : [] }
    default:
      return state
  }
}

const store = createStore(user)

export default store