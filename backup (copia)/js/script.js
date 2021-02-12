const app = new Vue({
  el: '#root',
  data: {
    ricerca: '',
    arrayFilm: [],
    arraySerie: [],
    arrayGenreFilm: [],
    arrayGenreSerie: [],
  },
  mounted() {
    let quel = this;
    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=3c14d83cf078d59749d2c36b16a2a734')
    .then(function(resp){
      quel.arrayGenreFilm = resp.data.genres;
      console.log(quel.arrayGenreFilm)
    })
    axios.get('https://api.themoviedb.org/3/genre/tv/list?api_key=3c14d83cf078d59749d2c36b16a2a734')
    .then(function(resp) {
      quel.arrayGenreSerie = resp.data.genres;
      console.log(quel.arrayGenreSerie)
    })
  },
  methods: {
    cerca: function(){
      this.controlSearch();
      this.cercaFilm();
      this.cercaSerie();
    },
    cercaFilm: function(){
      let quel = this;
      axios.get('https://api.themoviedb.org/3/search/movie?api_key=3c14d83cf078d59749d2c36b16a2a734&query=' + quel.ricerca)
      .then(function(resp){
        quel.arrayFilm = resp.data.results;
      })
    },
    cercaSerie: function(){
      let quel = this;
      axios.get('https://api.themoviedb.org/3/search/tv?api_key=3c14d83cf078d59749d2c36b16a2a734&query=' + quel.ricerca)
      
      .then(function(resp){
        quel.arraySerie = resp.data.results;
      })
    },
    controlSearch: function(){
      if(this.ricerca === ''){
         this.arrayFilm = [];
      }
    },
    imageFilm: function(film){
      if (film.poster_path === null) {
        return 'image.png'
      }
      return 'http://image.tmdb.org/t/p/w780' + film.poster_path
    },
    calcStars: function(el){
      let num = (el.vote_average / 2).toString()
      if(num.indexOf('.1') !== -1 || num.indexOf('.2') !== -1 || num.indexOf('.3') !== -1 || num.indexOf('.4') !== -1){
        return num = Math.floor(Number(num))
      }else{
        return num = Math.ceil(Number(num))
      }
      console.log(num)
    },
    getFlag: function(el){
      let lingua = el.original_language;
      switch(lingua){
        case 'en':
          lingua ='gb';
          break;
        case 'cs':
          lingua ='cz';
          break;
        case 'da':
          lingua ='dk';
          break;
        case 'ja':
          lingua ='jp';
          break;
        case 'zh':
          lingua ='cn';
          break;
        case 'ur':
          lingua ='pk';
          break;
        default:
          lingua;
          break;
      }
      if(lingua === el.original_language){
        return lingua
      }else{
        return 'https://flagcdn.com/16x12/' + lingua + '.png';
      }
    },
    hideTitle: function(el){
      if(el.title === el.original_title){
        return false;
      }else{
        return true;
      }
    },

  }
})
