export default {
  methods: {
    $_validateMixin_refs (refs) {
      // validate all input fields
      const data = refs.map((item) => {
        if (!this.$refs[item]) {
          return true
        } else {
          const data = this.$refs[item].validate()
          return data !== undefined
        }
      })
      return data.every(item => !!item)
    },
    $_validateMixin_reset (refs) {
      const data = refs.map((item) => {
        if (!this.$refs[item]) {
          return true
        } else {
          const data = this.$refs[item].resetValidate()
          return data !== undefined
        }
      })
      return data.every(item => !!item)
    }
  }
}
