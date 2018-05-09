Page({
  data: {
    showItem: 0
  },
  navToggle: function (e) {
    this.setData({
      showItem: e.target.dataset.id
    });
    util.dataList.call(this, {
      url: 'https://api.zg5v.com/index.php/index/show/qtshow',
      data: {
        uid: 148,
        fenid: e.target.dataset.id - 1,
        num: 0
      },
      cb: util.petAge
    });
  }
});