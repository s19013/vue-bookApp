<template>
  <div>
    <v-container>
      <v-row>
        <v-col
        cols ="8"
        md ="5"
        lg ="5"
        xl ="5"
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
    </v-container>
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
