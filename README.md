# 逸辰音乐
这是一款基于 Vue/TypeScript 的在线听歌应用，完美适配 PC端和移动端，功能包含推荐、歌手、排行、搜索、播放、收藏和历史等。该项目使用了 Vue全家桶、jsonp 以及 Typescript等技术。通过分析qq音乐http请求链接，拿到qq音乐真实api接口，同时使用jsonp实现了真正在线播放效果。


## 主要功能界面

1. 推荐 / 歌手 / 排行 / 搜索

<a href="https://imgchr.com/i/DkCL5R"><img src="https://s3.ax1x.com/2020/11/16/DkCL5R.png" alt="DkCL5R.png" border="0" width='250px'></a>
<a href="https://imgchr.com/i/DkCfCq"><img src="https://s3.ax1x.com/2020/11/16/DkCfCq.png" alt="DkCfCq.png" border="0" width='250px'></a>
<br>
<a href="https://imgchr.com/i/DkCXP1"><img src="https://s3.ax1x.com/2020/11/16/DkCXP1.png" alt="DkCXP1.png" border="0" width='250px'></a>
<a href="https://imgchr.com/i/DkCR5n"><img src="https://s3.ax1x.com/2020/11/16/DkCR5n.png" alt="DkCR5n.png" border="0" width='250px'></a>

<br>


2. 歌手詳情頁 / 播放列表 / 播放頁 / 收藏歷史頁

<a href="https://imgchr.com/i/DkCh80"><img src="https://s3.ax1x.com/2020/11/16/DkCh80.png" alt="DkCh80.png" border="0" width='250px'></a>
<a href="https://imgchr.com/i/DkCv26"><img src="https://s3.ax1x.com/2020/11/16/DkCv26.png" alt="DkCv26.png" border="0" width='250px'></a>
<br>
<a href="https://imgchr.com/i/DkCxxK"><img src="https://s3.ax1x.com/2020/11/16/DkCxxK.png" alt="DkCxxK.png" border="0" width='250px'></a>
<a href="https://imgchr.com/i/DkCj8x"><img src="https://s3.ax1x.com/2020/11/16/DkCj8x.png" alt="DkCj8x.png" border="0" width='250px'></a>

## 主要的技术栈

1. 主要使用 vue 全家桶，包括 vue-router、 vuex 、 mixins等
2. 全程使用 typescript 开发，使用类型声明和泛型提高代码可读性和可预测性
3. 使用 vueLazyLoad 实现图片懒加载
4. 使用 jsonp 跨域拿到qq音乐后台数据


