import { computed, defineComponent } from 'vue'
import { IconProps, iconProps } from './icon-type'

import '../style/icon.scss'

// 引入字体图标css
// import '../style/iconfont.js'

export default defineComponent({
  name: 'ZIcon',
  props: iconProps,
  setup(props: IconProps, { attrs }) {
    //获取尺寸
    const iconSize = computed(() => {
      return typeof props.size === 'number' ? `${props.size}px` : props.size
    })
    //远程资源使用图片显示
    const imgIcon = (
      <img
        src={props.name}
        alt=""
        style={{
          width: iconSize.value,
          verticalAlign: 'middle'
        }}
        {...attrs}
      />
    )
    // icon icon-vue.js这样的结构
    //使用span的class显示字体图标
    const fontIcon = (
      <span
        class={[props.prefix, props.prefix + '-' + props.name]}
        style={{
          fontSize: iconSize.value,
          color: props.color
        }}
        {...attrs}
      ></span>
    )

    //使用svg
    const svgIcon = (
      <svg
        class="icon"
        style={{
          width: iconSize.value,
          height: iconSize.value
        }}
      >
        <use
          xlinkHref={`#${props.prefix}-${props.component}`}
          fill={props.color}
        ></use>
      </svg>
    )

    const icon = props.component
      ? svgIcon
      : /http|https/.test(props.name)
      ? imgIcon
      : fontIcon
    return () => {
      return icon
    }
  }
})
