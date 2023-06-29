/**
 * Created by dave on 2023/06/13.
 */

function canvasLine(bg = "rgba(239,71,93,0.5)", color = "#fff") {
  // 获取元素的属性值，如果属性值不存在，则返回默认
  function o(w, v, i) {
    return w.getAttribute(v) || i;
  }
  // 函数用于获取指定标签名称的元素集合。
  function j(i) {
    return document.getElementsByTagName(i);
  }

  function l() {
    var i = j("script"),
      w = i.length,
      v = i[w - 1];
    return {
      l: w,
      z: o(v, "zIndex", 1),
      c: o(v, "color", "255,255,255"),
      n: o(v, "count", 99),
    };
  }
  // 设置画布的宽度和高度，将其调整为与窗口或文档的可见区域大小相同
  function k() {
    (r = u.width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth),
      (n = u.height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight);
  }
  // 动画绘制函数，画布上绘制线条和粒子效果
  function b() {
    e.clearRect(0, 0, r, n);
    var w = [f].concat(t);
    var x, v, A, B, z, y;
    t.forEach(function (i) {
      (i.x += i.xa),
        (i.y += i.ya),
        (i.xa *= i.x > r || i.x < 0 ? -1 : 1),
        (i.ya *= i.y > n || i.y < 0 ? -1 : 1),
        e.fillRect(i.x - 0.5, i.y - 0.5, 1, 1);
      for (v = 0; v < w.length; v++) {
        x = w[v];
        if (i !== x && null !== x.x && null !== x.y) {
          (B = i.x - x.x), (z = i.y - x.y), (y = B * B + z * z);
          y < x.max &&
            (x === f &&
              y >= x.max / 2 &&
              ((i.x -= 0.03 * B), (i.y -= 0.03 * z)),
            (A = (x.max - y) / x.max),
            e.beginPath(),
            (e.lineWidth = A),
            (e.strokeStyle = color),
            e.moveTo(i.x, i.y),
            e.lineTo(x.x, x.y),
            e.stroke());
        }
      }
      w.splice(w.indexOf(i), 1);
    }),
      m(b);
  }

  var u = document.createElement("canvas"),
    s = l(),
    c = "c_n" + s.l,
    e = u.getContext("2d"),
    r,
    n,
    m =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (i) {
        window.setTimeout(i, 1000 / 45); // 约每秒 45 帧的速度进行更新和绘制
      },
    a = Math.random,
    f = { x: null, y: null, max: 20000 };
  u.id = c;
  u.style.cssText =
    "position:fixed;top:0;left:0;z-index:" + s.z + ";background-color:" + bg;
  j("body")[0].appendChild(u);
  k(), (window.onresize = k);
  (window.onmousemove = function (i) {
    (i = i || window.event), (f.x = i.clientX), (f.y = i.clientY);
  }),
    (window.onmouseout = function () {
      (f.x = null), (f.y = null);
    });
  u.addEventListener("touchmove", function (e) {
    e.preventDefault();
    f.x = e.touches[0].clientX;
    f.y = e.touches[0].clientY;
  });

  u.addEventListener("touchend", function () {
    f.x = null;
    f.y = null;
  });
  for (var t = [], p = 0; s.n > p; p++) {
    var h = a() * r,
      g = a() * n,
      q = 2 * a() - 1, // 产生范围在 -1 到 1 之间的水平速度或运动方向
      d = 2 * a() - 1;
    t.push({ x: h, y: g, xa: q, ya: d, max: 6000 }); // x,y,
  }
  setTimeout(function () {
    b();
  }, 100);
}
