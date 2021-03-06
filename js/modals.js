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
                                <span v-if="isNew">????????????</span>
                                <span v-else>????????????</span>
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="mb-2">
                                        <div class="mb-3">
                                            <label for="imageUrl" class="form-label">??????????????????</label>
                                            <input v-model="temp.imageUrl" type="text" class="form-control"
                                                placeholder="?????????????????????">
                                        </div>
                                        <div class="mb-3">
                                            <label for="imageUrl" class="form-label"></label>
                                            <input  type="file" class="form-control" id="inputFile"
                                                @change="uploadEvent('main')"
                                                placeholder="????????????">
                                        </div>
                                        <img class="img-fluid" :src="temp.imageUrl" alt="">
                                    </div>

                                    <div>
                                        <div v-for="(img, key) in temp.imagesUrl" class="mb-3">
                                                <label for="" class="form-label"></label>
                                                <input 
                                                    v-model="temp.imagesUrl[key]" type="text" class="form-control mb-3"
                                                    placeholder="??????????????????">
                                                    <div class="mb-3">

                                                <label for="imageUrl" class="form-label"></label>
                                                <input  type="file" class="form-control" id="inputFile"
                                                    @change="uploadEvent('other', key)"
                                                    placeholder="????????????">
                                        </div>
                                            <img class="img-fluid" :src="temp.imagesUrl[key]" alt="">
                                        </div>

                                        <button 
                                            v-if="!temp.imagesUrl.length || temp.imagesUrl[temp.imagesUrl.length -1]"
                                            @click="temp.imagesUrl.push('')"
                                            class="mb-3 btn btn-outline-primary btn-sm d-block w-100">
                                            ????????????
                                        </button>
                                        <button 
                                            @click="temp.imagesUrl.pop()"
                                            class="mb-3 btn btn-outline-danger btn-sm d-block w-100">
                                            ????????????
                                        </button>
                                    </div>
                                    
                                </div>
                                <div class="col-sm-8">
                                    <div class="mb-3">
                                        <label for="title" class="form-label">??????</label>
                                        <input v-model="temp.title" id="title" type="text" class="form-control"
                                            placeholder="???????????????">
                                    </div>

                                    <div class="row">
                                        <div class="mb-3 col-md-6">
                                            <label for="category" class="form-label">??????</label>
                                            <input v-model="temp.category" id="category" type="text"
                                                class="form-control" placeholder="???????????????">
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="price" class="form-label">??????</label>
                                            <input v-model="temp.unit" id="unit" type="text" class="form-control"
                                                placeholder="???????????????">
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="mb-3 col-md-6">
                                            <label for="origin_price" class="form-label">??????</label>
                                            <input v-model.number="temp.origin_price" id="origin_price" type="number" min="0"
                                                class="form-control" placeholder="???????????????">
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="price" class="form-label">??????</label>
                                            <input v-model.number="temp.price" id="price" type="number" min="0"
                                                class="form-control" placeholder="???????????????">
                                        </div>
                                    </div>
                                    <hr>

                                    <div class="mb-3">
                                        <label for="description" class="form-label">????????????</label>
                                        <textarea v-model="temp.description" id="description" type="text"
                                            class="form-control" placeholder="?????????????????????">
                    </textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label for="content" class="form-label">????????????</label>
                                        <textarea v-model="temp.content" id="description" type="text"
                                            class="form-control" placeholder="?????????????????????">
                    </textarea>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check">
                                            <input v-model="temp.is_enabled" id="is_enabled" class="form-check-input"
                                                type="checkbox" :true-value="1" :false-value="0">
                                            <label class="form-check-label" for="is_enabled">????????????</label>
                                        </div>
                                    </div>

                                    <div class="">
                                    <label for="content" class="form-label">????????????</label>
                                    </div>
                                    <div class="mb-3 ">
                                    <div class="form-check form-check-inline">
                                        <input 
                                            v-model='temp.feedBack'
                                            class="form-check-input" type="radio" name="inlineRadioOptions"
                                            id="inlineRadio1" value="????????????">
                                        <label class="form-check-label" for="inlineRadio1">????????????</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input
                                            v-model="temp.feedBack"
                                            class="form-check-input" type="radio" name="inlineRadioOptions"
                                            id="inlineRadio2" value="??????">
                                        <label class="form-check-label" for="inlineRadio2">??????</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input 
                                            v-model="temp.feedBack"
                                            class="form-check-input" type="radio" name="inlineRadioOptions"
                                            id="inlineRadio3" value="??????">
                                        <label class="form-check-label" for="inlineRadio3">??????</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input 
                                            v-model="temp.feedBack"
                                            class="form-check-input" type="radio" name="inlineRadioOptions"
                                            id="inlineRadio4" value="?????????">
                                        <label class="form-check-label" for="inlineRadio4">?????????</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input 
                                            v-model="temp.feedBack"
                                            class="form-check-input" type="radio" name="inlineRadioOptions"
                                            id="inlineRadio5" value="???????????????">
                                        <label class="form-check-label" for="inlineRadio5">???????????????</label>
                                    </div>
                                </div>

                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                ??????
                            </button>
                            <button 
                                v-if="isNew"
                                @click="btnAction('add')"
                                type="button" class="btn btn-primary">
                                ??????
                            </button>
                            <button
                                v-else
                                @click="btnAction('edit')"
                                type="button" class="btn btn-warning">
                                ??????
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
                    <span>????????????</span>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                ????????????
                <strong class="text-danger"></strong> ??????(????????????????????????)???
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                    ??????
                </button>
                <button 
                    @click="btnAction('del')"
                    type="button" class="btn btn-danger">
                    ????????????
                </button>
            </div>
        </div>
    </div>
</div>
    `
}