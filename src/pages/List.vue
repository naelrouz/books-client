<template lang="pug">
    div 
        h2 Books
        .search
            input.text_input.search__input(
                type="search"
                name="like", 
                :value="like", 
                placeholder="search by book title"
                @input="liveSearch($event)"
                )
            // button.btn go
            // button.btn x
        ul.list
            li.list__item(v-for="item in books") 
                // .list__item__image(:style="{ 'background-image': `url(${item.image})` }")
                .list__item__image
                    img(:src="`${imgPath}${item.image}`")
                .list__item__text_wrap
                    p id: {{item.id}}
                    h3.list__item__title {{ item.title }}
                    h4.list__item__date {{ item.date }}
                    h4.list__item__author {{ item.first_name }} {{item.last_name}}
                    p.list__item__description {{ item.description }}
                    .list__btn_group
                        router-link.btn.list__item__edit_button(
                            :to="{ name: 'edit', params: { bookId: item.id }}") 
                            | Edit

        .panel.panel_bottom
            .controls
                label.per_page(v-if="!like")
                    | Per page 
                    select(name='perPage', @change="onChange($event)")
                        option(selected) 5
                        option 10
                        option 20
                        option 50
                        option 100
                label.order_by 
                    | Order by         
                    select(name='orderBy', @change="onChange($event)")
                        option(value=null)
                        option title
                        option date
                        option author
                        option description
                label.group_by 
                    | Group by         
                    select(name='groupBy', @change="onChange($event)")
                        option(value=null)
                        option title
                        option date
                        option author
                        option description
                   
            pagination(
                :curPage="curPage", 
                :pagesCount="pagesCount"
                :pageRange="4"
                @page-changed="getBooks"
                )
            .btn_group    
                router-link.btn(
                    to="/add") 
                    | Add               
                              
</template>

<script>
import Pagination from '../components/Pagination';
export default {
  data() {
    return {
      books: [],
      curPage: 1,
      perPage: 5,
      pagesCount: 1,
      groupBy: null,
      orderBy: null,
      like: null,
      imgPath: 'http://localhost:3000'
      //   perPageOptions: [
      //     { value: 5, selected: true },
      //     { value: 5, selected: true },
      //     { value: 5, selected: true },
      //     { value: 5, selected: true }
      //   ]
    };
  },
  methods: {
    onChange(event) {
      console.log('onBookChange.event:', event);

      const { name, value } = event.target;
      this[name] = value;
      this.getBooks();
    },
    getBooks(curPage = this.curPage) {
      const { perPage, groupBy, orderBy, like } = this;
      console.log('getBooks.curPage:', curPage);
      console.log('getBooks.perPage:', perPage);

      this.$socket.emit('BOOKS', { curPage, perPage, groupBy, orderBy, like });
    },
    liveSearch(e) {
      this.perPage = 5;
      this.onChange(e);
      this.getBooks();
    }
  },

  async beforeMount() {
    const { curPage, perPage } = this;
    this.$socket.emit('BOOKS', { curPage, perPage });
    this.$options.sockets.BOOKS_RES = res => {
      console.log('BOOKS_RES.res', res);
      this.books = res.books;
      this.curPage = res.curPage;
      this.pagesCount = res.pagesCount;
    };
  },
  components: {
    Pagination
  }
};
</script>

<style lang="stylus">
.search {
    display: flex;
    flex-flow: row;
    justify-content: center;
}

.search__input {
    margin: 0 10px 0 0;
}

.search .btn {
    margin: 0 5px;
}

.panel {
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    color: #fefefe;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 10px 5px;
}

.panel_top {
    top: 0;
}

.panel_bottom {
    bottom: 0;
}

.controls {
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    align-items: flex-start;
    margin: 10px 20px 10px 10px;
}

.list {
    display: flex;
    flex-flow: column;
    justify-content: center;
    margin: 0;
    padding: 10px 10px 100px 10px;
    list-style: none;
}

.list__item {
    display: flex;
    flex-flow: row;
    width: 100%;
    margin: 5px;
    color: #fefefe;
    background-color: rgba(0, 0, 0, 0.6);
}

.list__item__image {
    max-width: 240px;
    // background-position: 50% 50%;
    // background-size: cover;
    // background-repeat: no-repeat;
}

.list__item__image img {
    width: 100%;
}

.list__item__text_wrap {
    padding: 10px 20px;
    width: 70%;
}

.list__item__description {
    margin-bottom: 20px;
}

.list__btn_group {
}

.list__item__edit_button {
}

@media only screen and (min-width: 480px) {
}

@media only screen and (min-width: 768px) {
    .list {
        display: flex;
        flex-flow: row wrap;
    }

    .list__item {
        width: calc(50% - 20px);
    }
}

@media only screen and (min-width: 992px) {
}

@media only screen and (min-width: 1200px) {
}
</style>

