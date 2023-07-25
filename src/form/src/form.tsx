import { computed, defineComponent, provide, toRefs } from 'vue'
import { FormProps, formContextToken, formProps } from './form-type'
import { FormItemContext } from './form-item-type'
import { Values } from 'async-validator'

export default defineComponent({
  name: 'ZForm',
  props: formProps,
  emits: ['submit'],
  setup(props: FormProps, { slots, emit, expose }) {
    //向下提供label_data
    const labelData = computed(() => ({
      layout: props.layout,
      labelSize: props.labelSize,
      labelAlign: props.labelAlign
    }))
    provide('LABEL_DATA', labelData)

    // 全局校验
    // 提供一个Set存放待校验的items
    const formItems = new Set<FormItemContext>()
    const addItem = (item: FormItemContext) => formItems.add(item)
    const removeItem = (item: FormItemContext) => formItems.delete(item)
    //提供表单上下文给form-item使用
    provide(formContextToken, {
      model: props.model,
      rules: props.rules,
      addItem,
      removeItem
    })

    //派发submit事件
    const submit = (event: Event) => {
      //阻止默认提交，避免页面刷新
      event.preventDefault()
      emit('submit')
    }

    //表单的全局校验方法
    function validate(cb: (valid: boolean) => void) {
      //保存所有校验结果
      const tasks: Array<Promise<Values>> = []
      formItems.forEach(item => tasks.push(item.validate()))
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false))
    }
    //对外暴露接口
    expose({
      validate
    })
    return () => {
      return (
        <form class="s-form" onSubmit={submit}>
          {slots.default?.()}
        </form>
      )
    }
  }
})
