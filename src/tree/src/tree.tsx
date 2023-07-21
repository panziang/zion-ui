import { defineComponent, provide, ref, toRefs } from 'vue'
import { TreeProps, treeProps } from './tree-type'
import { useTree } from './composables/use-tree'
import ZTreeNode from './components/tree-node'
import ZTreeNodeToggle from './components/tree-node-toggle'

export default defineComponent({
  name: 'ZTree',
  props: treeProps,
  setup(props: TreeProps, { slots }) {
    const { data } = toRefs(props)
    //从composable中获取数据和方法
    const treeData = useTree(data)
    //向ZTreeNode提供数据和方法
    provide('TREE_UTILS', {
      toggleNode: treeData.toggleNode,
      toggleCheckNode: treeData.toggleCheckNode,
      getChildren: treeData.getChildren,
      append: treeData.append,
      remove: treeData.remove
    })

    return () => {
      return (
        <div class="s-tree">
          {/* 循环输出节点 */}
          {treeData.expandedTree.value?.map(treeNode => (
            // 将节点抽取为一个jsx
            <ZTreeNode {...props} treeNode={treeNode}>
              {{
                // 当前节点的插槽
                content: () =>
                  slots.content ? slots.content(treeNode) : treeNode.label,
                icon: () =>
                  slots.icon ? (
                    // 如果用户传了图标
                    slots.icon({
                      nodeData: treeNode,
                      toggleNode: treeData.toggleNode
                    })
                  ) : (
                    // 没传图标就是默认
                    <ZTreeNodeToggle
                      //!!转成boolean值
                      expanded={!!treeNode.expanded}
                      onClick={() => treeData.toggleNode(treeNode)}
                    ></ZTreeNodeToggle>
                  )
              }}
            </ZTreeNode>
          ))}
        </div>
      )
    }
  }
})
