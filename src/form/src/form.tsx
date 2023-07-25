import { computed, defineComponent, provide, toRefs } from 'vue'
import { FormProps, formContextToken, formProps } from './form-type'

export default defineComponent({
  name: 'ZForm',
  props: formProps,
  setup(props: FormProps, { slots }) {
    //向下提供label_data
    const labelData = computed(() => ({
      layout: props.layout,
      labelSize: props.labelSize,
      labelAlign: props.labelAlign
    }))
    provide('LABEL_DATA', labelData)

    //提供表单上下文给form-item使用
    provide(formContextToken, {
      model: props.model,
      rules: props.rules
    })
    return () => {
      return <div class="s-form">{slots.default?.()}</div>
    }
  }
})
