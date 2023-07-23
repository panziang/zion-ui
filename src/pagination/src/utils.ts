export const getCenterPage = (
  totalPage: number,
  pageIndex: number,
  pagerCount: number
) => {
  const totalPageArr = Array.from(Array(totalPage).keys())
  if (totalPage <= pagerCount) {
    //所有页码全部显示
    return totalPageArr.slice(2, totalPage)
  } else {
    //计算中位数
    const mid = Math.ceil(pagerCount / 2)
    if (pageIndex <= mid) {
      //左边全显示
      return totalPageArr.slice(2, pagerCount)
    } else if (pageIndex >= totalPage - mid + 1) {
      //右边全显示
      return totalPageArr.slice(totalPage - pagerCount + 2, totalPage)
    } else {
      // 中间显示
      return totalPageArr.slice(pageIndex - mid + 2, pageIndex + mid - 1)
    }
  }
}
