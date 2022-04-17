export const homeChildren = {
	data(){
		return{
			isOtherUser:false
		}
	},
  computed: {
    user() {
      if (
        this.userAccount != this.$store.state.userInfo.user.userInfo.userAccount
      ) {
        this.isOtherUser = true
        return this.$store.state.home.user
      } else {
        this.isOtherUser = false
        return this.$store.state.userInfo.user
      }
    },
    userPrivacy() {
      return this.user.userInfo.userPrivacy.split('')
    },
  }
}