import { defineComponent, toRefs } from 'vue'
import { BaseModalProps, baseModalProps } from './base-modal-type'
import '../style/base-modal.scss'

export default defineComponent({
  name: 'ZBaseModal',
  props: baseModalProps,
  emits: ['update:modelValue'],
  setup(props: BaseModalProps, { emit, slots }) {
    const { modelValue } = toRefs(props)
    return () => (
      // modelValue为true才显示modal
      <div>
        {modelValue.value && (
          <div class="s-base-modal">
            {/* 透明遮罩 */}
            <div
              class="s-base-modal__mask"
              onClick={() => {
                emit('update:modelValue', false)
              }}
            ></div>
            {/* 具体内容 */}
            {slots.default?.()}
          </div>
        )}
      </div>
    )
  }
})
