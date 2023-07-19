import { defineComponent, toRefs } from 'vue'
import { TreeProps, treeProps } from './tree-type'

export default defineComponent({
  name: 'ZTree',
  props: treeProps,
  setup(props: TreeProps) {
    return () => {
      return <div class="s-tree"></div>
    }
  }
})
