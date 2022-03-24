<template>
    <div class="hotTopic">
        <div class="head">
            <div class="head_left">
                热门话题
            </div>
            <div class="head_right">
                <i class="el-icon-refresh"></i>
                换一批
            </div>
        </div>
        <div class="content">
            <ol type="1" v-for="totTopic in totTopics" :key="totTopic.id">
                <li>
                    <span class="message">
<!--                        <span class="i">1</span>-->
                        {{totTopic.topicName}}
                    </span>
                    <span class="num">{{totTopic.topicBarNum}}</span>
                </li>
<!--                <li><span class="message">22222222</span><span class="num">44万</span></li>-->
<!--                <li><span class="message">3333333333</span><span class="num">44万</span></li>-->
<!--            -->
            </ol>
            <div class="more">
                查看更多热门话题
            </div>
        </div>
    </div>
</template>

<script>
    import * as api from "../../api/index";
    export default {
        name: "HotTopic",
        data: function () {
            return {
                totTopics:[]
            }
        },
        created() {
            this.findUsers();

        },
        methods: {
            findUsers: function () {
                // this.$api.index.randomUser().then((res) => {
                api.hotTopic().then(res => {
                    //console.log(res)
                    this.totTopics = res.data;
                    console.log(this.totTopics)
                })
            }

        }
    }

</script>

<style scoped>
    .hotTopic{
        /*height: 420px;*/
        border-radius: 10px;
        width: 100%;
        padding: 20px;
        background-color: white;
        margin-top: 15px;
    }
    .head{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 25px;
        color: gray;
    }
    .content ol{
        /*list-style-type: none;*/

    }
    .content ol li{
        height: 45px;
        border-bottom: 1px solid rgb(247,247,247);
        line-height: 45px;
        font-size: 14px;
        color: grey;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .content ol li .message{
        /*font-size: 18px;*/
        display: inline-block;
        color: black;
        width: 70%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .content ol li .num{
        display: inline-block;
        margin-right: 5px;
    }
    .more{
        text-align: center;
        margin-top: 20px;
        color: grey;

    }
</style>