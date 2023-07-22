import { Ref, computed } from 'vue'
import { IInnerTreeNode } from '../tree-type'
import { IUseCore } from './use-tree-type'

export function useCore(innderData: Ref<IInnerTreeNode[]>): IUseCore {
  //获取展开的节点列表,用计算属性派生
  const expandedTree = computed(() => {
    //被排除的列表
    let excludedNodes: IInnerTreeNode[] = []
    const res = []
    //循环列表，找出expanded为false的节点和子节点
    for (const item of innderData.value) {
      //如果遍历节点在排除列表中，直接跳出
      if (excludedNodes.includes(item)) {
        continue
      }

      //当前节点处于折叠状态，子节点就应该被排除
      if (item.expanded !== true) {
        excludedNodes = getChildren(item)
      }
      //找到所有未被折叠的子节点
      res.push(item)
    }
    return res
  })

  //接收一个节点，找到当前节点的所有孩子节点,recursive表示是否递归
  const getChildren = (node: IInnerTreeNode, recursive = true) => {
    const res = []
    //找到node在列表中的索引
    const startIndex = innderData.value.findIndex(item => item.id === node.id)
    //找到后面所有的子节点 递归
    for (
      let i = startIndex + 1;
      i < innderData.value.length && node.level < innderData.value[i].level;
      i++
    ) {
      if (recursive) {
        res.push(innderData.value[i])
      } else if (node.level === innderData.value[i].level - 1) {
        //此时是直接子节点
        res.push(innderData.value[i])
      }
    }
    return res
  }

  // 计算参考线高度
  const getChildrenExpanded = (
    node: IInnerTreeNode,
    result: IInnerTreeNode[] = []
  ) => {
    // 获取当前节点的直接子节点
    const childrenNodes = getChildren(node, false)
    result.push(...childrenNodes)
    childrenNodes.forEach(item => {
      if (item.expanded) {
        getChildrenExpanded(item, result)
      }
    })
    return result
  }
  //在原始数据中找到index
  const getIndex = (node: IInnerTreeNode) => {
    if (!node) {
      return -1
    } else {
      return innderData.value.findIndex(item => item.id === node.id)
    }
  }
  const getNode = (node: IInnerTreeNode) => {
    return innderData.value.find(item => item.id === node.id)
  }
  return {
    expandedTree,
    getChildren,
    getChildrenExpanded,
    getIndex,
    getNode
  }
}
