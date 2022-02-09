import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";
import pagination from "./pagination.js"
import modals from "./modals.js"

// define modal
let productModal = null
let delProductModal = null

const app = createApp({
    components:{
        pagination,
        modals
    },
    data() {
        return {
            baseURL: 'https://vue3-course-api.hexschool.io/v2/',
            basePath: 'scott',
            products: {},
            temp:{
                imagesUrl: []
            },
            isNew: false,
            pagination: {},
        }
    },
    mounted() {
        // check token
        const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)scoToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = myCookie;
        this.userCheck()

        // create modal 
        productModal = new bootstrap.Modal(document.querySelector('#productModal'))
        delProductModal = new bootstrap.Modal(document.querySelector('#delProductModal'))

        // 
    },
    methods:{
        modalSelector(type) {
            if(type === 'post' || type === 'put'){
                productModal.hide()
                
            }
            else if(type === 'delete') {
                delProductModal.hide()
                
            }
            
        },
        // user check
        userCheck(){
            const url = `${this.baseURL}api/user/check`
            axios.post(url)
            .then(res => {
                console.log('userCheck',res.data.success);
                this.getProducts()

            })
            .catch(err => {
                // console.error(err); 
                // back to login.html
                alert(err.data.message)
                setTimeout(() => {
                    window.location = 'login.html'
                }, 2000);
            })
        },
        // get product
        getProducts(page = 1){
            // https://vue3-course-api.hexschool.io/v2/api/scott/admin/products/all
            // https://vue3-course-api.hexschool.io/v2/api/scott/admin/products?page=1
            const url = `${this.baseURL}api/${this.basePath}/admin/products?page=${page}`
            axios.get(url)
            .then(res => {
                console.log(res)
                const {pagination, products} = res.data;
                this.products = products
                this.pagination = pagination
            })
            .catch(err => {
                console.error(err); 
            })
        },
        // open modal & get target data
        openModal(type, product){
            if(type === 'add'){
                productModal.show()
                this.isNew = true
                // clean temp
                this.temp = {
                    imagesUrl:[],
                    
                }
            }
            else if(type === 'edit') {
                productModal.show()
                this.isNew = false
                this.temp = {
                    imagesUrl:[],
                    ...product
                }
            }
            else if(type === 'del') {
                delProductModal.show()
                this.isNew = false
                this.temp = {
                    imagesUrl:[],
                    ...product
                }
            }
        },
        
    }
})



app.mount('#app')