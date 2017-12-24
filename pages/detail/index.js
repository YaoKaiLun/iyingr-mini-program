const articleInfo = {
  title: '特斯拉卡车发布',
  poster: 'https://cloud-minapp-1131.cloud.ifanrusercontent.com/1eNDLNIcksPYFzMl.jpg',
  content: '双十一已经过去一周了，包裹收齐了吗？有没有觉得快递费用更贵了？越来越大的物流需求，需要企业在车辆和人力上支出更多，而这消耗的每一分钱，最终都需要你我这样的消费者买单。想要省下这一大笔钱，与其盼着学会控制自己不去剁手，不如盼着新的科技革新。美国加州 16 日下午（北京 17 日上午），特斯拉正式揭开了自己电动卡车的面纱，爱范儿旗下董车会（微信搜索：董车会）作为现场唯一的国内汽车媒体，为各位 0 距离解密这台卡车背后的生财之道。P.S.发布会最后，埃隆马斯克突然拿出了把全世界碾压在脚下的火红怪兽，你赚了钱干啥他都给你想好了。',
  created_at: '2017-11-11'
}

let id = ''

Page({
  data: {
    article: {},
  },

  onLoad: function(option) {
    id = option.id
    this.getArticle(id)
  },

  getArticle: function(id) {
    this.setData({article: articleInfo})
  },

  onShareAppMessage: function (options) {
    return {
      title: this.data.article.title,
      imageUrl: this.data.article.poster,
      path: `pages/detail/index?id=${id}`,
    }
  }
})