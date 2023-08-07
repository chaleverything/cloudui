import {
  getSearchHistory,
  getSearchPopular,
} from '../../../services/good/fetchSearchHistory';

import {
  increaseKeywordHistory,
  clearKeywordHistorys,
  getKeywordHistorys,
  getPopulars
} from '../../../services/dataSource/keywordHistorys';

Page({
  data: {
    historyWords: [],
    popularWords: [],
    searchValue: '',
    defKeywords: '',
    dialog: {
      title: '确认删除当前历史记录',
      showCancelButton: true,
      message: '',
    },
    dialogShow: false,
  },

  deleteType: 0,
  deleteIndex: '',
  async onLoad(options) {
    //水印
    this.setData({ defKeywords: options?.defKeywords });

    // //历史搜索
    // this.queryHistory();

    // //热门搜索
    // this.queryPopular();
  },
  onShow() {
    //历史搜索
    this.queryHistory();

    //热门搜索
    this.queryPopular();
  },

  async clearHistory() {
    let user = await getApp().globalData.user();
    if (user?.openId) {
      clearKeywordHistorys({ openId: user.openId }).then(() => { });
    }
  },

  async queryHistory() {
    this.setData({
      historyWords: []
    });
    let user = await getApp().globalData.user();
    if (user?.openId) {
      getKeywordHistorys({ openId: user.openId }).then((res) => {
        if (res) {
          this.setData({
            //historyWords: res.map((item) => item.content),
            historyWords: res
          });
        }
      });
    }
  },

  async queryPopular() {
    this.setData({
      popularWords: []
    });
    getPopulars({ pageSize: 16 }).then((res) => {
      //console.log('Populars:' + JSON.stringify(res));
      if (res) {
        this.setData({
          popularWords: res,
        });
      }
    });
  },

  confirm() {
    const { deleteType, deleteIndex } = this;
    if (deleteType === 1) {
      //清理搜索
      this.clearHistory();

      //历史搜索
      this.queryHistory();

      //热门搜索
      this.queryPopular();
    }
    this.setData({ dialogShow: false, });
  },

  close() {
    this.setData({ dialogShow: false });
  },

  handleClearHistory() {
    const { dialog } = this.data;
    this.deleteType = 1;
    this.setData({
      dialog: {
        ...dialog,
        message: '确认删除所有历史记录',
      },
      dialogShow: true,
    });
  },

  deleteCurr(e) {
    const { index } = e.currentTarget.dataset;
    const { dialog } = this.data;
    this.deleteIndex = index;
    this.setData({
      dialog: {
        ...dialog,
        message: '确认删除当前历史记录',
        deleteType: 0,
      },
      dialogShow: true,
    });
  },

  handleHistoryTap(e) {
    const { historyWords } = this.data;
    const { dataset } = e.currentTarget;
    const _searchValue = historyWords[dataset.index || 0] || '';
    if (_searchValue) {
      wx.navigateTo({
        url: `/pages/goods/result/index?searchValue=${_searchValue}&defKeywords=${this.data.defKeywords}`,
      });
    }
  },

  async handleSubmit(e) {
    let content = e.detail?.value;
    if (!content) return;
    let user = await getApp().globalData.user();
    if (user?.openId) {
      await increaseKeywordHistory({ openId: user.openId, content: content });
    }
    wx.navigateTo({
      url: `/pages/goods/result/index?searchValue=${content}`,
    });
  },
});
