//import { fetchHome } from '../../services/home/home';
import { getGoodsList } from '../../services/dataSource/goods';
import { getNavigation } from '../../services/dataSource/home';
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    imgSrcs: [],
    tabList: [],
    goodsList: [],
    goodsListLoadStatus: 0,
    pageLoading: false,
    current: 1,
    autoplay: true,
    duration: '500',
    interval: 5000,
    navigation: { type: 'dots' },
    swiperImageProps: { mode: 'scaleToFill' },
    defKeywords: '【营养干贝】火爆上市',
    step: 0,
  },

  goodListPagination: {
    index: 0,
    num: 4,
  },

  privateData: {
    tab: undefined,
  },

  onShow() {
    this.getTabBar().init();
  },

  onLoad() {
    this.init();
  },

  onReachBottom() {
    if (this.data.goodsListLoadStatus === 0) {
      this.loadGoodsList();
    }
  },

  onPullDownRefresh() {
    this.init();
  },

  init() {
    this.loadHomePage();
  },

  loadHomePage() {
    wx.stopPullDownRefresh();

    this.setData({
      pageLoading: true,
    });
    // getApp().globalData.postApi('MyHome/GetNavigation', null).then((res) => {
    //   getApp().globalData.info(`ABC Then:${JSON.stringify(res)}`);
    // });
    getNavigation().then((navigation) => {
      this.setData({
        tabList: navigation.tabList,
        imgSrcs: navigation.swiper,
        pageLoading: false,
      });
      if (this.data.tabList?.length > 0) {
        this.privateData.tab = this.data.tabList[0];
      }
      this.loadGoodsList(true);
    });

    // fetchHome().then(({ swiper, tabList }) => {
    //   this.setData({
    //     tabList,
    //     imgSrcs: swiper,
    //     pageLoading: false,
    //   });
    //   this.loadGoodsList(true);
    // });
  },

  tabChangeHandle(e) {
    let lst = this.data.tabList.filter((n) => { return n.key == e.detail?.value; });
    if (lst && lst.length > 0) {
      // console.log(`V:${JSON.stringify(lst[0])}`);
      this.privateData.tab = lst[0];
    }
    this.loadGoodsList(true);
  },

  onReTry() {
    this.loadGoodsList();
  },

  async loadGoodsList(fresh = false) {
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }

    this.setData({ goodsListLoadStatus: 1 });
    const pageSize = this.goodListPagination?.num || 8;
    let pageIndex = (this.goodListPagination?.tabIndex || 0) * pageSize + (this.goodListPagination?.index || 1) + 1;
    if (fresh) {
      pageIndex = 1;
    }

    try {
      //console.log(`tag:${this.privateData.tab?.code}`);
      const lst = await getGoodsList({ pageIndex, pageSize, tag: this.privateData.tab?.code });
      //getApp().globalData.info(`Home getGoodsList: ${ JSON.stringify(lst) } `);
      this.setData({
        goodsList: fresh ? lst : this.data.goodsList.concat(lst),
        goodsListLoadStatus: 0,
      });

      this.goodListPagination.index = pageIndex;
      this.goodListPagination.num = pageSize;
    } catch (err) {
      this.setData({ goodsListLoadStatus: 3 });
    }
  },

  goodListClickHandle(e) {
    const { index } = e.detail;
    const { spuId } = this.data.goodsList[index];
    wx.navigateTo({
      url: `/ pages / goods / details / index ? spuId = ${spuId} `,
    });
  },

  goodListAddCartHandle() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击加入购物车',
    });
  },

  navToSearchPage() {
    wx.navigateTo({ url: `/pages/goods/search/index?defKeywords=${this.data.defKeywords}` });
  },

  navToActivityDetail({ detail }) {
    const { index: promotionID = 0 } = detail || {};
    wx.navigateTo({
      url: `/ pages / promotion - detail / index ? promotion_id = ${promotionID} `,
    });
  },
});
