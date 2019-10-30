<template>
    <div>
      <loading :active.sync="isLoading"></loading> 
      <!-- 加入loading-overlay效果 -->
        <div class="text-right mt-4">
          <button class="btn-primary" @click="openModal(true)">建立新的產品</button> 
          <!-- openModal(isNew)以判斷開啟哪個Modal -->
        </div>
        <table class="table mt-4">
          <thead>
            <th width="120">分類</th>
            <th width>產品名稱</th>
            <th width="120">原價</th>
            <th width="120">售價</th>
            <th width="100">是否啟用</th>
            <th width="140">編輯</th>
          </thead>
          <tbody>
            <tr v-for="(item, key) in products" :key="item.id">
              <td>{{item.category}}</td>
              <td>{{item.title}}</td>
              <td class="text-right">
                {{item.origin_price | currency}} 
              </td>
              <td class="text-right">
                {{item.price | currency}}
              </td>
              <td class="text-right">
                <span v-if="item.is_enable" class="text-success">啟用</span>
                <span v-else="">未啟用</span>
              </td>
              <td>
                <!-- <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button> -->
                <div class="btn-group">
                  <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
                  <button class="btn btn-outline-danger btn-sm" @click="openDelProductModal(item)">刪除</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous" :class="{'disabled': !pagination.has_pre}" @click.prevent="getProducts(pagination.current_page - 1)"> 
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </a>
            </li>
            <li class="page-item" v-for="page in pagination.total_pages" :key="page"
            :class="{'active':pagination.current_page === page}">
              <a class="page-link" href="#" @click.prevent="getProducts(page)">{{page}}</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next" :class="{'disabled': !pagination.has_next}" @click.prevent="getProducts(pagination.current_page + 1)">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>

        <Pagination :pages="pagination" @emitPages="getProducts"></Pagination>

        <!-- Modal -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content border-0">
              <div class="modal-header bg-dark text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                  <span>新增產品</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-group">
                        <label for="image">輸入圖片網址</label>
                        <input type="text" class="form-control" id="image" v-model="tempProduct.imageUrl" placeholder="請輸入圖片連結">
                    </div>
                    <div class="form-group">
                      <label for="customFile">或 上傳圖片
                          <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                          <!-- 綁定fileUploading讀取效果 -->
                      </label>
                      <input type="file" id="customFile" class="form-control" @change="uploadFile()" ref="files">
                    </div>
                    <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
                  </div>
                  <div class="col-sm-8">
                    <div class="form-group">
                      <label for="title">標題</label>
                      <input type="text" class="form-control" id="title" v-model="tempProduct.title" placeholder="請輸入標題">
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="category">分類</label>
                        <input type="text" class="form-control" id="category" v-model="tempProduct.category" placeholder="請輸入分類">
                      </div>
                      <div class="form-group col-md-6">
                        <label for="price">單位</label>
                        <input type="unit" class="form-control" id="unit" v-model="tempProduct.unit" placeholder="請輸入單位">
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="origin_price">原價</label>
                        <input type="number" class="form-control" id="origin_price" v-model="tempProduct.origin_price" placeholder="請輸入原價">
                      </div>
                      <div class="form-group col-md-6">
                        <label for="price">售價</label>
                        <input type="number" class="form-control" id="price" v-model="tempProduct.price" placeholder="請輸入售價">
                      </div>
                    </div>
                    <hr>
                    <div class="form-group">
                      <label for="description">產品描述</label>
                      <textarea type="text" class="form-control" id="description" v-model="tempProduct.description" placeholder="請輸入產品描述"></textarea>
                    </div>
                    <div class="form-group">
                      <label for="content">說明內容</label>
                      <textarea type="text" class="form-control" id="content" v-model="tempProduct.content" placeholder="請輸入產品說明內容"></textarea>
                    </div>
                    <div class="form-group">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="tempProduct.is_enabled" :true-value="1" :false-value="0" id="is_enabled">
                        <label class="form-check-label" for="is_enabled">
                            是否啟用
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 新增確認刪除Modal -->
        <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content border-0">
              <div class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                  <span>刪除產品</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger"
                  @click="delProduct">確認刪除</button>
              </div>
            </div>
          </div>
        </div>

    </div>
