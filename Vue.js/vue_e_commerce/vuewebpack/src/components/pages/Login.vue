<template>
  <div>
    <img src="../../assets/logo.png">
    <form class="form-signin" @submit.prevent="signin"> 
        <!-- 直接在form上面綁定submit事件-->
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" class="sr-only" >Email address</label>
        <input type="email" id="inputEmail" class="form-control" v-model="user.username" placeholder="Email address" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" v-model="user.password" placeholder="Password" required>
        <div class="checkbox mb-3">
            <label>
            <input type="checkbox" value="remember-me"> Remember me
            </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <p class="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
        </form>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return{
        user:{ // 在data中建立user的資料
        username:'hexscholl@test.com',
        password:'zzxxccvv',
        },
    };
  },
  methods:{ //建立登入事件
    signin(){
        const api = `${process.env.APIPATH}/admin/signin`; //建立signin api的變數
        //api路徑
        //申請的api path
        const vm = this;
        this.$http.post(api, vm.user).then((response) => { //使用post傳入使用者資料vm.user
            console.log(response.data);
            if(response.data.success){
                vm.$router.push('/admin/products'); // 如果登入成功，則將路徑指向admin/products
            }
        });
    },
  },
}
</script>

<style scoped>
    html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>

