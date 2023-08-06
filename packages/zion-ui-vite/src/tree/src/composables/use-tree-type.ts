import { ComputedRef, Ref } from 'vue'
import { IInnerTreeNode, ITreeNode } from '../tree-type'

//与ui相关
export type IUseCore = {
  expandedTree: ComputedRef<IInnerTreeNode[]>
  getChildren: (node: IInnerTreeNode, recursive?: boolean) => IInnerTreeNode[]
  getChildrenExpanded: (treeNode: IInnerTreeNode) => IInnerTreeNode[]
  getIndex: (node: IInnerTreeNode) => number
  getNode: (node: IInnerTreeNode) => IInnerTreeNode | undefined
  getParent: (node: IInnerTreeNode) => IInnerTreeNode | undefined
}

//折叠
export type IUseToggle = {
  toggleNode: (treeNode: IInnerTreeNode) => void
}

//复选框功能相关
export type IUseCheck = {
  toggleCheckNode: (treeNode: IInnerTreeNode) => void
}

export type lazyNodeResult = {
  node: IInnerTreeNode
  treeItems: ITreeNode[]
}

//增删相关
export type IUseOperate = {
  append: (parent: IInnerTreeNode, node: IInnerTreeNode) => void
  remove: (node: IInnerTreeNode) => void
}

//懒加载
export type IUseLazyLoad = {
  lazyLoadNodes: (node: IInnerTreeNode) => void
}

//拖拽
export type IDraggable = boolean | IDropType
export interface IDropType {
  dropPrev?: boolean
  dropNext?: boolean
  dropInner?: boolean
}

export interface IUseDraggable {
  onDragstart: (event: DragEvent, treeNode: IInnerTreeNode) => void
  onDragover: (event: DragEvent) => void
  onDragleave: (event: DragEvent) => void
  onDrop: (event: DragEvent, treeNode: IInnerTreeNode) => void
  onDragend: (event: DragEvent) => void
}

export interface DragState {
  dropType?: keyof Required<IDropType>
  draggingNode?: HTMLElement | null
  draggingTreeNode?: IInnerTreeNode | null
}

//原始数据
export type TreeUtils = {
  treeData: Ref<IInnerTreeNode[]>
} & IUseCore &
  IUseToggle &
  IUseCheck &
  IUseOperate &
  IUseDraggable
