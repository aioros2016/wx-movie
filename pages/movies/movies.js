const APP = getApp()
import {score2star} from '../../utils/util.js'

Page({
    data: {
        inTheaters: {},
        comingSoon: {},
        top250: {},
        searchResult: {},
        showSearch: false
    },
    onLoad(ev) {
        let inTheatersUrl = "/v2/movie/in_theaters"
        let comingSoonUrl = "/v2/movie/coming_soon"
        let top250Url = "/v2/movie/top250"
        this.getMovieData(inTheatersUrl, 'inTheaters', '正在热映')
        this.getMovieData(comingSoonUrl, 'comingSoon', '即将上映')
        this.getMovieData(top250Url, 'top250', '豆瓣Top250')
    },
    moreTap(ev) {
        let category = ev.currentTarget.dataset.category
        wx.navigateTo({
            url: `more-movie/more-movie?category=${category}`
        })
    },
    toMovieDetail(ev) {
        let id = ev.currentTarget.dataset.id
        wx.navigateTo({
            url: `detail/detail?id=${id}`
        })
    },
    getMovieData(url, rank, title, count = 3) {
        let that = this
        wx.request({
            url: APP.globalData.doubanHost + url,
            data: {
                start: 0,
                count: count
            },
            method: 'GET',
            header: {
                "Content-Type": "json"
            },
            success(res) {
                that.formatMovieData(res.data.subjects, rank, title)
            },
            fail(err) {
                console.log(err)
            },
            complete() {

            }
        })
    },
    formatMovieData(movie, rank, title) {
        let movies = []
        movie.forEach((item) => {
            let obj = {}
            obj.title = item.title
            obj.average = item.rating.average
            obj.coverageUrl = item.images.large
            obj.movieId = item.id
            obj.stars = score2star(item.rating.stars)
            movies.push(obj)
        })
        let obj = {}
        obj[rank] = {
            movies,
            title
        }
        console.log(obj)
        this.setData(obj)
    },
    onBindFocus() {
        this.setData({
            showSearch: true
        })
    },
    onCancelImgTap() {
        this.setData({
            showSearch: false,
            searchResult: {}
        })
    },
    onBindConfirm(ev) {
        let model = ev.detail.value
        let url = `/v2/movie/search?q=${model}`
        this.getMovieData(url, 'searchResult', '', 100)
    }
})