import { Ref, ref } from 'vue'
import { IInnerTreeNode } from '../tree-type'
import { IUseCore, IUseOperate } from './use-tree-type'
import { randomId } from '../../../shared/utils'

export function useOperate(
  innderData: Ref<IInnerTreeNode[]>,
  { getIndex, getChildren }: IUseCore
): IUseOperate {
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
    append,
    remove
  }
}
