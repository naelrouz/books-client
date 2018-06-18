
<template lang="pug">
    ul.pagination
        // p {{pagesCount}}
        // p {{pages}}

        button.pagination__item.pagination_prev(:disabled="hasPrev", @click="changePage(prevPage)")
            | prev
        button.pagination__item.pagination_prev(v-if="true", @click="changePage(1)")
            | 1
        .pagination__item.pagination__dotted ...     
        button.pagination__item.pagination_number(v-for="pageNum in pages", :class="{pagination__item_active: pageNum == curPage}" @click="changePage(pageNum)")
            | {{ pageNum }}   
        .pagination__item.pagination__dotted ...    
        button.pagination__item.pagination_prev(v-if="hasLast", @click="changePage(pagesCount)")
            | {{ pagesCount }}                  
        button.pagination__item.pagination_next(:disabled="hasNext", @click="changePage(nextPage)")
            | next
    
</template>
<script>
export default {
  props: {
    curPage: {
      type: Number,
      default: 1
    },
    pagesCount: {
      type: Number,
      default: 10
    },
    pageRange: {
      type: Number,
      default: 2
    }
  },
  computed: {
    pages() {
      const pages = [];

      for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
        pages.push(i);
      }

      return pages;
    },
    rangeStart() {
      const start = this.curPage - this.pageRange;

      return start > 1 ? start : 2;
    },
    rangeEnd() {
      const end = this.curPage + this.pageRange;

      return end < this.pagesCount ? end : this.pagesCount - 1;
    },
    nextPage() {
      return this.curPage + 1;
    },
    prevPage() {
      return this.curPage - 1;
    },
    hasPrev() {
      return this.curPage === 1;
    },
    hasNext() {
      return this.curPage === this.pagesCount;
    }
  },
  methods: {
    hasFirst() {
      return this.rangeStart === 1;
    },
    hasLast() {
      return this.rangeStart === this.pagesCount;
    },

    changePage(page) {
      this.$emit('page-changed', page);
    }
  }
};
</script>


<style lang="stylus">

.pagination {
  margin: 0;
  padding: 0;
  list-style: none;
}

.pagination__item {
  border: 1px dotted #aaa;
  font-size: 16px;
  color: #ffffff;
  min-width: 3em;
  border-radius: 10px;
  margin: 10px 3px;
  padding: 5px 10px;
  display: inline-block;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
}

.pagination__item:disabled {
  opacity: 0.3;
}

.pagination__item_active {
  border: 1px solid #aaa;
  background-color: rgba(172, 182, 229, 0.8);
}

.pagination__dotted {
  border: none;
  padding-left: 0;
  padding-right: 0;
}
</style>

