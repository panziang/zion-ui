import { Ref, defineComponent, inject, toRefs } from 'vue'
import { TabProps, tabProps } from './tab-type'
import '../style/tab.scss'

export default defineComponent({
  name: 'ZTab',
  props: tabProps,
  emits: ['update:modelValue'],
  setup(props: TabProps, { slots }) {
    //获取当前激活项
    const activeTab = inject('active-tab') as Ref<string>
    // 获取tabs-data,并将自身数据添加到其中
    const tabsData = inject('tabs-data') as Ref<
      Array<{ id: string; title: string }>
    >
    tabsData.value.push({ id: props.id, title: props.title })
    return () => {
      return (
        <>
          {props.id === activeTab.value && (
            <div class="s-tab">{slots.default?.()}</div>
          )}
        </>
      )
    }
  }
})
