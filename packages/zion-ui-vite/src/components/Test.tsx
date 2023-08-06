//1. 函数式组件

import { defineComponent, ref, withModifiers } from 'vue'

// export default () => <div>test</div>

// 2. defineComponent
// export default defineComponent({
//   render() {
//     return <div>tes1111t</div>
//   }
// })

// 3. defineComponent({setup{}})
export default defineComponent({
  //自定义指令
  directives: {
    focus: {
      mounted(el) {
        el.focus()
      }
    }
  },
  // 事件派发
  emits: ['click'],
  setup(props, { slots, emit }) {
    const count = ref(0)

    const inc = () => {
      count.value++
      //向外界派发事件
      emit('click')
    }
    const list = ref<string[]>(['a', 'b', 'c'])
    return () => {
      //与视图相关
      const span = count.value ? <span>A</span> : <span>B</span>
      return (
        <div onClick={withModifiers(inc, ['self'])}>
          test:{count.value}
          <input type="text" v-focus v-model={count.value} />
          <div>{span}</div>
          <ul>
            {list.value.map(str => (
              <li key={str}>{str}</li>
            ))}
          </ul>
          {/* 默认插槽内容 */}
          <div>{slots.default ? slots.default() : 'default content'}</div>
          {/* 具名插槽 */}
          <div>{slots.title ? slots.title() : 'title slot  content'}</div>
          {/* <Test v-slots={{ title: () => <h3>title</h3> }}>abc</Test> */}
        </div>
      )
    }
  }
})
