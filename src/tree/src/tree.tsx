import { SetupContext, defineComponent, provide, ref, toRefs } from 'vue'
import { IInnerTreeNode, TreeProps, treeProps } from './tree-type'
import { useTree } from './composables/use-tree'
import ZTreeNode from './components/tree-node'
import ZTreeNodeToggle from './components/tree-node-toggle'
import { VirtualList } from '../../virtual-list'
import '../style/tree.scss'

export default defineComponent({
  name: 'ZTree',
  props: treeProps,
  emits: ['lazy-load'],
  setup(props: TreeProps, context: SetupContext) {
    const { data, height, itemHeight } = toRefs(props)
    const { slots } = context
    //从composable中获取数据和方法
    const treeData = useTree(data.value, props, context)
    //向ZTreeNode提供数据和方法
    provide('TREE_UTILS', treeData)

    return () => {
      return (
        <div class="s-tree">
          {height?.value ? ( //虚拟列表
            <div style={{ height: `${height.value}px` }}>
              <VirtualList
                data={treeData.expandedTree.value}
                itemHeight={itemHeight.value}
              >
                {{
                  default: ({ item: treeNode }: { item: IInnerTreeNode }) => {
                    return (
                      <ZTreeNode {...props} treeNode={treeNode}>
                        {{
                          // 当前节点的插槽
                          content: () =>
                            slots.content
                              ? slots.content(treeNode)
                              : treeNode.label,
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
                            ),
                          loading: () =>
                            slots.loadind ? (
                              slots.loading({ nodeData: treeData })
                            ) : (
                              <span class="ml-1">loading...</span>
                            )
                        }}
                      </ZTreeNode>
                    )
                  }
                }}
              </VirtualList>
            </div>
          ) : (
            treeData.expandedTree.value?.map(treeNode => (
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
                    ),
                  loading: () =>
                    slots.loadind ? (
                      slots.loading({ nodeData: treeData })
                    ) : (
                      <span class="ml-1">loading...</span>
                    )
                }}
              </ZTreeNode>
            ))
          )}
        </div>
      )
    }
  }
})
