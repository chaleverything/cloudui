import { getCategoryList } from '../../../services/good/fetchCategoryList';
import { getAllCategorys } from '../../../services/dataSource/category'

Page({
  data: {
    list: [],
  },
  async init() {
    // try {
    //   const result = await getCategoryList();
    //   this.setData({
    //     list: result,
    //   });
    // } catch (error) {
    //   console.error('err:', error);
    // }
    let that = this;
    // getApp().globalData.postApi('Categorys/GetAllCategorys', null).then((res) => {
    //   //getApp().globalData.info(`ABC Then:${JSON.stringify(res)}`);
    //   if (res.isSucc) {
    //     that.setData({
    //       list: res.data,
    //     });
    //   }
    // });
    this.setData({
      list: await getAllCategorys(),
    });
    //console.log('B:' + JSON.stringify(getAllCategorys()));
  },

  onShow() {
    this.getTabBar().init();
  },
  onChange() {
    wx.navigateTo({
      url: '/pages/goods/list/index',
    });
  },
  onLoad() {
    this.init(true);
  },
});
