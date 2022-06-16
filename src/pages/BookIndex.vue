<template>
  <div>
    <v-row>
      <v-col cols="1">
        <v-btn 
          depressed
          to="/search"
          >
        本を探す
        </v-btn>
      </v-col>
      <v-col cols="10">
        <v-spacer></v-spacer>
      </v-col>
      <v-col cols="1">
        <v-btn
          depressed
          color="error"
          @click="deleteLocalStrorage"
        >
        delete
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
        <v-col
        cols="12"
        md="6"
        v-for = "book in books"
        :key="book.id"
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
                <v-row>読んだ日:{{book.readDate}}</v-row>
                <v-row>{{book.description}}</v-row>
                <v-spacer class="my-2"></v-spacer>
                <v-row class="justify-center">
                  <v-card-actions>
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      color="indigo"
                      :to ="{name:'BookEdit',params:{id:book.id}}"
                    >
                      <v-icon dark>mdi-pencil</v-icon>
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
      book:'',
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
    }
  },
  methods: {
    deleteLocalStrorage(){
      this.$emit('delete-local-storage')
    }
  },
};
</script>
