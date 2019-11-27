import Vue from 'vue'
import '@/styles/element-variables.scss'
import lang from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import locale from 'element-ui/lib/locale'
import {
  Button,
  Input,
  Carousel,
  CarouselItem,
  ButtonGroup,
  Form,
  FormItem,
  Collapse,
  CollapseItem,
  Icon
} from 'element-ui';
locale.use(lang)
Vue.use(Button)
Vue.use(Input)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(ButtonGroup)
Vue.use(Form)
Vue.use(Collapse)
Vue.use(FormItem)
Vue.use(CollapseItem)
Vue.use(Icon)
