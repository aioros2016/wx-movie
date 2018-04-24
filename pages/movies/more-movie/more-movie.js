// pages/movies/more-movie/more-movie.js
import {getData, score2star, toast} from "../../../utils/util";

Page({
  data: {
    movieTitle: '',
    movies: {},
    requestUrl: '',
    totalCount: 0,
    firstLoad: true
  },
  onLoad: function (options) {
    let category = options.category
    this.setData({
      movieTitle: category
    })
    let url = ''
    switch (category) {
      case '正在热映':
        url = `/v2/movie/in_theaters`
        break
      case '即将上映':
        url = `/v2/movie/coming_soon`
        break
      case '豆瓣Top250':
        url = `/v2/movie/top250`
        break
    }
    this.setData({
        requestUrl: url
    })
    getData(url, this.formatMovieData)
    toast('正在加载', 'loading')
  },
  formatMovieData(movie){
      let movies = []
      movie.subjects.forEach((item) => {
          let obj = {}
          obj.title = item.title
          obj.average = item.rating.average
          obj.coverageUrl = item.images.large
          obj.movieId = item.id
          obj.stars = score2star(item.rating.stars)
          movies.push(obj)
      })
      let totalMovies = {}
      if(!this.data.firstLoad) {
          totalMovies = this.data.movies.concat(movies)
          this.setData({
              totalCount: this.data.totalCount += 20
          })
      } else {
          this.setData({
              movies: {}
          })
          totalMovies = movies
          this.setData({
              firstLoad: false,
              totalCount: this.data.totalCount = 20
          })
      }
      this.setData({
          movies: totalMovies
      })
      setTimeout(() => {
          wx.hideToast()
      }, 1000)
      wx.stopPullDownRefresh()
  },
    onPullDownRefresh() {
        this.setData({
            firstLoad: true
        })
        let data = {start: 0, count: 20}
        getData(this.data.requestUrl, this.formatMovieData, data)
        toast('正在加载', 'loading')
    },
    onReachBottom() {
        let data = {start: this.data.totalCount, count: 20}
        getData(this.data.requestUrl, this.formatMovieData, data)
        toast('正在加载', 'loading')
    },
    onReady() {
      wx.setNavigationBarTitle({
        title: this.data.movieTitle
      })
    },
    toMovieDetail(ev) {
        let id = ev.currentTarget.dataset.id
        wx.navigateTo({
            url: `../detail/detail?id=${id}`
        })
    },
})