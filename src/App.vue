<template>
  <v-app>
    <Header/>

    <v-main>
      <v-container>
        <router-view
        @add-book-list="addBook"
        @update-book-info="updateBookInfo"
        @delete-local-storage="deleteAll"
        @delete-item = "removeBook"
        :books="books"
        ></router-view>
      </v-container>

    </v-main>

  </v-app>
</template>

<script>
import Header from '.components/global/Header';



const storage_key='books'
export default {
  name: 'App',
  components: {
    Header,

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
    updateBookInfo(e){
      //まるっと書き換える
      const updateInfo = {
        id:e.id,
        readDate:e.readDate,
        memo:e.memo,
        title:this.books[e.id].title,
        image:this.books[e.id].image,
        description:this.books[e.id].description
      }
      this.books.splice(e.id,1,updateInfo)
      this.saveBook()
    },
    removeBook(e){
      this.books.splice(e.id,1)//削除
      this.saveBook()//セーブ
      this.$router.push(`/`)
    },
    saveBook(){
      const parsed= JSON.stringify(this.books);
      localStorage.setItem(storage_key,parsed)
    },
    deleteAll(){
      const isDeleted = 'deleteALL?'
      if (window.confirm(isDeleted)) {
        //削除処理
        localStorage.setItem(storage_key,'');
        localStorage.removeItem(storage_key)
        this.books=[]
        
        //再読み込み
        window.location.reload()
      }
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
