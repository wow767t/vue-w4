export default {
    props:['pagination'],
    methods: {
      getPage(page) {
        this.$emit('get-page',page)
      }
    },
    template: `
    <nav aria-label="Page navigation example">
    <ul class="pagination">

      <li 
        @click.prevent="getPage(pagination.current_page-1)"
        :class="{ disabled: !pagination.has_pre }"
        class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li 
        v-for="(page,key) in pagination.total_pages" :key="page"
        @click.prevent= "getPage(page)"
        :class="{active: page === pagination.current_page}"
        class="page-item"><a class="page-link" href="#">{{page}}</a></li>

      <li 
      @click.prevent="getPage(pagination.current_page+1)"
        :class="{ disabled: !pagination.has_next }"
        class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
    `
}

