import { Ref, ref, unref } from 'vue'
import { ITreeNode } from '../tree-type'
import { generateInnerTree } from '../utils'
import { useCore } from './use-core'
import { useToggle } from './use-toggle'
import { useCheck } from './use-check'
import { useOperate } from './use-operate'
import { TreeUtils } from './use-tree-type'

export function useTree(node: Ref<ITreeNode[]> | ITreeNode[]): TreeUtils {
  const innderData = ref(generateInnerTree(unref(node)))

  const core = useCore(innderData)
  const plugins = [useToggle, useCheck, useOperate]
  //聚合插件
  const pluginMetheds = plugins.reduce((acc, plugin) => {
    return { ...acc, ...plugin(innderData, core) }
  }, {})
  return {
    ...pluginMetheds,
    ...core,
    treeData: innderData
  } as TreeUtils
}
