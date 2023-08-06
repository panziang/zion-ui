# 🌲 树
## 基础功能

:::demo this is a tree
  ````vue
    <template>
      <ZTree :data="tree"></ZTree>
    </template>
    <script setup>
      let tree = [
        {
          label: 'docs',
          id: 'docs'
        },
        {
          label: 'packages',
          id: 'packages',
          expanded: true,
          children: [
            {
              label: 'plugin-vue',
              id: 'plugin-vue'
            },
            {
              label: 'vite',
              id: 'vite',
              expanded: true,
              children: [
                {
                  label: 'src',
                  id: 'src'
                },
                {
                  label: 'README.md',
                  id: 'README.md'
                }
              ]
            }
          ]
        },
        {
          label: 'scripts',
          id: 'scripts',
          children: [
            {
              label: 'release.ts',
              id: 'release.ts'
            },
            {
              label: 'verifyCommit.ts',
              id: 'verifyCommit.ts'
            }
          ]
        },
        {
          label: 'pnpm-workspace.yaml',
          id: 'pnpm-workspace.yaml'
        }
      ]

    </script>
  ````
:::

## 勾选功能
:::demo 🌲 勾选功能
  ```vue
    <template>
      <ZTree :data="data" checkable></ZTree>
    </template>
    <script>
       export default {
      data() {
        return {
          data:[
        {
          label: 'docs',
          id: 'docs',
          checked: true
        },
        {
          label: 'packages',
          id: 'packages',
          expanded: true,
          children: [
            {
              label: 'plugin-vue',
              id: 'plugin-vue'
            },
            {
              label: 'vite',
              id: 'vite',
              expanded: true,
              children: [
                {
                  label: 'src',
                  id: 'src'
                },
                {
                  label: 'README.md',
                  id: 'README.md',
                  children: [
                    {
                      label: 'index.md',
                      id: 'index.md'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: 'scripts',
          id: 'scripts',
          children: [
            {
              label: 'release.ts',
              id: 'release.ts'
            },
            {
              label: 'verifyCommit.ts',
              id: 'verifyCommit.ts'
            }
          ]
        },
        {
          label: 'pnpm-workspace.yaml',
          id: 'pnpm-workspace.yaml'
        }
      ]
    }
  }
}
    </script>
  ```
:::


## 自定义 icon 图标

通过 icon 插槽可以自定义展开/折叠图标。 
:::demo 自定义展开图标，设置 icon 插槽

```vue
<template>
  <z-tree :data="data">
    <template #icon="{ nodeData, toggleNode }">
      <span v-if="nodeData.isLeaf" class="devui-tree-node__indent"></span>
      <span
        v-else
        @click="
          event => {
            event.stopPropagation()
            toggleNode(nodeData)
          }
        "
      >
        <svg
          :style="{
            transform: nodeData.expanded ? 'rotate(90deg)' : '',
            display: 'inline-block',
            margin: '0 5px',
            cursor: 'pointer'
          }"
          viewBox="0 0 1024 1024"
          width="12"
          height="12"
        >
          <path
            d="M857.70558 495.009024 397.943314 27.513634c-7.132444-7.251148-18.794042-7.350408-26.048259-0.216941-7.253194 7.132444-7.350408 18.795065-0.216941 26.048259l446.952518 454.470749L365.856525 960.591855c-7.192819 7.192819-7.192819 18.85544 0 26.048259 3.596921 3.596921 8.311293 5.39487 13.024641 5.39487s9.42772-1.798972 13.024641-5.39487L857.596086 520.949836C864.747973 513.797949 864.796068 502.219239 857.70558 495.009024z"
          ></path>
        </svg>
      </span>
    </template>
  </z-tree>
</template>
<script setup>
  import { ref } from 'vue'
  const data = ref([
    {
      label: 'docs',
      id: 'docs'
    },
    {
      label: 'packages',
      id: 'packages',
      expanded: true,
      children: [
        {
          label: 'plugin-vue',
          id: 'plugin-vue'
        },
        {
          label: 'vite',
          id: 'vite',
          expanded: true,
          children: [
            {
              label: 'src',
              id: 'src'
            },
            {
              label: 'README.md',
              id: 'README.md'
            }
          ]
        }
      ]
    },
    {
      label: 'scripts',
      id: 'scripts',
      children: [
        {
          label: 'release.ts',
          id: 'release.ts'
        },
        {
          label: 'verifyCommit.ts',
          id: 'verifyCommit.ts'
        }
      ]
    },
    {
      label: 'pnpm-workspace.yaml',
      id: 'pnpm-workspace.yaml'
    }
  ])
</script>
```

:::

## 操作节点
通过设置operable打开节点操作按钮。
:::demo
```vue
<template>
  <ZTree :data="data" operable ></ZTree>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const data = ref([
      {
        label: 'node 1',
        id: 'node-1',
        children: [
          {
            label: 'node 1-1',
            id: 'node-1-1'
          },
        ]
      },
      {
        label: 'node 2',
        id: 'node-2'
      },
    ])

    return {
      data,
    }
  },
})
</script>
```
:::


## 节点懒加载

通过设置该节点 isLeaf 参数为 false, 组件回调 lazyLoad 方法实现节点懒加载。
:::demo 通过设置该节点 isLeaf 参数为 false, 组件回调 lazyLoad 方法实现节点懒加载。
```vue
<template>
  <ZTree :data="data" @lazy-load="lazyLoad" />
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const data = ref([
      {
        id: 'node-1',
        label: 'node-1',
        children: [
          {
            id: 'node-1-1',
            label: 'node 1-1 - dynamic loading',
            isLeaf: false,
          },
          { 
            id: 'node 1-2',
            label: 'node 1-2',
          },
        ],
      },
      { 
        id: 'node-2',
        label: 'node 2 - dynamic loading',
        isLeaf: false
      },
    ]);

    const lazyLoad = (node, callback) => {
      setTimeout(() => {
        const data = [
          {
            label: 'lazy node 1',
            expanded: true,
            children: [
              {
                id: 'lazy node 1-1',
                label: 'lazy node 1-1',
              },
              {
                id: 'lazy node 1-2',
                label: 'lazy node 1-2',
              },
            ],
          },
          {
            id: 'lazy node 2',
            label: 'lazy node 2',
          },
        ];
        callback({
          treeItems: data,
          node,
        });
      }, 1000);
    };

    return {
      data,
      lazyLoad,
    }
  }
})
</script>
```
:::

## 可拖拽树
通过`draggable`属性配置节点的拖拽功能。
:::demo
```vue
<template>
  <h6><p>默认行为</p></h6>
  <ZTree :data="data" draggable></ZTree>

  <h6><p>排序</p></h6>
  <ZTree :data="data" :draggable="{ dropPrev: true, dropNext: true, dropInner: true }" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const data = ref([
      {
        label: 'node 1',
        id: 'node-1',
        children: [
          {
            label: 'node 1-1',
            id: 'node-1-1'
          },
        ]
      },
      {
        label: 'node 2',
        id: 'node-2'
      },
    ])

    return {
      data,
    }
  },
})
</script>
```
:::

## 虚拟滚动
通过`height`开启虚拟滚动，通过`itemHeight`设置项目高度
:::demo
```vue
<template>
  <ZTree :data="data" :height="300" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const data = ref([
      ...Array.from({ length: 1000 }).map((_, index) => ({
        id: 'node ' + index,
        label: 'node ' + index,
      })),
    ]);

    return {
      data
    };
  },
});
</script>
```
:::