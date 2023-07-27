import { defineComponent, onMounted, ref, toRefs, watch, nextTick } from 'vue'
import { popoverProps, PopoverProps } from './popover-type'
import BasePopover from '../../base-popover/src/base-popover'
import '../style/popover.scss'

export default defineComponent({
  name: 'ZPopover',
  props: popoverProps,
  emits: ['update:modelValue'],
  setup(props: PopoverProps, { slots }) {
    const { modelValue, title } = toRefs(props)
    //宿主元素由外界传入
    // const hostRef = ref()
    //浮动元素
    // const overlayRef = ref()

    return () => (
      <>
        {modelValue.value && (
          // 将所需要的数据使用props透传给base-popover
          <BasePopover class="s-popover" {...props}>
            <h4 class="s-popover__title">{title.value}</h4>
            {slots.default?.()}
          </BasePopover>
        )}
      </>
    )
  }
})
