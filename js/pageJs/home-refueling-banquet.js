/**
 *
 * Created by dell on 2017/5/17.
 */

// 套餐详情
var getHourMin = function(start, end){
    var startTime = start || "10:00",
        endTime = end || "20:00",
        startHM = startTime.split(":"),
        endHM = endTime.split(":"),
        timeList = [];
    for (var i = startHM[0]; i <= endHM[0]; i++){
        timeList.push({
            value: i + ":00",
            text: i + ":00"
        });
        if(i != endHM[0]){
            timeList.push({
                value: i + ":30",
                text: i + ":30"
            });
        }
    }
    return timeList;
};

/**
 * 生成日期，mui需要的二级联动数据
 * 参数： start开始日期， end结束日期
 * 例：getYearMonthDay(new Date(), "2017-7-1 00:00:00")
 * 返回数组： mui可直接使用
 * */
var getYearMonthDay = function(start, end){
    var startDate = new Date(start || new Date()),
        endDate = new Date(end || "2018-1-1 00:00:00"),
        dateList = [],
        oneDay = 24*60*60*1000,
        len = parseInt((endDate-startDate)/oneDay),
        hm = getHourMin("10:00", "20:00");

    for (var i = 0; i< len; i++){
        var newDate = new Date(startDate.getTime() + i*oneDay),
            mm = newDate.getMonth() + 1,
            dd = newDate.getDate();
        mm = mm < 10 ? "0" + mm : mm;
        dd = dd < 10 ? "0" + dd : dd;
        dateList.push({
            value: mm + '月' + dd + '日',
            text: mm + '月' + dd + '日',
            children: hm
        });
    }
    return dateList;
};
var dataList = getYearMonthDay(new Date(), "2017-7-1 00:00:00");

var picker = new mui.PopPicker({
    layer: 2
});
var time = '';
picker.setData(dataList);
var timer = document.getElementById('timer');
timer.addEventListener('tap', function(event) {
    picker.show(function(e) {
        var timer = document.getElementById('timer');
        timer.innerHTML = e[0].text + e[1].text;
        let riQi = e[0].text.replace('月','-');
        let perfectRiQi = riQi.replace('日','');
        time = (new Date()).getFullYear() + '-' + perfectRiQi  + ' ' + e[1].text;
        //console.log(time);
        let myData = new Date();
        // 退至一周
        let date = new Date(myData.getTime() + 7 * 24 * 3600 * 1000);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        let sevenDaysLater = year + '-' + month + '-' + day  + ' ' + hour + ':' + minute + ':' + second;
        let sevenDayEnd = Date.parse(sevenDaysLater);
        let timeStart = Date.parse(time);
        if(timeStart < sevenDayEnd) {
            mui.init({
                swipeBack: true, //启用右滑关闭功能
                duration: 3000
            });
            mui.toast('为了不影响您的用餐时间，请您在用餐前7天下单');
        }else {
            getTimeMade();
        }
    });
}, false);
// 日期选择
function getTimeMade() {

    $.ajax({
        type: "POST",
        url: "http://localhost/wzs-api/s/api",
        data:{
            accessToken:"",
            version:"",
            deviceType:"3",
            requestCode:"10104",
            type: 1,
            'page.currentPage': 1,
            'page.showCount': 20,
            user_id: 2,
            time: time
        },
        success: function(res){
            console.log(res)
            var resObj = res.objects;
            var homeFeast = '';
            for(var i = 0; i < resObj.length; i++){
                var chrfId = resObj[i].id;
                homeFeast += `<li class="feast">\
                                <div class="content-image"><img src="${resObj[i].group_photo_path}" alt=""><div class="manglu"><img class="xiuxi" src="${resObj[i].state == 0 ? 'image/ligin/manglu.png' : 'image/ligin/xiuxi.png'}" alt=""></div></div>\
                                <div class="content-company-name ">\
                                    <div class="company">${resObj[i].org_name}</div>\
                                    <div class="remarks">${resObj[i].good_at_cook}</div>\
                                </div>\
                                <div class="content-address">\
                                    <span class="iconfont icon-daohang">&#xe60d;</span>\
                                     <span>${resObj[i].address}</span>\
                                </div>\
                               </li>`;

            }
            $('.company-content').html(homeFeast);
            $('.company-content li').on('click',function(){
                location.href = 'home-package-details.html?id='+chrfId + '&time=' + time;
            });
        },

        error:function(err){
            console.log(err)
        }
    });
}


