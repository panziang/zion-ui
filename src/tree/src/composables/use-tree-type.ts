import { ComputedRef, Ref } from 'vue'
import { IInnerTreeNode } from '../tree-type'

//与ui相关
export type IUseCore = {
  expandedTree: ComputedRef<IInnerTreeNode[]>
  getChildren: (node: IInnerTreeNode, recursive?: boolean) => IInnerTreeNode[]
  getChildrenExpanded: (treeNode: IInnerTreeNode) => IInnerTreeNode[]
  getIndex: (node: IInnerTreeNode) => number
}

//折叠
export type IUseToggle = {
  toggleNode: (treeNode: IInnerTreeNode) => void
}

//复选框功能相关
export type IUseCheck = {
  toggleCheckNode: (treeNode: IInnerTreeNode) => void
}

//增删相关
export type IUseOperate = {
  append: (parent: IInnerTreeNode, node: IInnerTreeNode) => void
  remove: (node: IInnerTreeNode) => void
}

//原始数据
export type TreeUtils = {
  treeData: Ref<IInnerTreeNode[]>
} & IUseCore &
  IUseToggle &
  IUseCheck &
  IUseOperate
