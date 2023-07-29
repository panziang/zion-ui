import {
  defineComponent,
  onMounted,
  ref,
  toRefs,
  watch,
  nextTick,
  onUnmounted
} from 'vue'
import { basePopoverProps, BasePopoverProps } from './base-popover-type'
import { computePosition, arrow, offset, autoPlacement } from '@floating-ui/dom'
import '../style/base-popover.scss'

export default defineComponent({
  name: 'ZBasePopover',
  props: basePopoverProps,
  emits: ['update:modelValue'],
  setup(props: BasePopoverProps, { slots, attrs }) {
    const { host: hostRef, modelValue, showArrow, placement } = toRefs(props)
    // 箭头元素
    const arrowRef = ref()
    //宿主元素由外界传入
    // const hostRef = ref()
    //浮动元素
    const overlayRef = ref()

    //计算定位
    const updatePosition = () => {
      //存放中间件
      const middleware = []
      if (showArrow.value) {
        middleware.push(offset(8))
        //指定箭头元素
        middleware.push(arrow({ element: arrowRef.value }))
      }

      //用户没有指定placement，动态添加autoPlacement
      if (!placement.value) {
        middleware.push(autoPlacement())
      }

      computePosition(hostRef.value, overlayRef.value, {
        middleware,
        placement: placement.value || 'bottom'
      }).then(({ x, y, middlewareData }) => {
        Object.assign(overlayRef.value.style, {
          left: x + 'px',
          top: y + 'px'
        })
        if (showArrow.value) {
          const { x: arrowX, y: arrowy } = middlewareData.arrow!

          //获取当前所在边
          // 映射表
          const currentSide = placement.value.split('-')[0]
          const staticSide = {
            top: 'bottom',
            left: 'right',
            right: 'left',
            bottom: 'top'
          }[currentSide]

          const SIDE = ['top', 'right', 'bottom', 'left']
          const prevIndex = SIDE.indexOf(currentSide) - 1
          const nextSide = SIDE[prevIndex < 0 ? prevIndex + 4 : prevIndex]

          //每次计算结束，重新计算箭头定位样式
          Object.assign(arrowRef.value.style, {
            left: arrowX + 'px',
            top: arrowy + 'px',
            [staticSide!]: '-4px',
            [`border-${currentSide}-color`]: 'transparent',
            [`border-${nextSide}-color`]: 'transparent'
          })
        }
      })
    }

    //创建MutationObserver监听宿主元素的状态变化
    const mutationObserver = new MutationObserver(() => updatePosition())

    //watch监控modelValue的变化，改变了就重新定位
    onMounted(() => {
      watch(
        modelValue,
        newValue => {
          //newValue为true时，overlay需要显示
          if (newValue) {
            nextTick(updatePosition)

            //监听两个事件和宿主元素尺寸、定位的变化
            hostRef.value &&
              mutationObserver.observe(hostRef.value, { attributes: true })

            //监听滚动事件和尺寸改变
            window.addEventListener('resize', updatePosition)
            window.addEventListener('scroll', updatePosition)
          } else {
            //释放监听
            mutationObserver.disconnect()
            window.removeEventListener('resize', updatePosition)
            window.removeEventListener('scroll', updatePosition)
          }
        },
        //第一次就监听
        { immediate: true }
      )
    })

    //销毁事件
    onUnmounted(() => {
      mutationObserver.disconnect()
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition)
    })
    return () => (
      <>
        {modelValue.value && (
          <div ref={overlayRef} class="s-base-popover" {...attrs}>
            {slots.default?.()}
            {/* 箭头元素 */}
            {showArrow.value && (
              <div class="s-base-popover__arrow" ref={arrowRef}></div>
            )}
          </div>
        )}
      </>
    )
  }
})
