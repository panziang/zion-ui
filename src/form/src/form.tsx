import { computed, defineComponent, provide, toRefs } from 'vue'
import { FormProps, formProps } from './form-type'

export default defineComponent({
  name: 'ZForm',
  props: formProps,
  setup(props: FormProps, { slots }) {
    //向下提供label_data
    const labelData = computed(() => ({
      layout: props.layout
    }))
    provide('LABEL_DATA', labelData)
    return () => {
      return <div class="s-form">{slots.default?.()}</div>
    }
  }
})
