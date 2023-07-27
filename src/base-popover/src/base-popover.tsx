import { defineComponent, onMounted, ref, toRefs, watch, nextTick } from 'vue'
import { basePopoverProps, BasePopoverProps } from './base-popover-type'
import { computePosition } from '@floating-ui/dom'
import '../style/base-popover.scss'

export default defineComponent({
  name: 'ZBasePopover',
  props: basePopoverProps,
  emits: ['update:modelValue'],
  setup(props: BasePopoverProps, { slots, attrs }) {
    const { host: hostRef, modelValue } = toRefs(props)
    //宿主元素由外界传入
    // const hostRef = ref()
    //浮动元素
    const overlayRef = ref()

    //计算定位
    const updatePosition = () => {
      computePosition(hostRef.value, overlayRef.value).then(({ x, y }) => {
        Object.assign(overlayRef.value.style, {
          left: x + 'px',
          top: y + 'px'
        })
      })
    }

    //watch监控modelValue的变化，改变了就重新定位
    watch(
      modelValue,
      newValue => {
        //newValue为true时，overlay需要显示
        if (newValue) {
          nextTick(updatePosition)
        }
      },
      //第一次就监听
      { immediate: true }
    )
    return () => (
      <>
        {modelValue.value && (
          <div ref={overlayRef} class="s-base-popover" {...attrs}>
            {slots.default?.()}
          </div>
        )}
      </>
    )
  }
})
