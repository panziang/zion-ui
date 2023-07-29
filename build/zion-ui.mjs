import { defineComponent as N, toRefs as M, createVNode as g, computed as V, ref as L, reactive as Lt, unref as qt, inject as B, mergeProps as W, withDirectives as Fe, vModelCheckbox as Le, onMounted as qe, provide as z, createTextVNode as J, watch as Q, onUnmounted as dt, Fragment as Se, nextTick as pt } from "vue";
const St = {
  type: {
    //类型约束
    type: String,
    default: "secondary"
  },
  size: {
    type: String,
    default: "medium"
  },
  disabled: {
    type: Boolean,
    default: !1
  },
  block: {
    type: Boolean,
    default: !1
  }
}, Re = N({
  name: "ZButton",
  props: St,
  setup(t, {
    slots: e
  }) {
    const {
      type: n,
      size: r,
      disabled: a,
      block: i
    } = M(t);
    return () => {
      const l = e.default ? e.default() : "按钮", o = i.value ? "s-btn--block" : "";
      return g("button", {
        disabled: a.value,
        class: `s-btn s-btn--${n.value} s-btn--${r.value} ${o}`
      }, [l]);
    };
  }
}), Nt = {
  install(t) {
    t.component(Re.name, Re);
  }
}, gt = {
  data: {
    type: Object,
    required: !0
  },
  //是否显示复选框
  checkable: {
    type: Boolean,
    default: !1
  },
  //是否显示操作按钮
  operable: {
    type: Boolean,
    default: !1
  },
  //拖拽树开关
  draggable: {
    type: [Boolean, Object],
    default: !1
  },
  height: {
    type: Number
  },
  itemHeight: {
    type: Number,
    default: 30
  }
};
function Ne(t, e = 0, n = []) {
  return e++, t == null ? void 0 : t.reduce((r, a) => {
    const i = { ...a };
    if (i.level = e, n.length > 0 && n[n.length - 1].level >= e)
      for (; n.length; )
        n.pop();
    n.push(i);
    const l = n[n.length - 2];
    if (l && (i.parentId = l.id), i.children) {
      const o = Ne(i.children, e, n);
      return delete i.children, r.concat(i, o);
    } else
      return i.isLeaf === void 0 && (i.isLeaf = !0), r.concat(i);
  }, []);
}
function At(t) {
  const e = V(() => {
    let o = [];
    const s = [];
    for (const c of t.value)
      o.includes(c) || (c.expanded !== !0 && (o = n(c)), s.push(c));
    return s;
  }), n = (o, s = !0) => {
    const c = [], u = t.value.findIndex((d) => d.id === o.id);
    for (let d = u + 1; d < t.value.length && o.level < t.value[d].level; d++)
      (s || o.level === t.value[d].level - 1) && c.push(t.value[d]);
    return c;
  }, r = (o, s = []) => {
    const c = n(o, !1);
    return s.push(...c), c.forEach((u) => {
      u.expanded && r(u, s);
    }), s;
  };
  return {
    expandedTree: e,
    getChildren: n,
    getChildrenExpanded: r,
    getIndex: (o) => o ? t.value.findIndex((s) => s.id === o.id) : -1,
    getNode: (o) => t.value.find((s) => s.id === o.id),
    getParent: (o) => t.value.find((s) => s.id === o.parentId)
  };
}
function Dt(t, e, n, r) {
  const { lazyLoadNodes: a } = r;
  return {
    toggleNode: (l) => {
      const o = t.value.find((s) => s.id === l.id);
      o && (o.expanded = !o.expanded, o.expanded && a(o));
    }
  };
}
function kt(t, { getChildren: e }) {
  return {
    toggleCheckNode: (r) => {
      r.checked = !r.checked, e(r).forEach((o) => {
        o.checked = r.checked;
      });
      const a = t.value.find((o) => o.id === r.parentId);
      if (!a)
        return;
      const i = e(a, !1), l = i.filter((o) => o.checked);
      i.length === l.length ? a.checked = !0 : a.checked = !1;
    }
  };
}
function vt(t = 8) {
  const e = "abcdefghijklmnopqrstuvwxyz0123456789";
  let n = "";
  for (let r = 0; r < t; r++)
    n += e[parseInt((Math.random() * e.length).toString())];
  return n;
}
function Rt(t, { getIndex: e, getChildren: n }) {
  return {
    append: (i, l) => {
      const o = n(i, !1), s = o[o.length - 1];
      let c = e(i) + 1;
      s && (c = e(s) + 1), i.expanded = !0, i.isLeaf = !1;
      const u = L({
        ...l,
        //node结构不全，需要新增
        level: i.level + 1,
        parentId: i.id,
        isLeaf: !0
      });
      u.value.id == null && (u.value.id = vt()), t.value.splice(c, 0, u.value);
    },
    remove: (i) => {
      const l = n(i).map((o) => o.id);
      t.value = t.value.filter(
        (o) => o.id !== i.id && !l.includes(o.id)
      );
    }
  };
}
function Vt(t, { getNode: e, getIndex: n, getChildren: r }, { emit: a }) {
  const i = (c) => {
    const u = e(c);
    u && // 没有孩子但是isleaf为false
    u.isLeaf === !1 && !u.childNodeCount && (u.loading = !0, a("lazy-load", c, l));
  }, l = (c) => {
    const u = e(c.node);
    if (u) {
      u.loading = !1;
      const d = L(
        Ne(c.treeItems, u.level)
      );
      o(u, d), s(u, d);
      const m = r(u);
      u.childNodeCount = m.length;
    }
  }, o = (c, u) => {
    u.value.forEach((d) => {
      d.level - 1 === c.level && !d.parentId && (d.parentId = c.id);
    });
  }, s = (c, u) => {
    const d = n(c);
    d && t.value.splice(d + 1, 0, ...u.value);
  };
  return {
    lazyLoadNodes: i
  };
}
const ye = {
  dropPrev: "s-tree__node--drop-prev",
  dropNext: "s-tree__node--drop-next",
  dropInner: "s-tree__node--drop-inner"
};
function Ct(t, e, { getChildren: n, getParent: r }) {
  const a = Lt({
    dropType: void 0,
    draggingNode: null,
    draggingTreeNode: null
  }), i = V(
    () => e.value.reduce(
      (f, v) => ({
        ...f,
        [v.id]: v
      }),
      {}
    )
  ), l = (f) => {
    f == null || f.classList.remove(...Object.values(ye));
  }, o = (f, v) => {
    var w;
    const p = (w = i.value[f]) == null ? void 0 : w.parentId;
    return p === v ? !0 : p !== void 0 ? o(p, v) : !1;
  }, s = () => {
    a.dropType = void 0, a.draggingNode = null, a.draggingTreeNode = null;
  }, c = (f, v) => {
    var p;
    f.stopPropagation(), a.draggingNode = f.target, a.draggingTreeNode = v, (p = f.dataTransfer) == null || p.setData("dragNodeId", v.id);
  }, u = (f) => {
    if (f.preventDefault(), f.stopPropagation(), !!a.draggingNode && t) {
      if (f.dataTransfer && (f.dataTransfer.dropEffect = "move"), !e)
        return;
      let v = {};
      typeof t == "object" ? v = t : t === !0 && (v = { dropInner: !0 });
      const { dropPrev: p, dropNext: w, dropInner: y } = v;
      let x;
      const P = p ? y ? 0.25 : w ? 0.45 : 1 : -1, E = w ? y ? 0.75 : p ? 0.55 : 0 : 1, F = f.currentTarget, _ = F == null ? void 0 : F.getBoundingClientRect(), D = f.clientY - ((_ == null ? void 0 : _.top) || 0);
      if (D < ((_ == null ? void 0 : _.height) || 0) * P ? x = "dropPrev" : D > ((_ == null ? void 0 : _.height) || 0) * E ? x = "dropNext" : y ? x = "dropInner" : x = void 0, x) {
        const I = F == null ? void 0 : F.classList;
        I && (I.contains(ye[x]) || (l(F), I.add(ye[x])));
      } else
        l(F);
      a.dropType = x;
    }
  }, d = (f) => {
    f.stopPropagation(), a.draggingNode && l(f.currentTarget);
  }, m = (f, v) => {
    var w;
    if (f.preventDefault(), f.stopPropagation(), l(f.currentTarget), !a.draggingNode || !t)
      return;
    const p = (w = f.dataTransfer) == null ? void 0 : w.getData("dragNodeId");
    if (p) {
      const y = o(v.id, p);
      if (p === v.id || y)
        return;
      a.dropType && h(p, v), s();
    }
  };
  function h(f, v) {
    const p = e.value.find((w) => w.id === f);
    if (p) {
      let w;
      const y = n(p), x = r(p);
      if (a.dropType === "dropInner") {
        w = {
          ...p,
          //建立父子关系
          parentId: v.id,
          level: v.level + 1
        };
        const P = e.value.indexOf(v);
        e.value.splice(P + 1, 0, w), v.isLeaf = void 0;
        const E = e.value.indexOf(p);
        e.value.splice(E, 1);
      } else if (a.dropType === "dropNext") {
        w = {
          ...p,
          parentId: v.parentId,
          level: v.level
        };
        const P = e.value.indexOf(v), E = n(v, !0).length;
        e.value.splice(
          P + E + 1,
          0,
          w
        );
        const F = e.value.indexOf(p);
        e.value.splice(F, 1);
      } else if (a.dropType === "dropPrev") {
        w = {
          ...p,
          parentId: v.parentId,
          level: v.level
        };
        const P = e.value.indexOf(v);
        e.value.splice(P, 0, w);
        const E = e.value.indexOf(p);
        e.value.splice(E, 1);
      }
      a.dropType = "dropInner", y.forEach((P) => h(P.id, w)), x && n(x).length === 0 && (x.isLeaf = !0);
    }
  }
  return {
    onDragstart: c,
    onDragover: u,
    onDragleave: d,
    onDrop: m,
    onDragend: (f) => {
      f.preventDefault(), f.stopPropagation(), s();
    }
  };
}
function Mt(t, e, n) {
  const r = L(Ne(qt(t))), a = At(r), i = [Dt, kt, Rt], l = Vt(r, a, n), o = Ct(e.draggable, r, a);
  return {
    ...i.reduce((c, u) => ({ ...c, ...u(r, a, n, l) }), {}),
    ...a,
    ...o,
    treeData: r
  };
}
const $t = {
  ...gt,
  treeNode: {
    type: Object,
    required: !0
  }
}, Ve = 28, Ce = 24, Me = N({
  name: "ZTreeNode",
  props: $t,
  setup(t, {
    slots: e
  }) {
    const {
      treeNode: n,
      checkable: r,
      operable: a,
      draggable: i
    } = M(t), {
      getChildren: l,
      getChildrenExpanded: o,
      toggleNode: s,
      toggleCheckNode: c,
      append: u,
      remove: d,
      onDragend: m,
      onDragleave: h,
      onDragover: b,
      onDragstart: f,
      onDrop: v
    } = B("TREE_UTILS"), p = L(!1), w = () => {
      p.value ? p.value = !1 : p.value = !0;
    };
    let y = {};
    return i.value && (y = {
      draggable: !0,
      onDragend: (x) => m(x),
      onDragleave: (x) => h(x),
      onDragover: (x) => b(x),
      onDragstart: (x) => f(x, n.value),
      onDrop: (x) => v(x, n.value)
    }), () => (
      //给树形结构根据level层级添加缩进
      g("div", {
        class: "s-tree__node hover:bg-slate-300 relative leading-8",
        style: {
          paddingLeft: `${Ce * (n.value.level - 1)}px`
        },
        onMouseenter: w,
        onMouseleave: w
      }, [!n.value.isLeaf && n.value.expanded && g("span", {
        class: "s-tree-node__vline absolute w-px bg-gray-300",
        style: {
          height: `${Ve * o(n.value).length}px`,
          //当前节点的层级乘以设置的节点indent,稍微偏移一点
          left: `${Ce * (n.value.level - 1) + 8}px`,
          top: `${Ve}px`
        }
      }, null), g("div", W({
        class: "s-tree__node--content"
      }, y), [n.value.isLeaf ? g("span", {
        style: {
          display: "inline-block",
          width: "25px"
        }
      }, null) : e.icon(), r.value && Fe(g("input", {
        type: "checkbox",
        "onUpdate:modelValue": (x) => n.value.checked = x,
        onClick: () => c(n.value)
      }, null), [[Le, n.value.checked]]), e.content(), a.value && p.value && g("span", {
        class: "inline-flex ml-1"
      }, [g("svg", {
        onClick: () => {
          u(n.value, {
            label: "新节点"
          });
        },
        viewBox: "0 0 1024 1024",
        width: "14",
        height: "14",
        class: "cursor-pointer"
      }, [g("path", {
        d: "M590.769231 571.076923h324.923077c15.753846 0 29.538462-13.784615 29.538461-29.538461v-59.076924c0-15.753846-13.784615-29.538462-29.538461-29.538461H590.769231c-11.815385 0-19.692308-7.876923-19.692308-19.692308V108.307692c0-15.753846-13.784615-29.538462-29.538461-29.538461h-59.076924c-15.753846 0-29.538462 13.784615-29.538461 29.538461V433.230769c0 11.815385-7.876923 19.692308-19.692308 19.692308H108.307692c-15.753846 0-29.538462 13.784615-29.538461 29.538461v59.076924c0 15.753846 13.784615 29.538462 29.538461 29.538461H433.230769c11.815385 0 19.692308 7.876923 19.692308 19.692308v324.923077c0 15.753846 13.784615 29.538462 29.538461 29.538461h59.076924c15.753846 0 29.538462-13.784615 29.538461-29.538461V590.769231c0-11.815385 7.876923-19.692308 19.692308-19.692308z"
      }, null)]), g("svg", {
        onClick: () => {
          d(n.value);
        },
        viewBox: "0 0 1024 1024",
        width: "14",
        height: "14",
        class: "cursor-pointer ml-1"
      }, [g("path", {
        d: "M610.461538 500.184615l256-257.96923c11.815385-11.815385 11.815385-29.538462 0-41.353847l-39.384615-41.353846c-11.815385-11.815385-29.538462-11.815385-41.353846 0L527.753846 417.476923c-7.876923 7.876923-19.692308 7.876923-27.569231 0L242.215385 157.538462c-11.815385-11.815385-29.538462-11.815385-41.353847 0l-41.353846 41.353846c-11.815385 11.815385-11.815385 29.538462 0 41.353846l257.969231 257.969231c7.876923 7.876923 7.876923 19.692308 0 27.56923L157.538462 785.723077c-11.815385 11.815385-11.815385 29.538462 0 41.353846l41.353846 41.353846c11.815385 11.815385 29.538462 11.815385 41.353846 0L498.215385 610.461538c7.876923-7.876923 19.692308-7.876923 27.56923 0l257.969231 257.969231c11.815385 11.815385 29.538462 11.815385 41.353846 0L866.461538 827.076923c11.815385-11.815385 11.815385-29.538462 0-41.353846L610.461538 527.753846c-7.876923-7.876923-7.876923-19.692308 0-27.569231z"
      }, null)])]), n.value.loading && e.loading()])])
    );
  }
}), $e = (t, {
  emit: e
}) => g("svg", {
  onClick: () => e("onClick"),
  style: {
    width: "18px",
    height: "18px",
    display: "inline-block",
    transform: t.expanded ? "rotate(90deg)" : ""
  },
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [g("path", {
  fill: "currentColor",
  d: "M384 192v640l384-320.064z"
}, null)]), jt = {
  data: {
    type: Array,
    default: []
  },
  itemHeight: {
    type: Number,
    default: 22
  },
  component: {
    type: String,
    default: "div"
  }
};
const Bt = N({
  name: "ZVirtualList",
  props: jt,
  setup(t, {
    slots: e
  }) {
    const {
      data: n,
      itemHeight: r,
      component: a
    } = M(t), i = L(), l = L(0), o = L(0), s = L(0), c = V(() => Math.ceil(l.value / r.value)), u = V(() => n.value.slice(s.value, Math.min(s.value + c.value, n.value.length)));
    qe(() => {
      var m;
      l.value = (m = i.value) == null ? void 0 : m.clientHeight;
    });
    const d = (m) => {
      const {
        scrollTop: h
      } = m.target;
      s.value = Math.floor(h / r.value), o.value = h - h % r.value;
    };
    return () => g(a.value, {
      class: "s-virtual-list__container",
      ref: i,
      onScroll: d
    }, {
      default: () => [g("div", {
        class: "s-virtual-list__blank",
        style: {
          height: `${n.value.length * r.value}px`
        }
      }, null), g("div", {
        class: "s-virtual-list",
        style: {
          transform: `translate3d(0, ${o.value}px, 0)`
        }
      }, [u.value.map((m, h) => {
        var b;
        return (b = e.default) == null ? void 0 : b.call(e, {
          item: m,
          index: h
        });
      })])]
    });
  }
});
const je = N({
  name: "ZTree",
  props: gt,
  emits: ["lazy-load"],
  setup(t, e) {
    const {
      data: n,
      height: r,
      itemHeight: a
    } = M(t), {
      slots: i
    } = e, l = Mt(n.value, t, e);
    return z("TREE_UTILS", l), () => {
      var o;
      return g("div", {
        class: "s-tree"
      }, [r != null && r.value ? (
        //虚拟列表
        g("div", {
          style: {
            height: `${r.value}px`
          }
        }, [g(Bt, {
          data: l.expandedTree.value,
          itemHeight: a.value
        }, {
          default: ({
            item: s
          }) => g(Me, W(t, {
            treeNode: s
          }), {
            // 当前节点的插槽
            content: () => i.content ? i.content(s) : s.label,
            icon: () => i.icon ? (
              // 如果用户传了图标
              i.icon({
                nodeData: s,
                toggleNode: l.toggleNode
              })
            ) : (
              // 没传图标就是默认
              g($e, {
                expanded: !!s.expanded,
                onClick: () => l.toggleNode(s)
              }, null)
            ),
            loading: () => i.loadind ? i.loading({
              nodeData: l
            }) : g("span", {
              class: "ml-1"
            }, [J("loading...")])
          })
        })])
      ) : (o = l.expandedTree.value) == null ? void 0 : o.map((s) => (
        // 将节点抽取为一个jsx
        g(Me, W(t, {
          treeNode: s
        }), {
          // 当前节点的插槽
          content: () => i.content ? i.content(s) : s.label,
          icon: () => i.icon ? (
            // 如果用户传了图标
            i.icon({
              nodeData: s,
              toggleNode: l.toggleNode
            })
          ) : (
            // 没传图标就是默认
            g($e, {
              expanded: !!s.expanded,
              onClick: () => l.toggleNode(s)
            }, null)
          ),
          loading: () => i.loadind ? i.loading({
            nodeData: l
          }) : g("span", {
            class: "ml-1"
          }, [J("loading...")])
        })
      ))]);
    };
  }
}), zt = {
  install(t) {
    t.component(je.name, je);
  }
}, mt = {
  total: {
    type: Number,
    default: 0
  },
  pageSize: {
    type: Number,
    default: 10
  },
  pagerCount: {
    type: Number,
    default: 7
  },
  modelValue: {
    type: Number,
    default: 1
  }
};
function Ht(t = 1) {
  const e = L(t);
  return { pageIndex: e, setPageIndex: (l) => {
    e.value = l;
  }, jumpPage: (l) => {
    e.value += l;
  }, prevPage: () => {
    e.value -= 1;
  }, nextPage: () => {
    e.value += 1;
  } };
}
const Zt = (t, e, n) => {
  const r = Array.from(Array(t).keys());
  if (t <= n)
    return r.slice(2, t);
  {
    const a = Math.ceil(n / 2);
    return e <= a ? r.slice(2, n) : e >= t - a + 1 ? r.slice(t - n + 2, t) : r.slice(e - a + 2, e + a - 1);
  }
}, Wt = mt, xe = N({
  name: "ZPager",
  props: Wt,
  setup(t) {
    const {
      total: e,
      pageSize: n,
      pagerCount: r
    } = M(t), a = V(() => Math.ceil(e.value / n.value)), {
      pageIndex: i,
      setPageIndex: l,
      jumpPage: o,
      nextPage: s,
      prevPage: c
    } = Ht(), u = V(() => Zt(a.value, i.value, r.value));
    return {
      prevPage: c,
      nextPage: s,
      totalPage: a,
      pageIndex: i,
      setPageIndex: l,
      jumpPage: o,
      centerPages: u
    };
  },
  render() {
    const {
      pagerCount: t,
      totalPage: e,
      pageIndex: n,
      setPageIndex: r,
      jumpPage: a,
      centerPages: i
    } = this;
    return (
      /* pager部分 */
      g("ul", {
        class: "s-pager"
      }, [g("li", {
        onClick: () => r(1),
        class: {
          current: n === 1
        }
      }, [J("1")]), e > t && n > Math.ceil(t / 2) && g("li", {
        class: "more left",
        onClick: () => a(-5)
      }, [J("...")]), i.map((l) => g("li", {
        onClick: () => r(l),
        class: {
          current: n === l
        }
      }, [l])), e > t && n < e - Math.ceil(t / 2) + 1 && g("li", {
        class: "more right",
        onClick: () => a(5)
      }, [J("...")]), e > 1 && g("li", {
        onClick: () => r(e),
        class: {
          current: n === e
        }
      }, [e])])
    );
  }
}), Be = N({
  name: "ZPagination",
  props: mt,
  emits: ["update:modelValue"],
  setup(t, {
    emit: e
  }) {
    const n = L(), r = V(() => n.value ? n.value.pageIndex < 2 : !0), a = V(() => n.value ? n.value.pageIndex > n.value.totalPage - 1 : !0);
    return qe(() => {
      Q(() => n.value.pageIndex, (i) => {
        e("update:modelValue", i);
      }), Q(() => t.modelValue, (i) => {
        n.value.pageIndex = i;
      });
    }), () => g("div", {
      class: "s-pagination"
    }, [g("button", {
      disabled: r.value,
      onClick: () => n.value.prevPage()
    }, [J("上一页")]), g(xe, W(t, {
      ref: n
    }), null), g("button", {
      disabled: a.value,
      onClick: () => n.value.nextPage()
    }, [J("下一页")])]);
  }
}), Ut = {
  install(t) {
    t.component(Be.name, Be), t.component(xe.name, xe);
  }
}, Yt = {
  model: {
    type: Object,
    required: !0
  },
  layout: {
    //枚举类型
    type: String,
    default: "vertical"
  },
  labelSize: {
    type: String,
    default: "md"
  },
  labelAlign: {
    type: String,
    default: "start"
  },
  //校验规则
  rules: {
    type: Object
  }
}, ht = Symbol("formContextToken"), ze = N({
  name: "ZForm",
  props: Yt,
  emits: ["submit"],
  setup(t, {
    slots: e,
    emit: n,
    expose: r
  }) {
    const a = V(() => ({
      layout: t.layout,
      labelSize: t.labelSize,
      labelAlign: t.labelAlign
    }));
    z("LABEL_DATA", a);
    const i = /* @__PURE__ */ new Set(), l = (u) => i.add(u), o = (u) => i.delete(u);
    z(ht, {
      model: t.model,
      rules: t.rules,
      addItem: l,
      removeItem: o
    });
    const s = (u) => {
      u.preventDefault(), n("submit");
    };
    function c(u) {
      const d = [];
      i.forEach((m) => d.push(m.validate())), Promise.all(d).then(() => u(!0)).catch(() => u(!1));
    }
    return r({
      validate: c
    }), () => {
      var u;
      return g("form", {
        class: "s-form",
        onSubmit: s
      }, [(u = e.default) == null ? void 0 : u.call(e)]);
    };
  }
}), Xt = {
  label: {
    type: String
  },
  prop: {
    type: String
  }
};
function X() {
  return X = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, X.apply(this, arguments);
}
function Jt(t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t, ie(t, e);
}
function we(t) {
  return we = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, we(t);
}
function ie(t, e) {
  return ie = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, a) {
    return r.__proto__ = a, r;
  }, ie(t, e);
}
function Gt() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function fe(t, e, n) {
  return Gt() ? fe = Reflect.construct.bind() : fe = function(a, i, l) {
    var o = [null];
    o.push.apply(o, i);
    var s = Function.bind.apply(a, o), c = new s();
    return l && ie(c, l.prototype), c;
  }, fe.apply(null, arguments);
}
function Kt(t) {
  return Function.toString.call(t).indexOf("[native code]") !== -1;
}
function Pe(t) {
  var e = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return Pe = function(r) {
    if (r === null || !Kt(r))
      return r;
    if (typeof r != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof e < "u") {
      if (e.has(r))
        return e.get(r);
      e.set(r, a);
    }
    function a() {
      return fe(r, arguments, we(this).constructor);
    }
    return a.prototype = Object.create(r.prototype, {
      constructor: {
        value: a,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), ie(a, r);
  }, Pe(t);
}
var Qt = /%[sdj%]/g, yt = function() {
};
typeof process < "u" && process.env && process.env.NODE_ENV !== "production" && typeof window < "u" && typeof document < "u" && (yt = function(e, n) {
  typeof console < "u" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING > "u" && n.every(function(r) {
    return typeof r == "string";
  }) && console.warn(e, n);
});
function Te(t) {
  if (!t || !t.length)
    return null;
  var e = {};
  return t.forEach(function(n) {
    var r = n.field;
    e[r] = e[r] || [], e[r].push(n);
  }), e;
}
function k(t) {
  for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
    n[r - 1] = arguments[r];
  var a = 0, i = n.length;
  if (typeof t == "function")
    return t.apply(null, n);
  if (typeof t == "string") {
    var l = t.replace(Qt, function(o) {
      if (o === "%%")
        return "%";
      if (a >= i)
        return o;
      switch (o) {
        case "%s":
          return String(n[a++]);
        case "%d":
          return Number(n[a++]);
        case "%j":
          try {
            return JSON.stringify(n[a++]);
          } catch {
            return "[Circular]";
          }
          break;
        default:
          return o;
      }
    });
    return l;
  }
  return t;
}
function en(t) {
  return t === "string" || t === "url" || t === "hex" || t === "email" || t === "date" || t === "pattern";
}
function q(t, e) {
  return !!(t == null || e === "array" && Array.isArray(t) && !t.length || en(e) && typeof t == "string" && !t);
}
function tn(t, e, n) {
  var r = [], a = 0, i = t.length;
  function l(o) {
    r.push.apply(r, o || []), a++, a === i && n(r);
  }
  t.forEach(function(o) {
    e(o, l);
  });
}
function He(t, e, n) {
  var r = 0, a = t.length;
  function i(l) {
    if (l && l.length) {
      n(l);
      return;
    }
    var o = r;
    r = r + 1, o < a ? e(t[o], i) : n([]);
  }
  i([]);
}
function nn(t) {
  var e = [];
  return Object.keys(t).forEach(function(n) {
    e.push.apply(e, t[n] || []);
  }), e;
}
var Ze = /* @__PURE__ */ function(t) {
  Jt(e, t);
  function e(n, r) {
    var a;
    return a = t.call(this, "Async Validation Error") || this, a.errors = n, a.fields = r, a;
  }
  return e;
}(/* @__PURE__ */ Pe(Error));
function rn(t, e, n, r, a) {
  if (e.first) {
    var i = new Promise(function(m, h) {
      var b = function(p) {
        return r(p), p.length ? h(new Ze(p, Te(p))) : m(a);
      }, f = nn(t);
      He(f, n, b);
    });
    return i.catch(function(m) {
      return m;
    }), i;
  }
  var l = e.firstFields === !0 ? Object.keys(t) : e.firstFields || [], o = Object.keys(t), s = o.length, c = 0, u = [], d = new Promise(function(m, h) {
    var b = function(v) {
      if (u.push.apply(u, v), c++, c === s)
        return r(u), u.length ? h(new Ze(u, Te(u))) : m(a);
    };
    o.length || (r(u), m(a)), o.forEach(function(f) {
      var v = t[f];
      l.indexOf(f) !== -1 ? He(v, n, b) : tn(v, n, b);
    });
  });
  return d.catch(function(m) {
    return m;
  }), d;
}
function an(t) {
  return !!(t && t.message !== void 0);
}
function on(t, e) {
  for (var n = t, r = 0; r < e.length; r++) {
    if (n == null)
      return n;
    n = n[e[r]];
  }
  return n;
}
function We(t, e) {
  return function(n) {
    var r;
    return t.fullFields ? r = on(e, t.fullFields) : r = e[n.field || t.fullField], an(n) ? (n.field = n.field || t.fullField, n.fieldValue = r, n) : {
      message: typeof n == "function" ? n() : n,
      fieldValue: r,
      field: n.field || t.fullField
    };
  };
}
function Ue(t, e) {
  if (e) {
    for (var n in e)
      if (e.hasOwnProperty(n)) {
        var r = e[n];
        typeof r == "object" && typeof t[n] == "object" ? t[n] = X({}, t[n], r) : t[n] = r;
      }
  }
  return t;
}
var bt = function(e, n, r, a, i, l) {
  e.required && (!r.hasOwnProperty(e.field) || q(n, l || e.type)) && a.push(k(i.messages.required, e.fullField));
}, ln = function(e, n, r, a, i) {
  (/^\s+$/.test(n) || n === "") && a.push(k(i.messages.whitespace, e.fullField));
}, ue, sn = function() {
  if (ue)
    return ue;
  var t = "[a-fA-F\\d:]", e = function(x) {
    return x && x.includeBoundaries ? "(?:(?<=\\s|^)(?=" + t + ")|(?<=" + t + ")(?=\\s|$))" : "";
  }, n = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}", r = "[a-fA-F\\d]{1,4}", a = (`
(?:
(?:` + r + ":){7}(?:" + r + `|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:` + r + ":){6}(?:" + n + "|:" + r + `|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:` + r + ":){5}(?::" + n + "|(?::" + r + `){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:` + r + ":){4}(?:(?::" + r + "){0,1}:" + n + "|(?::" + r + `){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:` + r + ":){3}(?:(?::" + r + "){0,2}:" + n + "|(?::" + r + `){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:` + r + ":){2}(?:(?::" + r + "){0,3}:" + n + "|(?::" + r + `){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:` + r + ":){1}(?:(?::" + r + "){0,4}:" + n + "|(?::" + r + `){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::(?:(?::` + r + "){0,5}:" + n + "|(?::" + r + `){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
`).replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(), i = new RegExp("(?:^" + n + "$)|(?:^" + a + "$)"), l = new RegExp("^" + n + "$"), o = new RegExp("^" + a + "$"), s = function(x) {
    return x && x.exact ? i : new RegExp("(?:" + e(x) + n + e(x) + ")|(?:" + e(x) + a + e(x) + ")", "g");
  };
  s.v4 = function(y) {
    return y && y.exact ? l : new RegExp("" + e(y) + n + e(y), "g");
  }, s.v6 = function(y) {
    return y && y.exact ? o : new RegExp("" + e(y) + a + e(y), "g");
  };
  var c = "(?:(?:[a-z]+:)?//)", u = "(?:\\S+(?::\\S*)?@)?", d = s.v4().source, m = s.v6().source, h = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", b = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", f = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", v = "(?::\\d{2,5})?", p = '(?:[/?#][^\\s"]*)?', w = "(?:" + c + "|www\\.)" + u + "(?:localhost|" + d + "|" + m + "|" + h + b + f + ")" + v + p;
  return ue = new RegExp("(?:^" + w + "$)", "i"), ue;
}, Ye = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, ne = {
  integer: function(e) {
    return ne.number(e) && parseInt(e, 10) === e;
  },
  float: function(e) {
    return ne.number(e) && !ne.integer(e);
  },
  array: function(e) {
    return Array.isArray(e);
  },
  regexp: function(e) {
    if (e instanceof RegExp)
      return !0;
    try {
      return !!new RegExp(e);
    } catch {
      return !1;
    }
  },
  date: function(e) {
    return typeof e.getTime == "function" && typeof e.getMonth == "function" && typeof e.getYear == "function" && !isNaN(e.getTime());
  },
  number: function(e) {
    return isNaN(e) ? !1 : typeof e == "number";
  },
  object: function(e) {
    return typeof e == "object" && !ne.array(e);
  },
  method: function(e) {
    return typeof e == "function";
  },
  email: function(e) {
    return typeof e == "string" && e.length <= 320 && !!e.match(Ye.email);
  },
  url: function(e) {
    return typeof e == "string" && e.length <= 2048 && !!e.match(sn());
  },
  hex: function(e) {
    return typeof e == "string" && !!e.match(Ye.hex);
  }
}, cn = function(e, n, r, a, i) {
  if (e.required && n === void 0) {
    bt(e, n, r, a, i);
    return;
  }
  var l = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], o = e.type;
  l.indexOf(o) > -1 ? ne[o](n) || a.push(k(i.messages.types[o], e.fullField, e.type)) : o && typeof n !== e.type && a.push(k(i.messages.types[o], e.fullField, e.type));
}, un = function(e, n, r, a, i) {
  var l = typeof e.len == "number", o = typeof e.min == "number", s = typeof e.max == "number", c = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, u = n, d = null, m = typeof n == "number", h = typeof n == "string", b = Array.isArray(n);
  if (m ? d = "number" : h ? d = "string" : b && (d = "array"), !d)
    return !1;
  b && (u = n.length), h && (u = n.replace(c, "_").length), l ? u !== e.len && a.push(k(i.messages[d].len, e.fullField, e.len)) : o && !s && u < e.min ? a.push(k(i.messages[d].min, e.fullField, e.min)) : s && !o && u > e.max ? a.push(k(i.messages[d].max, e.fullField, e.max)) : o && s && (u < e.min || u > e.max) && a.push(k(i.messages[d].range, e.fullField, e.min, e.max));
}, G = "enum", fn = function(e, n, r, a, i) {
  e[G] = Array.isArray(e[G]) ? e[G] : [], e[G].indexOf(n) === -1 && a.push(k(i.messages[G], e.fullField, e[G].join(", ")));
}, dn = function(e, n, r, a, i) {
  if (e.pattern) {
    if (e.pattern instanceof RegExp)
      e.pattern.lastIndex = 0, e.pattern.test(n) || a.push(k(i.messages.pattern.mismatch, e.fullField, n, e.pattern));
    else if (typeof e.pattern == "string") {
      var l = new RegExp(e.pattern);
      l.test(n) || a.push(k(i.messages.pattern.mismatch, e.fullField, n, e.pattern));
    }
  }
}, T = {
  required: bt,
  whitespace: ln,
  type: cn,
  range: un,
  enum: fn,
  pattern: dn
}, pn = function(e, n, r, a, i) {
  var l = [], o = e.required || !e.required && a.hasOwnProperty(e.field);
  if (o) {
    if (q(n, "string") && !e.required)
      return r();
    T.required(e, n, a, l, i, "string"), q(n, "string") || (T.type(e, n, a, l, i), T.range(e, n, a, l, i), T.pattern(e, n, a, l, i), e.whitespace === !0 && T.whitespace(e, n, a, l, i));
  }
  r(l);
}, gn = function(e, n, r, a, i) {
  var l = [], o = e.required || !e.required && a.hasOwnProperty(e.field);
  if (o) {
    if (q(n) && !e.required)
      return r();
    T.required(e, n, a, l, i), n !== void 0 && T.type(e, n, a, l, i);
  }
  r(l);
}, vn = function(e, n, r, a, i) {
  var l = [], o = e.required || !e.required && a.hasOwnProperty(e.field);
  if (o) {
    if (n === "" && (n = void 0), q(n) && !e.required)
      return r();
    T.required(e, n, a, l, i), n !== void 0 && (T.type(e, n, a, l, i), T.range(e, n, a, l, i));
  }
  r(l);
}, mn = function(e, n, r, a, i) {
  var l = [], o = e.required || !e.required && a.hasOwnProperty(e.field);
  if (o) {
    if (q(n) && !e.required)
      return r();
    T.required(e, n, a, l, i), n !== void 0 && T.type(e, n, a, l, i);
  }
  r(l);
}, hn = function(e, n, r, a, i) {
  var l = [], o = e.required || !e.required && a.hasOwnProperty(e.field);
  if (o) {
    if (q(n) && !e.required)
      return r();
    T.required(e, n, a, l, i), q(n) || T.type(e, n, a, l, i);
  }
  r(l);
}, yn = function(e, n, r, a, i) {
  var l = [], o = e.required || !e.required && a.hasOwnProperty(e.field);
  if (o) {
    if (q(n) && !e.required)
      return r();
    T.required(e, n, a, l, i), n !== void 0 && (T.type(e, n, a, l, i), T.range(e, n, a, l, i));
  }
  r(l);
}, bn = function(e, n, r, a, i) {
  var l = [], o = e.required || !e.required && a.hasOwnProperty(e.field);
  if (o) {
    if (q(n) && !e.required)
      return r();
    T.required(e, n, a, l, i), n !== void 0 && (T.type(e, n, a, l, i), T.range(e, n, a, l, i));
  }
  r(l);
}, xn = function(e, n, r, a, i) {
  var l = [], o = e.required || !e.required && a.hasOwnProperty(e.field);
  if (o) {
    if (n == null && !e.required)
      return r();
    T.required(e, n, a, l, i, "array"), n != null && (T.type(e, n, a, l, i), T.range(e, n, a, l, i));
  }
  r(l);
}, wn = function(e, n, r, a, i) {
  var l = [], o = e.required || !e.required && a.hasOwnProperty(e.field);
  if (o) {
    if (q(n) && !e.required)
      return r();
    T.required(e, n, a, l, i), n !== void 0 && T.type(e, n, a, l, i);
  }
  r(l);
}, Pn = "enum", Tn = function(e, n, r, a, i) {
  var l = [], o = e.required || !e.required && a.hasOwnProperty(e.field);
  if (o) {
    if (q(n) && !e.required)
      return r();
    T.required(e, n, a, l, i), n !== void 0 && T[Pn](e, n, a, l, i);
  }
  r(l);
}, En = function(e, n, r, a, i) {
  var l = [], o = e.required || !e.required && a.hasOwnProperty(e.field);
  if (o) {
    if (q(n, "string") && !e.required)
      return r();
    T.required(e, n, a, l, i), q(n, "string") || T.pattern(e, n, a, l, i);
  }
  r(l);
}, On = function(e, n, r, a, i) {
  var l = [], o = e.required || !e.required && a.hasOwnProperty(e.field);
  if (o) {
    if (q(n, "date") && !e.required)
      return r();
    if (T.required(e, n, a, l, i), !q(n, "date")) {
      var s;
      n instanceof Date ? s = n : s = new Date(n), T.type(e, s, a, l, i), s && T.range(e, s.getTime(), a, l, i);
    }
  }
  r(l);
}, In = function(e, n, r, a, i) {
  var l = [], o = Array.isArray(n) ? "array" : typeof n;
  T.required(e, n, a, l, i, o), r(l);
}, be = function(e, n, r, a, i) {
  var l = e.type, o = [], s = e.required || !e.required && a.hasOwnProperty(e.field);
  if (s) {
    if (q(n, l) && !e.required)
      return r();
    T.required(e, n, a, o, i, l), q(n, l) || T.type(e, n, a, o, i);
  }
  r(o);
}, _n = function(e, n, r, a, i) {
  var l = [], o = e.required || !e.required && a.hasOwnProperty(e.field);
  if (o) {
    if (q(n) && !e.required)
      return r();
    T.required(e, n, a, l, i);
  }
  r(l);
}, re = {
  string: pn,
  method: gn,
  number: vn,
  boolean: mn,
  regexp: hn,
  integer: yn,
  float: bn,
  array: xn,
  object: wn,
  enum: Tn,
  pattern: En,
  date: On,
  url: be,
  hex: be,
  email: be,
  required: In,
  any: _n
};
function Ee() {
  return {
    default: "Validation error on field %s",
    required: "%s is required",
    enum: "%s must be one of %s",
    whitespace: "%s cannot be empty",
    date: {
      format: "%s date %s is invalid for format %s",
      parse: "%s date could not be parsed, %s is invalid ",
      invalid: "%s date %s is invalid"
    },
    types: {
      string: "%s is not a %s",
      method: "%s is not a %s (function)",
      array: "%s is not an %s",
      object: "%s is not an %s",
      number: "%s is not a %s",
      date: "%s is not a %s",
      boolean: "%s is not a %s",
      integer: "%s is not an %s",
      float: "%s is not a %s",
      regexp: "%s is not a valid %s",
      email: "%s is not a valid %s",
      url: "%s is not a valid %s",
      hex: "%s is not a valid %s"
    },
    string: {
      len: "%s must be exactly %s characters",
      min: "%s must be at least %s characters",
      max: "%s cannot be longer than %s characters",
      range: "%s must be between %s and %s characters"
    },
    number: {
      len: "%s must equal %s",
      min: "%s cannot be less than %s",
      max: "%s cannot be greater than %s",
      range: "%s must be between %s and %s"
    },
    array: {
      len: "%s must be exactly %s in length",
      min: "%s cannot be less than %s in length",
      max: "%s cannot be greater than %s in length",
      range: "%s must be between %s and %s in length"
    },
    pattern: {
      mismatch: "%s value %s does not match pattern %s"
    },
    clone: function() {
      var e = JSON.parse(JSON.stringify(this));
      return e.clone = this.clone, e;
    }
  };
}
var Oe = Ee(), ce = /* @__PURE__ */ function() {
  function t(n) {
    this.rules = null, this._messages = Oe, this.define(n);
  }
  var e = t.prototype;
  return e.define = function(r) {
    var a = this;
    if (!r)
      throw new Error("Cannot configure a schema with no rules");
    if (typeof r != "object" || Array.isArray(r))
      throw new Error("Rules must be an object");
    this.rules = {}, Object.keys(r).forEach(function(i) {
      var l = r[i];
      a.rules[i] = Array.isArray(l) ? l : [l];
    });
  }, e.messages = function(r) {
    return r && (this._messages = Ue(Ee(), r)), this._messages;
  }, e.validate = function(r, a, i) {
    var l = this;
    a === void 0 && (a = {}), i === void 0 && (i = function() {
    });
    var o = r, s = a, c = i;
    if (typeof s == "function" && (c = s, s = {}), !this.rules || Object.keys(this.rules).length === 0)
      return c && c(null, o), Promise.resolve(o);
    function u(f) {
      var v = [], p = {};
      function w(x) {
        if (Array.isArray(x)) {
          var P;
          v = (P = v).concat.apply(P, x);
        } else
          v.push(x);
      }
      for (var y = 0; y < f.length; y++)
        w(f[y]);
      v.length ? (p = Te(v), c(v, p)) : c(null, o);
    }
    if (s.messages) {
      var d = this.messages();
      d === Oe && (d = Ee()), Ue(d, s.messages), s.messages = d;
    } else
      s.messages = this.messages();
    var m = {}, h = s.keys || Object.keys(this.rules);
    h.forEach(function(f) {
      var v = l.rules[f], p = o[f];
      v.forEach(function(w) {
        var y = w;
        typeof y.transform == "function" && (o === r && (o = X({}, o)), p = o[f] = y.transform(p)), typeof y == "function" ? y = {
          validator: y
        } : y = X({}, y), y.validator = l.getValidationMethod(y), y.validator && (y.field = f, y.fullField = y.fullField || f, y.type = l.getType(y), m[f] = m[f] || [], m[f].push({
          rule: y,
          value: p,
          source: o,
          field: f
        }));
      });
    });
    var b = {};
    return rn(m, s, function(f, v) {
      var p = f.rule, w = (p.type === "object" || p.type === "array") && (typeof p.fields == "object" || typeof p.defaultField == "object");
      w = w && (p.required || !p.required && f.value), p.field = f.field;
      function y(E, F) {
        return X({}, F, {
          fullField: p.fullField + "." + E,
          fullFields: p.fullFields ? [].concat(p.fullFields, [E]) : [E]
        });
      }
      function x(E) {
        E === void 0 && (E = []);
        var F = Array.isArray(E) ? E : [E];
        !s.suppressWarning && F.length && t.warning("async-validator:", F), F.length && p.message !== void 0 && (F = [].concat(p.message));
        var _ = F.map(We(p, o));
        if (s.first && _.length)
          return b[p.field] = 1, v(_);
        if (!w)
          v(_);
        else {
          if (p.required && !f.value)
            return p.message !== void 0 ? _ = [].concat(p.message).map(We(p, o)) : s.error && (_ = [s.error(p, k(s.messages.required, p.field))]), v(_);
          var D = {};
          p.defaultField && Object.keys(f.value).map(function(S) {
            D[S] = p.defaultField;
          }), D = X({}, D, f.rule.fields);
          var I = {};
          Object.keys(D).forEach(function(S) {
            var O = D[S], te = Array.isArray(O) ? O : [O];
            I[S] = te.map(y.bind(null, S));
          });
          var A = new t(I);
          A.messages(s.messages), f.rule.options && (f.rule.options.messages = s.messages, f.rule.options.error = s.error), A.validate(f.value, f.rule.options || s, function(S) {
            var O = [];
            _ && _.length && O.push.apply(O, _), S && S.length && O.push.apply(O, S), v(O.length ? O : null);
          });
        }
      }
      var P;
      if (p.asyncValidator)
        P = p.asyncValidator(p, f.value, x, f.source, s);
      else if (p.validator) {
        try {
          P = p.validator(p, f.value, x, f.source, s);
        } catch (E) {
          console.error == null || console.error(E), s.suppressValidatorError || setTimeout(function() {
            throw E;
          }, 0), x(E.message);
        }
        P === !0 ? x() : P === !1 ? x(typeof p.message == "function" ? p.message(p.fullField || p.field) : p.message || (p.fullField || p.field) + " fails") : P instanceof Array ? x(P) : P instanceof Error && x(P.message);
      }
      P && P.then && P.then(function() {
        return x();
      }, function(E) {
        return x(E);
      });
    }, function(f) {
      u(f);
    }, o);
  }, e.getType = function(r) {
    if (r.type === void 0 && r.pattern instanceof RegExp && (r.type = "pattern"), typeof r.validator != "function" && r.type && !re.hasOwnProperty(r.type))
      throw new Error(k("Unknown rule type %s", r.type));
    return r.type || "string";
  }, e.getValidationMethod = function(r) {
    if (typeof r.validator == "function")
      return r.validator;
    var a = Object.keys(r), i = a.indexOf("message");
    return i !== -1 && a.splice(i, 1), a.length === 1 && a[0] === "required" ? re.required : re[this.getType(r)] || void 0;
  }, t;
}();
ce.register = function(e, n) {
  if (typeof n != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  re[e] = n;
};
ce.warning = yt;
ce.messages = Oe;
ce.validators = re;
const Xe = N({
  name: "ZFormItem",
  props: Xt,
  setup(t, {
    slots: e
  }) {
    const n = B("LABEL_DATA"), r = V(() => ({
      "s-form__item": !0,
      "s-form__item--horizontal": n.value.layout === "horizontal",
      "s-form__item--vertical": n.value.layout === "vertical"
    })), a = V(() => ({
      "s-form__label": !0,
      "s-form__item--vertical": n.value.layout === "vertical",
      [`s-form__label--${n.value.labelAlign}`]: n.value.layout === "horizontal",
      [`s-form__label--${n.value.labelSize}`]: n.value.layout === "horizontal"
    })), i = B(ht), l = L(!1), o = L(""), c = {
      validate: () => {
        if (!i)
          return console.warn("请在Form中使用FormItem"), Promise.reject("请在Form中使用FormItem");
        if (!t.prop)
          return console.warn("如果要校验当前项,请设置prop字段"), Promise.reject("如果要校验当前项,请设置prop字段");
        if (!i.rules)
          return Promise.resolve({
            result: !0
          });
        const u = i.rules[t.prop] || void 0;
        if (!u)
          return Promise.resolve({
            result: !0
          });
        const d = i.model[t.prop];
        return new ce({
          [t.prop]: u
        }).validate({
          [t.prop]: d
        }, (h) => {
          h ? (l.value = !0, o.value = h[0].message || "校验错误") : (l.value = !1, o.value = "");
        });
      }
    };
    return z("FORM_ITEM_CTX", c), qe(() => {
      t.prop && (i == null || i.addItem(c));
    }), dt(() => {
      t.prop && (i == null || i.removeItem(c));
    }), () => {
      var u;
      return g("div", {
        class: r.value
      }, [g("span", {
        class: a.value
      }, [t.label]), g("div", null, [(u = e.default) == null ? void 0 : u.call(e)]), l.value && g("div", {
        class: "error-message"
      }, [o.value])]);
    };
  }
}), Fn = {
  install(t) {
    t.component(ze.name, ze), t.component(Xe.name, Xe);
  }
}, Ln = {
  modelValue: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "text"
  }
};
const Je = N({
  name: "ZInput",
  props: Ln,
  emits: ["update:modelValue"],
  setup(t, {
    emit: e
  }) {
    const n = B("FORM_ITEM_CTX"), r = (a) => {
      const i = a.target.value;
      e("update:modelValue", i), n.validate();
    };
    return () => g("div", {
      class: "s-input"
    }, [g("input", {
      class: "s-input__input",
      value: t.modelValue,
      onInput: r,
      type: t.type
    }, null)]);
  }
}), qn = {
  install(t) {
    t.component(Je.name, Je);
  }
}, Sn = {
  modelValue: {
    type: Boolean,
    default: !1
  },
  title: {
    type: String,
    default: ""
  },
  showClose: {
    type: Boolean,
    default: !0
  },
  width: {
    type: String,
    default: "30%"
  },
  center: {
    type: Boolean,
    default: !1
  },
  alignCenter: {
    type: Boolean,
    default: !1
  },
  backgroundColor: {
    type: String,
    default: ""
  },
  top: {
    type: [String, Number],
    default: "15vh"
  }
}, Nn = {
  modelValue: {
    type: Boolean,
    default: !1
  }
};
const An = N({
  name: "ZBaseModal",
  props: Nn,
  emits: ["update:modelValue"],
  setup(t, {
    emit: e,
    slots: n
  }) {
    const {
      modelValue: r
    } = M(t);
    return () => {
      var a;
      return (
        // modelValue为true才显示modal
        g("div", null, [r.value && g("div", {
          class: "s-base-modal"
        }, [g("div", {
          class: "s-base-modal__mask",
          onClick: () => {
            e("update:modelValue", !1);
          }
        }, null), (a = n.default) == null ? void 0 : a.call(n)])])
      );
    };
  }
});
const Ge = N({
  name: "ZModal",
  props: Sn,
  emits: ["update:modelValue"],
  setup(t, {
    slots: e,
    emit: n
  }) {
    const {
      modelValue: r,
      title: a,
      showClose: i,
      width: l,
      center: o,
      alignCenter: s,
      backgroundColor: c,
      top: u
    } = M(t), d = s.value ? {
      marginTop: 0,
      top: "50%",
      transform: "translateY(-50%)"
    } : null, m = V(() => typeof u.value == "number" ? `${u.value}px` : u.value);
    return () => g(An, {
      class: "s-modal",
      modelValue: r.value,
      "onUpdate:modelValue": () => {
        n("update:modelValue");
      }
    }, {
      default: () => {
        var h, b, f;
        return [g("div", {
          class: "s-modal__container",
          style: {
            width: l.value,
            backgroundColor: c.value,
            marginTop: m.value,
            ...d
          }
        }, [e.header ? (h = e.header) == null ? void 0 : h.call(e, {
          close: () => {
            n("update:modelValue", !1);
          }
        }) : g("div", {
          class: "s-modal__header",
          style: {
            textAlign: o.value ? "center" : "left"
          }
        }, [a.value, i.value && g("svg", {
          onClick: () => {
            n("update:modelValue", !1);
          },
          class: "s-modal__close",
          viewBox: "0 0 1024 1024",
          width: "24",
          xmlns: "http://www.w3.org/2000/svg"
        }, [g("path", {
          fill: "currentColor",
          d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
        }, null)])]), g("div", {
          class: "s-modal__body"
        }, [(b = e.default) == null ? void 0 : b.call(e)]), g("div", {
          class: "s-modal__footer"
        }, [(f = e.footer) == null ? void 0 : f.call(e)])])];
      }
    });
  }
}), Dn = {
  install(t) {
    t.component(Ge.name, Ge);
  }
}, kn = {
  name: {
    type: String,
    default: ""
  },
  //fonticon的前缀
  prefix: {
    type: String,
    default: "icon"
  },
  //图标尺寸
  size: {
    type: [String, Number],
    default: "inherit"
  },
  color: {
    type: String,
    default: "inherit"
  },
  component: {
    type: String,
    default: null
  }
}, Ke = N({
  name: "ZIcon",
  props: kn,
  setup(t, {
    attrs: e
  }) {
    const n = V(() => typeof t.size == "number" ? `${t.size}px` : t.size), r = g("img", W({
      src: t.name,
      alt: "",
      style: {
        width: n.value,
        verticalAlign: "middle"
      }
    }, e), null), a = g("span", W({
      class: [t.prefix, t.prefix + "-" + t.name],
      style: {
        fontSize: n.value,
        color: t.color
      }
    }, e), null), i = g("svg", {
      class: "icon",
      style: {
        width: n.value,
        height: n.value
      }
    }, [g("use", {
      "xlink:href": `#${t.prefix}-${t.component}`,
      fill: t.color
    }, null)]), l = t.component ? i : /http|https/.test(t.name) ? r : a;
    return () => l;
  }
}), Rn = (t) => {
  const e = t.size ? typeof t.size == "number" ? `${t.size}px` : t.size : void 0, n = t.color ? t.color : "black";
  return g("svg", {
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    class: "icon icon-arrow-down",
    style: {
      width: e,
      height: e,
      fill: n,
      stroke: n
    }
  }, [g("path", {
    d: "m11.27 27.728 12.727 12.728 12.728-12.728M24 5v34.295"
  }, null)]);
}, Vn = {
  install(t) {
    t.component(Ke.name, Ke), t.component("ArrowDownIcon", Rn);
  }
}, Cn = {
  modelValue: {
    type: String,
    default: ""
  },
  closable: {
    type: Boolean,
    default: !1
  },
  addable: {
    type: Boolean,
    default: !1
  }
};
const Qe = N({
  name: "ZTabs",
  props: Cn,
  emits: ["update:modelValue"],
  setup(t, {
    slots: e
  }) {
    const n = L([]);
    z("tabs-data", n);
    const r = L(t.modelValue);
    z("active-tab", r);
    const a = (o) => {
      r.value = o;
    }, i = (o, s) => {
      if (n.value.length > 1) {
        const c = n.value.findIndex((u) => u.id === s);
        n.value.splice(c, 1), o.stopPropagation(), n.value.length === c ? a(n.value[c - 1].id) : a(n.value[c].id);
      } else
        alert("不能删除最后一个标签页");
    }, l = () => {
      const o = vt();
      n.value.push({
        id: o,
        type: "random",
        title: `Tab${o}`,
        content: `Tab${o} Content`
      }), r.value = o;
    };
    return () => {
      var o;
      return g("div", {
        class: "s-tabs"
      }, [g("ul", {
        class: "s-tabs__nav"
      }, [n.value.map((s) => g("li", {
        onClick: () => a(s.id),
        class: s.id === r.value ? "active" : ""
      }, [s.title, t.closable && g("svg", {
        onClick: (c) => i(c, s.id),
        style: "margin-left: 8px;",
        viewBox: "0 0 1024 1024",
        width: "12",
        height: "12"
      }, [g("path", {
        d: "M610.461538 500.184615l256-257.96923c11.815385-11.815385 11.815385-29.538462 0-41.353847l-39.384615-41.353846c-11.815385-11.815385-29.538462-11.815385-41.353846 0L527.753846 417.476923c-7.876923 7.876923-19.692308 7.876923-27.569231 0L242.215385 157.538462c-11.815385-11.815385-29.538462-11.815385-41.353847 0l-41.353846 41.353846c-11.815385 11.815385-11.815385 29.538462 0 41.353846l257.969231 257.969231c7.876923 7.876923 7.876923 19.692308 0 27.56923L157.538462 785.723077c-11.815385 11.815385-11.815385 29.538462 0 41.353846l41.353846 41.353846c11.815385 11.815385 29.538462 11.815385 41.353846 0L498.215385 610.461538c7.876923-7.876923 19.692308-7.876923 27.56923 0l257.969231 257.969231c11.815385 11.815385 29.538462 11.815385 41.353846 0L866.461538 827.076923c11.815385-11.815385 11.815385-29.538462 0-41.353846L610.461538 527.753846c-7.876923-7.876923-7.876923-19.692308 0-27.569231z"
      }, null)])])), t.addable && g("li", null, [g("svg", {
        onClick: l,
        viewBox: "0 0 1024 1024",
        width: "14",
        height: "14"
      }, [g("path", {
        d: "M590.769231 571.076923h324.923077c15.753846 0 29.538462-13.784615 29.538461-29.538461v-59.076924c0-15.753846-13.784615-29.538462-29.538461-29.538461H590.769231c-11.815385 0-19.692308-7.876923-19.692308-19.692308V108.307692c0-15.753846-13.784615-29.538462-29.538461-29.538461h-59.076924c-15.753846 0-29.538462 13.784615-29.538461 29.538461V433.230769c0 11.815385-7.876923 19.692308-19.692308 19.692308H108.307692c-15.753846 0-29.538462 13.784615-29.538461 29.538461v59.076924c0 15.753846 13.784615 29.538462 29.538461 29.538461H433.230769c11.815385 0 19.692308 7.876923 19.692308 19.692308v324.923077c0 15.753846 13.784615 29.538462 29.538461 29.538461h59.076924c15.753846 0 29.538462-13.784615 29.538461-29.538461V590.769231c0-11.815385 7.876923-19.692308 19.692308-19.692308z"
      }, null)])])]), (o = e.default) == null ? void 0 : o.call(e), n.value.filter((s) => s.type === "random").map((s) => g("div", {
        class: "s-tab"
      }, [s.id === r.value && s.content]))]);
    };
  }
}), Mn = {
  id: {
    type: String,
    required: !0
  },
  title: {
    type: String,
    required: !0
  }
};
const et = N({
  name: "ZTab",
  props: Mn,
  emits: ["update:modelValue"],
  setup(t, {
    slots: e
  }) {
    const n = B("active-tab");
    return B("tabs-data").value.push({
      id: t.id,
      title: t.title
    }), () => {
      var a;
      return g(Se, null, [t.id === n.value && g("div", {
        class: "s-tab"
      }, [(a = e.default) == null ? void 0 : a.call(e)])]);
    };
  }
}), $n = {
  install(t) {
    t.component(Qe.name, Qe), t.component(et.name, et);
  }
}, jn = {
  modelValue: {
    type: Boolean,
    default: !1
  },
  host: {
    type: Object,
    default: () => null
  },
  title: {
    type: String,
    default: ""
  },
  showArrow: {
    type: Boolean,
    default: !1
  },
  placement: {
    type: String,
    default: "bottom"
  }
}, Bn = {
  modelValue: {
    type: Boolean,
    default: !1
  },
  host: {
    type: Object,
    default: () => null
  },
  showArrow: {
    type: Boolean,
    default: !1
  },
  placement: {
    type: String,
    default: "bottom"
  }
};
function j(t) {
  return t.split("-")[1];
}
function Ae(t) {
  return t === "y" ? "height" : "width";
}
function oe(t) {
  return t.split("-")[0];
}
function ge(t) {
  return ["top", "bottom"].includes(oe(t)) ? "x" : "y";
}
function tt(t, e, n) {
  let { reference: r, floating: a } = t;
  const i = r.x + r.width / 2 - a.width / 2, l = r.y + r.height / 2 - a.height / 2, o = ge(e), s = Ae(o), c = r[s] / 2 - a[s] / 2, u = o === "x";
  let d;
  switch (oe(e)) {
    case "top":
      d = { x: i, y: r.y - a.height };
      break;
    case "bottom":
      d = { x: i, y: r.y + r.height };
      break;
    case "right":
      d = { x: r.x + r.width, y: l };
      break;
    case "left":
      d = { x: r.x - a.width, y: l };
      break;
    default:
      d = { x: r.x, y: r.y };
  }
  switch (j(e)) {
    case "start":
      d[o] -= c * (n && u ? -1 : 1);
      break;
    case "end":
      d[o] += c * (n && u ? -1 : 1);
  }
  return d;
}
const zn = async (t, e, n) => {
  const { placement: r = "bottom", strategy: a = "absolute", middleware: i = [], platform: l } = n, o = i.filter(Boolean), s = await (l.isRTL == null ? void 0 : l.isRTL(e));
  let c = await l.getElementRects({ reference: t, floating: e, strategy: a }), { x: u, y: d } = tt(c, r, s), m = r, h = {}, b = 0;
  for (let f = 0; f < o.length; f++) {
    const { name: v, fn: p } = o[f], { x: w, y, data: x, reset: P } = await p({ x: u, y: d, initialPlacement: r, placement: m, strategy: a, middlewareData: h, rects: c, platform: l, elements: { reference: t, floating: e } });
    u = w ?? u, d = y ?? d, h = { ...h, [v]: { ...h[v], ...x } }, P && b <= 50 && (b++, typeof P == "object" && (P.placement && (m = P.placement), P.rects && (c = P.rects === !0 ? await l.getElementRects({ reference: t, floating: e, strategy: a }) : P.rects), { x: u, y: d } = tt(c, m, s)), f = -1);
  }
  return { x: u, y: d, placement: m, strategy: a, middlewareData: h };
};
function ve(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function xt(t) {
  return typeof t != "number" ? function(e) {
    return { top: 0, right: 0, bottom: 0, left: 0, ...e };
  }(t) : { top: t, right: t, bottom: t, left: t };
}
function de(t) {
  return { ...t, top: t.y, left: t.x, right: t.x + t.width, bottom: t.y + t.height };
}
async function Hn(t, e) {
  var n;
  e === void 0 && (e = {});
  const { x: r, y: a, platform: i, rects: l, elements: o, strategy: s } = t, { boundary: c = "clippingAncestors", rootBoundary: u = "viewport", elementContext: d = "floating", altBoundary: m = !1, padding: h = 0 } = ve(e, t), b = xt(h), f = o[m ? d === "floating" ? "reference" : "floating" : d], v = de(await i.getClippingRect({ element: (n = await (i.isElement == null ? void 0 : i.isElement(f))) == null || n ? f : f.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)), boundary: c, rootBoundary: u, strategy: s })), p = d === "floating" ? { ...l.floating, x: r, y: a } : l.reference, w = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), y = await (i.isElement == null ? void 0 : i.isElement(w)) && await (i.getScale == null ? void 0 : i.getScale(w)) || { x: 1, y: 1 }, x = de(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({ rect: p, offsetParent: w, strategy: s }) : p);
  return { top: (v.top - x.top + b.top) / y.y, bottom: (x.bottom - v.bottom + b.bottom) / y.y, left: (v.left - x.left + b.left) / y.x, right: (x.right - v.right + b.right) / y.x };
}
const Ie = Math.min, Zn = Math.max;
function Wn(t, e, n) {
  return Zn(t, Ie(e, n));
}
const Un = (t) => ({ name: "arrow", options: t, async fn(e) {
  const { x: n, y: r, placement: a, rects: i, platform: l, elements: o } = e, { element: s, padding: c = 0 } = ve(t, e) || {};
  if (s == null)
    return {};
  const u = xt(c), d = { x: n, y: r }, m = ge(a), h = Ae(m), b = await l.getDimensions(s), f = m === "y", v = f ? "top" : "left", p = f ? "bottom" : "right", w = f ? "clientHeight" : "clientWidth", y = i.reference[h] + i.reference[m] - d[m] - i.floating[h], x = d[m] - i.reference[m], P = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(s));
  let E = P ? P[w] : 0;
  E && await (l.isElement == null ? void 0 : l.isElement(P)) || (E = o.floating[w] || i.floating[h]);
  const F = y / 2 - x / 2, _ = E / 2 - b[h] / 2 - 1, D = Ie(u[v], _), I = Ie(u[p], _), A = D, S = E - b[h] - I, O = E / 2 - b[h] / 2 + F, te = Wn(A, O, S), ke = j(a) != null && O != te && i.reference[h] / 2 - (O < A ? D : I) - b[h] / 2 < 0 ? O < A ? A - O : S - O : 0;
  return { [m]: d[m] - ke, data: { [m]: te, centerOffset: O - te + ke } };
} }), Yn = ["top", "right", "bottom", "left"], nt = Yn.reduce((t, e) => t.concat(e, e + "-start", e + "-end"), []), Xn = { left: "right", right: "left", bottom: "top", top: "bottom" };
function rt(t) {
  return t.replace(/left|right|bottom|top/g, (e) => Xn[e]);
}
function Jn(t, e, n) {
  n === void 0 && (n = !1);
  const r = j(t), a = ge(t), i = Ae(a);
  let l = a === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return e.reference[i] > e.floating[i] && (l = rt(l)), { main: l, cross: rt(l) };
}
const Gn = { start: "end", end: "start" };
function Kn(t) {
  return t.replace(/start|end/g, (e) => Gn[e]);
}
const Qn = function(t) {
  return t === void 0 && (t = {}), { name: "autoPlacement", options: t, async fn(e) {
    var n, r, a;
    const { rects: i, middlewareData: l, placement: o, platform: s, elements: c } = e, { crossAxis: u = !1, alignment: d, allowedPlacements: m = nt, autoAlignment: h = !0, ...b } = ve(t, e), f = d !== void 0 || m === nt ? function(I, A, S) {
      return (I ? [...S.filter((O) => j(O) === I), ...S.filter((O) => j(O) !== I)] : S.filter((O) => oe(O) === O)).filter((O) => !I || j(O) === I || !!A && Kn(O) !== O);
    }(d || null, h, m) : m, v = await Hn(e, b), p = ((n = l.autoPlacement) == null ? void 0 : n.index) || 0, w = f[p];
    if (w == null)
      return {};
    const { main: y, cross: x } = Jn(w, i, await (s.isRTL == null ? void 0 : s.isRTL(c.floating)));
    if (o !== w)
      return { reset: { placement: f[0] } };
    const P = [v[oe(w)], v[y], v[x]], E = [...((r = l.autoPlacement) == null ? void 0 : r.overflows) || [], { placement: w, overflows: P }], F = f[p + 1];
    if (F)
      return { data: { index: p + 1, overflows: E }, reset: { placement: F } };
    const _ = E.map((I) => {
      const A = j(I.placement);
      return [I.placement, A && u ? I.overflows.slice(0, 2).reduce((S, O) => S + O, 0) : I.overflows[0], I.overflows];
    }).sort((I, A) => I[1] - A[1]), D = ((a = _.filter((I) => I[2].slice(0, j(I[0]) ? 2 : 3).every((A) => A <= 0))[0]) == null ? void 0 : a[0]) || _[0][0];
    return D !== o ? { data: { index: p + 1, overflows: E }, reset: { placement: D } } : {};
  } };
}, er = function(t) {
  return t === void 0 && (t = 0), { name: "offset", options: t, async fn(e) {
    const { x: n, y: r } = e, a = await async function(i, l) {
      const { placement: o, platform: s, elements: c } = i, u = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), d = oe(o), m = j(o), h = ge(o) === "x", b = ["left", "top"].includes(d) ? -1 : 1, f = u && h ? -1 : 1, v = ve(l, i);
      let { mainAxis: p, crossAxis: w, alignmentAxis: y } = typeof v == "number" ? { mainAxis: v, crossAxis: 0, alignmentAxis: null } : { mainAxis: 0, crossAxis: 0, alignmentAxis: null, ...v };
      return m && typeof y == "number" && (w = m === "end" ? -1 * y : y), h ? { x: w * f, y: p * b } : { x: p * b, y: w * f };
    }(e, t);
    return { x: n + a.x, y: r + a.y, data: a };
  } };
};
function R(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function $(t) {
  return R(t).getComputedStyle(t);
}
function wt(t) {
  return t instanceof R(t).Node;
}
function U(t) {
  return wt(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function C(t) {
  return t instanceof HTMLElement || t instanceof R(t).HTMLElement;
}
function at(t) {
  return typeof ShadowRoot < "u" && (t instanceof R(t).ShadowRoot || t instanceof ShadowRoot);
}
function le(t) {
  const { overflow: e, overflowX: n, overflowY: r, display: a } = $(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + r + n) && !["inline", "contents"].includes(a);
}
function tr(t) {
  return ["table", "td", "th"].includes(U(t));
}
function _e(t) {
  const e = De(), n = $(t);
  return n.transform !== "none" || n.perspective !== "none" || !!n.containerType && n.containerType !== "normal" || !e && !!n.backdropFilter && n.backdropFilter !== "none" || !e && !!n.filter && n.filter !== "none" || ["transform", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function De() {
  return !(typeof CSS > "u" || !CSS.supports) && CSS.supports("-webkit-backdrop-filter", "none");
}
function me(t) {
  return ["html", "body", "#document"].includes(U(t));
}
const it = Math.min, ae = Math.max, pe = Math.round, Y = (t) => ({ x: t, y: t });
function Pt(t) {
  const e = $(t);
  let n = parseFloat(e.width) || 0, r = parseFloat(e.height) || 0;
  const a = C(t), i = a ? t.offsetWidth : n, l = a ? t.offsetHeight : r, o = pe(n) !== i || pe(r) !== l;
  return o && (n = i, r = l), { width: n, height: r, $: o };
}
function H(t) {
  return t instanceof Element || t instanceof R(t).Element;
}
function Tt(t) {
  return H(t) ? t : t.contextElement;
}
function K(t) {
  const e = Tt(t);
  if (!C(e))
    return Y(1);
  const n = e.getBoundingClientRect(), { width: r, height: a, $: i } = Pt(e);
  let l = (i ? pe(n.width) : n.width) / r, o = (i ? pe(n.height) : n.height) / a;
  return l && Number.isFinite(l) || (l = 1), o && Number.isFinite(o) || (o = 1), { x: l, y: o };
}
const nr = Y(0);
function Et(t) {
  const e = R(t);
  return De() && e.visualViewport ? { x: e.visualViewport.offsetLeft, y: e.visualViewport.offsetTop } : nr;
}
function se(t, e, n, r) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const a = t.getBoundingClientRect(), i = Tt(t);
  let l = Y(1);
  e && (r ? H(r) && (l = K(r)) : l = K(t));
  const o = function(m, h, b) {
    return h === void 0 && (h = !1), !(!b || h && b !== R(m)) && h;
  }(i, n, r) ? Et(i) : Y(0);
  let s = (a.left + o.x) / l.x, c = (a.top + o.y) / l.y, u = a.width / l.x, d = a.height / l.y;
  if (i) {
    const m = R(i), h = r && H(r) ? R(r) : r;
    let b = m.frameElement;
    for (; b && r && h !== m; ) {
      const f = K(b), v = b.getBoundingClientRect(), p = getComputedStyle(b), w = v.left + (b.clientLeft + parseFloat(p.paddingLeft)) * f.x, y = v.top + (b.clientTop + parseFloat(p.paddingTop)) * f.y;
      s *= f.x, c *= f.y, u *= f.x, d *= f.y, s += w, c += y, b = R(b).frameElement;
    }
  }
  return de({ width: u, height: d, x: s, y: c });
}
function he(t) {
  return H(t) ? { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop } : { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
}
function Z(t) {
  var e;
  return (e = (wt(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function Ot(t) {
  return se(Z(t)).left + he(t).scrollLeft;
}
function ee(t) {
  if (U(t) === "html")
    return t;
  const e = t.assignedSlot || t.parentNode || at(t) && t.host || Z(t);
  return at(e) ? e.host : e;
}
function It(t) {
  const e = ee(t);
  return me(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : C(e) && le(e) ? e : It(e);
}
function _t(t, e) {
  var n;
  e === void 0 && (e = []);
  const r = It(t), a = r === ((n = t.ownerDocument) == null ? void 0 : n.body), i = R(r);
  return a ? e.concat(i, i.visualViewport || [], le(r) ? r : []) : e.concat(r, _t(r));
}
function ot(t, e, n) {
  let r;
  if (e === "viewport")
    r = function(a, i) {
      const l = R(a), o = Z(a), s = l.visualViewport;
      let c = o.clientWidth, u = o.clientHeight, d = 0, m = 0;
      if (s) {
        c = s.width, u = s.height;
        const h = De();
        (!h || h && i === "fixed") && (d = s.offsetLeft, m = s.offsetTop);
      }
      return { width: c, height: u, x: d, y: m };
    }(t, n);
  else if (e === "document")
    r = function(a) {
      const i = Z(a), l = he(a), o = a.ownerDocument.body, s = ae(i.scrollWidth, i.clientWidth, o.scrollWidth, o.clientWidth), c = ae(i.scrollHeight, i.clientHeight, o.scrollHeight, o.clientHeight);
      let u = -l.scrollLeft + Ot(a);
      const d = -l.scrollTop;
      return $(o).direction === "rtl" && (u += ae(i.clientWidth, o.clientWidth) - s), { width: s, height: c, x: u, y: d };
    }(Z(t));
  else if (H(e))
    r = function(a, i) {
      const l = se(a, !0, i === "fixed"), o = l.top + a.clientTop, s = l.left + a.clientLeft, c = C(a) ? K(a) : Y(1);
      return { width: a.clientWidth * c.x, height: a.clientHeight * c.y, x: s * c.x, y: o * c.y };
    }(e, n);
  else {
    const a = Et(t);
    r = { ...e, x: e.x - a.x, y: e.y - a.y };
  }
  return de(r);
}
function Ft(t, e) {
  const n = ee(t);
  return !(n === e || !H(n) || me(n)) && ($(n).position === "fixed" || Ft(n, e));
}
function rr(t, e, n) {
  const r = C(e), a = Z(e), i = n === "fixed", l = se(t, !0, i, e);
  let o = { scrollLeft: 0, scrollTop: 0 };
  const s = Y(0);
  if (r || !r && !i)
    if ((U(e) !== "body" || le(a)) && (o = he(e)), C(e)) {
      const c = se(e, !0, i, e);
      s.x = c.x + e.clientLeft, s.y = c.y + e.clientTop;
    } else
      a && (s.x = Ot(a));
  return { x: l.left + o.scrollLeft - s.x, y: l.top + o.scrollTop - s.y, width: l.width, height: l.height };
}
function lt(t, e) {
  return C(t) && $(t).position !== "fixed" ? e ? e(t) : t.offsetParent : null;
}
function st(t, e) {
  const n = R(t);
  if (!C(t))
    return n;
  let r = lt(t, e);
  for (; r && tr(r) && $(r).position === "static"; )
    r = lt(r, e);
  return r && (U(r) === "html" || U(r) === "body" && $(r).position === "static" && !_e(r)) ? n : r || function(a) {
    let i = ee(a);
    for (; C(i) && !me(i); ) {
      if (_e(i))
        return i;
      i = ee(i);
    }
    return null;
  }(t) || n;
}
const ar = { convertOffsetParentRelativeRectToViewportRelativeRect: function(t) {
  let { rect: e, offsetParent: n, strategy: r } = t;
  const a = C(n), i = Z(n);
  if (n === i)
    return e;
  let l = { scrollLeft: 0, scrollTop: 0 }, o = Y(1);
  const s = Y(0);
  if ((a || !a && r !== "fixed") && ((U(n) !== "body" || le(i)) && (l = he(n)), C(n))) {
    const c = se(n);
    o = K(n), s.x = c.x + n.clientLeft, s.y = c.y + n.clientTop;
  }
  return { width: e.width * o.x, height: e.height * o.y, x: e.x * o.x - l.scrollLeft * o.x + s.x, y: e.y * o.y - l.scrollTop * o.y + s.y };
}, getDocumentElement: Z, getClippingRect: function(t) {
  let { element: e, boundary: n, rootBoundary: r, strategy: a } = t;
  const i = [...n === "clippingAncestors" ? function(s, c) {
    const u = c.get(s);
    if (u)
      return u;
    let d = _t(s).filter((f) => H(f) && U(f) !== "body"), m = null;
    const h = $(s).position === "fixed";
    let b = h ? ee(s) : s;
    for (; H(b) && !me(b); ) {
      const f = $(b), v = _e(b);
      v || f.position !== "fixed" || (m = null), (h ? !v && !m : !v && f.position === "static" && m && ["absolute", "fixed"].includes(m.position) || le(b) && !v && Ft(s, b)) ? d = d.filter((p) => p !== b) : m = f, b = ee(b);
    }
    return c.set(s, d), d;
  }(e, this._c) : [].concat(n), r], l = i[0], o = i.reduce((s, c) => {
    const u = ot(e, c, a);
    return s.top = ae(u.top, s.top), s.right = it(u.right, s.right), s.bottom = it(u.bottom, s.bottom), s.left = ae(u.left, s.left), s;
  }, ot(e, l, a));
  return { width: o.right - o.left, height: o.bottom - o.top, x: o.left, y: o.top };
}, getOffsetParent: st, getElementRects: async function(t) {
  let { reference: e, floating: n, strategy: r } = t;
  const a = this.getOffsetParent || st, i = this.getDimensions;
  return { reference: rr(e, await a(n), r), floating: { x: 0, y: 0, ...await i(n) } };
}, getClientRects: function(t) {
  return Array.from(t.getClientRects());
}, getDimensions: function(t) {
  return Pt(t);
}, getScale: K, isElement: H, isRTL: function(t) {
  return getComputedStyle(t).direction === "rtl";
} }, ir = (t, e, n) => {
  const r = /* @__PURE__ */ new Map(), a = { platform: ar, ...n }, i = { ...a.platform, _c: r };
  return zn(t, e, { ...a, platform: i });
};
const or = N({
  name: "ZBasePopover",
  props: Bn,
  emits: ["update:modelValue"],
  setup(t, {
    slots: e,
    attrs: n
  }) {
    const {
      host: r,
      modelValue: a,
      showArrow: i,
      placement: l
    } = M(t), o = L(), s = L(), c = () => {
      const d = [];
      i.value && (d.push(er(8)), d.push(Un({
        element: o.value
      }))), l.value || d.push(Qn()), ir(r.value, s.value, {
        middleware: d,
        placement: l.value || "bottom"
      }).then(({
        x: m,
        y: h,
        middlewareData: b
      }) => {
        if (Object.assign(s.value.style, {
          left: m + "px",
          top: h + "px"
        }), i.value) {
          const {
            x: f,
            y: v
          } = b.arrow, p = l.value.split("-")[0], w = {
            top: "bottom",
            left: "right",
            right: "left",
            bottom: "top"
          }[p], y = ["top", "right", "bottom", "left"], x = y.indexOf(p) - 1, P = y[x < 0 ? x + 4 : x];
          Object.assign(o.value.style, {
            left: f + "px",
            top: v + "px",
            [w]: "-4px",
            [`border-${p}-color`]: "transparent",
            [`border-${P}-color`]: "transparent"
          });
        }
      });
    }, u = new MutationObserver(() => c());
    return Q(
      a,
      (d) => {
        d ? (pt(c), r.value && u.observe(r.value, {
          attributes: !0
        }), window.addEventListener("resize", c), window.addEventListener("scroll", c)) : (u.disconnect(), window.removeEventListener("resize", c), window.removeEventListener("scroll", c));
      },
      //第一次就监听
      {
        immediate: !0
      }
    ), dt(() => {
      u.disconnect(), window.removeEventListener("resize", c), window.removeEventListener("scroll", c);
    }), () => {
      var d;
      return g(Se, null, [a.value && g("div", W({
        ref: s,
        class: "s-base-popover"
      }, n), [(d = e.default) == null ? void 0 : d.call(e), i.value && g("div", {
        class: "s-base-popover__arrow",
        ref: o
      }, null)])]);
    };
  }
});
const ct = N({
  name: "ZPopover",
  props: jn,
  emits: ["update:modelValue"],
  setup(t, {
    slots: e
  }) {
    const {
      modelValue: n,
      title: r
    } = M(t);
    return () => g(Se, null, [n.value && // 将所需要的数据使用props透传给base-popover
    g(or, W({
      class: "s-popover"
    }, t), {
      default: () => {
        var a;
        return [g("h4", {
          class: "s-popover__title"
        }, [r.value]), (a = e.default) == null ? void 0 : a.call(e)];
      }
    })]);
  }
}), lr = {
  install(t) {
    t.component(ct.name, ct);
  }
}, sr = {
  data: {
    type: Array,
    default: () => []
  }
};
const ut = N({
  name: "ZTable",
  props: sr,
  emits: ["selection-change"],
  setup(t, {
    slots: e,
    emit: n
  }) {
    const {
      data: r
    } = M(t), a = L([]);
    z("column-data", a), Q(
      r,
      (o) => {
        const s = o.filter((c) => c.checked);
        s.length === r.value.length ? (i.value = !0, l.value = !1) : s.length === 0 ? (i.value = !1, l.value = !1) : l.value = !0, n("selection-change", s);
      },
      //深度监听
      {
        deep: !0
      }
    );
    const i = L(r.value.every((o) => o.checked));
    z("all-checked", i), Q(i, (o) => {
      r.value.forEach((s) => {
        s.checked = o;
      });
    });
    const l = L(r.value.some((o) => o.checked && !i.value));
    return z("is-indeterminate", l), () => {
      var o;
      return g("table", {
        class: "s-table"
      }, [g("thead", null, [g("tr", null, [(o = e.default) == null ? void 0 : o.call(e)])]), g("tbody", null, [r.value.map((s) => g("tr", null, [a.value.map((c, u) => {
        var m, h, b;
        const d = (m = e.default) == null ? void 0 : m.call(e)[u];
        return d != null && d.children ? g("td", null, [(b = (h = d == null ? void 0 : d.children).default) == null ? void 0 : b.call(h, s)]) : c.field ? g("td", null, [s[c.field]]) : c.type === "selection" ? Fe(g("input", {
          type: "checkbox",
          "onUpdate:modelValue": (f) => s.checked = f
        }, null), [[Le, s.checked]]) : "";
      })]))])]);
    };
  }
}), cr = {
  field: {
    type: String,
    default: ""
  },
  header: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: ""
  }
}, ft = N({
  name: "ZColumn",
  props: cr,
  setup(t) {
    const {
      field: e,
      header: n,
      type: r
    } = M(t);
    B("column-data").value.push({
      field: e.value,
      header: n.value,
      type: r.value
    });
    const i = B("all-checked"), l = B("is-indeterminate"), o = L();
    return pt(() => {
      o.value && (o.value.indeterminate = l.value);
    }), Q(l, () => {
      if (o.value)
        o.value.indeterminate = l.value;
      else
        return;
    }, {
      immediate: !0
    }), () => g("th", null, [r.value === "selection" ? Fe(g("input", {
      type: "checkbox",
      ref: o,
      "onUpdate:modelValue": (s) => i.value = s
    }, null), [[Le, i.value]]) : n.value]);
  }
}), ur = {
  install(t) {
    t.component(ut.name, ut), t.component(ft.name, ft);
  }
}, fr = [
  Nt,
  zt,
  Ut,
  Fn,
  qn,
  Dn,
  Vn,
  $n,
  lr,
  ur
], pr = {
  install(t) {
    fr.forEach((e) => t.use(e));
  }
};
export {
  Re as Button,
  ft as Column,
  ze as Form,
  Ke as Icon,
  Je as Input,
  Ge as Modal,
  Be as Pagination,
  ct as Popover,
  et as Tab,
  ut as Table,
  Qe as Tabs,
  je as Tree,
  pr as default
};
