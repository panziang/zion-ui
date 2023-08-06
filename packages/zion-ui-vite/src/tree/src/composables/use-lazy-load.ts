import { Ref, SetupContext, ref } from 'vue'
import { IInnerTreeNode } from '../tree-type'
import { IUseCore, IUseLazyLoad, lazyNodeResult } from './use-tree-type'
import { generateInnerTree } from '../utils'

export function useLazyLoad(
  innderData: Ref<IInnerTreeNode[]>,
  { getNode, getIndex, getChildren }: IUseCore,
  { emit }: SetupContext
): IUseLazyLoad {
  //接收父节点，派发事件，外部调用异步方法获取数据，传入回调函数
  const lazyLoadNodes = (node: IInnerTreeNode) => {
    const innderNode = getNode(node)
    //判断是否需要懒加载节点
    if (
      innderNode &&
      // 没有孩子但是isleaf为false
      innderNode.isLeaf === false &&
      !innderNode.childNodeCount
    ) {
      innderNode.loading = true
      //派发事件，让外界加载数据
      emit('lazy-load', node, dealChildNodes)
    }
  }

  //获取子节点数据之后，调用该函数
  const dealChildNodes = (result: lazyNodeResult) => {
    //获取父节点
    const node = getNode(result.node)
    if (node) {
      //结束加载状态
      node.loading = false
      //将节点拍平
      const childNodes = ref<IInnerTreeNode[]>(
        generateInnerTree(result.treeItems, node.level)
      )
      // 处理子节点和父节点的关系
      setParent(node, childNodes)
      insertChildren(node, childNodes)

      // 更新父节点数量
      const children = getChildren(node)
      node.childNodeCount = children.length
    }
  }
  //设置子节点的parentId
  const setParent = (
    node: IInnerTreeNode,
    chidNodes: Ref<IInnerTreeNode[]>
  ) => {
    chidNodes.value.forEach(child => {
      //设置父节点id
      if (child.level - 1 === node.level && !child.parentId) {
        child.parentId = node.id
      }
    })
  }

  //将一步获取的子节点插入到父节点下(原始数组)
  const insertChildren = (
    parent: IInnerTreeNode,
    nodes: Ref<IInnerTreeNode[]>
  ) => {
    const parentIndex = getIndex(parent)
    if (parentIndex) {
      innderData.value.splice(parentIndex + 1, 0, ...nodes.value)
    }
  }

  return {
    lazyLoadNodes
  }
}
