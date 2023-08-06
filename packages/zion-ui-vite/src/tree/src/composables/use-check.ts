import { Ref } from 'vue'
import { IInnerTreeNode } from '../tree-type'
import { IUseCheck, IUseCore } from './use-tree-type'

export function useCheck(
  innderData: Ref<IInnerTreeNode[]>,
  { getChildren }: IUseCore
): IUseCheck {
  //对复选框的逻辑操作
  const toggleCheckNode = (node: IInnerTreeNode) => {
    //避免初始化时node中没有checked设置(undefined)
    node.checked = !node.checked

    //父->子
    //获取子节点，将复选框状态与父节点同步
    getChildren(node).forEach(child => {
      child.checked = node.checked
    })

    //子->父
    //获取父节点
    const parentNode = innderData.value.find(item => item.id === node.parentId)
    if (!parentNode) {
      return
    }
    //获取兄弟节点：获取父节点的一级子节点
    const siblingNode = getChildren(parentNode, false)

    //过滤出所有选中的兄弟节点
    const checkedSiblingNodes = siblingNode.filter(item => item.checked)
    //有bug

    if (siblingNode.length === checkedSiblingNodes.length) {
      //兄弟节点全选状态
      parentNode.checked = true
    } else {
      parentNode.checked = false
    }
  }
  return {
    toggleCheckNode
  }
}
