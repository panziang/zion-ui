import { IInnerTreeNode, ITreeNode } from './tree-type'

//将树形结构展开
export function generateInnerTree(
  tree: ITreeNode[],
  level = 0, //当前节点所处层级
  path = [] as IInnerTreeNode[] //递归过程的路径，用来判断获取父节点id
): IInnerTreeNode[] {
  level++
  return tree?.reduce((prev, cur) => {
    const o = { ...cur } as IInnerTreeNode
    //设置当前节点层级
    o.level = level

    //记录调用栈，用来计算parentId
    if (path.length > 0 && path[path.length - 1].level >= level) {
      //向上冒泡，子->父的过程
      // path.pop()
      while (path.length) {
        path.pop()
      }
    }
    //父->子
    path.push(o)

    //获取parentNode
    const parentNode = path[path.length - 2]
    if (parentNode) {
      //给当前节点增加parentId
      o.parentId = parentNode.id
    }

    //判断cur是否存在children，如果存在则递归遍历
    if (o.children) {
      // 如果当前节点有children，先递归，再将当前的children删除
      const children = generateInnerTree(o.children, level, path)
      delete o.children
      return prev.concat(o, children)
    } else {
      //叶子节点
      o.isLeaf = true
      return prev.concat(o)
    }
  }, [] as IInnerTreeNode[])
}

// console.log(generateInnerTree(tree))
