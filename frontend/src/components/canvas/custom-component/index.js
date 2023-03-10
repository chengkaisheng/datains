import Vue from 'vue'

// export default {
//     install(Vue) {
//         // 使用webpack的方法
//         // require.context(文件路径, 是否深层次查找, 正则表达式)
//         const requireComponent = require.context('./', true, /\.vue$/)
//         // requireComponent.keys() 会找到各个组件文件的路径 包含在一个数组里面
//         requireComponent.keys().forEach((ele) => {
//           // requireComponent(ele).default 会得到组件对象 需要给组件设置name
//           const moduleObj = requireComponent(ele).default
//           Vue.component(moduleObj.name, moduleObj)
//         })
//       }
// }

import Picture from '@/components/canvas/custom-component/Picture'
import DeIcon from '@/components/canvas/custom-component/DeIcon'
import VText from '@/components/canvas/custom-component/VText'
import VButton from '@/components/canvas/custom-component/VButton'
import Group from '@/components/canvas/custom-component/Group'
import RectShape from '@/components/canvas/custom-component/RectShape'
import DeBanner from '@/components/canvas/custom-component/DeBanner'
import DeNav from '@/components/canvas/custom-component/DeNav'
import DeIcons from '@/components/canvas/custom-component/DeIcons'
import UserView from '@/components/canvas/custom-component/UserView'
import DeVideo from '@/components/canvas/custom-component/DeVideo'
import DeFrame from '@/components/canvas/custom-component/DeFrame'
import DeJump from '@/components/canvas/custom-component/DeJump'
import DeKmediaUni from '@/components/canvas/custom-component/DeKmediaUni'
import DeStreamMedia from '@/components/canvas/custom-component/DeStreamMedia'
import DePicture from '@/components/canvas/custom-component/DePicture'
import DeWeather from '@/components/canvas/custom-component/DeWeather'

Vue.component('DeStreamMedia', DeStreamMedia)
Vue.component('Picture', Picture)
Vue.component('DeIcon', DeIcon)
Vue.component('VText', VText)
Vue.component('VButton', VButton)
Vue.component('Group', Group)
Vue.component('RectShape', RectShape)
Vue.component('DeBanner', DeBanner)
Vue.component('DeIcons', DeIcons)
Vue.component('DeNav', DeNav)
Vue.component('DePicture', DePicture)
Vue.component('UserView', UserView)
Vue.component('DeVideo', DeVideo)
Vue.component('DeFrame', DeFrame)
Vue.component('DeWeather', DeWeather)
Vue.component('DeJump', DeJump)
Vue.component('DeKmediaUni',DeKmediaUni)

