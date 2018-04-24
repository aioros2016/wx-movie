import {Movie} from 'class/Movie.js'

Page({
  data: {
    movie: {}
  },
  onLoad: function (options) {
    let id = options.id
    let url = `/v2/movie/subject/${id}`
    let movie = new Movie(url)
    movie.getMovieData((movie) => {
      this.setData({
        movie: movie
      })
    })
  },
  viewMoviePostImg(ev) {
    let src = ev.currentTarget.dataset.src
    wx.previewImage({
      current: src,
      urls: [src]
    })
  }
})