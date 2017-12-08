const firstPage = [{
  id: '1',
  title: '装修秘诀',
  digest: '文艺气息爆棚的精致白色现代家',
  poster: 'https://cloud-minapp-1131.cloud.ifanrusercontent.com/1eNDc3TmmbboTqKa.jpg',
  collect: 0
}, {
  id: '2',
  title: '咖啡指南',
  digest: '咖啡制作终极指南',
  poster: 'https://cloud-minapp-1131.cloud.ifanrusercontent.com/1eNDYBVedtSdnNRR.jpeg',
  collect: 0
}, {
  id: '3',
  title: '特斯拉卡车发布',
  digest: '你以为只是发卡车，马斯克却把世界踩在脚下',
  poster: 'https://cloud-minapp-1131.cloud.ifanrusercontent.com/1eNDLNIcksPYFzMl.jpg',
  collect: 0
}, {
  id: '4',
  title: 'iReader Ocean 电子书评测',
  digest: '国产千元电子书能否复制 MIUI 的辉煌？',
  poster: 'http://images.ifanr.cn/wp-content/uploads/2017/12/Ocean23.jpg',
  collect: 0
}]

const lastPage = [{
  id: '5',
  title: '超新约全书',
  digest: '一个以折磨人为乐趣的上帝',
  poster: 'https://media.ifanrusercontent.com/media/user_files/hydrogen/45/df/45df7216505002c00b5d888f6a5137fc2088c3a4-6cf38167dde685621d472c16c88b9d9e47f85c7b.jpg',
  collect: 0
}, {
    id: '6',
    title: '2001太空漫游 2001',
    digest: '现代科幻电影技术的里程碑',
    poster: 'https://media.ifanrusercontent.com/media/user_files/hydrogen/d3/bd/d3bd4900a1ca1ed76e3bd39b9961084d3fe8234c-ba44bb070dd36bc3a6a0adbe1b4faa524673fe9b.jpg',
    collect: 0
}]

let isEnd = false

Page({
  data: {
    articles: [],
    loading: false,
    loadMoreText: '加载更多'
  },
  onLoad: function() {
    this.getfirstPage()
  },
  getfirstPage: function() {
    this.setData({
      articles: this.addReadStatus(firstPage)
    })
  },
  loadMore: function() {
    if (!isEnd) {
      this.setData({loading: true})
      setTimeout(() => {
        this.setData({
          articles: this.addReadStatus(firstPage.concat(lastPage)),
          loading: false
        })
      }, 1000)
      isEnd = true
    } else {
      this.setData({loadMoreText: '已无更多'})
    }
  },
  toDetailPage: function(e) {
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    let readedPosts = wx.getStorageSync('readedPosts')

    if (!readedPosts) {
      wx.setStorageSync('readedPosts', [id])
    } else if(readedPosts.indexOf(id) == -1) {
      readedPosts.push(id)
      wx.setStorageSync('readedPosts', readedPosts)
    }
    this.setData({articles: this.addReadStatus(this.data.articles)})
    wx.navigateTo({
      url: `../detail/index?id=${id}`
    })
  },
  addReadStatus: function(movies) {
    let readedPosts = wx.getStorageSync('readedPosts')
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