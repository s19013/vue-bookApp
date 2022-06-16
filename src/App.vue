<template>
  <v-app>
    <Header/>

    <v-main>
      <v-container>
        <router-view
        @add-book-list="addBook"
        :books="books"
        ></router-view>
      </v-container>

    </v-main>

    <Footer/>
  </v-app>
</template>

<script>
import Header from './global/Header';
import Footer from './global/Footer';


const storage_key='books'
export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      books:[],
      newBooks:null
    }
  },
  methods: {
    addBook(e){//eで子供コンポーネントの値を受け取れる
    if (!e) { return }
      this.books.push({
        id:this.books.length,
        title:e.title,
        image:e.image,
        description:e.description,
        readDate:'',
        memo:'',
      })
      this.saveBook()//セーブ
      //最後に追加したidのページに移動
      this.goToEditPage(this.books.slice(-1)[0].id)
    },
    removeBook(arg){
      this.books.splice(arg,1)//削除
      this.saveBook()//セーブ
    },
    saveBook(){
      const parsed= JSON.stringify(this.books);
      localStorage.setItem(storage_key,parsed)
    },
    goToEditPage(id){
      this.$router.push(`/edit/${id}`)
    }
  },
  mounted(){
    // 初期起動ときローカルストレージがなければ作る
    if (localStorage.getItem(storage_key)) {
      try { this.books = JSON.parse(localStorage.getItem(storage_key)) } 
      catch (e) { localStorage.removeItem(storage_key) }
    }
  }
};
</script>
