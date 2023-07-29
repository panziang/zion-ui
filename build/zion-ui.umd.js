;(function (F, s) {
  typeof exports == 'object' && typeof module < 'u'
    ? s(exports, require('vue'))
    : typeof define == 'function' && define.amd
    ? define(['exports', 'vue'], s)
    : ((F = typeof globalThis < 'u' ? globalThis : F || self),
      s((F['zion-ui'] = {}), F.Vue))
})(this, function (F, s) {
  'use strict'
  const mt = {
      type: { type: String, default: 'secondary' },
      size: { type: String, default: 'medium' },
      disabled: { type: Boolean, default: !1 },
      block: { type: Boolean, default: !1 }
    },
    de = s.defineComponent({
      name: 'ZButton',
      props: mt,
      setup(t, { slots: e }) {
        const { type: n, size: r, disabled: o, block: a } = s.toRefs(t)
        return () => {
          const l = e.default ? e.default() : '按钮',
            i = a.value ? 's-btn--block' : ''
          return s.createVNode(
            'button',
            {
              disabled: o.value,
              class: `s-btn s-btn--${n.value} s-btn--${r.value} ${i}`
            },
            [l]
          )
        }
      }
    }),
    ht = {
      install(t) {
        t.component(de.name, de)
      }
    },
    qe = {
      data: { type: Object, required: !0 },
      checkable: { type: Boolean, default: !1 },
      operable: { type: Boolean, default: !1 },
      draggable: { type: [Boolean, Object], default: !1 },
      height: { type: Number },
      itemHeight: { type: Number, default: 30 }
    }
  function fe(t, e = 0, n = []) {
    return (
      e++,
      t == null
        ? void 0
        : t.reduce((r, o) => {
            const a = { ...o }
            if (((a.level = e), n.length > 0 && n[n.length - 1].level >= e))
              for (; n.length; ) n.pop()
            n.push(a)
            const l = n[n.length - 2]
            if ((l && (a.parentId = l.id), a.children)) {
              const i = fe(a.children, e, n)
              return delete a.children, r.concat(a, i)
            } else return a.isLeaf === void 0 && (a.isLeaf = !0), r.concat(a)
          }, [])
    )
  }
  function yt(t) {
    const e = s.computed(() => {
        let i = []
        const c = []
        for (const d of t.value)
          i.includes(d) || (d.expanded !== !0 && (i = n(d)), c.push(d))
        return c
      }),
      n = (i, c = !0) => {
        const d = [],
          f = t.value.findIndex(p => p.id === i.id)
        for (
          let p = f + 1;
          p < t.value.length && i.level < t.value[p].level;
          p++
        )
          (c || i.level === t.value[p].level - 1) && d.push(t.value[p])
        return d
      },
      r = (i, c = []) => {
        const d = n(i, !1)
        return (
          c.push(...d),
          d.forEach(f => {
            f.expanded && r(f, c)
          }),
          c
        )
      }
    return {
      expandedTree: e,
      getChildren: n,
      getChildrenExpanded: r,
      getIndex: i => (i ? t.value.findIndex(c => c.id === i.id) : -1),
      getNode: i => t.value.find(c => c.id === i.id),
      getParent: i => t.value.find(c => c.id === i.parentId)
    }
  }
  function vt(t, e, n, r) {
    const { lazyLoadNodes: o } = r
    return {
      toggleNode: l => {
        const i = t.value.find(c => c.id === l.id)
        i && ((i.expanded = !i.expanded), i.expanded && o(i))
      }
    }
  }
  function bt(t, { getChildren: e }) {
    return {
      toggleCheckNode: r => {
        ;(r.checked = !r.checked),
          e(r).forEach(i => {
            i.checked = r.checked
          })
        const o = t.value.find(i => i.id === r.parentId)
        if (!o) return
        const a = e(o, !1),
          l = a.filter(i => i.checked)
        a.length === l.length ? (o.checked = !0) : (o.checked = !1)
      }
    }
  }
  function De(t = 8) {
    const e = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let n = ''
    for (let r = 0; r < t; r++)
      n += e[parseInt((Math.random() * e.length).toString())]
    return n
  }
  function xt(t, { getIndex: e, getChildren: n }) {
    return {
      append: (a, l) => {
        const i = n(a, !1),
          c = i[i.length - 1]
        let d = e(a) + 1
        c && (d = e(c) + 1), (a.expanded = !0), (a.isLeaf = !1)
        const f = s.ref({
          ...l,
          level: a.level + 1,
          parentId: a.id,
          isLeaf: !0
        })
        f.value.id == null && (f.value.id = De()), t.value.splice(d, 0, f.value)
      },
      remove: a => {
        const l = n(a).map(i => i.id)
        t.value = t.value.filter(i => i.id !== a.id && !l.includes(i.id))
      }
    }
  }
  function wt(t, { getNode: e, getIndex: n, getChildren: r }, { emit: o }) {
    const a = d => {
        const f = e(d)
        f &&
          f.isLeaf === !1 &&
          !f.childNodeCount &&
          ((f.loading = !0), o('lazy-load', d, l))
      },
      l = d => {
        const f = e(d.node)
        if (f) {
          f.loading = !1
          const p = s.ref(fe(d.treeItems, f.level))
          i(f, p), c(f, p)
          const h = r(f)
          f.childNodeCount = h.length
        }
      },
      i = (d, f) => {
        f.value.forEach(p => {
          p.level - 1 === d.level && !p.parentId && (p.parentId = d.id)
        })
      },
      c = (d, f) => {
        const p = n(d)
        p && t.value.splice(p + 1, 0, ...f.value)
      }
    return { lazyLoadNodes: a }
  }
  const ue = {
    dropPrev: 's-tree__node--drop-prev',
    dropNext: 's-tree__node--drop-next',
    dropInner: 's-tree__node--drop-inner'
  }
  function Nt(t, e, { getChildren: n, getParent: r }) {
    const o = s.reactive({
        dropType: void 0,
        draggingNode: null,
        draggingTreeNode: null
      }),
      a = s.computed(() => e.value.reduce((u, m) => ({ ...u, [m.id]: m }), {})),
      l = u => {
        u == null || u.classList.remove(...Object.values(ue))
      },
      i = (u, m) => {
        var w
        const g = (w = a.value[u]) == null ? void 0 : w.parentId
        return g === m ? !0 : g !== void 0 ? i(g, m) : !1
      },
      c = () => {
        ;(o.dropType = void 0),
          (o.draggingNode = null),
          (o.draggingTreeNode = null)
      },
      d = (u, m) => {
        var g
        u.stopPropagation(),
          (o.draggingNode = u.target),
          (o.draggingTreeNode = m),
          (g = u.dataTransfer) == null || g.setData('dragNodeId', m.id)
      },
      f = u => {
        if ((u.preventDefault(), u.stopPropagation(), !!o.draggingNode && t)) {
          if ((u.dataTransfer && (u.dataTransfer.dropEffect = 'move'), !e))
            return
          let m = {}
          typeof t == 'object' ? (m = t) : t === !0 && (m = { dropInner: !0 })
          const { dropPrev: g, dropNext: w, dropInner: v } = m
          let x
          const N = g ? (v ? 0.25 : w ? 0.45 : 1) : -1,
            P = w ? (v ? 0.75 : g ? 0.55 : 0) : 1,
            C = u.currentTarget,
            O = C == null ? void 0 : C.getBoundingClientRect(),
            R = u.clientY - ((O == null ? void 0 : O.top) || 0)
          if (
            (R < ((O == null ? void 0 : O.height) || 0) * N
              ? (x = 'dropPrev')
              : R > ((O == null ? void 0 : O.height) || 0) * P
              ? (x = 'dropNext')
              : v
              ? (x = 'dropInner')
              : (x = void 0),
            x)
          ) {
            const E = C == null ? void 0 : C.classList
            E && (E.contains(ue[x]) || (l(C), E.add(ue[x])))
          } else l(C)
          o.dropType = x
        }
      },
      p = u => {
        u.stopPropagation(), o.draggingNode && l(u.currentTarget)
      },
      h = (u, m) => {
        var w
        if (
          (u.preventDefault(),
          u.stopPropagation(),
          l(u.currentTarget),
          !o.draggingNode || !t)
        )
          return
        const g =
          (w = u.dataTransfer) == null ? void 0 : w.getData('dragNodeId')
        if (g) {
          const v = i(m.id, g)
          if (g === m.id || v) return
          o.dropType && y(g, m), c()
        }
      }
    function y(u, m) {
      const g = e.value.find(w => w.id === u)
      if (g) {
        let w
        const v = n(g),
          x = r(g)
        if (o.dropType === 'dropInner') {
          w = { ...g, parentId: m.id, level: m.level + 1 }
          const N = e.value.indexOf(m)
          e.value.splice(N + 1, 0, w), (m.isLeaf = void 0)
          const P = e.value.indexOf(g)
          e.value.splice(P, 1)
        } else if (o.dropType === 'dropNext') {
          w = { ...g, parentId: m.parentId, level: m.level }
          const N = e.value.indexOf(m),
            P = n(m, !0).length
          e.value.splice(N + P + 1, 0, w)
          const C = e.value.indexOf(g)
          e.value.splice(C, 1)
        } else if (o.dropType === 'dropPrev') {
          w = { ...g, parentId: m.parentId, level: m.level }
          const N = e.value.indexOf(m)
          e.value.splice(N, 0, w)
          const P = e.value.indexOf(g)
          e.value.splice(P, 1)
        }
        ;(o.dropType = 'dropInner'),
          v.forEach(N => y(N.id, w)),
          x && n(x).length === 0 && (x.isLeaf = !0)
      }
    }
    return {
      onDragstart: d,
      onDragover: f,
      onDragleave: p,
      onDrop: h,
      onDragend: u => {
        u.preventDefault(), u.stopPropagation(), c()
      }
    }
  }
  function Vt(t, e, n) {
    const r = s.ref(fe(s.unref(t))),
      o = yt(r),
      a = [vt, bt, xt],
      l = wt(r, o, n),
      i = Nt(e.draggable, r, o)
    return {
      ...a.reduce((d, f) => ({ ...d, ...f(r, o, n, l) }), {}),
      ...o,
      ...i,
      treeData: r
    }
  }
  const Pt = { ...qe, treeNode: { type: Object, required: !0 } },
    Ae = 28,
    ke = 24,
    Me = s.defineComponent({
      name: 'ZTreeNode',
      props: Pt,
      setup(t, { slots: e }) {
        const {
            treeNode: n,
            checkable: r,
            operable: o,
            draggable: a
          } = s.toRefs(t),
          {
            getChildren: l,
            getChildrenExpanded: i,
            toggleNode: c,
            toggleCheckNode: d,
            append: f,
            remove: p,
            onDragend: h,
            onDragleave: y,
            onDragover: b,
            onDragstart: u,
            onDrop: m
          } = s.inject('TREE_UTILS'),
          g = s.ref(!1),
          w = () => {
            g.value ? (g.value = !1) : (g.value = !0)
          }
        let v = {}
        return (
          a.value &&
            (v = {
              draggable: !0,
              onDragend: x => h(x),
              onDragleave: x => y(x),
              onDragover: x => b(x),
              onDragstart: x => u(x, n.value),
              onDrop: x => m(x, n.value)
            }),
          () =>
            s.createVNode(
              'div',
              {
                class: 's-tree__node hover:bg-slate-300 relative leading-8',
                style: { paddingLeft: `${ke * (n.value.level - 1)}px` },
                onMouseenter: w,
                onMouseleave: w
              },
              [
                !n.value.isLeaf &&
                  n.value.expanded &&
                  s.createVNode(
                    'span',
                    {
                      class: 's-tree-node__vline absolute w-px bg-gray-300',
                      style: {
                        height: `${Ae * i(n.value).length}px`,
                        left: `${ke * (n.value.level - 1) + 8}px`,
                        top: `${Ae}px`
                      }
                    },
                    null
                  ),
                s.createVNode(
                  'div',
                  s.mergeProps({ class: 's-tree__node--content' }, v),
                  [
                    n.value.isLeaf
                      ? s.createVNode(
                          'span',
                          { style: { display: 'inline-block', width: '25px' } },
                          null
                        )
                      : e.icon(),
                    r.value &&
                      s.withDirectives(
                        s.createVNode(
                          'input',
                          {
                            type: 'checkbox',
                            'onUpdate:modelValue': x => (n.value.checked = x),
                            onClick: () => d(n.value)
                          },
                          null
                        ),
                        [[s.vModelCheckbox, n.value.checked]]
                      ),
                    e.content(),
                    o.value &&
                      g.value &&
                      s.createVNode('span', { class: 'inline-flex ml-1' }, [
                        s.createVNode(
                          'svg',
                          {
                            onClick: () => {
                              f(n.value, { label: '新节点' })
                            },
                            viewBox: '0 0 1024 1024',
                            width: '14',
                            height: '14',
                            class: 'cursor-pointer'
                          },
                          [
                            s.createVNode(
                              'path',
                              {
                                d: 'M590.769231 571.076923h324.923077c15.753846 0 29.538462-13.784615 29.538461-29.538461v-59.076924c0-15.753846-13.784615-29.538462-29.538461-29.538461H590.769231c-11.815385 0-19.692308-7.876923-19.692308-19.692308V108.307692c0-15.753846-13.784615-29.538462-29.538461-29.538461h-59.076924c-15.753846 0-29.538462 13.784615-29.538461 29.538461V433.230769c0 11.815385-7.876923 19.692308-19.692308 19.692308H108.307692c-15.753846 0-29.538462 13.784615-29.538461 29.538461v59.076924c0 15.753846 13.784615 29.538462 29.538461 29.538461H433.230769c11.815385 0 19.692308 7.876923 19.692308 19.692308v324.923077c0 15.753846 13.784615 29.538462 29.538461 29.538461h59.076924c15.753846 0 29.538462-13.784615 29.538461-29.538461V590.769231c0-11.815385 7.876923-19.692308 19.692308-19.692308z'
                              },
                              null
                            )
                          ]
                        ),
                        s.createVNode(
                          'svg',
                          {
                            onClick: () => {
                              p(n.value)
                            },
                            viewBox: '0 0 1024 1024',
                            width: '14',
                            height: '14',
                            class: 'cursor-pointer ml-1'
                          },
                          [
                            s.createVNode(
                              'path',
                              {
                                d: 'M610.461538 500.184615l256-257.96923c11.815385-11.815385 11.815385-29.538462 0-41.353847l-39.384615-41.353846c-11.815385-11.815385-29.538462-11.815385-41.353846 0L527.753846 417.476923c-7.876923 7.876923-19.692308 7.876923-27.569231 0L242.215385 157.538462c-11.815385-11.815385-29.538462-11.815385-41.353847 0l-41.353846 41.353846c-11.815385 11.815385-11.815385 29.538462 0 41.353846l257.969231 257.969231c7.876923 7.876923 7.876923 19.692308 0 27.56923L157.538462 785.723077c-11.815385 11.815385-11.815385 29.538462 0 41.353846l41.353846 41.353846c11.815385 11.815385 29.538462 11.815385 41.353846 0L498.215385 610.461538c7.876923-7.876923 19.692308-7.876923 27.56923 0l257.969231 257.969231c11.815385 11.815385 29.538462 11.815385 41.353846 0L866.461538 827.076923c11.815385-11.815385 11.815385-29.538462 0-41.353846L610.461538 527.753846c-7.876923-7.876923-7.876923-19.692308 0-27.569231z'
                              },
                              null
                            )
                          ]
                        )
                      ]),
                    n.value.loading && e.loading()
                  ]
                )
              ]
            )
        )
      }
    }),
    je = (t, { emit: e }) =>
      s.createVNode(
        'svg',
        {
          onClick: () => e('onClick'),
          style: {
            width: '18px',
            height: '18px',
            display: 'inline-block',
            transform: t.expanded ? 'rotate(90deg)' : ''
          },
          viewBox: '0 0 1024 1024',
          xmlns: 'http://www.w3.org/2000/svg'
        },
        [
          s.createVNode(
            'path',
            { fill: 'currentColor', d: 'M384 192v640l384-320.064z' },
            null
          )
        ]
      ),
    Tt = {
      data: { type: Array, default: [] },
      itemHeight: { type: Number, default: 22 },
      component: { type: String, default: 'div' }
    },
    Jn = '',
    Et = s.defineComponent({
      name: 'ZVirtualList',
      props: Tt,
      setup(t, { slots: e }) {
        const { data: n, itemHeight: r, component: o } = s.toRefs(t),
          a = s.ref(),
          l = s.ref(0),
          i = s.ref(0),
          c = s.ref(0),
          d = s.computed(() => Math.ceil(l.value / r.value)),
          f = s.computed(() =>
            n.value.slice(c.value, Math.min(c.value + d.value, n.value.length))
          )
        s.onMounted(() => {
          var h
          l.value = (h = a.value) == null ? void 0 : h.clientHeight
        })
        const p = h => {
          const { scrollTop: y } = h.target
          ;(c.value = Math.floor(y / r.value)), (i.value = y - (y % r.value))
        }
        return () =>
          s.createVNode(
            o.value,
            { class: 's-virtual-list__container', ref: a, onScroll: p },
            {
              default: () => [
                s.createVNode(
                  'div',
                  {
                    class: 's-virtual-list__blank',
                    style: { height: `${n.value.length * r.value}px` }
                  },
                  null
                ),
                s.createVNode(
                  'div',
                  {
                    class: 's-virtual-list',
                    style: { transform: `translate3d(0, ${i.value}px, 0)` }
                  },
                  [
                    f.value.map((h, y) => {
                      var b
                      return (b = e.default) == null
                        ? void 0
                        : b.call(e, { item: h, index: y })
                    })
                  ]
                )
              ]
            }
          )
      }
    }),
    Gn = '',
    pe = s.defineComponent({
      name: 'ZTree',
      props: qe,
      emits: ['lazy-load'],
      setup(t, e) {
        const { data: n, height: r, itemHeight: o } = s.toRefs(t),
          { slots: a } = e,
          l = Vt(n.value, t, e)
        return (
          s.provide('TREE_UTILS', l),
          () => {
            var i
            return s.createVNode('div', { class: 's-tree' }, [
              r != null && r.value
                ? s.createVNode('div', { style: { height: `${r.value}px` } }, [
                    s.createVNode(
                      Et,
                      { data: l.expandedTree.value, itemHeight: o.value },
                      {
                        default: ({ item: c }) =>
                          s.createVNode(Me, s.mergeProps(t, { treeNode: c }), {
                            content: () => (a.content ? a.content(c) : c.label),
                            icon: () =>
                              a.icon
                                ? a.icon({
                                    nodeData: c,
                                    toggleNode: l.toggleNode
                                  })
                                : s.createVNode(
                                    je,
                                    {
                                      expanded: !!c.expanded,
                                      onClick: () => l.toggleNode(c)
                                    },
                                    null
                                  ),
                            loading: () =>
                              a.loadind
                                ? a.loading({ nodeData: l })
                                : s.createVNode('span', { class: 'ml-1' }, [
                                    s.createTextVNode('loading...')
                                  ])
                          })
                      }
                    )
                  ])
                : (i = l.expandedTree.value) == null
                ? void 0
                : i.map(c =>
                    s.createVNode(Me, s.mergeProps(t, { treeNode: c }), {
                      content: () => (a.content ? a.content(c) : c.label),
                      icon: () =>
                        a.icon
                          ? a.icon({ nodeData: c, toggleNode: l.toggleNode })
                          : s.createVNode(
                              je,
                              {
                                expanded: !!c.expanded,
                                onClick: () => l.toggleNode(c)
                              },
                              null
                            ),
                      loading: () =>
                        a.loadind
                          ? a.loading({ nodeData: l })
                          : s.createVNode('span', { class: 'ml-1' }, [
                              s.createTextVNode('loading...')
                            ])
                    })
                  )
            ])
          }
        )
      }
    }),
    Ot = {
      install(t) {
        t.component(pe.name, pe)
      }
    },
    $e = {
      total: { type: Number, default: 0 },
      pageSize: { type: Number, default: 10 },
      pagerCount: { type: Number, default: 7 },
      modelValue: { type: Number, default: 1 }
    },
    Kn = ''
  function Ct(t = 1) {
    const e = s.ref(t)
    return {
      pageIndex: e,
      setPageIndex: l => {
        e.value = l
      },
      jumpPage: l => {
        e.value += l
      },
      prevPage: () => {
        e.value -= 1
      },
      nextPage: () => {
        e.value += 1
      }
    }
  }
  const Ft = (t, e, n) => {
      const r = Array.from(Array(t).keys())
      if (t <= n) return r.slice(2, t)
      {
        const o = Math.ceil(n / 2)
        return e <= o
          ? r.slice(2, n)
          : e >= t - o + 1
          ? r.slice(t - n + 2, t)
          : r.slice(e - o + 2, e + o - 1)
      }
    },
    It = $e,
    ge = s.defineComponent({
      name: 'ZPager',
      props: It,
      setup(t) {
        const { total: e, pageSize: n, pagerCount: r } = s.toRefs(t),
          o = s.computed(() => Math.ceil(e.value / n.value)),
          {
            pageIndex: a,
            setPageIndex: l,
            jumpPage: i,
            nextPage: c,
            prevPage: d
          } = Ct(),
          f = s.computed(() => Ft(o.value, a.value, r.value))
        return {
          prevPage: d,
          nextPage: c,
          totalPage: o,
          pageIndex: a,
          setPageIndex: l,
          jumpPage: i,
          centerPages: f
        }
      },
      render() {
        const {
          pagerCount: t,
          totalPage: e,
          pageIndex: n,
          setPageIndex: r,
          jumpPage: o,
          centerPages: a
        } = this
        return s.createVNode('ul', { class: 's-pager' }, [
          s.createVNode(
            'li',
            { onClick: () => r(1), class: { current: n === 1 } },
            [s.createTextVNode('1')]
          ),
          e > t &&
            n > Math.ceil(t / 2) &&
            s.createVNode('li', { class: 'more left', onClick: () => o(-5) }, [
              s.createTextVNode('...')
            ]),
          a.map(l =>
            s.createVNode(
              'li',
              { onClick: () => r(l), class: { current: n === l } },
              [l]
            )
          ),
          e > t &&
            n < e - Math.ceil(t / 2) + 1 &&
            s.createVNode('li', { class: 'more right', onClick: () => o(5) }, [
              s.createTextVNode('...')
            ]),
          e > 1 &&
            s.createVNode(
              'li',
              { onClick: () => r(e), class: { current: n === e } },
              [e]
            )
        ])
      }
    }),
    me = s.defineComponent({
      name: 'ZPagination',
      props: $e,
      emits: ['update:modelValue'],
      setup(t, { emit: e }) {
        const n = s.ref(),
          r = s.computed(() => (n.value ? n.value.pageIndex < 2 : !0)),
          o = s.computed(() =>
            n.value ? n.value.pageIndex > n.value.totalPage - 1 : !0
          )
        return (
          s.onMounted(() => {
            s.watch(
              () => n.value.pageIndex,
              a => {
                e('update:modelValue', a)
              }
            ),
              s.watch(
                () => t.modelValue,
                a => {
                  n.value.pageIndex = a
                }
              )
          }),
          () =>
            s.createVNode('div', { class: 's-pagination' }, [
              s.createVNode(
                'button',
                { disabled: r.value, onClick: () => n.value.prevPage() },
                [s.createTextVNode('上一页')]
              ),
              s.createVNode(ge, s.mergeProps(t, { ref: n }), null),
              s.createVNode(
                'button',
                { disabled: o.value, onClick: () => n.value.nextPage() },
                [s.createTextVNode('下一页')]
              )
            ])
        )
      }
    }),
    _t = {
      install(t) {
        t.component(me.name, me), t.component(ge.name, ge)
      }
    },
    Lt = {
      model: { type: Object, required: !0 },
      layout: { type: String, default: 'vertical' },
      labelSize: { type: String, default: 'md' },
      labelAlign: { type: String, default: 'start' },
      rules: { type: Object }
    },
    Be = Symbol('formContextToken'),
    he = s.defineComponent({
      name: 'ZForm',
      props: Lt,
      emits: ['submit'],
      setup(t, { slots: e, emit: n, expose: r }) {
        const o = s.computed(() => ({
          layout: t.layout,
          labelSize: t.labelSize,
          labelAlign: t.labelAlign
        }))
        s.provide('LABEL_DATA', o)
        const a = new Set(),
          l = f => a.add(f),
          i = f => a.delete(f)
        s.provide(Be, {
          model: t.model,
          rules: t.rules,
          addItem: l,
          removeItem: i
        })
        const c = f => {
          f.preventDefault(), n('submit')
        }
        function d(f) {
          const p = []
          a.forEach(h => p.push(h.validate())),
            Promise.all(p)
              .then(() => f(!0))
              .catch(() => f(!1))
        }
        return (
          r({ validate: d }),
          () => {
            var f
            return s.createVNode('form', { class: 's-form', onSubmit: c }, [
              (f = e.default) == null ? void 0 : f.call(e)
            ])
          }
        )
      }
    }),
    Rt = { label: { type: String }, prop: { type: String } },
    Qn = ''
  function z() {
    return (
      (z = Object.assign
        ? Object.assign.bind()
        : function (t) {
            for (var e = 1; e < arguments.length; e++) {
              var n = arguments[e]
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
            }
            return t
          }),
      z.apply(this, arguments)
    )
  }
  function St(t, e) {
    ;(t.prototype = Object.create(e.prototype)),
      (t.prototype.constructor = t),
      U(t, e)
  }
  function ye(t) {
    return (
      (ye = Object.setPrototypeOf
        ? Object.getPrototypeOf.bind()
        : function (n) {
            return n.__proto__ || Object.getPrototypeOf(n)
          }),
      ye(t)
    )
  }
  function U(t, e) {
    return (
      (U = Object.setPrototypeOf
        ? Object.setPrototypeOf.bind()
        : function (r, o) {
            return (r.__proto__ = o), r
          }),
      U(t, e)
    )
  }
  function qt() {
    if (typeof Reflect > 'u' || !Reflect.construct || Reflect.construct.sham)
      return !1
    if (typeof Proxy == 'function') return !0
    try {
      return (
        Boolean.prototype.valueOf.call(
          Reflect.construct(Boolean, [], function () {})
        ),
        !0
      )
    } catch {
      return !1
    }
  }
  function ne(t, e, n) {
    return (
      qt()
        ? (ne = Reflect.construct.bind())
        : (ne = function (o, a, l) {
            var i = [null]
            i.push.apply(i, a)
            var c = Function.bind.apply(o, i),
              d = new c()
            return l && U(d, l.prototype), d
          }),
      ne.apply(null, arguments)
    )
  }
  function Dt(t) {
    return Function.toString.call(t).indexOf('[native code]') !== -1
  }
  function ve(t) {
    var e = typeof Map == 'function' ? new Map() : void 0
    return (
      (ve = function (r) {
        if (r === null || !Dt(r)) return r
        if (typeof r != 'function')
          throw new TypeError(
            'Super expression must either be null or a function'
          )
        if (typeof e < 'u') {
          if (e.has(r)) return e.get(r)
          e.set(r, o)
        }
        function o() {
          return ne(r, arguments, ye(this).constructor)
        }
        return (
          (o.prototype = Object.create(r.prototype, {
            constructor: {
              value: o,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          })),
          U(o, r)
        )
      }),
      ve(t)
    )
  }
  var At = /%[sdj%]/g,
    ze = function () {}
  typeof process < 'u' &&
    process.env &&
    process.env.NODE_ENV !== 'production' &&
    typeof window < 'u' &&
    typeof document < 'u' &&
    (ze = function (e, n) {
      typeof console < 'u' &&
        console.warn &&
        typeof ASYNC_VALIDATOR_NO_WARNING > 'u' &&
        n.every(function (r) {
          return typeof r == 'string'
        }) &&
        console.warn(e, n)
    })
  function be(t) {
    if (!t || !t.length) return null
    var e = {}
    return (
      t.forEach(function (n) {
        var r = n.field
        ;(e[r] = e[r] || []), e[r].push(n)
      }),
      e
    )
  }
  function S(t) {
    for (
      var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1;
      r < e;
      r++
    )
      n[r - 1] = arguments[r]
    var o = 0,
      a = n.length
    if (typeof t == 'function') return t.apply(null, n)
    if (typeof t == 'string') {
      var l = t.replace(At, function (i) {
        if (i === '%%') return '%'
        if (o >= a) return i
        switch (i) {
          case '%s':
            return String(n[o++])
          case '%d':
            return Number(n[o++])
          case '%j':
            try {
              return JSON.stringify(n[o++])
            } catch {
              return '[Circular]'
            }
            break
          default:
            return i
        }
      })
      return l
    }
    return t
  }
  function kt(t) {
    return (
      t === 'string' ||
      t === 'url' ||
      t === 'hex' ||
      t === 'email' ||
      t === 'date' ||
      t === 'pattern'
    )
  }
  function I(t, e) {
    return !!(
      t == null ||
      (e === 'array' && Array.isArray(t) && !t.length) ||
      (kt(e) && typeof t == 'string' && !t)
    )
  }
  function Mt(t, e, n) {
    var r = [],
      o = 0,
      a = t.length
    function l(i) {
      r.push.apply(r, i || []), o++, o === a && n(r)
    }
    t.forEach(function (i) {
      e(i, l)
    })
  }
  function He(t, e, n) {
    var r = 0,
      o = t.length
    function a(l) {
      if (l && l.length) {
        n(l)
        return
      }
      var i = r
      ;(r = r + 1), i < o ? e(t[i], a) : n([])
    }
    a([])
  }
  function jt(t) {
    var e = []
    return (
      Object.keys(t).forEach(function (n) {
        e.push.apply(e, t[n] || [])
      }),
      e
    )
  }
  var Ze = (function (t) {
    St(e, t)
    function e(n, r) {
      var o
      return (
        (o = t.call(this, 'Async Validation Error') || this),
        (o.errors = n),
        (o.fields = r),
        o
      )
    }
    return e
  })(ve(Error))
  function $t(t, e, n, r, o) {
    if (e.first) {
      var a = new Promise(function (h, y) {
        var b = function (g) {
            return r(g), g.length ? y(new Ze(g, be(g))) : h(o)
          },
          u = jt(t)
        He(u, n, b)
      })
      return (
        a.catch(function (h) {
          return h
        }),
        a
      )
    }
    var l = e.firstFields === !0 ? Object.keys(t) : e.firstFields || [],
      i = Object.keys(t),
      c = i.length,
      d = 0,
      f = [],
      p = new Promise(function (h, y) {
        var b = function (m) {
          if ((f.push.apply(f, m), d++, d === c))
            return r(f), f.length ? y(new Ze(f, be(f))) : h(o)
        }
        i.length || (r(f), h(o)),
          i.forEach(function (u) {
            var m = t[u]
            l.indexOf(u) !== -1 ? He(m, n, b) : Mt(m, n, b)
          })
      })
    return (
      p.catch(function (h) {
        return h
      }),
      p
    )
  }
  function Bt(t) {
    return !!(t && t.message !== void 0)
  }
  function zt(t, e) {
    for (var n = t, r = 0; r < e.length; r++) {
      if (n == null) return n
      n = n[e[r]]
    }
    return n
  }
  function We(t, e) {
    return function (n) {
      var r
      return (
        t.fullFields
          ? (r = zt(e, t.fullFields))
          : (r = e[n.field || t.fullField]),
        Bt(n)
          ? ((n.field = n.field || t.fullField), (n.fieldValue = r), n)
          : {
              message: typeof n == 'function' ? n() : n,
              fieldValue: r,
              field: n.field || t.fullField
            }
      )
    }
  }
  function Ue(t, e) {
    if (e) {
      for (var n in e)
        if (e.hasOwnProperty(n)) {
          var r = e[n]
          typeof r == 'object' && typeof t[n] == 'object'
            ? (t[n] = z({}, t[n], r))
            : (t[n] = r)
        }
    }
    return t
  }
  var Ye = function (e, n, r, o, a, l) {
      e.required &&
        (!r.hasOwnProperty(e.field) || I(n, l || e.type)) &&
        o.push(S(a.messages.required, e.fullField))
    },
    Ht = function (e, n, r, o, a) {
      ;(/^\s+$/.test(n) || n === '') &&
        o.push(S(a.messages.whitespace, e.fullField))
    },
    re,
    Zt = function () {
      if (re) return re
      var t = '[a-fA-F\\d:]',
        e = function (x) {
          return x && x.includeBoundaries
            ? '(?:(?<=\\s|^)(?=' + t + ')|(?<=' + t + ')(?=\\s|$))'
            : ''
        },
        n =
          '(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}',
        r = '[a-fA-F\\d]{1,4}',
        o = (
          `
(?:
(?:` +
          r +
          ':){7}(?:' +
          r +
          `|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:` +
          r +
          ':){6}(?:' +
          n +
          '|:' +
          r +
          `|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:` +
          r +
          ':){5}(?::' +
          n +
          '|(?::' +
          r +
          `){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:` +
          r +
          ':){4}(?:(?::' +
          r +
          '){0,1}:' +
          n +
          '|(?::' +
          r +
          `){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:` +
          r +
          ':){3}(?:(?::' +
          r +
          '){0,2}:' +
          n +
          '|(?::' +
          r +
          `){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:` +
          r +
          ':){2}(?:(?::' +
          r +
          '){0,3}:' +
          n +
          '|(?::' +
          r +
          `){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:` +
          r +
          ':){1}(?:(?::' +
          r +
          '){0,4}:' +
          n +
          '|(?::' +
          r +
          `){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::(?:(?::` +
          r +
          '){0,5}:' +
          n +
          '|(?::' +
          r +
          `){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
`
        )
          .replace(/\s*\/\/.*$/gm, '')
          .replace(/\n/g, '')
          .trim(),
        a = new RegExp('(?:^' + n + '$)|(?:^' + o + '$)'),
        l = new RegExp('^' + n + '$'),
        i = new RegExp('^' + o + '$'),
        c = function (x) {
          return x && x.exact
            ? a
            : new RegExp(
                '(?:' + e(x) + n + e(x) + ')|(?:' + e(x) + o + e(x) + ')',
                'g'
              )
        }
      ;(c.v4 = function (v) {
        return v && v.exact ? l : new RegExp('' + e(v) + n + e(v), 'g')
      }),
        (c.v6 = function (v) {
          return v && v.exact ? i : new RegExp('' + e(v) + o + e(v), 'g')
        })
      var d = '(?:(?:[a-z]+:)?//)',
        f = '(?:\\S+(?::\\S*)?@)?',
        p = c.v4().source,
        h = c.v6().source,
        y = '(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)',
        b = '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*',
        u = '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))',
        m = '(?::\\d{2,5})?',
        g = '(?:[/?#][^\\s"]*)?',
        w =
          '(?:' +
          d +
          '|www\\.)' +
          f +
          '(?:localhost|' +
          p +
          '|' +
          h +
          '|' +
          y +
          b +
          u +
          ')' +
          m +
          g
      return (re = new RegExp('(?:^' + w + '$)', 'i')), re
    },
    Xe = {
      email:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
      hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
    },
    Y = {
      integer: function (e) {
        return Y.number(e) && parseInt(e, 10) === e
      },
      float: function (e) {
        return Y.number(e) && !Y.integer(e)
      },
      array: function (e) {
        return Array.isArray(e)
      },
      regexp: function (e) {
        if (e instanceof RegExp) return !0
        try {
          return !!new RegExp(e)
        } catch {
          return !1
        }
      },
      date: function (e) {
        return (
          typeof e.getTime == 'function' &&
          typeof e.getMonth == 'function' &&
          typeof e.getYear == 'function' &&
          !isNaN(e.getTime())
        )
      },
      number: function (e) {
        return isNaN(e) ? !1 : typeof e == 'number'
      },
      object: function (e) {
        return typeof e == 'object' && !Y.array(e)
      },
      method: function (e) {
        return typeof e == 'function'
      },
      email: function (e) {
        return typeof e == 'string' && e.length <= 320 && !!e.match(Xe.email)
      },
      url: function (e) {
        return typeof e == 'string' && e.length <= 2048 && !!e.match(Zt())
      },
      hex: function (e) {
        return typeof e == 'string' && !!e.match(Xe.hex)
      }
    },
    Wt = function (e, n, r, o, a) {
      if (e.required && n === void 0) {
        Ye(e, n, r, o, a)
        return
      }
      var l = [
          'integer',
          'float',
          'array',
          'regexp',
          'object',
          'method',
          'email',
          'number',
          'date',
          'url',
          'hex'
        ],
        i = e.type
      l.indexOf(i) > -1
        ? Y[i](n) || o.push(S(a.messages.types[i], e.fullField, e.type))
        : i &&
          typeof n !== e.type &&
          o.push(S(a.messages.types[i], e.fullField, e.type))
    },
    Ut = function (e, n, r, o, a) {
      var l = typeof e.len == 'number',
        i = typeof e.min == 'number',
        c = typeof e.max == 'number',
        d = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        f = n,
        p = null,
        h = typeof n == 'number',
        y = typeof n == 'string',
        b = Array.isArray(n)
      if ((h ? (p = 'number') : y ? (p = 'string') : b && (p = 'array'), !p))
        return !1
      b && (f = n.length),
        y && (f = n.replace(d, '_').length),
        l
          ? f !== e.len && o.push(S(a.messages[p].len, e.fullField, e.len))
          : i && !c && f < e.min
          ? o.push(S(a.messages[p].min, e.fullField, e.min))
          : c && !i && f > e.max
          ? o.push(S(a.messages[p].max, e.fullField, e.max))
          : i &&
            c &&
            (f < e.min || f > e.max) &&
            o.push(S(a.messages[p].range, e.fullField, e.min, e.max))
    },
    H = 'enum',
    Yt = function (e, n, r, o, a) {
      ;(e[H] = Array.isArray(e[H]) ? e[H] : []),
        e[H].indexOf(n) === -1 &&
          o.push(S(a.messages[H], e.fullField, e[H].join(', ')))
    },
    Xt = function (e, n, r, o, a) {
      if (e.pattern) {
        if (e.pattern instanceof RegExp)
          (e.pattern.lastIndex = 0),
            e.pattern.test(n) ||
              o.push(S(a.messages.pattern.mismatch, e.fullField, n, e.pattern))
        else if (typeof e.pattern == 'string') {
          var l = new RegExp(e.pattern)
          l.test(n) ||
            o.push(S(a.messages.pattern.mismatch, e.fullField, n, e.pattern))
        }
      }
    },
    V = {
      required: Ye,
      whitespace: Ht,
      type: Wt,
      range: Ut,
      enum: Yt,
      pattern: Xt
    },
    Jt = function (e, n, r, o, a) {
      var l = [],
        i = e.required || (!e.required && o.hasOwnProperty(e.field))
      if (i) {
        if (I(n, 'string') && !e.required) return r()
        V.required(e, n, o, l, a, 'string'),
          I(n, 'string') ||
            (V.type(e, n, o, l, a),
            V.range(e, n, o, l, a),
            V.pattern(e, n, o, l, a),
            e.whitespace === !0 && V.whitespace(e, n, o, l, a))
      }
      r(l)
    },
    Gt = function (e, n, r, o, a) {
      var l = [],
        i = e.required || (!e.required && o.hasOwnProperty(e.field))
      if (i) {
        if (I(n) && !e.required) return r()
        V.required(e, n, o, l, a), n !== void 0 && V.type(e, n, o, l, a)
      }
      r(l)
    },
    Kt = function (e, n, r, o, a) {
      var l = [],
        i = e.required || (!e.required && o.hasOwnProperty(e.field))
      if (i) {
        if ((n === '' && (n = void 0), I(n) && !e.required)) return r()
        V.required(e, n, o, l, a),
          n !== void 0 && (V.type(e, n, o, l, a), V.range(e, n, o, l, a))
      }
      r(l)
    },
    Qt = function (e, n, r, o, a) {
      var l = [],
        i = e.required || (!e.required && o.hasOwnProperty(e.field))
      if (i) {
        if (I(n) && !e.required) return r()
        V.required(e, n, o, l, a), n !== void 0 && V.type(e, n, o, l, a)
      }
      r(l)
    },
    en = function (e, n, r, o, a) {
      var l = [],
        i = e.required || (!e.required && o.hasOwnProperty(e.field))
      if (i) {
        if (I(n) && !e.required) return r()
        V.required(e, n, o, l, a), I(n) || V.type(e, n, o, l, a)
      }
      r(l)
    },
    tn = function (e, n, r, o, a) {
      var l = [],
        i = e.required || (!e.required && o.hasOwnProperty(e.field))
      if (i) {
        if (I(n) && !e.required) return r()
        V.required(e, n, o, l, a),
          n !== void 0 && (V.type(e, n, o, l, a), V.range(e, n, o, l, a))
      }
      r(l)
    },
    nn = function (e, n, r, o, a) {
      var l = [],
        i = e.required || (!e.required && o.hasOwnProperty(e.field))
      if (i) {
        if (I(n) && !e.required) return r()
        V.required(e, n, o, l, a),
          n !== void 0 && (V.type(e, n, o, l, a), V.range(e, n, o, l, a))
      }
      r(l)
    },
    rn = function (e, n, r, o, a) {
      var l = [],
        i = e.required || (!e.required && o.hasOwnProperty(e.field))
      if (i) {
        if (n == null && !e.required) return r()
        V.required(e, n, o, l, a, 'array'),
          n != null && (V.type(e, n, o, l, a), V.range(e, n, o, l, a))
      }
      r(l)
    },
    on = function (e, n, r, o, a) {
      var l = [],
        i = e.required || (!e.required && o.hasOwnProperty(e.field))
      if (i) {
        if (I(n) && !e.required) return r()
        V.required(e, n, o, l, a), n !== void 0 && V.type(e, n, o, l, a)
      }
      r(l)
    },
    an = 'enum',
    ln = function (e, n, r, o, a) {
      var l = [],
        i = e.required || (!e.required && o.hasOwnProperty(e.field))
      if (i) {
        if (I(n) && !e.required) return r()
        V.required(e, n, o, l, a), n !== void 0 && V[an](e, n, o, l, a)
      }
      r(l)
    },
    sn = function (e, n, r, o, a) {
      var l = [],
        i = e.required || (!e.required && o.hasOwnProperty(e.field))
      if (i) {
        if (I(n, 'string') && !e.required) return r()
        V.required(e, n, o, l, a), I(n, 'string') || V.pattern(e, n, o, l, a)
      }
      r(l)
    },
    cn = function (e, n, r, o, a) {
      var l = [],
        i = e.required || (!e.required && o.hasOwnProperty(e.field))
      if (i) {
        if (I(n, 'date') && !e.required) return r()
        if ((V.required(e, n, o, l, a), !I(n, 'date'))) {
          var c
          n instanceof Date ? (c = n) : (c = new Date(n)),
            V.type(e, c, o, l, a),
            c && V.range(e, c.getTime(), o, l, a)
        }
      }
      r(l)
    },
    dn = function (e, n, r, o, a) {
      var l = [],
        i = Array.isArray(n) ? 'array' : typeof n
      V.required(e, n, o, l, a, i), r(l)
    },
    xe = function (e, n, r, o, a) {
      var l = e.type,
        i = [],
        c = e.required || (!e.required && o.hasOwnProperty(e.field))
      if (c) {
        if (I(n, l) && !e.required) return r()
        V.required(e, n, o, i, a, l), I(n, l) || V.type(e, n, o, i, a)
      }
      r(i)
    },
    fn = function (e, n, r, o, a) {
      var l = [],
        i = e.required || (!e.required && o.hasOwnProperty(e.field))
      if (i) {
        if (I(n) && !e.required) return r()
        V.required(e, n, o, l, a)
      }
      r(l)
    },
    X = {
      string: Jt,
      method: Gt,
      number: Kt,
      boolean: Qt,
      regexp: en,
      integer: tn,
      float: nn,
      array: rn,
      object: on,
      enum: ln,
      pattern: sn,
      date: cn,
      url: xe,
      hex: xe,
      email: xe,
      required: dn,
      any: fn
    }
  function we() {
    return {
      default: 'Validation error on field %s',
      required: '%s is required',
      enum: '%s must be one of %s',
      whitespace: '%s cannot be empty',
      date: {
        format: '%s date %s is invalid for format %s',
        parse: '%s date could not be parsed, %s is invalid ',
        invalid: '%s date %s is invalid'
      },
      types: {
        string: '%s is not a %s',
        method: '%s is not a %s (function)',
        array: '%s is not an %s',
        object: '%s is not an %s',
        number: '%s is not a %s',
        date: '%s is not a %s',
        boolean: '%s is not a %s',
        integer: '%s is not an %s',
        float: '%s is not a %s',
        regexp: '%s is not a valid %s',
        email: '%s is not a valid %s',
        url: '%s is not a valid %s',
        hex: '%s is not a valid %s'
      },
      string: {
        len: '%s must be exactly %s characters',
        min: '%s must be at least %s characters',
        max: '%s cannot be longer than %s characters',
        range: '%s must be between %s and %s characters'
      },
      number: {
        len: '%s must equal %s',
        min: '%s cannot be less than %s',
        max: '%s cannot be greater than %s',
        range: '%s must be between %s and %s'
      },
      array: {
        len: '%s must be exactly %s in length',
        min: '%s cannot be less than %s in length',
        max: '%s cannot be greater than %s in length',
        range: '%s must be between %s and %s in length'
      },
      pattern: { mismatch: '%s value %s does not match pattern %s' },
      clone: function () {
        var e = JSON.parse(JSON.stringify(this))
        return (e.clone = this.clone), e
      }
    }
  }
  var Ne = we(),
    J = (function () {
      function t(n) {
        ;(this.rules = null), (this._messages = Ne), this.define(n)
      }
      var e = t.prototype
      return (
        (e.define = function (r) {
          var o = this
          if (!r) throw new Error('Cannot configure a schema with no rules')
          if (typeof r != 'object' || Array.isArray(r))
            throw new Error('Rules must be an object')
          ;(this.rules = {}),
            Object.keys(r).forEach(function (a) {
              var l = r[a]
              o.rules[a] = Array.isArray(l) ? l : [l]
            })
        }),
        (e.messages = function (r) {
          return r && (this._messages = Ue(we(), r)), this._messages
        }),
        (e.validate = function (r, o, a) {
          var l = this
          o === void 0 && (o = {}), a === void 0 && (a = function () {})
          var i = r,
            c = o,
            d = a
          if (
            (typeof c == 'function' && ((d = c), (c = {})),
            !this.rules || Object.keys(this.rules).length === 0)
          )
            return d && d(null, i), Promise.resolve(i)
          function f(u) {
            var m = [],
              g = {}
            function w(x) {
              if (Array.isArray(x)) {
                var N
                m = (N = m).concat.apply(N, x)
              } else m.push(x)
            }
            for (var v = 0; v < u.length; v++) w(u[v])
            m.length ? ((g = be(m)), d(m, g)) : d(null, i)
          }
          if (c.messages) {
            var p = this.messages()
            p === Ne && (p = we()), Ue(p, c.messages), (c.messages = p)
          } else c.messages = this.messages()
          var h = {},
            y = c.keys || Object.keys(this.rules)
          y.forEach(function (u) {
            var m = l.rules[u],
              g = i[u]
            m.forEach(function (w) {
              var v = w
              typeof v.transform == 'function' &&
                (i === r && (i = z({}, i)), (g = i[u] = v.transform(g))),
                typeof v == 'function'
                  ? (v = { validator: v })
                  : (v = z({}, v)),
                (v.validator = l.getValidationMethod(v)),
                v.validator &&
                  ((v.field = u),
                  (v.fullField = v.fullField || u),
                  (v.type = l.getType(v)),
                  (h[u] = h[u] || []),
                  h[u].push({ rule: v, value: g, source: i, field: u }))
            })
          })
          var b = {}
          return $t(
            h,
            c,
            function (u, m) {
              var g = u.rule,
                w =
                  (g.type === 'object' || g.type === 'array') &&
                  (typeof g.fields == 'object' ||
                    typeof g.defaultField == 'object')
              ;(w = w && (g.required || (!g.required && u.value))),
                (g.field = u.field)
              function v(P, C) {
                return z({}, C, {
                  fullField: g.fullField + '.' + P,
                  fullFields: g.fullFields ? [].concat(g.fullFields, [P]) : [P]
                })
              }
              function x(P) {
                P === void 0 && (P = [])
                var C = Array.isArray(P) ? P : [P]
                !c.suppressWarning &&
                  C.length &&
                  t.warning('async-validator:', C),
                  C.length && g.message !== void 0 && (C = [].concat(g.message))
                var O = C.map(We(g, i))
                if (c.first && O.length) return (b[g.field] = 1), m(O)
                if (!w) m(O)
                else {
                  if (g.required && !u.value)
                    return (
                      g.message !== void 0
                        ? (O = [].concat(g.message).map(We(g, i)))
                        : c.error &&
                          (O = [c.error(g, S(c.messages.required, g.field))]),
                      m(O)
                    )
                  var R = {}
                  g.defaultField &&
                    Object.keys(u.value).map(function (_) {
                      R[_] = g.defaultField
                    }),
                    (R = z({}, R, u.rule.fields))
                  var E = {}
                  Object.keys(R).forEach(function (_) {
                    var T = R[_],
                      te = Array.isArray(T) ? T : [T]
                    E[_] = te.map(v.bind(null, _))
                  })
                  var L = new t(E)
                  L.messages(c.messages),
                    u.rule.options &&
                      ((u.rule.options.messages = c.messages),
                      (u.rule.options.error = c.error)),
                    L.validate(u.value, u.rule.options || c, function (_) {
                      var T = []
                      O && O.length && T.push.apply(T, O),
                        _ && _.length && T.push.apply(T, _),
                        m(T.length ? T : null)
                    })
                }
              }
              var N
              if (g.asyncValidator)
                N = g.asyncValidator(g, u.value, x, u.source, c)
              else if (g.validator) {
                try {
                  N = g.validator(g, u.value, x, u.source, c)
                } catch (P) {
                  console.error == null || console.error(P),
                    c.suppressValidatorError ||
                      setTimeout(function () {
                        throw P
                      }, 0),
                    x(P.message)
                }
                N === !0
                  ? x()
                  : N === !1
                  ? x(
                      typeof g.message == 'function'
                        ? g.message(g.fullField || g.field)
                        : g.message || (g.fullField || g.field) + ' fails'
                    )
                  : N instanceof Array
                  ? x(N)
                  : N instanceof Error && x(N.message)
              }
              N &&
                N.then &&
                N.then(
                  function () {
                    return x()
                  },
                  function (P) {
                    return x(P)
                  }
                )
            },
            function (u) {
              f(u)
            },
            i
          )
        }),
        (e.getType = function (r) {
          if (
            (r.type === void 0 &&
              r.pattern instanceof RegExp &&
              (r.type = 'pattern'),
            typeof r.validator != 'function' &&
              r.type &&
              !X.hasOwnProperty(r.type))
          )
            throw new Error(S('Unknown rule type %s', r.type))
          return r.type || 'string'
        }),
        (e.getValidationMethod = function (r) {
          if (typeof r.validator == 'function') return r.validator
          var o = Object.keys(r),
            a = o.indexOf('message')
          return (
            a !== -1 && o.splice(a, 1),
            o.length === 1 && o[0] === 'required'
              ? X.required
              : X[this.getType(r)] || void 0
          )
        }),
        t
      )
    })()
  ;(J.register = function (e, n) {
    if (typeof n != 'function')
      throw new Error(
        'Cannot register a validator by type, validator is not a function'
      )
    X[e] = n
  }),
    (J.warning = ze),
    (J.messages = Ne),
    (J.validators = X)
  const Je = s.defineComponent({
      name: 'ZFormItem',
      props: Rt,
      setup(t, { slots: e }) {
        const n = s.inject('LABEL_DATA'),
          r = s.computed(() => ({
            's-form__item': !0,
            's-form__item--horizontal': n.value.layout === 'horizontal',
            's-form__item--vertical': n.value.layout === 'vertical'
          })),
          o = s.computed(() => ({
            's-form__label': !0,
            's-form__item--vertical': n.value.layout === 'vertical',
            [`s-form__label--${n.value.labelAlign}`]:
              n.value.layout === 'horizontal',
            [`s-form__label--${n.value.labelSize}`]:
              n.value.layout === 'horizontal'
          })),
          a = s.inject(Be),
          l = s.ref(!1),
          i = s.ref(''),
          d = {
            validate: () => {
              if (!a)
                return (
                  console.warn('请在Form中使用FormItem'),
                  Promise.reject('请在Form中使用FormItem')
                )
              if (!t.prop)
                return (
                  console.warn('如果要校验当前项,请设置prop字段'),
                  Promise.reject('如果要校验当前项,请设置prop字段')
                )
              if (!a.rules) return Promise.resolve({ result: !0 })
              const f = a.rules[t.prop] || void 0
              if (!f) return Promise.resolve({ result: !0 })
              const p = a.model[t.prop]
              return new J({ [t.prop]: f }).validate({ [t.prop]: p }, y => {
                y
                  ? ((l.value = !0), (i.value = y[0].message || '校验错误'))
                  : ((l.value = !1), (i.value = ''))
              })
            }
          }
        return (
          s.provide('FORM_ITEM_CTX', d),
          s.onMounted(() => {
            t.prop && (a == null || a.addItem(d))
          }),
          s.onUnmounted(() => {
            t.prop && (a == null || a.removeItem(d))
          }),
          () => {
            var f
            return s.createVNode('div', { class: r.value }, [
              s.createVNode('span', { class: o.value }, [t.label]),
              s.createVNode('div', null, [
                (f = e.default) == null ? void 0 : f.call(e)
              ]),
              l.value &&
                s.createVNode('div', { class: 'error-message' }, [i.value])
            ])
          }
        )
      }
    }),
    un = {
      install(t) {
        t.component(he.name, he), t.component(Je.name, Je)
      }
    },
    pn = {
      modelValue: { type: String, default: '' },
      type: { type: String, default: 'text' }
    },
    er = '',
    tr = '',
    Ve = s.defineComponent({
      name: 'ZInput',
      props: pn,
      emits: ['update:modelValue'],
      setup(t, { emit: e }) {
        const n = s.inject('FORM_ITEM_CTX'),
          r = o => {
            const a = o.target.value
            e('update:modelValue', a), n.validate()
          }
        return () =>
          s.createVNode('div', { class: 's-input' }, [
            s.createVNode(
              'input',
              {
                class: 's-input__input',
                value: t.modelValue,
                onInput: r,
                type: t.type
              },
              null
            )
          ])
      }
    }),
    gn = {
      install(t) {
        t.component(Ve.name, Ve)
      }
    },
    mn = {
      modelValue: { type: Boolean, default: !1 },
      title: { type: String, default: '' },
      showClose: { type: Boolean, default: !0 },
      width: { type: String, default: '30%' },
      center: { type: Boolean, default: !1 },
      alignCenter: { type: Boolean, default: !1 },
      backgroundColor: { type: String, default: '' },
      top: { type: [String, Number], default: '15vh' }
    },
    hn = { modelValue: { type: Boolean, default: !1 } },
    nr = '',
    yn = s.defineComponent({
      name: 'ZBaseModal',
      props: hn,
      emits: ['update:modelValue'],
      setup(t, { emit: e, slots: n }) {
        const { modelValue: r } = s.toRefs(t)
        return () => {
          var o
          return s.createVNode('div', null, [
            r.value &&
              s.createVNode('div', { class: 's-base-modal' }, [
                s.createVNode(
                  'div',
                  {
                    class: 's-base-modal__mask',
                    onClick: () => {
                      e('update:modelValue', !1)
                    }
                  },
                  null
                ),
                (o = n.default) == null ? void 0 : o.call(n)
              ])
          ])
        }
      }
    }),
    rr = '',
    Pe = s.defineComponent({
      name: 'ZModal',
      props: mn,
      emits: ['update:modelValue'],
      setup(t, { slots: e, emit: n }) {
        const {
            modelValue: r,
            title: o,
            showClose: a,
            width: l,
            center: i,
            alignCenter: c,
            backgroundColor: d,
            top: f
          } = s.toRefs(t),
          p = c.value
            ? { marginTop: 0, top: '50%', transform: 'translateY(-50%)' }
            : null,
          h = s.computed(() =>
            typeof f.value == 'number' ? `${f.value}px` : f.value
          )
        return () =>
          s.createVNode(
            yn,
            {
              class: 's-modal',
              modelValue: r.value,
              'onUpdate:modelValue': () => {
                n('update:modelValue')
              }
            },
            {
              default: () => {
                var y, b, u
                return [
                  s.createVNode(
                    'div',
                    {
                      class: 's-modal__container',
                      style: {
                        width: l.value,
                        backgroundColor: d.value,
                        marginTop: h.value,
                        ...p
                      }
                    },
                    [
                      e.header
                        ? (y = e.header) == null
                          ? void 0
                          : y.call(e, {
                              close: () => {
                                n('update:modelValue', !1)
                              }
                            })
                        : s.createVNode(
                            'div',
                            {
                              class: 's-modal__header',
                              style: { textAlign: i.value ? 'center' : 'left' }
                            },
                            [
                              o.value,
                              a.value &&
                                s.createVNode(
                                  'svg',
                                  {
                                    onClick: () => {
                                      n('update:modelValue', !1)
                                    },
                                    class: 's-modal__close',
                                    viewBox: '0 0 1024 1024',
                                    width: '24',
                                    xmlns: 'http://www.w3.org/2000/svg'
                                  },
                                  [
                                    s.createVNode(
                                      'path',
                                      {
                                        fill: 'currentColor',
                                        d: 'M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z'
                                      },
                                      null
                                    )
                                  ]
                                )
                            ]
                          ),
                      s.createVNode('div', { class: 's-modal__body' }, [
                        (b = e.default) == null ? void 0 : b.call(e)
                      ]),
                      s.createVNode('div', { class: 's-modal__footer' }, [
                        (u = e.footer) == null ? void 0 : u.call(e)
                      ])
                    ]
                  )
                ]
              }
            }
          )
      }
    }),
    vn = {
      install(t) {
        t.component(Pe.name, Pe)
      }
    },
    bn = {
      name: { type: String, default: '' },
      prefix: { type: String, default: 'icon' },
      size: { type: [String, Number], default: 'inherit' },
      color: { type: String, default: 'inherit' },
      component: { type: String, default: null }
    },
    Te = s.defineComponent({
      name: 'ZIcon',
      props: bn,
      setup(t, { attrs: e }) {
        const n = s.computed(() =>
            typeof t.size == 'number' ? `${t.size}px` : t.size
          ),
          r = s.createVNode(
            'img',
            s.mergeProps(
              {
                src: t.name,
                alt: '',
                style: { width: n.value, verticalAlign: 'middle' }
              },
              e
            ),
            null
          ),
          o = s.createVNode(
            'span',
            s.mergeProps(
              {
                class: [t.prefix, t.prefix + '-' + t.name],
                style: { fontSize: n.value, color: t.color }
              },
              e
            ),
            null
          ),
          a = s.createVNode(
            'svg',
            { class: 'icon', style: { width: n.value, height: n.value } },
            [
              s.createVNode(
                'use',
                { 'xlink:href': `#${t.prefix}-${t.component}`, fill: t.color },
                null
              )
            ]
          ),
          l = t.component ? a : /http|https/.test(t.name) ? r : o
        return () => l
      }
    }),
    xn = t => {
      const e = t.size
          ? typeof t.size == 'number'
            ? `${t.size}px`
            : t.size
          : void 0,
        n = t.color ? t.color : 'black'
      return s.createVNode(
        'svg',
        {
          viewBox: '0 0 48 48',
          xmlns: 'http://www.w3.org/2000/svg',
          class: 'icon icon-arrow-down',
          style: { width: e, height: e, fill: n, stroke: n }
        },
        [
          s.createVNode(
            'path',
            { d: 'm11.27 27.728 12.727 12.728 12.728-12.728M24 5v34.295' },
            null
          )
        ]
      )
    },
    wn = {
      install(t) {
        t.component(Te.name, Te), t.component('ArrowDownIcon', xn)
      }
    },
    Nn = {
      modelValue: { type: String, default: '' },
      closable: { type: Boolean, default: !1 },
      addable: { type: Boolean, default: !1 }
    },
    or = '',
    Ee = s.defineComponent({
      name: 'ZTabs',
      props: Nn,
      emits: ['update:modelValue'],
      setup(t, { slots: e }) {
        const n = s.ref([])
        s.provide('tabs-data', n)
        const r = s.ref(t.modelValue)
        s.provide('active-tab', r)
        const o = i => {
            r.value = i
          },
          a = (i, c) => {
            if (n.value.length > 1) {
              const d = n.value.findIndex(f => f.id === c)
              n.value.splice(d, 1),
                i.stopPropagation(),
                n.value.length === d ? o(n.value[d - 1].id) : o(n.value[d].id)
            } else alert('不能删除最后一个标签页')
          },
          l = () => {
            const i = De()
            n.value.push({
              id: i,
              type: 'random',
              title: `Tab${i}`,
              content: `Tab${i} Content`
            }),
              (r.value = i)
          }
        return () => {
          var i
          return s.createVNode('div', { class: 's-tabs' }, [
            s.createVNode('ul', { class: 's-tabs__nav' }, [
              n.value.map(c =>
                s.createVNode(
                  'li',
                  {
                    onClick: () => o(c.id),
                    class: c.id === r.value ? 'active' : ''
                  },
                  [
                    c.title,
                    t.closable &&
                      s.createVNode(
                        'svg',
                        {
                          onClick: d => a(d, c.id),
                          style: 'margin-left: 8px;',
                          viewBox: '0 0 1024 1024',
                          width: '12',
                          height: '12'
                        },
                        [
                          s.createVNode(
                            'path',
                            {
                              d: 'M610.461538 500.184615l256-257.96923c11.815385-11.815385 11.815385-29.538462 0-41.353847l-39.384615-41.353846c-11.815385-11.815385-29.538462-11.815385-41.353846 0L527.753846 417.476923c-7.876923 7.876923-19.692308 7.876923-27.569231 0L242.215385 157.538462c-11.815385-11.815385-29.538462-11.815385-41.353847 0l-41.353846 41.353846c-11.815385 11.815385-11.815385 29.538462 0 41.353846l257.969231 257.969231c7.876923 7.876923 7.876923 19.692308 0 27.56923L157.538462 785.723077c-11.815385 11.815385-11.815385 29.538462 0 41.353846l41.353846 41.353846c11.815385 11.815385 29.538462 11.815385 41.353846 0L498.215385 610.461538c7.876923-7.876923 19.692308-7.876923 27.56923 0l257.969231 257.969231c11.815385 11.815385 29.538462 11.815385 41.353846 0L866.461538 827.076923c11.815385-11.815385 11.815385-29.538462 0-41.353846L610.461538 527.753846c-7.876923-7.876923-7.876923-19.692308 0-27.569231z'
                            },
                            null
                          )
                        ]
                      )
                  ]
                )
              ),
              t.addable &&
                s.createVNode('li', null, [
                  s.createVNode(
                    'svg',
                    {
                      onClick: l,
                      viewBox: '0 0 1024 1024',
                      width: '14',
                      height: '14'
                    },
                    [
                      s.createVNode(
                        'path',
                        {
                          d: 'M590.769231 571.076923h324.923077c15.753846 0 29.538462-13.784615 29.538461-29.538461v-59.076924c0-15.753846-13.784615-29.538462-29.538461-29.538461H590.769231c-11.815385 0-19.692308-7.876923-19.692308-19.692308V108.307692c0-15.753846-13.784615-29.538462-29.538461-29.538461h-59.076924c-15.753846 0-29.538462 13.784615-29.538461 29.538461V433.230769c0 11.815385-7.876923 19.692308-19.692308 19.692308H108.307692c-15.753846 0-29.538462 13.784615-29.538461 29.538461v59.076924c0 15.753846 13.784615 29.538462 29.538461 29.538461H433.230769c11.815385 0 19.692308 7.876923 19.692308 19.692308v324.923077c0 15.753846 13.784615 29.538462 29.538461 29.538461h59.076924c15.753846 0 29.538462-13.784615 29.538461-29.538461V590.769231c0-11.815385 7.876923-19.692308 19.692308-19.692308z'
                        },
                        null
                      )
                    ]
                  )
                ])
            ]),
            (i = e.default) == null ? void 0 : i.call(e),
            n.value
              .filter(c => c.type === 'random')
              .map(c =>
                s.createVNode('div', { class: 's-tab' }, [
                  c.id === r.value && c.content
                ])
              )
          ])
        }
      }
    }),
    Vn = {
      id: { type: String, required: !0 },
      title: { type: String, required: !0 }
    },
    ar = '',
    Oe = s.defineComponent({
      name: 'ZTab',
      props: Vn,
      emits: ['update:modelValue'],
      setup(t, { slots: e }) {
        const n = s.inject('active-tab')
        return (
          s.inject('tabs-data').value.push({ id: t.id, title: t.title }),
          () => {
            var o
            return s.createVNode(s.Fragment, null, [
              t.id === n.value &&
                s.createVNode('div', { class: 's-tab' }, [
                  (o = e.default) == null ? void 0 : o.call(e)
                ])
            ])
          }
        )
      }
    }),
    Pn = {
      install(t) {
        t.component(Ee.name, Ee), t.component(Oe.name, Oe)
      }
    },
    Tn = {
      modelValue: { type: Boolean, default: !1 },
      host: { type: Object, default: () => null },
      title: { type: String, default: '' },
      showArrow: { type: Boolean, default: !1 },
      placement: { type: String, default: 'bottom' }
    },
    En = {
      modelValue: { type: Boolean, default: !1 },
      host: { type: Object, default: () => null },
      showArrow: { type: Boolean, default: !1 },
      placement: { type: String, default: 'bottom' }
    }
  function k(t) {
    return t.split('-')[1]
  }
  function Ce(t) {
    return t === 'y' ? 'height' : 'width'
  }
  function G(t) {
    return t.split('-')[0]
  }
  function oe(t) {
    return ['top', 'bottom'].includes(G(t)) ? 'x' : 'y'
  }
  function Ge(t, e, n) {
    let { reference: r, floating: o } = t
    const a = r.x + r.width / 2 - o.width / 2,
      l = r.y + r.height / 2 - o.height / 2,
      i = oe(e),
      c = Ce(i),
      d = r[c] / 2 - o[c] / 2,
      f = i === 'x'
    let p
    switch (G(e)) {
      case 'top':
        p = { x: a, y: r.y - o.height }
        break
      case 'bottom':
        p = { x: a, y: r.y + r.height }
        break
      case 'right':
        p = { x: r.x + r.width, y: l }
        break
      case 'left':
        p = { x: r.x - o.width, y: l }
        break
      default:
        p = { x: r.x, y: r.y }
    }
    switch (k(e)) {
      case 'start':
        p[i] -= d * (n && f ? -1 : 1)
        break
      case 'end':
        p[i] += d * (n && f ? -1 : 1)
    }
    return p
  }
  const On = async (t, e, n) => {
    const {
        placement: r = 'bottom',
        strategy: o = 'absolute',
        middleware: a = [],
        platform: l
      } = n,
      i = a.filter(Boolean),
      c = await (l.isRTL == null ? void 0 : l.isRTL(e))
    let d = await l.getElementRects({ reference: t, floating: e, strategy: o }),
      { x: f, y: p } = Ge(d, r, c),
      h = r,
      y = {},
      b = 0
    for (let u = 0; u < i.length; u++) {
      const { name: m, fn: g } = i[u],
        {
          x: w,
          y: v,
          data: x,
          reset: N
        } = await g({
          x: f,
          y: p,
          initialPlacement: r,
          placement: h,
          strategy: o,
          middlewareData: y,
          rects: d,
          platform: l,
          elements: { reference: t, floating: e }
        })
      ;(f = w ?? f),
        (p = v ?? p),
        (y = { ...y, [m]: { ...y[m], ...x } }),
        N &&
          b <= 50 &&
          (b++,
          typeof N == 'object' &&
            (N.placement && (h = N.placement),
            N.rects &&
              (d =
                N.rects === !0
                  ? await l.getElementRects({
                      reference: t,
                      floating: e,
                      strategy: o
                    })
                  : N.rects),
            ({ x: f, y: p } = Ge(d, h, c))),
          (u = -1))
    }
    return { x: f, y: p, placement: h, strategy: o, middlewareData: y }
  }
  function ae(t, e) {
    return typeof t == 'function' ? t(e) : t
  }
  function Ke(t) {
    return typeof t != 'number'
      ? (function (e) {
          return { top: 0, right: 0, bottom: 0, left: 0, ...e }
        })(t)
      : { top: t, right: t, bottom: t, left: t }
  }
  function ie(t) {
    return {
      ...t,
      top: t.y,
      left: t.x,
      right: t.x + t.width,
      bottom: t.y + t.height
    }
  }
  async function Cn(t, e) {
    var n
    e === void 0 && (e = {})
    const { x: r, y: o, platform: a, rects: l, elements: i, strategy: c } = t,
      {
        boundary: d = 'clippingAncestors',
        rootBoundary: f = 'viewport',
        elementContext: p = 'floating',
        altBoundary: h = !1,
        padding: y = 0
      } = ae(e, t),
      b = Ke(y),
      u = i[h ? (p === 'floating' ? 'reference' : 'floating') : p],
      m = ie(
        await a.getClippingRect({
          element:
            (n = await (a.isElement == null ? void 0 : a.isElement(u))) ==
              null || n
              ? u
              : u.contextElement ||
                (await (a.getDocumentElement == null
                  ? void 0
                  : a.getDocumentElement(i.floating))),
          boundary: d,
          rootBoundary: f,
          strategy: c
        })
      ),
      g = p === 'floating' ? { ...l.floating, x: r, y: o } : l.reference,
      w = await (a.getOffsetParent == null
        ? void 0
        : a.getOffsetParent(i.floating)),
      v = ((await (a.isElement == null ? void 0 : a.isElement(w))) &&
        (await (a.getScale == null ? void 0 : a.getScale(w)))) || {
        x: 1,
        y: 1
      },
      x = ie(
        a.convertOffsetParentRelativeRectToViewportRelativeRect
          ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
              rect: g,
              offsetParent: w,
              strategy: c
            })
          : g
      )
    return {
      top: (m.top - x.top + b.top) / v.y,
      bottom: (x.bottom - m.bottom + b.bottom) / v.y,
      left: (m.left - x.left + b.left) / v.x,
      right: (x.right - m.right + b.right) / v.x
    }
  }
  const Fe = Math.min,
    Fn = Math.max
  function In(t, e, n) {
    return Fn(t, Fe(e, n))
  }
  const _n = t => ({
      name: 'arrow',
      options: t,
      async fn(e) {
        const {
            x: n,
            y: r,
            placement: o,
            rects: a,
            platform: l,
            elements: i
          } = e,
          { element: c, padding: d = 0 } = ae(t, e) || {}
        if (c == null) return {}
        const f = Ke(d),
          p = { x: n, y: r },
          h = oe(o),
          y = Ce(h),
          b = await l.getDimensions(c),
          u = h === 'y',
          m = u ? 'top' : 'left',
          g = u ? 'bottom' : 'right',
          w = u ? 'clientHeight' : 'clientWidth',
          v = a.reference[y] + a.reference[h] - p[h] - a.floating[y],
          x = p[h] - a.reference[h],
          N = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(c))
        let P = N ? N[w] : 0
        ;(P && (await (l.isElement == null ? void 0 : l.isElement(N)))) ||
          (P = i.floating[w] || a.floating[y])
        const C = v / 2 - x / 2,
          O = P / 2 - b[y] / 2 - 1,
          R = Fe(f[m], O),
          E = Fe(f[g], O),
          L = R,
          _ = P - b[y] - E,
          T = P / 2 - b[y] / 2 + C,
          te = In(L, T, _),
          gt =
            k(o) != null &&
            T != te &&
            a.reference[y] / 2 - (T < L ? R : E) - b[y] / 2 < 0
              ? T < L
                ? L - T
                : _ - T
              : 0
        return { [h]: p[h] - gt, data: { [h]: te, centerOffset: T - te + gt } }
      }
    }),
    Ln = ['top', 'right', 'bottom', 'left'],
    Qe = Ln.reduce((t, e) => t.concat(e, e + '-start', e + '-end'), []),
    Rn = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' }
  function et(t) {
    return t.replace(/left|right|bottom|top/g, e => Rn[e])
  }
  function Sn(t, e, n) {
    n === void 0 && (n = !1)
    const r = k(t),
      o = oe(t),
      a = Ce(o)
    let l =
      o === 'x'
        ? r === (n ? 'end' : 'start')
          ? 'right'
          : 'left'
        : r === 'start'
        ? 'bottom'
        : 'top'
    return (
      e.reference[a] > e.floating[a] && (l = et(l)), { main: l, cross: et(l) }
    )
  }
  const qn = { start: 'end', end: 'start' }
  function Dn(t) {
    return t.replace(/start|end/g, e => qn[e])
  }
  const An = function (t) {
      return (
        t === void 0 && (t = {}),
        {
          name: 'autoPlacement',
          options: t,
          async fn(e) {
            var n, r, o
            const {
                rects: a,
                middlewareData: l,
                placement: i,
                platform: c,
                elements: d
              } = e,
              {
                crossAxis: f = !1,
                alignment: p,
                allowedPlacements: h = Qe,
                autoAlignment: y = !0,
                ...b
              } = ae(t, e),
              u =
                p !== void 0 || h === Qe
                  ? (function (E, L, _) {
                      return (
                        E
                          ? [
                              ..._.filter(T => k(T) === E),
                              ..._.filter(T => k(T) !== E)
                            ]
                          : _.filter(T => G(T) === T)
                      ).filter(T => !E || k(T) === E || (!!L && Dn(T) !== T))
                    })(p || null, y, h)
                  : h,
              m = await Cn(e, b),
              g = ((n = l.autoPlacement) == null ? void 0 : n.index) || 0,
              w = u[g]
            if (w == null) return {}
            const { main: v, cross: x } = Sn(
              w,
              a,
              await (c.isRTL == null ? void 0 : c.isRTL(d.floating))
            )
            if (i !== w) return { reset: { placement: u[0] } }
            const N = [m[G(w)], m[v], m[x]],
              P = [
                ...(((r = l.autoPlacement) == null ? void 0 : r.overflows) ||
                  []),
                { placement: w, overflows: N }
              ],
              C = u[g + 1]
            if (C)
              return {
                data: { index: g + 1, overflows: P },
                reset: { placement: C }
              }
            const O = P.map(E => {
                const L = k(E.placement)
                return [
                  E.placement,
                  L && f
                    ? E.overflows.slice(0, 2).reduce((_, T) => _ + T, 0)
                    : E.overflows[0],
                  E.overflows
                ]
              }).sort((E, L) => E[1] - L[1]),
              R =
                ((o = O.filter(E =>
                  E[2].slice(0, k(E[0]) ? 2 : 3).every(L => L <= 0)
                )[0]) == null
                  ? void 0
                  : o[0]) || O[0][0]
            return R !== i
              ? {
                  data: { index: g + 1, overflows: P },
                  reset: { placement: R }
                }
              : {}
          }
        }
      )
    },
    kn = function (t) {
      return (
        t === void 0 && (t = 0),
        {
          name: 'offset',
          options: t,
          async fn(e) {
            const { x: n, y: r } = e,
              o = await (async function (a, l) {
                const { placement: i, platform: c, elements: d } = a,
                  f = await (c.isRTL == null ? void 0 : c.isRTL(d.floating)),
                  p = G(i),
                  h = k(i),
                  y = oe(i) === 'x',
                  b = ['left', 'top'].includes(p) ? -1 : 1,
                  u = f && y ? -1 : 1,
                  m = ae(l, a)
                let {
                  mainAxis: g,
                  crossAxis: w,
                  alignmentAxis: v
                } = typeof m == 'number'
                  ? { mainAxis: m, crossAxis: 0, alignmentAxis: null }
                  : { mainAxis: 0, crossAxis: 0, alignmentAxis: null, ...m }
                return (
                  h && typeof v == 'number' && (w = h === 'end' ? -1 * v : v),
                  y ? { x: w * u, y: g * b } : { x: g * b, y: w * u }
                )
              })(e, t)
            return { x: n + o.x, y: r + o.y, data: o }
          }
        }
      )
    }
  function q(t) {
    var e
    return (
      (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) ||
      window
    )
  }
  function A(t) {
    return q(t).getComputedStyle(t)
  }
  function tt(t) {
    return t instanceof q(t).Node
  }
  function j(t) {
    return tt(t) ? (t.nodeName || '').toLowerCase() : '#document'
  }
  function D(t) {
    return t instanceof HTMLElement || t instanceof q(t).HTMLElement
  }
  function nt(t) {
    return (
      typeof ShadowRoot < 'u' &&
      (t instanceof q(t).ShadowRoot || t instanceof ShadowRoot)
    )
  }
  function K(t) {
    const { overflow: e, overflowX: n, overflowY: r, display: o } = A(t)
    return (
      /auto|scroll|overlay|hidden|clip/.test(e + r + n) &&
      !['inline', 'contents'].includes(o)
    )
  }
  function Mn(t) {
    return ['table', 'td', 'th'].includes(j(t))
  }
  function Ie(t) {
    const e = _e(),
      n = A(t)
    return (
      n.transform !== 'none' ||
      n.perspective !== 'none' ||
      (!!n.containerType && n.containerType !== 'normal') ||
      (!e && !!n.backdropFilter && n.backdropFilter !== 'none') ||
      (!e && !!n.filter && n.filter !== 'none') ||
      ['transform', 'perspective', 'filter'].some(r =>
        (n.willChange || '').includes(r)
      ) ||
      ['paint', 'layout', 'strict', 'content'].some(r =>
        (n.contain || '').includes(r)
      )
    )
  }
  function _e() {
    return (
      !(typeof CSS > 'u' || !CSS.supports) &&
      CSS.supports('-webkit-backdrop-filter', 'none')
    )
  }
  function le(t) {
    return ['html', 'body', '#document'].includes(j(t))
  }
  const rt = Math.min,
    Q = Math.max,
    se = Math.round,
    $ = t => ({ x: t, y: t })
  function ot(t) {
    const e = A(t)
    let n = parseFloat(e.width) || 0,
      r = parseFloat(e.height) || 0
    const o = D(t),
      a = o ? t.offsetWidth : n,
      l = o ? t.offsetHeight : r,
      i = se(n) !== a || se(r) !== l
    return i && ((n = a), (r = l)), { width: n, height: r, $: i }
  }
  function M(t) {
    return t instanceof Element || t instanceof q(t).Element
  }
  function at(t) {
    return M(t) ? t : t.contextElement
  }
  function Z(t) {
    const e = at(t)
    if (!D(e)) return $(1)
    const n = e.getBoundingClientRect(),
      { width: r, height: o, $: a } = ot(e)
    let l = (a ? se(n.width) : n.width) / r,
      i = (a ? se(n.height) : n.height) / o
    return (
      (l && Number.isFinite(l)) || (l = 1),
      (i && Number.isFinite(i)) || (i = 1),
      { x: l, y: i }
    )
  }
  const jn = $(0)
  function it(t) {
    const e = q(t)
    return _e() && e.visualViewport
      ? { x: e.visualViewport.offsetLeft, y: e.visualViewport.offsetTop }
      : jn
  }
  function ee(t, e, n, r) {
    e === void 0 && (e = !1), n === void 0 && (n = !1)
    const o = t.getBoundingClientRect(),
      a = at(t)
    let l = $(1)
    e && (r ? M(r) && (l = Z(r)) : (l = Z(t)))
    const i = (function (h, y, b) {
      return y === void 0 && (y = !1), !(!b || (y && b !== q(h))) && y
    })(a, n, r)
      ? it(a)
      : $(0)
    let c = (o.left + i.x) / l.x,
      d = (o.top + i.y) / l.y,
      f = o.width / l.x,
      p = o.height / l.y
    if (a) {
      const h = q(a),
        y = r && M(r) ? q(r) : r
      let b = h.frameElement
      for (; b && r && y !== h; ) {
        const u = Z(b),
          m = b.getBoundingClientRect(),
          g = getComputedStyle(b),
          w = m.left + (b.clientLeft + parseFloat(g.paddingLeft)) * u.x,
          v = m.top + (b.clientTop + parseFloat(g.paddingTop)) * u.y
        ;(c *= u.x),
          (d *= u.y),
          (f *= u.x),
          (p *= u.y),
          (c += w),
          (d += v),
          (b = q(b).frameElement)
      }
    }
    return ie({ width: f, height: p, x: c, y: d })
  }
  function ce(t) {
    return M(t)
      ? { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop }
      : { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset }
  }
  function B(t) {
    var e
    return (e = (tt(t) ? t.ownerDocument : t.document) || window.document) ==
      null
      ? void 0
      : e.documentElement
  }
  function lt(t) {
    return ee(B(t)).left + ce(t).scrollLeft
  }
  function W(t) {
    if (j(t) === 'html') return t
    const e = t.assignedSlot || t.parentNode || (nt(t) && t.host) || B(t)
    return nt(e) ? e.host : e
  }
  function st(t) {
    const e = W(t)
    return le(e)
      ? t.ownerDocument
        ? t.ownerDocument.body
        : t.body
      : D(e) && K(e)
      ? e
      : st(e)
  }
  function ct(t, e) {
    var n
    e === void 0 && (e = [])
    const r = st(t),
      o = r === ((n = t.ownerDocument) == null ? void 0 : n.body),
      a = q(r)
    return o
      ? e.concat(a, a.visualViewport || [], K(r) ? r : [])
      : e.concat(r, ct(r))
  }
  function dt(t, e, n) {
    let r
    if (e === 'viewport')
      r = (function (o, a) {
        const l = q(o),
          i = B(o),
          c = l.visualViewport
        let d = i.clientWidth,
          f = i.clientHeight,
          p = 0,
          h = 0
        if (c) {
          ;(d = c.width), (f = c.height)
          const y = _e()
          ;(!y || (y && a === 'fixed')) &&
            ((p = c.offsetLeft), (h = c.offsetTop))
        }
        return { width: d, height: f, x: p, y: h }
      })(t, n)
    else if (e === 'document')
      r = (function (o) {
        const a = B(o),
          l = ce(o),
          i = o.ownerDocument.body,
          c = Q(a.scrollWidth, a.clientWidth, i.scrollWidth, i.clientWidth),
          d = Q(a.scrollHeight, a.clientHeight, i.scrollHeight, i.clientHeight)
        let f = -l.scrollLeft + lt(o)
        const p = -l.scrollTop
        return (
          A(i).direction === 'rtl' &&
            (f += Q(a.clientWidth, i.clientWidth) - c),
          { width: c, height: d, x: f, y: p }
        )
      })(B(t))
    else if (M(e))
      r = (function (o, a) {
        const l = ee(o, !0, a === 'fixed'),
          i = l.top + o.clientTop,
          c = l.left + o.clientLeft,
          d = D(o) ? Z(o) : $(1)
        return {
          width: o.clientWidth * d.x,
          height: o.clientHeight * d.y,
          x: c * d.x,
          y: i * d.y
        }
      })(e, n)
    else {
      const o = it(t)
      r = { ...e, x: e.x - o.x, y: e.y - o.y }
    }
    return ie(r)
  }
  function ft(t, e) {
    const n = W(t)
    return (
      !(n === e || !M(n) || le(n)) && (A(n).position === 'fixed' || ft(n, e))
    )
  }
  function $n(t, e, n) {
    const r = D(e),
      o = B(e),
      a = n === 'fixed',
      l = ee(t, !0, a, e)
    let i = { scrollLeft: 0, scrollTop: 0 }
    const c = $(0)
    if (r || (!r && !a))
      if (((j(e) !== 'body' || K(o)) && (i = ce(e)), D(e))) {
        const d = ee(e, !0, a, e)
        ;(c.x = d.x + e.clientLeft), (c.y = d.y + e.clientTop)
      } else o && (c.x = lt(o))
    return {
      x: l.left + i.scrollLeft - c.x,
      y: l.top + i.scrollTop - c.y,
      width: l.width,
      height: l.height
    }
  }
  function ut(t, e) {
    return D(t) && A(t).position !== 'fixed'
      ? e
        ? e(t)
        : t.offsetParent
      : null
  }
  function pt(t, e) {
    const n = q(t)
    if (!D(t)) return n
    let r = ut(t, e)
    for (; r && Mn(r) && A(r).position === 'static'; ) r = ut(r, e)
    return r &&
      (j(r) === 'html' ||
        (j(r) === 'body' && A(r).position === 'static' && !Ie(r)))
      ? n
      : r ||
          (function (o) {
            let a = W(o)
            for (; D(a) && !le(a); ) {
              if (Ie(a)) return a
              a = W(a)
            }
            return null
          })(t) ||
          n
  }
  const Bn = {
      convertOffsetParentRelativeRectToViewportRelativeRect: function (t) {
        let { rect: e, offsetParent: n, strategy: r } = t
        const o = D(n),
          a = B(n)
        if (n === a) return e
        let l = { scrollLeft: 0, scrollTop: 0 },
          i = $(1)
        const c = $(0)
        if (
          (o || (!o && r !== 'fixed')) &&
          ((j(n) !== 'body' || K(a)) && (l = ce(n)), D(n))
        ) {
          const d = ee(n)
          ;(i = Z(n)), (c.x = d.x + n.clientLeft), (c.y = d.y + n.clientTop)
        }
        return {
          width: e.width * i.x,
          height: e.height * i.y,
          x: e.x * i.x - l.scrollLeft * i.x + c.x,
          y: e.y * i.y - l.scrollTop * i.y + c.y
        }
      },
      getDocumentElement: B,
      getClippingRect: function (t) {
        let { element: e, boundary: n, rootBoundary: r, strategy: o } = t
        const a = [
            ...(n === 'clippingAncestors'
              ? (function (c, d) {
                  const f = d.get(c)
                  if (f) return f
                  let p = ct(c).filter(u => M(u) && j(u) !== 'body'),
                    h = null
                  const y = A(c).position === 'fixed'
                  let b = y ? W(c) : c
                  for (; M(b) && !le(b); ) {
                    const u = A(b),
                      m = Ie(b)
                    m || u.position !== 'fixed' || (h = null),
                      (
                        y
                          ? !m && !h
                          : (!m &&
                              u.position === 'static' &&
                              h &&
                              ['absolute', 'fixed'].includes(h.position)) ||
                            (K(b) && !m && ft(c, b))
                      )
                        ? (p = p.filter(g => g !== b))
                        : (h = u),
                      (b = W(b))
                  }
                  return d.set(c, p), p
                })(e, this._c)
              : [].concat(n)),
            r
          ],
          l = a[0],
          i = a.reduce(
            (c, d) => {
              const f = dt(e, d, o)
              return (
                (c.top = Q(f.top, c.top)),
                (c.right = rt(f.right, c.right)),
                (c.bottom = rt(f.bottom, c.bottom)),
                (c.left = Q(f.left, c.left)),
                c
              )
            },
            dt(e, l, o)
          )
        return {
          width: i.right - i.left,
          height: i.bottom - i.top,
          x: i.left,
          y: i.top
        }
      },
      getOffsetParent: pt,
      getElementRects: async function (t) {
        let { reference: e, floating: n, strategy: r } = t
        const o = this.getOffsetParent || pt,
          a = this.getDimensions
        return {
          reference: $n(e, await o(n), r),
          floating: { x: 0, y: 0, ...(await a(n)) }
        }
      },
      getClientRects: function (t) {
        return Array.from(t.getClientRects())
      },
      getDimensions: function (t) {
        return ot(t)
      },
      getScale: Z,
      isElement: M,
      isRTL: function (t) {
        return getComputedStyle(t).direction === 'rtl'
      }
    },
    zn = (t, e, n) => {
      const r = new Map(),
        o = { platform: Bn, ...n },
        a = { ...o.platform, _c: r }
      return On(t, e, { ...o, platform: a })
    },
    ir = '',
    Hn = s.defineComponent({
      name: 'ZBasePopover',
      props: En,
      emits: ['update:modelValue'],
      setup(t, { slots: e, attrs: n }) {
        const {
            host: r,
            modelValue: o,
            showArrow: a,
            placement: l
          } = s.toRefs(t),
          i = s.ref(),
          c = s.ref(),
          d = () => {
            const p = []
            a.value && (p.push(kn(8)), p.push(_n({ element: i.value }))),
              l.value || p.push(An()),
              zn(r.value, c.value, {
                middleware: p,
                placement: l.value || 'bottom'
              }).then(({ x: h, y, middlewareData: b }) => {
                if (
                  (Object.assign(c.value.style, {
                    left: h + 'px',
                    top: y + 'px'
                  }),
                  a.value)
                ) {
                  const { x: u, y: m } = b.arrow,
                    g = l.value.split('-')[0],
                    w = {
                      top: 'bottom',
                      left: 'right',
                      right: 'left',
                      bottom: 'top'
                    }[g],
                    v = ['top', 'right', 'bottom', 'left'],
                    x = v.indexOf(g) - 1,
                    N = v[x < 0 ? x + 4 : x]
                  Object.assign(i.value.style, {
                    left: u + 'px',
                    top: m + 'px',
                    [w]: '-4px',
                    [`border-${g}-color`]: 'transparent',
                    [`border-${N}-color`]: 'transparent'
                  })
                }
              })
          },
          f = new MutationObserver(() => d())
        return (
          s.watch(
            o,
            p => {
              p
                ? (s.nextTick(d),
                  r.value && f.observe(r.value, { attributes: !0 }),
                  window.addEventListener('resize', d),
                  window.addEventListener('scroll', d))
                : (f.disconnect(),
                  window.removeEventListener('resize', d),
                  window.removeEventListener('scroll', d))
            },
            { immediate: !0 }
          ),
          s.onUnmounted(() => {
            f.disconnect(),
              window.removeEventListener('resize', d),
              window.removeEventListener('scroll', d)
          }),
          () => {
            var p
            return s.createVNode(s.Fragment, null, [
              o.value &&
                s.createVNode(
                  'div',
                  s.mergeProps({ ref: c, class: 's-base-popover' }, n),
                  [
                    (p = e.default) == null ? void 0 : p.call(e),
                    a.value &&
                      s.createVNode(
                        'div',
                        { class: 's-base-popover__arrow', ref: i },
                        null
                      )
                  ]
                )
            ])
          }
        )
      }
    }),
    lr = '',
    Le = s.defineComponent({
      name: 'ZPopover',
      props: Tn,
      emits: ['update:modelValue'],
      setup(t, { slots: e }) {
        const { modelValue: n, title: r } = s.toRefs(t)
        return () =>
          s.createVNode(s.Fragment, null, [
            n.value &&
              s.createVNode(Hn, s.mergeProps({ class: 's-popover' }, t), {
                default: () => {
                  var o
                  return [
                    s.createVNode('h4', { class: 's-popover__title' }, [
                      r.value
                    ]),
                    (o = e.default) == null ? void 0 : o.call(e)
                  ]
                }
              })
          ])
      }
    }),
    Zn = {
      install(t) {
        t.component(Le.name, Le)
      }
    },
    Wn = { data: { type: Array, default: () => [] } },
    sr = '',
    Re = s.defineComponent({
      name: 'ZTable',
      props: Wn,
      emits: ['selection-change'],
      setup(t, { slots: e, emit: n }) {
        const { data: r } = s.toRefs(t),
          o = s.ref([])
        s.provide('column-data', o),
          s.watch(
            r,
            i => {
              const c = i.filter(d => d.checked)
              c.length === r.value.length
                ? ((a.value = !0), (l.value = !1))
                : c.length === 0
                ? ((a.value = !1), (l.value = !1))
                : (l.value = !0),
                n('selection-change', c)
            },
            { deep: !0 }
          )
        const a = s.ref(r.value.every(i => i.checked))
        s.provide('all-checked', a),
          s.watch(a, i => {
            r.value.forEach(c => {
              c.checked = i
            })
          })
        const l = s.ref(r.value.some(i => i.checked && !a.value))
        return (
          s.provide('is-indeterminate', l),
          () => {
            var i
            return s.createVNode('table', { class: 's-table' }, [
              s.createVNode('thead', null, [
                s.createVNode('tr', null, [
                  (i = e.default) == null ? void 0 : i.call(e)
                ])
              ]),
              s.createVNode('tbody', null, [
                r.value.map(c =>
                  s.createVNode('tr', null, [
                    o.value.map((d, f) => {
                      var h, y, b
                      const p = (h = e.default) == null ? void 0 : h.call(e)[f]
                      return p != null && p.children
                        ? s.createVNode('td', null, [
                            (b = (y = p == null ? void 0 : p.children)
                              .default) == null
                              ? void 0
                              : b.call(y, c)
                          ])
                        : d.field
                        ? s.createVNode('td', null, [c[d.field]])
                        : d.type === 'selection'
                        ? s.withDirectives(
                            s.createVNode(
                              'input',
                              {
                                type: 'checkbox',
                                'onUpdate:modelValue': u => (c.checked = u)
                              },
                              null
                            ),
                            [[s.vModelCheckbox, c.checked]]
                          )
                        : ''
                    })
                  ])
                )
              ])
            ])
          }
        )
      }
    }),
    Un = {
      field: { type: String, default: '' },
      header: { type: String, default: '' },
      type: { type: String, default: '' }
    },
    Se = s.defineComponent({
      name: 'ZColumn',
      props: Un,
      setup(t) {
        const { field: e, header: n, type: r } = s.toRefs(t)
        s.inject('column-data').value.push({
          field: e.value,
          header: n.value,
          type: r.value
        })
        const a = s.inject('all-checked'),
          l = s.inject('is-indeterminate'),
          i = s.ref()
        return (
          s.nextTick(() => {
            i.value && (i.value.indeterminate = l.value)
          }),
          s.watch(
            l,
            () => {
              if (i.value) i.value.indeterminate = l.value
              else return
            },
            { immediate: !0 }
          ),
          () =>
            s.createVNode('th', null, [
              r.value === 'selection'
                ? s.withDirectives(
                    s.createVNode(
                      'input',
                      {
                        type: 'checkbox',
                        ref: i,
                        'onUpdate:modelValue': c => (a.value = c)
                      },
                      null
                    ),
                    [[s.vModelCheckbox, a.value]]
                  )
                : n.value
            ])
        )
      }
    }),
    Yn = [
      ht,
      Ot,
      _t,
      un,
      gn,
      vn,
      wn,
      Pn,
      Zn,
      {
        install(t) {
          t.component(Re.name, Re), t.component(Se.name, Se)
        }
      }
    ],
    Xn = {
      install(t) {
        Yn.forEach(e => t.use(e))
      }
    }
  ;(F.Button = de),
    (F.Column = Se),
    (F.Form = he),
    (F.Icon = Te),
    (F.Input = Ve),
    (F.Modal = Pe),
    (F.Pagination = me),
    (F.Popover = Le),
    (F.Tab = Oe),
    (F.Table = Re),
    (F.Tabs = Ee),
    (F.Tree = pe),
    (F.default = Xn),
    Object.defineProperties(F, {
      __esModule: { value: !0 },
      [Symbol.toStringTag]: { value: 'Module' }
    })
})
