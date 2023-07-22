import { Ref, SetupContext } from 'vue'
import { IInnerTreeNode } from '../tree-type'
import { IUseCore, IUseLazyLoad, IUseToggle } from './use-tree-type'

export function useToggle(
  innderData: Ref<IInnerTreeNode[]>,
  core: IUseCore,
  context: SetupContext,
  lazyLoad: IUseLazyLoad
): IUseToggle {
  const { lazyLoadNodes } = lazyLoad
  const toggleNode = (node: IInnerTreeNode) => {
    // node.expanded = !node.expanded
    //在原始列表中获取该节点
    const cur = innderData.value.find(item => item.id === node.id)
    if (cur) {
      cur.expanded = !cur.expanded
      //判断展开，触发懒加载
      if (cur.expanded) {
        lazyLoadNodes(cur)
      }
    }
  }
  return {
    toggleNode
  }
}
