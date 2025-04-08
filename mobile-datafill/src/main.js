import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { 
  Button, 
  Cell, 
  CellGroup,
  Form,
  Field,
  Popup,
  Search,
  NavBar,
  DropdownMenu, 
  DropdownItem,
  Icon,
  Toast,
  TreeSelect,
  Switch
} from 'vant'
import 'vant/lib/index.css'
import { getUserInfo, qyyLogin } from '@/api/user'
import Cookies from 'js-cookie'

// 获取URL参数
const getQueryVariable = (variable) => {
  // let query = window.location.search.substring(1)
  let query = window.location.href.split('?')[1]
  let vars = []
  if (!query) {
    // query = document.cookie
    // vars = query.split(';')
    return null
  } else {
    vars = query.split('&')
  }
  for (var i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0].trim() === variable) {
      return pair[1]
    }
  }
  return (null)
}

const clearAllCookies = () => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name] = cookie.split("=");
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}

// 处理登录逻辑
const handleLogin = async () => {
  const qyyToken = getQueryVariable('token')
  console.log('token参数:', qyyToken);
  
  if (qyyToken) {
    clearAllCookies()
    sessionStorage.removeItem('username') // 清除用户名
    localStorage.clear()
    try {
      let res = await qyyLogin(qyyToken)
      if (res.success) {
        const token = res.data.token
        // 设置会话 cookie，不设置 expires，浏览器关闭即失效
        Cookies.set('token', token)
        // 获取用户信息，传入 token
        await getUserInfo(token)
      }
    } catch (error) {
      console.error('登录失败:', error)
    }
  }
}

// 在创建应用和路由之前执行登录逻辑
await handleLogin()

const app = createApp(App)

// 注册 Vant 组件
app.use(router)
app.use(Button)
app.use(Cell)
app.use(CellGroup)
app.use(Form)
app.use(Field)
app.use(Popup)
app.use(Search)
app.use(NavBar)
app.use(DropdownMenu)
app.use(DropdownItem)
app.use(Icon)
app.use(Toast)
app.use(TreeSelect)
app.use(Switch)

app.mount('#app') 

