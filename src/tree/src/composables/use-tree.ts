import { Ref, SetupContext, ref, unref } from 'vue'
import { ITreeNode, TreeProps } from '../tree-type'
import { generateInnerTree } from '../utils'
import { useCore } from './use-core'
import { useToggle } from './use-toggle'
import { useCheck } from './use-check'
import { useOperate } from './use-operate'
import { TreeUtils } from './use-tree-type'
import { useLazyLoad } from './use-lazy-load'

export function useTree(
  node: Ref<ITreeNode[]> | ITreeNode[],
  treeProps: TreeProps,
  context: SetupContext
): TreeUtils {
  const innderData = ref(generateInnerTree(unref(node)))

  const core = useCore(innderData)
  const plugins = [useToggle, useCheck, useOperate]
  const lazyLoad = useLazyLoad(innderData, core, context)
  //聚合插件
  const pluginMetheds = plugins.reduce((acc, plugin) => {
    const lazyLoad = useLazyLoad(innderData, core, context)
    return { ...acc, ...plugin(innderData, core, context, lazyLoad) }
  }, {})
  return {
    ...pluginMetheds,
    ...core,
    treeData: innderData
  } as TreeUtils
}