var pageTotalPage = 0;
var currentPage = 0;
function initFa(){
    $.ajax({
        type: "POST",
        url: "http://localhost/wzs-api/s/api",
        data:{
            accessToken:"",
            version:"",
            deviceType:"3",
            requestCode:"10104",
            type: 1,
            'page.currentPage': 20,
            'page.showCount': 20,
            user_id: 2

        },
        success: function(res){

            pageTotalPage = res.page.totalPage;
            currentPage = res.page.currentPage;
            var resObj = res.objects;
            var homeFeast = '';
            for(var i = 0; i < resObj.length; i++){
                var chrfId = resObj[i].id;

                homeFeast +=`<li class="feast">\
                                <div class="content-image"><img src="${resObj[i].group_photo_path}" alt=""><div class="manglu"><img class="xiuxi" src="${resObj[i].state == 0 ? 'image/ligin/manglu.png' : 'image/ligin/xiuxi.png'}" alt=""></div></div>\
                                <div class="content-company-name ">\
                                    <div class="company">${resObj[i].org_name}</div>\
                                    <div class="remarks">${resObj[i].good_at_cook}</div>\
                                </div>\
                                <div class="content-address">\
                                    <span class="iconfont icon-daohang">&#xe60d;</span>\
                                     <span>${resObj[i].address}</span>\
                                </div>\
                               </li>`;

            }
            $('.company-content').html(homeFeast);
            $('.company-content li').on('click',function(){
                if($('#timer').html() == '用餐时间'){
                    mui.init({
                        swipeBack: true, //启用右滑关闭功能
                        duration: 3000
                    });
                    mui.toast('请选择用餐时间');
                }else {
                    location.href = 'home-package-details.html?id='+chrfId;
                }

            });
        },
        error:function(err){
            console.log(err)
        }
    });
}
initFa();
// 上拉加载
var indexI = 1;

function dropown(indexI){
    $.ajax({
        type: "POST",
        url: "http://localhost/wzs-api/s/api",
        data:{
            accessToken:"",
            version:"",
            deviceType:"3",
            requestCode:"10104",
            type: 1,
            'page.currentPage': indexI,
            'page.showCount': 20,
            user_id: 2
        },
        success: function(res){
            console.log(res)
            var resObj = res.objects;
            pageTotalPage = res.page.totalPage;
            currentPage = res.page.currentPage;
            var homeFeast = '';
            for(var i = 0; i < resObj.length; i++){
                var chrfId = resObj[i].id;

                homeFeast += `<li class="feast">\
                                <div class="content-image"><img src="${resObj[i].group_photo_path}" alt=""><div class="manglu"><img class="xiuxi" src="${resObj[i].state == 0 ? 'image/ligin/manglu.png' : 'image/ligin/xiuxi.png'}" alt=""></div></div>\
                                <div class="content-company-name ">\
                                    <div class="company">${resObj[i].org_name}</div>\
                                    <div class="remarks">${resObj[i].good_at_cook}</div>\
                                </div>\
                                <div class="content-address">\
                                    <span class="iconfont icon-daohang">&#xe60d;</span>\
                                     <span>${resObj[i].address}</span>\
                                </div>\
                               </li>`;

            }
            $('.company-content').append(homeFeast);
            $('.company-content li').on('click',function(){
                location.href = 'home-package-details.html?id:'+chrfId;
            });
        },
        error:function(err){
            console.log(err);
        }
    });

}

var muiScroll = $('.mui-scroll').height();
mui.init();
(function($) {
    //阻尼系数
    var deceleration = mui.os.ios?0.003:0.0009;
    $('.mui-scroll-wrapper').scroll({
        bounce: false,
        indicators: false, //是否显示滚动条
        deceleration:deceleration
    });
    $.ready(function() {
        //循环初始化所有下拉刷新，上拉加载。
        $.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
            $(pullRefreshEl).pullToRefresh({
                down: {
                    callback: function() {
                        var self = this;
                        setTimeout(function() {
                            initFa();
                            self.endPullDownToRefresh();
                        }, 10);
                    }
                },
                up: {
                    height: muiScroll,
                    callback: function() {
                        var self = this;
                        setTimeout(function() {
                            var ul = self.element.querySelector('.mui-table-view');
                            indexI++;
                            dropown(indexI);
                            //if(pageTotalPage == currentPage){
                            //    console.log('到底了');
                            //}else {
                            //    dropown(indexI);
                            //}

                            self.endPullUpToRefresh();
                        }, 1000);
                    }
                }
            });
        });

        var createFragment = function(ul, index, count, reverse) {
            initFa();
        };
    });
})(mui);



