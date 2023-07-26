import { defineComponent, provide, ref, toRefs } from 'vue'
import { TabsProps, tabsProps } from './tabs-type'
import '../style/tabs.scss'

export default defineComponent({
  name: 'ZTabs',
  props: tabsProps,
  emits: ['update:modelValue'],
  setup(props: TabsProps, { slots }) {
    const tabsData = ref<Array<{ id: string; title: string }>>([])
    //向tab传入tabs-data的值
    provide('tabs-data', tabsData)
    //激活id
    const activeTab = ref(props.modelValue)
    provide('active-tab', activeTab)
    //改变激活状态
    const changeTab = (tabId: string) => {
      activeTab.value = tabId
    }
    return () => {
      return (
        <div class="s-tabs">
          {/* 导航页签 */}
          <ul class="s-tabs__nav">
            {tabsData.value.map(tab => (
              <li
                onClick={() => changeTab(tab.id)}
                class={tab.id === activeTab.value ? 'active' : ''}
              >
                {tab.title}
              </li>
            ))}
          </ul>

          {/* 内容区 */}
          {slots.default?.()}
        </div>
      )
    }
  }
})
