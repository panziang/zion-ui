import { defineComponent, toRefs } from 'vue'
import { buttonProps, ButtonProps } from './button-types'
export default defineComponent({
  name: 'ZButton',
  props: buttonProps,
  setup(props: ButtonProps, { slots }) {
    //拿到使用按钮时传来的type
    const { type } = toRefs(props)
    return () => {
      const defaultSlots = slots.default ? slots.default() : '按钮'
      return (
        <button class={`s-btn s-btn--${type.value}`}>{defaultSlots}</button>
      )
    }
  }
})
