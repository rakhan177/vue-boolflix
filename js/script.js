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
          lingua='gb';
          break;
        case 'cs':
          lingua='cz';
          break;
        case 'da':
          lingua='dk';
          break;
        case 'ja':
          lingua='jp';
          break;
        case 'zh':
          lingua='cn';
          break;
        case 'ur':
          lingua='pk';
          break;
      }
      return 'https://flagcdn.com/16x12/' + lingua + '.png';
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
