import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";


const app = createApp({
    data() {
        return {
            baseURL: 'https://vue3-course-api.hexschool.io/v2/',
            basePath: 'scott',
            identity: {
                "username": "",
                "password": ""
            },
            

        }
    },
    methods:{
        signIn(){
            const url = `${this.baseURL}admin/signin`
            axios.post(url,this.identity)
            .then(res => {
                // console.log(res)
                // get token
                const {expire, token} = res.data
                document.cookie = `scoToken=${token}; expires=${expire} `;
                alert(res.data.message)
                window.location = 'products.html'
            })
            .catch(err => {
                console.dir(err); 
            })
        }
    },
    mount(){

    }
    
});

app.mount('#app')
