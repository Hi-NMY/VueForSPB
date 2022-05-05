export const listLoad = {
	data(){
		return{
			isload: false,
		}
	},
  methods: {
    load(){
      if (this.isload) {
        return
      }
      this.isload = true
      this.obtainData() 
    },
    loadAfter() {
      this.isload = false
    },
  },
  mounted() {
    this.$bus.$on('load', this.load)
  },
}