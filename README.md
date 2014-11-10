任务分配如下：
赖渊：新闻动态/图片新闻/活动预告
晓航：志愿者申请/资助申请表/点点相册
嘉威：横幅管理/修改密码/账户管理
少雄：捐赠明细/财务报表/分享交流

log:

2014-9-20  财务报表上传 重命名 （上传路径为根目录docs/)


//
Date getMonth() 返回值是 0 - 11
getDay() 从 Date 对象返回一周中的某一天 (0 ~ 6)。
getDate() 从 Date 对象返回一个月中的某一天 (1 ~ 31)。

//
	router/aiding.js
	router/background.js
	test_data/main.js
	test_data/fundLabels.js
	test_data/volunteer_apply.js
	singleAiding.js->funds_apply.js
	background/funds_apply.jade
	aiding/apply_aiding.jade

//
delete view/news/activityContent.jade
	view/news/activity.jade
	view/background/foreshow.jade
	public/javascript/activity_control.js
	public/javascript/background_foreshow.js
	public/stylesheets/acitivity.less
	public/stylesheets/foreshow.less
	test_data/activity.js
	router/background.js
	




~出现 new JS_parse_error 一般得考虑jade文件是否符合jade引擎	
~_id 匹配需要将字符串转化为require('mongodb').ObjectID对象
~ajax请求的action中的result返回类型must be json
~空数组不能上传???
~.slideToggle()
~使用 delegate() 方法的事件处理程序适用于当前或未来的元素（比如由脚本创建的新元素）。



~限定检查
~把弹出窗口设置成bootstrap
~删除都要加提醒框 button set in middle
~姓名_学校_俩系电话
~您确定莫某的申请表    (不)通过    吗?  左取消 右不通过
~按标签查询 加上已有标签
~pass and dispass button put into the table
~志愿者的要加标签 参考资助的
~banners 904:280
~你确实要删除吗?   取消 删除
~删除键上移	
~罗列的相片参考QQ空间
~相册照片不要超过140文字


2014,10.31
views/includes/navigator.jade
views/includes/background_navigator.jade
views/background_layout.jade
views/volunteer/join-us/apply.jade
views/aiding/apply_aiding.jade
javasctipt/background_albums.js

2014.10.26
router/background.js  后台初始目录为捐赠明细
view/background/donation.jade
public/stylesheet/news.less
public/stylesheet/sidebar.less
views/news/albumList.jade

财务公开

