import { defineComponent, ref, toRefs } from 'vue'
import { TreeProps, treeProps } from './tree-type'
import { useTree } from './composables/use-tree'

export default defineComponent({
  name: 'ZTree',
  props: treeProps,
  setup(props: TreeProps) {
    const { data } = toRefs(props)
    //从composable中获取数据和方法
    const { expandedTree, toggleNode, getChildren } = useTree(data)
    return () => {
      return (
        <div class="s-tree">
          {expandedTree.value?.map(treeNode => (
            //给树形结构根据level层级添加缩进
            <div
              class="s-tree-node"
              style={{
                paddingLeft: `${24 * (treeNode.level - 1)}px`
              }}
            >
              {/* 折叠图标 */}
              {/* 判断当前节点是否为叶子节点 */}
              {treeNode.isLeaf ? (
                <span style={{ display: 'inline-block', width: '25px' }}></span>
              ) : (
                <svg
                  // 控制是否折叠
                  onClick={() => toggleNode(treeNode)}
                  style={{
                    width: '18px',
                    height: '18px',
                    display: 'inline-block',
                    transform: treeNode.expanded ? 'rotate(90deg)' : ''
                  }}
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M384 192v640l384-320.064z"
                  ></path>
                </svg>
              )}
              {/* 标签 */}
              {treeNode.label}
            </div>
          ))}
        </div>
      )
    }
  }
})
