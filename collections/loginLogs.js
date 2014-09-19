//管理员登录记录
/*
  loginLogs:
    _id: ObjecttID,
    time: timestamp,    //登录时间
    user: userID,     //登录者ID
    IP: string        //登录IP
    address: string     //登录地,精确到城市
*/

/*
  地址通过api自动查询：
    淘宝：http://ip.taobao.com/service/getIpInfo.php?ip=[ip地址]
    百度：http://api.map.baidu.com/lbsapi/cloud/ip-location-api.htm
*/