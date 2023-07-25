import { defineComponent, inject } from 'vue'
import { InputProps, inputProps } from './input-type'
import '../style/input.scss'
import '../../index.scss'
import { FormItemContext } from '../../form/src/form-item-type'

export default defineComponent({
  name: 'ZInput',
  props: inputProps,
  emits: ['update:modelValue'],
  setup(props: InputProps, { emit }) {
    //注入校验方法
    const formItem = inject('FORM_ITEM_CTX') as FormItemContext
    const onInput = (e: Event) => {
      const val = (e.target as HTMLInputElement).value
      emit('update:modelValue', val)
      //从from-item中获取校验
      formItem.validate()
    }
    return () => {
      return (
        <div class="s-input">
          <input
            class="s-input__input"
            value={props.modelValue}
            onInput={onInput}
            type={props.type}
          />
        </div>
      )
    }
  }
})
