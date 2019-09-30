<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    // const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`; //建立api的變數
    // //api路徑
    // //申請的api path
    // this.$http.get(api).then((response) => {
    // console.log(response.data);
    // });
  },
}
</script>

<style lang="scss">
@import "./assets/all.scss"; //.scss可省略

#app{
  text-align: center;
}
</style>
