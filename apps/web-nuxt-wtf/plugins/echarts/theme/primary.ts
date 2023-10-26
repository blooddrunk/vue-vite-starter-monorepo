export default {
  // color: [
  //   '#3DB7ED',
  //   '#0DBFA6',
  //   '#FEC263',
  //   '#09EBFF',
  //   '#FF7F00',
  //   '#d87c7c',
  //   '#919e8b',
  //   '#d7ab82',
  //   '#6e7074',
  //   '#61a0a8',
  //   '#efa18d',
  //   '#787464',
  //   '#cc7e63',
  //   '#724e58',
  //   '#4b565b',
  // ],
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
  tooltip: {},

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
    symbolSize: 8,
    symbol: 'emptyCircle',
    smooth: true,
  },

  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#94a3b8',
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#94a3b8',
      },
    },
    axisLabel: {
      show: true,
      color: '#94a3b8',
    },
    splitLine: {
      show: false,
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
        color: '#94a3b8',
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
      color: '#94a3b8',
    },
    splitLine: {
      show: false,
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
  map: {
    itemStyle: {
      areaColor: {
        type: 'radial',
        x: 0.5,
        y: 0.5,
        r: 2,
        colorStops: [
          {
            offset: 0,
            color: '#bae6fd',
          },
          {
            offset: 1,
            color: '#0369a1',
          },
        ],
      },
      borderWidth: 1,
      borderColor: '#0e7490',
      shadowColor: '#155e75',
      shadowOffsetX: -3,
      shadowOffsetY: 4,
      shadowBlur: 10,
    },
    emphasis: {
      label: {
        color: '#94a3b8',
      },
      itemStyle: {
        areaColor: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 1,
          colorStops: [
            {
              offset: 0,
              color: '#0369a1',
            },
            {
              offset: 1,
              color: '#bae6fd',
            },
          ],
        },
        borderColor: '#0284c7',
      },
    },
    select: {
      label: {
        color: 'white',
        fontWeight: 600,
      },
      itemStyle: {
        areaColor: '#0369a1',
        borderColor: '#0e7490',
        shadowColor: '#155e75',
        shadowOffsetX: -2,
        shadowOffsetY: 2,
        shadowBlur: 10,
      },
    },
  },
  geo: {
    itemStyle: {
      areaColor: {
        type: 'radial',
        x: 0.5,
        y: 0.5,
        r: 2,
        colorStops: [
          {
            offset: 0,
            color: '#bae6fd',
          },
          {
            offset: 1,
            color: '#0369a1',
          },
        ],
      },
      borderWidth: 1,
      borderColor: '#0e7490',
      shadowColor: '#155e75',
      shadowOffsetX: -3,
      shadowOffsetY: 4,
      shadowBlur: 10,
    },
    emphasis: {
      label: {
        color: '#94a3b8',
      },
      itemStyle: {
        areaColor: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 1,
          colorStops: [
            {
              offset: 0,
              color: '#0369a1',
            },
            {
              offset: 1,
              color: '#bae6fd',
            },
          ],
        },
        borderColor: '#0284c7',
      },
    },
    select: {
      label: {
        color: 'white',
        fontWeight: 600,
      },
      itemStyle: {
        areaColor: '#0369a1',
        borderColor: '#0e7490',
        shadowColor: '#155e75',
        shadowOffsetX: -2,
        shadowOffsetY: 2,
        shadowBlur: 10,
      },
    },
  },
};
