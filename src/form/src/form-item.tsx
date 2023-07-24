import { ComputedRef, computed, defineComponent, inject, toRefs } from 'vue'
import { FormItemProps, LabelData, formItemProps } from './form-item-type'
import '../style/form-item.scss'

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
    return () => {
      return (
        <div class={itemClasses.value}>
          {/* label标签 */}
          <span class="s-form__label">{props.label}</span>
          {/* control */}
          <div></div>
          {slots.default?.()}
        </div>
      )
    }
  }
})
