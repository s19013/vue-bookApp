<template>
  <div>
    <v-row>
        <v-col
        cols ="8"
        md ="5"
        >
        <v-text-field label="" v-model ="keyword"></v-text-field>
        </v-col>
        <v-col 
        cols ="2"
        class="d-flex align-center">
          <v-btn
            depressed
            color="primary"
            @click="search"
          >
          search
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col
        cols="12"
        md="6"
        v-for = "(book,index) in searchResults"
        :key="index"
        >
          <v-card class="mx-auto py-2">
            <v-row>
              <v-col cols="4">
                <v-img :src="book.image"></v-img>
              </v-col>
              <v-col cols="7">
                <v-row>
                  <v-card-title>{{book.title}}</v-card-title>
                </v-row>
                <v-row>{{book.description}}</v-row>
                <v-spacer class="my-2"></v-spacer>
                <v-row class="justify-center">
                  <v-card-actions>
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      color="indigo"
                      @click="addBookList(index)"
                    >
                      <v-icon dark>mdi-plus</v-icon>
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
  name:"book-serach-component",
  data() {
    return {
      keyword:'',
      searchResults:[]
    }
  },
  methods:{
    addBookList(index){
      console.log(index);
    },
    async search(keyword){
      this.searchResults = []

      //クエリー作成
      const baseUrl = 'https://www.googleapis.com/books/v1/volumes?q='
      const params = {
        q:`intitle:${keyword}`,
        maxResults:40
      }
      const queryParams = new URLSearchParams(params)

      //fetchでjson取得
      const response = await fetch(baseUrl + queryParams)
      .then(response => response.json())
      for (let book of response.items) {
        let title = book.volumeInfo.title
        let img = book.volumeInfo.imageLinks
        let description = book.volumeInfo.description
        this.searchResults.push({
          title: title ? title :'',
          image: img   ? img.thumbnail :'',
          description:description ? description.slice(0,40) : ''
        })
      }
    }
  }
};
</script>
