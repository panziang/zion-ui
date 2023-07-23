import { computed, defineComponent, toRefs } from 'vue'
import usePage from '../composables/use-page'
import { getCenterPage } from '../utils'
import { PagerProps, pagerProps } from './pager-type'
import { render } from '@testing-library/vue'

export default defineComponent({
  name: 'ZPager',
  props: pagerProps,
  setup(props: PagerProps) {
    const { total, pageSize, pagerCount } = toRefs(props)
    const totalPage = computed(() => Math.ceil(total.value / pageSize.value))
    const { pageIndex, setPageIndex, jumpPage, nextPage, prevPage } = usePage()
    const centerPages = computed(() =>
      getCenterPage(totalPage.value, pageIndex.value, pagerCount.value)
    )

    return {
      prevPage,
      nextPage,
      totalPage,
      pageIndex,
      setPageIndex,
      jumpPage,
      centerPages
    }
  },
  render() {
    const {
      pagerCount,
      totalPage,
      pageIndex,
      setPageIndex,
      jumpPage,
      centerPages
    } = this
    return (
      /* pager部分 */
      <ul class="s-pager">
        <li
          onClick={() => setPageIndex(1)}
          class={{ current: pageIndex === 1 }}
        >
          1
        </li>

        {/* 1.总页码totalPage大于按钮数量pagerCount */}
        {/* 当中间页码左边的页数大于2时，应该出现左边的... */}
        {totalPage > pagerCount && pageIndex > Math.ceil(pagerCount / 2) && (
          <li class="more left" onClick={() => jumpPage(-5)}>
            ...
          </li>
        )}

        {/* 总页面totalPage,当前页面pageIndex,最大显示页码数pageCount */}
        {centerPages.map(page => (
          <li
            onClick={() => setPageIndex(page)}
            class={{ current: pageIndex === page }}
          >
            {page}
          </li>
        ))}

        {totalPage > pagerCount &&
          pageIndex < totalPage - Math.ceil(pagerCount / 2) + 1 && (
            <li class="more right" onClick={() => jumpPage(5)}>
              ...
            </li>
          )}
        {totalPage > 1 && (
          <li
            onClick={() => setPageIndex(totalPage)}
            class={{ current: pageIndex === totalPage }}
          >
            {totalPage}
          </li>
        )}
      </ul>
    )
  }
})
