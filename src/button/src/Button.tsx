import { defineComponent, toRefs } from 'vue'
import { buttonProps, ButtonProps } from './button-types'
export default defineComponent({
  name: 'ZButton',
  props: buttonProps,
  setup(props: ButtonProps, { slots }) {
    //拿到使用按钮时传来的type
    const { type, size, disabled, block } = toRefs(props)
    return () => {
      const defaultSlots = slots.default ? slots.default() : '按钮'
      //是否添加block样式
      const blockCls = block.value ? 's-btn--block' : ''
      return (
        <button
          disabled={disabled.value}
          class={`s-btn s-btn--${type.value} s-btn--${size.value} ${blockCls} `}
        >
          {defaultSlots}
        </button>
      )
    }
  }
})
