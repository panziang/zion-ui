import {
  ComputedRef,
  computed,
  defineComponent,
  inject,
  onMounted,
  onUnmounted,
  provide,
  ref,
  toRefs
} from 'vue'
import { FormItemProps, LabelData, formItemProps } from './form-item-type'
import '../style/form-item.scss'
import { formContextToken } from './form-type'
import Validator from 'async-validator'

export default defineComponent({
  name: 'ZFormItem',
  props: formItemProps,
  setup(props: FormItemProps, { slots }) {
    //注入label_data
    const labelData = inject('LABEL_DATA') as ComputedRef<LabelData>
    const itemClasses = computed(() => ({
      's-form__item': true,
      's-form__item--horizontal': labelData.value.layout === 'horizontal',
      's-form__item--vertical': labelData.value.layout === 'vertical'
    }))
    // labelSize和labelAlign的样式
    //水平排列下才能生效
    const labelClasses = computed(() => ({
      's-form__label': true,
      's-form__item--vertical': labelData.value.layout === 'vertical',
      [`s-form__label--${labelData.value.labelAlign}`]:
        labelData.value.layout === 'horizontal',
      [`s-form__label--${labelData.value.labelSize}`]:
        labelData.value.layout === 'horizontal'
    }))

    //实现validate方法，提供给下级
    //数据、校验规则由form提供
    const formCtx = inject(formContextToken)
    //响应状态
    const showMessage = ref(false)
    const errorMessage = ref('')
    const validate = () => {
      if (!formCtx) {
        console.warn('请在Form中使用FormItem')
        return Promise.reject('请在Form中使用FormItem')
      }
      //每个form-item的校验绑定项prop
      if (!props.prop) {
        // console.warn('如果要校验当前项,请设置prop字段')
        // return Promise.reject('如果要校验当前项,请设置prop字段')
        return Promise.resolve({ result: true })
      }
      //不需要校验
      if (!formCtx.rules) {
        return Promise.resolve({ result: true })
      }

      //用户设置的rules中没有当前要校验的字段对象
      const itemRules = formCtx.rules[props.prop] || undefined
      if (!itemRules) {
        return Promise.resolve({ result: true })
      }

      //获取校验规则和数值
      const value = formCtx.model[props.prop]

      //执行校验并返回结果
      //创建一个校验实例
      const validator = new Validator({ [props.prop]: itemRules })
      //返回一个promise
      return validator.validate({ [props.prop]: value }, errors => {
        if (errors) {
          //校验失败
          showMessage.value = true
          errorMessage.value = errors[0].message || '校验错误'
        } else {
          //校验通过,清空错误信息
          showMessage.value = false
          errorMessage.value = ''
        }
      })
    }
    const formItemCtx = {
      validate
    }
    //提供方法给input
    provide('FORM_ITEM_CTX', formItemCtx)

    //挂载后注册到formCtx中
    onMounted(() => {
      if (props.prop) {
        formCtx?.addItem(formItemCtx)
      }
    })

    onUnmounted(() => {
      if (props.prop) {
        formCtx?.removeItem(formItemCtx)
      }
    })
    return () => {
      return (
        <div class={itemClasses.value}>
          {/* label标签 */}
          <span class={labelClasses.value}>{props.label}</span>
          {/* control */}
          <div>{slots.default?.()}</div>
          {/* error message */}
          {showMessage.value && (
            <div class="error-message">{errorMessage.value}</div>
          )}
        </div>
      )
    }
  }
})
