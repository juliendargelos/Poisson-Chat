import ChatComponent from 'components/views/Chat'
import LoginComponent from 'components/views/Login'
import AppComponent from './App'

export default [
  {
    path: '/',
    name: 'chat',
    component: ChatComponent
  },
  {
    path: '/login',
    name: 'login',
    component: LoginComponent
  },
  {
    path: '/logout',
    name: 'logout',
    component: AppComponent
  }
]