</template>

<script>
import $ from 'jquery'; //將jQuery的$用法載入
import Pagination from '../Pagination';

export default {
    data(){
      return {
          products:[], //return的內容為一陣列
          pagination:[], //新增分頁
          tempProduct:{},
          isNew : false,
          isLoading: false, //loading-overlay預設為關閉
          status: { //定義font-awesome的上傳狀態
            fileUploading: false,
          },
      };
    },
    methods:{
      getProducts(page = 1){ //ES6: page的預設值為1
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`; //建立api的變數
        const vm = this;
        vm.isLoading = true; //啟動getProducts時啟用isLoading效果
        this.$http.get(api).then((response) => {
          console.log("getProducts:"+response.data);
          // if(response.data.success){
            vm.isLoading = false; //關閉getProducts時關閉isLoading效果
            vm.products = response.data.products;
            vm.pagination = response.data.pagination;
          // }
        });
      },
      openModal(isNew,item){ //可傳入是否為新（isNew）跟項目(item)參數 
        if(isNew){
          this.tempProduct={};
          this.isNew=true;
        }else{
          this.tempProduct=Object.assign({},item); //使用Object.assign將item傳入一新增的空物件中，避免物件傳參考的特性影響tempProduct的值
          this.isNew=false;
        }
        $('#productModal').modal('show'); //於bootstrap的document中找到method用法
      },
      updateProduct(){
        let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`; //建立api的變數
        let httpMethod = 'post';
        const vm = this;
        if(!vm.isNew){
          api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
          httpMethod = 'put';
        }
        this.$http[httpMethod](api, {data:vm.tempProduct}).then((response) => {
          //注意：此為{data:vm .tempProduct}物件包裹形式，非直接寫vm.tempProduct（對照上面的data格式）
        console.log(response.data);
        if(response.data.success){
          $('#productModal').modal('hide');
          vm.getProducts();
        }else{
          $('#productModal').modal('hide');
          vm.getProducts();
          console.log('新增失敗');
        }
        });
      },
      openDelProductModal(item) {
      const vm = this;
      $('#delProductModal').modal('show'); //開啟delProductModal
      vm.tempProduct = Object.assign({}, item); //將編輯後的temProduct資料寫入item中
      },
      delProduct() {
        const vm = this;
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        this.$http.delete(url).then((response) => {
          console.log(response, vm.tempProduct);
          $('#delProductModal').modal('hide'); //關閉delPrroductModal
          vm.isLoading = false;
          this.getProducts();
        });
      },
      uploadFile(){
        console.log(this);
        const uploadedFile = this.$refs.files.files[0]; // 注意有兩層files
        const vm = this;
        const formData = new FormData(); //新增formData的WebApi
        formData.append('file-to-upload', uploadedFile); //使用.append()新增欄位'file-to-upload'
        // formData的document: https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`; //定義上傳路徑
        vm.status.fileUploading = true; //啟動uploadFile()的AJAX時啟用讀取效果
        this.$http.post(url,formData,{
          headers:{
            'Content-Type': 'multipart/form-data', //符合formData格式
          },
        }).then((response) => {
          console.log(response.data);
          vm.status.fileUploading = false; //結束uploadFile()的AJAX時關閉讀取效果
          if(response.data.success){ //當成功傳遞圖片資料時
            // vm.tempProduct.imageUrl = response.data.imageUrl;
            // console.log(vm.tempProduct); //此寫法不包含vue的getter與setter故改為下列寫法
            vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl); 
          }else{
            this.$bus.$emit('message:push', response.data.message, 'danger');
          }
        });
      },
    },
    components: {
    Pagination,
  },
    created(){ //建立creted hook 啟動getProducts();
      this.getProducts();
      // this.$bus.$emit('message:push','這裡是訊息','success'); //將訊息方法emit出去，格式為(方法,訊息,BS樣式)
    },
}
</script>