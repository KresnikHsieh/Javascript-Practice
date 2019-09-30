<template>
    <div>
        <Navbar></Navbar>
        <Alert></Alert>
        <div class="container-fluid">
            <div class="row">
                
                <Sidebar></Sidebar>    
                
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <router-view></router-view> 
                    <!-- 加入Products.vue的router-view -->
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from "./Sidebar" //掛載Sidebar元件
import Navbar from "./Navbar" //掛載Navbar元件
import Alert from "./AlertMessage" //掛載AlterMessage元件

export default {
    components:{
        Sidebar, //Sidebar元件
        Navbar, //Navbar元件
        Alert,
    }
}
</script>
