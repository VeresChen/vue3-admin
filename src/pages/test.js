// 立即执行函数
$(function() {
  //初始值 最大值 所用时间秒 闪烁次数
  function numberTwinkle(min, max, useTime, rate, el) {
    // 统一转为数字类型
    min = Number(min);
    max = Number(max);
    useTime = Number(useTime);
    rate = Number(rate);

    let jg = (max - min) / rate;  // 计算步长值
    let timeInterval = (useTime * 1000) / rate;  // 时间间隔
    let currentValue = min; // 当前值

    // 更新数据函数
    function updateNumber() {
      // 渲染当前值到html中
      $(el).html(currentValue);
      // 达到最大值后
      if (currentValue === max) {
        // 重置当前值
        currentValue = min;
      } else {
        // 每次加上步长值
        currentValue += jg;
      }
    }

    // 定时器循环执行updateNumber函数
    setInterval(updateNumber,timeInterval)
  }

  // 调用
  numberTwinkle(1, 3698, 2, 60, "#number");
});