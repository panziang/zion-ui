import { ref } from 'vue'

export default function usePage(defaultPageIndex = 1) {
  //页码
  // 点上一页
  // 点下一页
  //点数字，跳转至对应页码
  //点快速前往，页码+5
  //点快速后退，页码-5

  const pageIndex = ref(defaultPageIndex)

  //改变页码
  const setPageIndex = (curr: number) => {
    pageIndex.value = curr
  }
  //跳转
  const jumpPage = (page: number) => {
    pageIndex.value += page
  }
  const prevPage = () => {
    pageIndex.value -= 1
  }
  const nextPage = () => {
    pageIndex.value += 1
  }
  return { pageIndex, setPageIndex, jumpPage, prevPage, nextPage }
}
