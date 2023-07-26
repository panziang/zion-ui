import { computed, defineComponent, toRefs } from 'vue'
import { ModalProps, modalProps } from './modal-type'
import { BaseModal } from '../../base-modal'
import '../style/modal.scss'

export default defineComponent({
  name: 'ZModal',
  props: modalProps,
  emits: ['update:modelValue'],
  setup(props: ModalProps, { slots, emit }) {
    const {
      modelValue,
      title,
      showClose,
      width,
      center,
      alignCenter,
      backgroundColor,
      top
    } = toRefs(props)

    //动态设置居中样式
    const alignCenterStyle = alignCenter.value
      ? { marginTop: 0, top: '50%', transform: 'translateY(-50%)' }
      : null

    // 获取top
    const modalTop = computed(() =>
      typeof top.value === 'number' ? `${top.value}px` : top.value
    )
    return () => {
      return (
        <BaseModal
          class="s-modal"
          modelValue={modelValue.value}
          onUpdate:modelValue={() => {
            emit('update:modelValue')
          }}
        >
          <div
            class="s-modal__container"
            style={{
              width: width.value,
              backgroundColor: backgroundColor.value,
              marginTop: modalTop.value,
              ...alignCenterStyle
            }}
          >
            {/* 标题区 */}
            {slots.header ? (
              slots.header?.({
                close: () => {
                  emit('update:modelValue', false)
                }
              })
            ) : (
              <div
                class="s-modal__header"
                style={{ textAlign: center.value ? 'center' : 'left' }}
              >
                {title.value}
                {/* 增加关闭按钮 */}
                {showClose.value && (
                  <svg
                    onClick={() => {
                      emit('update:modelValue', false)
                    }}
                    class="s-modal__close"
                    viewBox="0 0 1024 1024"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
                    ></path>
                  </svg>
                )}
              </div>
            )}
            {/* 内容区 */}
            <div class="s-modal__body">{slots.default?.()}</div>
            {/* 操作区 */}
            <div class="s-modal__footer">{slots.footer?.()}</div>
          </div>
        </BaseModal>
      )
    }
  }
})
