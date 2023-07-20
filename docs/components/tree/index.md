# 🌲 树
:::demo this is a tree
  ````vue
    <template>
      <ZTree :data="tree"></ZTree>
    </template>
    <script>
    export default {
      data() {
        return {
          tree : [
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
      }
    }
  }

    </script>
  ````
:::
