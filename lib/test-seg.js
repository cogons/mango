var Segment = require('segment');

// 创建实例
var segment = new Segment();
// 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
segment.useDefault();

var stutter = require("nodejieba");

var text = 'Wake up in the street 7 AM Ready for the beat I dont know where Ive been I call up my friends'

console.log(segment.doSegment(text, {
  simple: true
}));

console.log(stutter.cut(text))