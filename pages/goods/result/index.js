/* eslint-disable no-param-reassign */
//import { getSearchResult } from '../../../services/good/fetchSearchResult';
import { getGoodsResultList } from '../../../services/dataSource/goods';
import {
  increaseKeywordHistory,
} from '../../../services/dataSource/keywordHistorys';
import Toast from 'tdesign-miniprogram/toast/index';

const initFilters = {
  overall: 1,
  sorts: '',
};

Page({
  data: {
    goodsList: [],
    sorts: '',
    overall: 1,
    show: false,
    minVal: '',
    maxVal: '',
    minSalePriceFocus: false,
    maxSalePriceFocus: false,
    filter: initFilters,
    hasLoaded: false,
    keywords: '',
    loadMoreStatus: 0,
    loading: true,
  },

  total: 0,
  pageIndex: 1,
  pageSize: 30,

  async onLoad(options) {
    this.setData(
      {
        defKeywords: options?.defKeywords,
        keywords: options?.searchValue,
      },
      () => {
        this.init(true);
      },
    );
  },

  generalQueryData(reset = false) {
    const { filter, keywords, minVal, maxVal } = this.data;
    const { pageIndex, pageSize } = this;
    const { sorts, overall } = filter;
    const params = {
      sort: 0, // 0 综合，1 价格
      pageIndex: 1,
      pageSize: 30,
      keyword: keywords,
      sortBy: 'soldNum',
      direction: "DESC"
    };
    //console.log(`[sorts:${JSON.stringify(sorts)}][overall:${JSON.stringify(overall)}]`);
    if (sorts) {
      params.sortBy = 'minSalePrice';
      params.direction = sorts;
    } else {
      params.sortBy = 'soldNum';
      params.direction = 'DESC';
    }

    params.minSalePrice = minVal ? minVal * 100 : 0;
    params.maxSalePrice = maxVal ? maxVal * 100 : undefined;
    if (reset) return params;
    return {
      ...params,
      pageIndex: pageIndex + 1,
      pageSize,
    };
  },

  async init(reset = true) {
    const { loadMoreStatus, goodsList = [] } = this.data;
    const params = this.generalQueryData(reset);
    if (loadMoreStatus !== 0) return;
    this.setData({
      loadMoreStatus: 1,
      loading: true,
    });
    try {
      getGoodsResultList(params).then((res) => {
        console.log('getGoodsResultList:' + JSON.stringify(res));
        if (res) {
          this.pageIndex = params.pageIndex || 1;
          this.total = res.length + this.data.goodsList.length;
          this.setData({
            hasLoaded: res.length != 0,
            loadMoreStatus: res.length == 0 ? 0 : 2,
            loading: false,
            goodsList: this.data.goodsList.concat(res),
          });
        } else {
          this.setData({
            emptyInfo: {
              tip: '抱歉，未找到相关商品',
            },
            hasLoaded: true,
            loadMoreStatus: 0,
            loading: false,
            goodsList: [],
          });
        }
      });

    } catch (error) {
      this.setData({
        loading: false,
      });
    }
    this.setData({
      hasLoaded: true,
      loading: false,
    });
  },

  handleCartTap() {
    wx.switchTab({
      url: '/pages/cart/index',
    });
  },

  async handleSubmit(e) {
    let content = e.detail?.value;
    if (!content) return;

    let user = await getApp().globalData.user();
    if (user?.openId) {
      await increaseKeywordHistory({ openId: user.openId, content: content });
    }

    this.setData(
      {
        goodsList: [],
        loadMoreStatus: 0,
        keywords: content,
      },
      () => {
        this.init(true);
      },
    );
  },

  onReachBottom() {
    const { goodsList } = this.data;
    const { total = 0 } = this;
    if (goodsList.length === total) {
      this.setData({
        loadMoreStatus: 2,
      });
      return;
    }
    this.init(false);
  },

  handleAddCart() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击加购',
    });
  },

  gotoGoodsDetail(e) {
    const { index } = e.detail;
    const { spuId } = this.data.goodsList[index];
    wx.navigateTo({
      url: `/pages/goods/details/index?spuId=${spuId}`,
    });
  },

  handleFilterChange(e) {
    const { overall, sorts } = e.detail;
    const { total } = this;
    const _filter = {
      sorts,
      overall,
    };
    this.setData({
      filter: _filter,
      sorts,
      overall,
    });

    this.pageNum = 1;
    this.setData(
      {
        goodsList: [],
        loadMoreStatus: 0,
      },
      () => {
        total && this.init(true);
      },
    );
  },

  showFilterPopup() {
    this.setData({
      show: true,
    });
  },

  showFilterPopupClose() {
    this.setData({
      show: false,
    });
  },

  onMinValAction(e) {
    const { value } = e.detail;
    this.setData({ minVal: value });
  },

  onMaxValAction(e) {
    const { value } = e.detail;
    this.setData({ maxVal: value });
  },

  reset() {
    this.setData({ minVal: '', maxVal: '' });
  },

  confirm() {
    const { minVal, maxVal } = this.data;
    let message = '';
    if (minVal && !maxVal) {
      message = `价格最小是${minVal}`;
    } else if (!minVal && maxVal) {
      message = `价格范围是0-${minVal}`;
    } else if (minVal && maxVal && minVal <= maxVal) {
      message = `价格范围${minVal}-${this.data.maxVal}`;
    } else {
      message = '请输入正确范围';
    }
    if (message) {
      Toast({
        context: this,
        selector: '#t-toast',
        message,
      });
    }
    this.pageNum = 1;
    this.setData(
      {
        show: false,
        minVal: '',
        goodsList: [],
        loadMoreStatus: 0,
        maxVal: '',
      },
      () => {
        this.init();
      },
    );
  },
});
