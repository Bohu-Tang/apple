// index.js
import * as echarts from '../../components/ec-canvas/echarts'
import {getAppleType} from '../../api/index.js'
import {http} from '../../http/request'
// 获取应用实例
const app = getApp();

function setOption(chart) {
  const option = {
    legend: {},
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      confine: true
    },
    // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
    xAxis: {
      type: 'category',
      data: ['8月9日', '8月10日', '8月11日', '8月12日', '8月13日', '8月14日', '8月15日']
    },
    // 声明一个 Y 轴，数值轴。
    yAxis: {
      type: 'value'
    },
    // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
    series: [{
        name: '65#',
        type: 'line',
        data: ['2.3', '2.5', '2.5', '2.6', '2.4', '2.4']
      },
      {
        name: '70#',
        type: 'line',
        data: ['2.8', '2.9', '2.8', '2.8', '2.9', '2.8']
      }, {
        name: '75#',
        type: 'line',
        data: ['3.2', '3.2', '3.3', '3.3', '3.5', '3.6']
      }, {
        name: '80#',
        type: 'line',
        data: ['4.6', '4.5', '4.9', '5.1', '4.9', '4.9']
      },
    ]
  }
  chart.setOption(option);
}

Page({
  onShareAppMessage: res => {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () {},
      fail: function () {}
    }
  },

  data: {
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    isLoaded: false,
    isDisposed: false,
    typeList: []
  },

  onReady: function () {
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
    this.appleType()
  },
  // 获取品种数据
  async appleType(){
    const res = await http(getAppleType)
    this.setData({
      typeList: res
    })
  },



  // 点击按钮后初始化图表
  init: function () {
    this.ecComponent.init((canvas, width, height, dpr) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      setOption(chart);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      this.setData({
        isLoaded: true,
        isDisposed: false
      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },

  dispose: function () {
    if (this.chart) {
      this.chart.dispose();
    }

    this.setData({
      isDisposed: true
    });
  }
});