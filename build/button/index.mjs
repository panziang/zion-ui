import { defineComponent as c, toRefs as p, createVNode as b } from "vue";
const f = {
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
}, n = /* @__PURE__ */ c({
  name: "ZButton",
  props: f,
  setup(e, {
    slots: t
  }) {
    const {
      type: o,
      size: l,
      disabled: a,
      block: s
    } = p(e);
    return () => {
      const u = t.default ? t.default() : "按钮", d = s.value ? "s-btn--block" : "";
      return b("button", {
        disabled: a.value,
        class: `s-btn s-btn--${o.value} s-btn--${l.value} ${d}`
      }, [u]);
    };
  }
}), i = {
  install(e) {
    e.component(n.name, n);
  }
};
export {
  n as Button,
  i as default
};
