const pageLimit = 4
let isEnd = false
const firstPage = [{
  id: '1',
  title: '装修秘诀',
  description: '文艺气息爆棚的精致白色现代家',
  cover: 'https://cloud-minapp-1131.cloud.ifanrusercontent.com/1eNDc3TmmbboTqKa.jpg'
}, {
  id: '2',
  title: '咖啡指南',
  description: '咖啡制作终极指南',
  cover: 'https://cloud-minapp-1131.cloud.ifanrusercontent.com/1eNDYBVedtSdnNRR.jpeg'
}, {
  id: '3',
  title: '特斯拉卡车发布',
  description: '你以为只是发卡车，马斯克却把世界踩在脚下',
  cover: 'https://cloud-minapp-1131.cloud.ifanrusercontent.com/1eNDLNIcksPYFzMl.jpg'
}, {
  id: '4',
  title: 'iReader Ocean 电子书评测',
  description: '国产千元电子书能否复制 MIUI 的辉煌？',
  cover: 'http://images.ifanr.cn/wp-content/uploads/2017/12/Ocean23.jpg'
}]
const lastPage = [{
  id: '5',
  title: '超新约全书',
  description: '一个以折磨人为乐趣的上帝',
  cover: 'https://media.ifanrusercontent.com/media/user_files/hydrogen/45/df/45df7216505002c00b5d888f6a5137fc2088c3a4-6cf38167dde685621d472c16c88b9d9e47f85c7b.jpg'
}, {
    id: '6',
    title: '2001太空漫游 2001',
    description: '现代科幻电影技术的里程碑',
    cover: 'https://media.ifanrusercontent.com/media/user_files/hydrogen/d3/bd/d3bd4900a1ca1ed76e3bd39b9961084d3fe8234c-ba44bb070dd36bc3a6a0adbe1b4faa524673fe9b.jpg'
}]
const READED_ARTICLES = 'READED_ARTICLES'

Page({
  data: {
    articles: [],
    loading: false,
    loadMoreText: '加载更多'
  },

  onLoad: function() {
    this.getArticles(true)
  },

  loadMore: function(event) {
    this.getArticles()
  },

  getArticles: function(isFirstPage) {
    if (!isEnd && !this.data.loading) {
      this.setData({ loading: true })
      setTimeout(() => {
        if (isFirstPage) {
          this.setData({
            articles: this.addReadStatus(firstPage),
            loading: false
          })
        } else {
          this.setData({
            articles: this.addReadStatus(firstPage.concat(lastPage)),
            loading: false
          })
          if (lastPage.length < pageLimit) {
            isEnd = true
            this.setData({ loadMoreText: '已无更多' })
          }
        }
      }, 1000)
    }
  },

  toDetailPage: function(e) {
    let id = e.currentTarget.dataset.id
    let readedPosts = wx.getStorageSync(READED_ARTICLES)

    if (!readedPosts) {
      wx.setStorageSync(READED_ARTICLES, [id])
    } else if(readedPosts.indexOf(id) == -1) {
      readedPosts.push(id)
      wx.setStorageSync(READED_ARTICLES, readedPosts)
    }
    this.setData({articles: this.addReadStatus(this.data.articles)})
    wx.navigateTo({
      url: `../detail/index?id=${id}`
    })
  },

  addReadStatus: function(movies) {
    let readedPosts = wx.getStorageSync(READED_ARTICLES)
    if (!readedPosts) {
      return movies
    }
    let newMovies = []
    for (let i = 0; i < movies.length; i++) {
      let movie = Object.assign(movies[i])
      if (readedPosts.indexOf(movie.id) != -1) {
        movie.isReaded = true
      } else {
        movie.isReaded = false
      }
      newMovies.push(movie)
    }
    return newMovies
  }
})