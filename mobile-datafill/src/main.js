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