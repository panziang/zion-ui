;(function (e, t) {
  typeof exports == 'object' && typeof module < 'u'
    ? t(exports, require('vue'))
    : typeof define == 'function' && define.amd
    ? define(['exports', 'vue'], t)
    : ((e = typeof globalThis < 'u' ? globalThis : e || self),
      t((e.index = {}), e.Vue))
})(this, function (e, t) {
  'use strict'
  const s = {
      type: { type: String, default: 'secondary' },
      size: { type: String, default: 'medium' },
      disabled: { type: Boolean, default: !1 },
      block: { type: Boolean, default: !1 }
    },
    n = t.defineComponent({
      name: 'ZButton',
      props: s,
      setup(o, { slots: u }) {
        const { type: l, size: i, disabled: a, block: f } = t.toRefs(o)
        return () => {
          const c = u.default ? u.default() : '按钮',
            p = f.value ? 's-btn--block' : ''
          return t.createVNode(
            'button',
            {
              disabled: a.value,
              class: `s-btn s-btn--${l.value} s-btn--${i.value} ${p}`
            },
            [c]
          )
        }
      }
    }),
    d = {
      install(o) {
        o.component(n.name, n)
      }
    }
  ;(e.Button = n),
    (e.default = d),
    Object.defineProperties(e, {
      __esModule: { value: !0 },
      [Symbol.toStringTag]: { value: 'Module' }
    })
})
