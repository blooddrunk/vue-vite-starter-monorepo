export default {
  color: [
    '#3DB7ED',
    '#0DBFA6',
    '#FEC263',
    '#09EBFF',
    '#FF7F00',
    '#d87c7c',
    '#919e8b',
    '#d7ab82',
    '#6e7074',
    '#61a0a8',
    '#efa18d',
    '#787464',
    '#cc7e63',
    '#724e58',
    '#4b565b',
  ],
  backgroundColor: 'rgba(255,255,255,0)',

  textStyle: {},
  title: {
    textStyle: {
      color: '#666666',
    },
    subtextStyle: {
      color: '#999999',
    },
  },
  legend: {
    textStyle: {
      color: '#999999',
    },
  },
  dataZoom: {},
  tooltip: {},
  toolbox: {},

  bar: {
    itemStyle: {
      barBorderWidth: 0,
    },
    barWidth: 16,
  },
  line: {
    itemStyle: {
      borderWidth: 2,
    },
    lineStyle: {
      width: 3,
    },
    symbolSize: '8',
    symbol: 'emptyCircle',
    smooth: true,
  },

  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#cccccc',
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#cccccc',
      },
    },
    axisLabel: {
      show: true,
      color: '#999999',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#eeeeee'],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'],
      },
    },
  },
  valueAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#cccccc',
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#333',
      },
    },
    axisLabel: {
      show: true,
      color: '#999999',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#eeeeee'],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'],
      },
    },
  },
};
