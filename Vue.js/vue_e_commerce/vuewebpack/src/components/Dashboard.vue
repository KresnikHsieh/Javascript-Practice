<template>
    <div>
        <Navbar></Navbar>
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
import Sidebar from "./Sidebar" //匯入Sidebar元件
import Navbar from "./Navbar" //匯入Navbar元件


export default {
    components:{
        Sidebar, //Sidebar元件
        Navbar, //Navbar元件
    }
}
</script>
