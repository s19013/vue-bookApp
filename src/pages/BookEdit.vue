<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto">
            <v-row>
              <v-col cols="4">
                <v-img :src="book.image"></v-img>
              </v-col>
              <v-col cols="7">
                <v-row>
                  <v-card-title>title:{{book.title}}</v-card-title>
                </v-row>
                <v-row>{{book.description}}</v-row>
                <v-spacer class="my-2"></v-spacer>
                <v-row>読んだ日:</v-row>
                <v-row>
                  <v-textarea
                    name="input-7-1"
                    label="感想"
                    value=""
                    hint="Hint text"></v-textarea>
                </v-row>
                <v-row class="justify-center">
                  <v-card-actions>
                    <v-btn
                      class="secondary"
                      to = "/"
                    >
                      一覧に戻る
                    </v-btn>
                    <v-btn
                      class="info"
                      @click="editBookInfo"
                    >
                      保存
                    </v-btn>
                </v-card-actions>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  name:"book-index-component",
  props:{
    books:Array
  },
  data() {
    return {
      book:''
    }
  },
  methods: {
    
  },
  //vueは非同期にdom更新をしている
  // ナビゲーションガードのbeforeRouteEnter,更にvue.nextTick()を使ってdom更新が終わってから表示させる
  // そうしないと更新が終わる前に呼び出されてエラーになる
  beforeRouteEnter(to,from,next){
    next(vm => {
      // `vm`を通じてコンポーネントインスタンスにアクセス
      vm.$nextTick(()=>{
        vm.book = vm.books[vm.$route.params.id]
      })
      
    })
  }

};
</script>
