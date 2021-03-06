'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (nav) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var scrollBox = options.scrollBox || window;
  var offset = options.offset || 0;
  var checkStickySupport = options.checkStickySupport === true || false;
  if (typeof scrollBox === 'string') {
    scrollBox = document.getElementById(scrollBox);
  }

  var getTop = function getTop() {
    if (scrollBox === window) {
      return document.body.scrollTop;
    } else {
      return scrollBox.scrollTop;
    }
  };

  if (checkStickySupport && (gtIOS6() || isSupportSticky())) {
    // 大于等于iOS6版本使用sticky
    nav.classList.add('mt-sticky');
  } else {
    var navOffsetY = nav.offsetTop - offset;
    scrollBox.addEventListener('scroll', function () {
      var distance = getTop();
      if (distance >= navOffsetY) {
        nav.style.top = offset + 'px';
        nav.classList.add('mt-fixed');
      } else {
        nav.classList.remove('mt-fixed');
      }
    });
  }
};

// http://efe.baidu.com/blog/position-sticky/

// 检测iOS版本大于等于6
function gtIOS6() {
  var userAgent = window.navigator.userAgent;
  var ios = userAgent.match(/(iPad|iPhone|iPod)\s+OS\s([\d_.]+)/);
  return ios && ios[2] && parseInt(ios[2].replace(/_/g, '.'), 10) >= 6;
}

// 判断是否支持sticky属性
function isSupportSticky() {
  var prefixTestList = ['', '-webkit-', '-ms-', '-moz-', '-o-'];
  var stickyText = '';
  for (var i = 0; i < prefixTestList.length; i++) {
    stickyText += 'position:' + prefixTestList[i] + 'sticky';
  }
  // 创建一个dom来检查
  var div = document.createElement('div');
  var body = document.body;
  div.style.cssText = 'display:none' + stickyText;
  body.appendChild(div);
  var isSupport = /sticky/i.test(window.getComputedStyle(div).position);
  body.removeChild(div);
  div = null;
  return isSupport;
}