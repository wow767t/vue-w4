export default {
    data() {
        return {
            baseURL: 'https://vue3-course-api.hexschool.io/v2/',
            basePath: 'scott',
        }
    },
    mounted() {
        // console.log(mainImgDom)
    },
    props: ['isNew', 'temp'],
    emits: ['modal-hide', 'get-products'],
    methods: {
        uploadEvent(img, key) {
            let inputFile = document.querySelector('#inputFile')
            let file = inputFile.files[0]
            let formData = new FormData()
            formData.append("file-to-upload", file)

            axios.post('https://vue3-course-api.hexschool.io/v2/api/scott/admin/upload', formData)
                .then(res => {
                    console.log(res)
                    let uploadImg = res.data.imageUrl
                    if (img === "main") {
                        this.temp.imageUrl = uploadImg
                    }
                    else if (img === "other") {
                        this.temp.imagesUrl[key] = uploadImg
                    }
                })
                .catch(err => {
                    console.dir(err);
                })
        },
        // add, edit, del
        btnAction(type) {
            const obj = {
                data: {
                    ...this.temp
                }
            }
            if (type === 'add') {
                const method = "post"
                const url = `${this.baseURL}api/${this.basePath}/admin/product`
                this.selectAxios(method, url, obj)
            }
            else if (type === 'edit') {
                const method = "put"
                const id = this.temp.id
                const url = `${this.baseURL}api/${this.basePath}/admin/product/${id}`
                this.selectAxios(method, url, obj)
            }
            else if (type === 'del') {
                const method = "delete"
                const id = this.temp.id
                const url = `${this.baseURL}api/${this.basePath}/admin/product/${id}`
                this.selectAxios(method, url)
            }
        },
        selectAxios(method, url, obj) {
            axios[method](url, obj)
                .then(res => {
                    console.log(res)
                    console.log(method)
                    alert(res.data.message)
                    this.$emit('get-products')
                    if (method === "post") {
                        this.$emit('modal-hide', method)
                        // productModal.hide()
                    }
                    else if (method === "put") {
                        // productModal.hide()
                        this.$emit('modal-hide', method)
                    }
                    else if (method === "delete") {
                        // delProductModal.hide()
                        this.$emit('modal-hide', method)
                    }
                })
                .catch(err => {
                    console.error(err);
                    alert(err.data.message)
                })
        }
    },
    template: `
    <div id="productModal" ref="productModal" class="modal fade" tabindex="-1"
                aria-labelledby="productModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content border-0">
                        <div class="modal-header bg-dark text-white">
                            <h5 id="productModalLabel" class="modal-title">
                                <span v-if="isNew">新增產品</span>
                                <span v-else>編輯產品</span>
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="mb-2">
                                        <div class="mb-3">
                                            <label for="imageUrl" class="form-label">輸入圖片網址</label>
                                            <input v-model="temp.imageUrl" type="text" class="form-control"
                                                placeholder="請輸入圖片連結">
                                        </div>
                                        <div class="mb-3">
                                            <label for="imageUrl" class="form-label"></label>
                                            <input  type="file" class="form-control" id="inputFile"
                                                @change="uploadEvent('main')"
                                                placeholder="本機上傳">
                                        </div>
                                        <img class="img-fluid" :src="temp.imageUrl" alt="">
                                    </div>

                                    <div>
                                        <div v-for="(img, key) in temp.imagesUrl" class="mb-3">
                                                <label for="" class="form-label"></label>
                                                <input 
                                                    v-model="temp.imagesUrl[key]" type="text" class="form-control mb-3"
                                                    placeholder="輸入圖片網址">
                                                    <div class="mb-3">

                                                <label for="imageUrl" class="form-label"></label>
                                                <input  type="file" class="form-control" id="inputFile"
                                                    @change="uploadEvent('other', key)"
                                                    placeholder="本機上傳">
                                        </div>
                                            <img class="img-fluid" :src="temp.imagesUrl[key]" alt="">
                                        </div>

                                        <button 
                                            v-if="!temp.imagesUrl.length || temp.imagesUrl[temp.imagesUrl.length -1]"
                                            @click="temp.imagesUrl.push('')"
                                            class="mb-3 btn btn-outline-primary btn-sm d-block w-100">
                                            新增圖片
                                        </button>
                                        <button 
                                            @click="temp.imagesUrl.pop()"
                                            class="mb-3 btn btn-outline-danger btn-sm d-block w-100">
                                            刪除圖片
                                        </button>
                                    </div>
                                    
                                </div>
                                <div class="col-sm-8">
                                    <div class="mb-3">
                                        <label for="title" class="form-label">標題</label>
                                        <input v-model="temp.title" id="title" type="text" class="form-control"
                                            placeholder="請輸入標題">
                                    </div>

                                    <div class="row">
                                        <div class="mb-3 col-md-6">
                                            <label for="category" class="form-label">分類</label>
                                            <input v-model="temp.category" id="category" type="text"
                                                class="form-control" placeholder="請輸入分類">
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="price" class="form-label">單位</label>
                                            <input v-model="temp.unit" id="unit" type="text" class="form-control"
                                                placeholder="請輸入單位">
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="mb-3 col-md-6">
                                            <label for="origin_price" class="form-label">原價</label>
                                            <input v-model.number="temp.origin_price" id="origin_price" type="number" min="0"
                                                class="form-control" placeholder="請輸入原價">
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="price" class="form-label">售價</label>
                                            <input v-model.number="temp.price" id="price" type="number" min="0"
                                                class="form-control" placeholder="請輸入售價">
                                        </div>
                                    </div>
                                    <hr>

                                    <div class="mb-3">
                                        <label for="description" class="form-label">產品描述</label>
                                        <textarea v-model="temp.description" id="description" type="text"
                                            class="form-control" placeholder="請輸入產品描述">
                    </textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label for="content" class="form-label">說明內容</label>
                                        <textarea v-model="temp.content" id="description" type="text"
                                            class="form-control" placeholder="請輸入說明內容">
                    </textarea>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check">
                                            <input v-model="temp.is_enabled" id="is_enabled" class="form-check-input"
                                                type="checkbox" :true-value="1" :false-value="0">
                                            <label class="form-check-label" for="is_enabled">是否啟用</label>
                                        </div>
                                    </div>

                                    <div class="">
                                    <label for="content" class="form-label">客戶評價</label>
                                    </div>
                                    <div class="mb-3 ">
                                    <div class="form-check form-check-inline">
                                        <input 
                                            v-model='temp.feedBack'
                                            class="form-check-input" type="radio" name="inlineRadioOptions"
                                            id="inlineRadio1" value="非常滿意">
                                        <label class="form-check-label" for="inlineRadio1">非常滿意</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input
                                            v-model="temp.feedBack"
                                            class="form-check-input" type="radio" name="inlineRadioOptions"
                                            id="inlineRadio2" value="滿意">
                                        <label class="form-check-label" for="inlineRadio2">滿意</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input 
                                            v-model="temp.feedBack"
                                            class="form-check-input" type="radio" name="inlineRadioOptions"
                                            id="inlineRadio3" value="普通">
                                        <label class="form-check-label" for="inlineRadio3">普通</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input 
                                            v-model="temp.feedBack"
                                            class="form-check-input" type="radio" name="inlineRadioOptions"
                                            id="inlineRadio4" value="不滿意">
                                        <label class="form-check-label" for="inlineRadio4">不滿意</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input 
                                            v-model="temp.feedBack"
                                            class="form-check-input" type="radio" name="inlineRadioOptions"
                                            id="inlineRadio5" value="非常不滿意">
                                        <label class="form-check-label" for="inlineRadio5">非常不滿意</label>
                                    </div>
                                </div>

                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                取消
                            </button>
                            <button 
                                v-if="isNew"
                                @click="btnAction('add')"
                                type="button" class="btn btn-primary">
                                確認
                            </button>
                            <button
                                v-else
                                @click="btnAction('edit')"
                                type="button" class="btn btn-warning">
                                確認
                            </button>
                        </div>
                    </div>
                </div>
            </div>

    <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
    aria-labelledby="delProductModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
                <h5 id="delProductModalLabel" class="modal-title">
                    <span>刪除產品</span>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                是否刪除
                <strong class="text-danger"></strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                    取消
                </button>
                <button 
                    @click="btnAction('del')"
                    type="button" class="btn btn-danger">
                    確認刪除
                </button>
            </div>
        </div>
    </div>
</div>
    `
}