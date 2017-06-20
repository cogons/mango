var Segment = require('segment');

// 创建实例
var segment = new Segment();
// 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
segment.useDefault();

var stutter = require("nodejieba");

var text = '我和他就这样安静地停止了这次的回合 此后就要再等下一次流星雨带他启程'

console.log(segment.doSegment(text, {
  simple: true
}));

console.log(stutter.cutForSearch(text))