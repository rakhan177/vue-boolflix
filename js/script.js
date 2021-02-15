const app = new Vue({
  el: '#root',
  data: {
    ricerca: '',
    arrayFilm: [],
    arraySerie: [],
    arrayFilmSerie: [],
    arrayGenreFilm: [],
    arrayGenreSerie: [],
    arrayGeneri: [],
    arrayAttoriFilm: [],
    hideF: true,
    hideS: true,
    selectedGenere: '',
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
      this.hideF = true;
      this.hideS = true;
      this.controlSearch();
      this.cercaFilm();
      this.cercaSerie();
    },
    cercaFilm: async function () {
      let quel = this;
      quel.arrayFilm = [];
      // con await prendo la risposta dalla chiamata api per l'array di film
      const movies = await axios.get(
        'https://api.themoviedb.org/3/search/movie?api_key=3c14d83cf078d59749d2c36b16a2a734&query=' +
          quel.ricerca
      );
      for (let item of movies.data.results) {
        //
        const actors = await axios.get(
          'https://api.themoviedb.org/3/movie/' +
            item.id +
            '/credits?api_key=3c14d83cf078d59749d2c36b16a2a734'
        );
        item.attori = actors.data.cast.length
          ? actors.data.cast.map((e) => e.name).slice(0, 5)
          : [];
        quel.arrayFilm.push(item);
      }
    },
    cercaSerie: async function(){
      let quel = this;
      quel.arraySerie = [];
      const series = await axios.get(
        'https://api.themoviedb.org/3/search/tv?api_key=3c14d83cf078d59749d2c36b16a2a734&query=' +
          quel.ricerca
      );
      for (let item of series.data.results) {
        //
        const actorS = await axios.get(
          'https://api.themoviedb.org/3/movie/' +
            item.id +
            '/credits?api_key=3c14d83cf078d59749d2c36b16a2a734'
        );
        item.attori = actorS.data.cast.length
          ? actorS.data.cast.map((e) => e.name).slice(0, 5)
          : [];
        quel.arraySerie.push(item);
      }
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
    hideFilm: function(){
      if(this.hideF === true && this.hideS === false){
        this.hideF = false;
        this.hideS = true;
      }
      if(this.hideS === true && this.hideF === true){
        this.hideS = true;
        this.hideF = false;
      }
    },
    hideSerie: function(){
      if(this.hideS === true && this.hideF === true){
        this.hideS = false;
        this.hideF = true;
      }
      if(this.hideS === true && this.hideF === false){
        this.hideS = false;
        this.hideF = true;
      }
    },
    selezionaGenere: function(genere){
      console.log(genere.name)
    },
    mixedGenre: function(arr1, arr2, arr3){
//       for(let x = 0; x < arr1.length; x++){
//         if(!arr3.includes(arr1[x])){
//           arr3.push(arr1[x])
//         }
//       }
//       for(let y = 0; y < arr2.length; y++){
//         if(!arr3.includes(arr2[y])){
//           arr3.push(arr2[y])
//         }
//       }
//       return arr3
//       // arr3 = [...arr1, ...arr2];
//       // let filterGenre = [];
//       // return arr3.filter(function(value, index, self) {
//       //   return self.indexOf(value) === index;
//       //       });
// // let arrayUnique = function(arr) {
// //     return arr.filter(function(value, index, self) {
// //         return self.indexOf(value) === index;
// //     });
// // };
      return arr3 = [...arr1, ...arr2];
    },

    selectGenere: function(id) {
      this.selectedGenere = id
    },

    assegnaGenre: function(film, arr1){
      let arr = [];
      film.genre_ids.forEach((item, i) => {
        arr1.forEach((el, i) => {
          if(item === el.id){
            arr.push(el.name)
          }
        });
      });
      for(let x = 0; x < arr.length; x++){
        arr[x] = ' ' + arr[x]
      }
      return arr.toString()
    },
  }
})
