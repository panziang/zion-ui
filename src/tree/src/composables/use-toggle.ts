import { Ref } from 'vue'
import { IInnerTreeNode } from '../tree-type'
import { IUseCore, IUseToggle } from './use-tree-type'

export function useToggle(
  innderData: Ref<IInnerTreeNode[]>,
  core: IUseCore
): IUseToggle {
  const toggleNode = (node: IInnerTreeNode) => {
    // node.expanded = !node.expanded
    //在原始列表中获取该节点
    const cur = innderData.value.find(item => item.id === node.id)
    if (cur) {
      cur.expanded = !cur.expanded
    }
  }
  return {
    toggleNode
  }
}
