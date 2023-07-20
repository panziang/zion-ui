import { Ref, computed, ref, unref } from 'vue'
import { IInnerTreeNode, ITreeNode } from '../tree-type'
import { generateInnerTree } from '../utils'

export function useTree(node: Ref<ITreeNode[]> | ITreeNode[]) {
  const innderData = ref(generateInnerTree(unref(node)))
  const toggleNode = (node: IInnerTreeNode) => {
    // node.expanded = !node.expanded

    //在原始列表中获取该节点
    const cur = innderData.value.find(item => item.id === node.id)
    if (cur) {
      cur.expanded = !cur.expanded
    }
  }
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

  //接收一个节点，找到当前节点的所有孩子节点
  const getChildren = (node: IInnerTreeNode) => {
    const res = []
    //找到node在列表中的索引
    const startIndex = innderData.value.findIndex(item => item.id === node.id)
    //找到后面所有的子节点 递归
    for (
      let i = startIndex + 1;
      i < innderData.value.length && node.level < innderData.value[i].level;
      i++
    ) {
      res.push(innderData.value[i])
    }
    return res
  }

  return {
    innderData,
    toggleNode,
    expandedTree,
    getChildren
  }
}
