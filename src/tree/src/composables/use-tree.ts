import { Ref, computed, ref, unref } from 'vue'
import { IInnerTreeNode, ITreeNode } from '../tree-type'
import { generateInnerTree } from '../utils'
import { randomId } from '../../../shared/utils'

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

  const getIndex = (node: IInnerTreeNode) => {
    if (!node) {
      return -1
    } else {
      return innderData.value.findIndex(item => item.id === node.id)
    }
  }
  const append = (parent: IInnerTreeNode, node: IInnerTreeNode) => {
    // console.log('append', parent, node)
    //获取parent最后一个子节点
    const children = getChildren(parent, false)
    const lastChild = children[children.length - 1]

    //确定未来插入新节点的位置
    let insertedIndex = getIndex(parent) + 1

    if (lastChild) {
      insertedIndex = getIndex(lastChild) + 1
    }
    //保证parent是展开并且非叶子节点的状态
    parent.expanded = true
    parent.isLeaf = false

    //新增节点初始化
    const currentNode = ref({
      ...node,
      //node结构不全，需要新增
      level: parent.level + 1,
      parentId: parent.id,
      isLeaf: true
    })
    //设置新增节点id
    if (currentNode.value.id == undefined) {
      //生成id
      currentNode.value.id = randomId()
    }
    //插入新节点
    innderData.value.splice(insertedIndex, 0, currentNode.value)
  }
  const remove = (node: IInnerTreeNode) => {
    // console.log('remove', node)
    //删除节点
    const childrenIds = getChildren(node).map(item => item.id)
    //过滤掉node和其子节点之外的节点
    innderData.value = innderData.value.filter(
      item => item.id !== node.id && !childrenIds.includes(item.id)
    )
  }

  return {
    innderData,
    toggleNode,
    expandedTree,
    getChildren,
    toggleCheckNode,
    append,
    remove
  }
}
