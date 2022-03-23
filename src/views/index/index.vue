<template>
    <div class="index">
        <head-box></head-box>
        
    </div>
</template>
<script>
import headBox from '@/components/head/Head.vue'
import {login} from '@/api/login'
export default {
    components:{
        headBox
    },
    created(){
        let user = null;
        try {
            user = JSON.parse(localStorage.getItem('user'));
        } catch (error) {
        }
        if(user){
            login(user).then(res =>{
                if(res.data){
                    this.$store.commit('index/updateIsLogin',true)
                    this.$store.dispatch('userInfo/obtainUserInfo',user.userAccount)
                }
            })
        }
    }
}
</script>
<style scoped>
    .index{
        width: 100%;
    }
</style>