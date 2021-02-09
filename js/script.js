const app = new Vue({
  el: '#root',
  data: {
    ricerca: '',
    arrayFilm: [],
  },
  methods: {
    callAxios: function(){
      this.controlSearch()
      let quel = this;
      axios.get('https://api.themoviedb.org/3/search/movie?api_key=3c14d83cf078d59749d2c36b16a2a734&query=' + quel.ricerca)
      .then(function(resp){
        quel.arrayFilm = resp.data.results;
        console.log(quel.arrayFilm)
      })
    },
    controlSearch: function(){
      if(this.ricerca === ''){
         this.arrayFilm = [];
      }
    },
  }
})





/*https://api.themoviedb.org/3/movie/550?api_key=

key=  3c14d83cf078d59749d2c36b16a2a734*/
