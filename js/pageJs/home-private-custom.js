let decodeUrl = window.location.search.substr(1).split("&");
let decodeUrlObj = {};
$.each(decodeUrl, function (i, item) {
    var decodeUrlItem = item.split("=");
    decodeUrlObj[decodeUrlItem[0]] = decodeURI(decodeUrlItem[1]);
});
let userId = decodeUrlObj.userId;
console.log(decodeUrlObj)
var getHourMin = function(start, end){
    var startTime = start || "10:00",
        endTime = end || "20:00",
        startHM = startTime.split(":"),
        endHM = endTime.split(":"),
        timeList = [];
    for (var i = startHM[0]; i <= endHM[0]; i++){
        timeList.push({
            value: i + ":00",
            text: i + ":00",
            list: (parseInt(i) + 3) + ":00"
        });
        if(i != endHM[0]){
            timeList.push({
                value: i + ":30",
                text: i + ":30",
                list: (parseInt(i) + 3) + ":00"
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
        let myData = new Date();
        let currentTime = parseInt(myData.getFullYear()) + '-' + parseInt(myData.getMonth() + 1) + '-' + myData.getDate() + ' ' + (myData.getHours() + 3) +':'+ myData.getMinutes();
        let timeStamp = Date.parse(currentTime);  // 三个小时时间戳
        let timDate = timer.innerHTML.replace('月','-');
        let riDate =(new Date()).getFullYear() + '-' + timDate.replace('日', ' ');
        let timeEnd = Date.parse(riDate);  // 用餐时间--时间戳
        if(timeEnd < timeStamp){
            mui.init({
                swipeBack: true, //启用右滑关闭功能
                duration: 3000
            });
            mui.toast('为了不影响您的用餐时间，请您在用餐前3小时下单');
        }else {
            getTimeMade();
        }

    });
}, false);

var scrollOne = $('#scroll1').height();
var privateCustom = Math.ceil($('.private-custom').height());
console.log(scrollOne, privateCustom)
if(scrollOne > privateCustom){

    //console.log($('.mui-pull-bottom-tips'))
    $('#scroll1').find('.mui-pull-bottom-tips');
}else {
    $('.mui-pull-bottom-tips').show();
}

// 获取指定时间的私人定制列表
var totalPage = 0;
var currentPage = 0;
var arrId = [];
function getTimeMade() {
    $.ajax({
        type: "POST",
        url: "http://localhost/wzs-api/s/api",
        data:{
            accessToken:"",
            version:"",
            deviceType:"3",
            requestCode:"10104",
            time: time
        },
        success: function(res){
            console.log(res)
            if(res.statusCode == '00000'){
                let chefData = res.objects;
                var chefText = '';
                for( let i = 0; i < chefData.length; i++){
                    console.log(chefData[i].state);
                    arrId.push(chefData[i].id);

                    //console.log(chefData[i].score);
                    chefText += `<li chefId="${chefData[i].id}" brief_introduction="${chefData[i].brief_introduction}">
                                            <div class="private-image"><img src="${chefData[i]['id_card_p_path']==null?'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2198615331,3767733285&fm=117&gp=0.jpg':chefData[i]['id_card_p_path']}" alt=""></div>
                                            <div class="private-name">
                                                <div class="avatar"><img src="${chefData[i]['id_card_s_path']!=null?chefData[i]['id_card_s_path']:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3551563550,2594280103&fm=117&gp=0.jpg'}" alt=""></div>
                                                <div class="mangluzhong"><img class="xiuxizhong" src="${chefData[i].state == 0 ? 'image/ligin/xiuxizhong.png' : 'image/ligin/mangluzhong.png'}" alt=""></div>
                                                <div class="name yongName-hoot">${chefData[i].name}</div>
                                            </div>
                                            <div class="private-evaluation">
                                                    <div class="goodAt">${chefData[i]['good_at_cook']!=null?'擅长：'+chefData[i]['good_at_cook']:'擅长：'+'暂无数据'}</div>
                                                    <div class="show_number">
                                                    <div style="width: 50px;float: left">好评：</div>
                                                    <div class="atar_Show">
                                                        <p tip="${chefData[i].score}" class="Chef-evaluation"></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                     `;
                }
                $('.private-custom-host').html(chefText);
                console.log($('#item1mobile').height());
                console.log($('.private-custom').height())
            }
            // 星星评价
            let TipHook = $('.Chef-evaluation');
            if(TipHook.attr('tip') == 'null'){
                TipHook.css('width','0');
            }

            if(TipHook.attr('tip') == 0){
                TipHook.css('width','0');
            }
            if(TipHook.attr('tip') == 1){
                TipHook.css('width','23px');
            }

            if(TipHook.attr('tip') == 2){
                TipHook.css('width','49px');
            }

            if(TipHook.attr('tip') == 3){
                TipHook.css('width','72px');
            }

            if(TipHook.attr('tip') == 4){
                TipHook.css('width','90px');
            }

            if(TipHook.attr('tip') == 5){
                TipHook.css('width','112px');
            }
        },
        error:function(err){
            console.log(err)
        }
    });
}

// 私人定制

function init(){
    $.ajax({
        type: "POST",
        url: "http://localhost/wzs-api/s/api",
        data:{
            accessToken:"",
            version:"",
            deviceType:"3",
            requestCode:"10104",
            type: 1,
            'page.currentPage': 1
        },
        success: function(res){
            pageTotalPage = res.page.totalPage;
            currentPage = res.page.currentPage;
            let yongcan = res.objects;

            let chushi = '';
            for(let i = 0; i < yongcan.length; i++){
                let chefId = yongcan[i].id;
                var brief_introduction = yongcan[i].brief_introduction;
                chushi += `
                <li chefId="${chefId}" brief_introduction="${brief_introduction}">
                    <div class="private-image"><img src="${yongcan[i]['id_card_p_path']==null?'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2198615331,3767733285&fm=117&gp=0.jpg':yongcan[i]['id_card_p_path']}" alt=""></div>
                    <div class="private-name">
                        <div class="avatar"><img class="src-image" src="${yongcan[i]['id_card_s_path']!=null?yongcan[i]['id_card_s_path']:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3551563550,2594280103&fm=117&gp=0.jpg'}" alt=""></div>
                        <div class="mangluzhong"><img class="xiuxizhong" src="${yongcan[i].state == 0 ? 'image/ligin/xiuxizhong.png' : 'image/ligin/mangluzhong.png'}" alt=""></div>
                        <div class="name yongName-hoot">${yongcan[i].name}</div>
                    </div>
                    <div class="private-evaluation">
                            <div class="goodAt">${yongcan[i]['good_at_cook']!=null?'擅长：'+yongcan[i]['good_at_cook']:'擅长：'+'暂无数据'}</div>
                            <div class="show_number">
                            <div style="width: 50px;float: left">好评：</div>
                            <div class="atar_Show">
                                <p tip="${yongcan[i].score}" class="Chef-evaluation praise"></p>
                            </div>
                        </div>
                    </div>
                </li>
             `;
                $('.private-custom-host').html(chushi);
            }
            (function(){

                let TipHook = $('.Chef-evaluation');
                if(TipHook.attr('tip') == 'null'){
                    TipHook.css('width','0');
                }

                if(TipHook.attr('tip') == 0){
                    TipHook.css('width','0');
                }
                if(TipHook.attr('tip') == 1){
                    TipHook.css('width','23px');
                }

                if(TipHook.attr('tip') == 2){
                    TipHook.css('width','49px');
                }

                if(TipHook.attr('tip') == 3){
                    TipHook.css('width','72px');
                }

                if(TipHook.attr('tip') == 4){
                    TipHook.css('width','90px');
                }

                if(TipHook.attr('tip') == 5){
                    TipHook.css('width','112px');
                }
            })();
        },
        error:function(err){
            console.log(err);
        }
    });
}
init();

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
                'page.currentPage': indexI
            },
            success: function(res){
                console.log(res);
                totalPage = res.page.totalPage;
                currentPage = res.page.currentPage;
                totalResult = res.page.totalResult;
                console.log(totalResult)
                let yongcan = res.objects;
                let chushi = '';

                for(let i = 0; i < yongcan.length; i++){
                    let chefId = yongcan[i].id;
                    var brief_introduction = yongcan[i].brief_introduction;
                    chushi += `
                                <li chefId="${chefId}" brief_introduction="${brief_introduction}">
                                    <div class="private-image"><img src="${yongcan[i]['id_card_p_path']==null?'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2198615331,3767733285&fm=117&gp=0.jpg':yongcan[i]['id_card_p_path']}" alt=""></div>
                                    <div class="private-name">
                                        <div class="avatar"><img class="src-image" src="${yongcan[i]['id_card_s_path']!=null?yongcan[i]['id_card_s_path']:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3551563550,2594280103&fm=117&gp=0.jpg'}" alt=""></div>
                                        <div class="mangluzhong"><img class="xiuxizhong" src="${yongcan[i].state == 0 ? 'image/ligin/xiuxizhong.png' : 'image/ligin/mangluzhong.png'}" alt=""></div>
                                        <div class="name yongName-hoot">${yongcan[i].name}</div>
                                    </div>
                                    <div class="private-evaluation">
                                            <div class="goodAt">${yongcan[i]['good_at_cook']!=null?'擅长：'+yongcan[i]['good_at_cook']:'擅长：'+'暂无数据'}</div>
                                            <div class="show_number">
                                            <div style="width: 50px;float: left">好评：</div>
                                            <div class="atar_Show">
                                                <p tip="${yongcan[i].score}" class="Chef-evaluation praise"></p>
                                            </div>
                                        </div>
                                    </div>
                                </li>`
             }
                //$('.private-custom-host').append(chushi);
                console.log(indexI);
                if(totalPage >= indexI - 1){
                    $('.private-custom-host').append(chushi);
                }else {
                    console.log('到底了');
                    $('.mui-pull-bottom-wrapper').find('.mui-pull-loading').html('没有加载数据')
                }
                (function(){

                    let TipHook = $('.Chef-evaluation');
                    if(TipHook.attr('tip') == 'null'){
                        TipHook.css('width','0');
                    }

                    if(TipHook.attr('tip') == 0){
                        TipHook.css('width','0');
                    }
                    if(TipHook.attr('tip') == 1){
                        TipHook.css('width','23px');
                    }

                    if(TipHook.attr('tip') == 2){
                        TipHook.css('width','49px');
                    }

                    if(TipHook.attr('tip') == 3){
                        TipHook.css('width','72px');
                    }

                    if(TipHook.attr('tip') == 4){
                        TipHook.css('width','90px');
                    }

                    if(TipHook.attr('tip') == 5){
                        TipHook.css('width','112px');
                    }
                })();
            },
            error:function(err){
                console.log(err);
            }
        });

//alert(count)

}
//dropown();


var muiScroll = $('.mui-scroll').height();

// 下拉刷新
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
                            var ul = self.element.querySelector('.mui-table-view');
                            init();
                            self.endPullDownToRefresh();
                        }, 10);
                    }
                },
                up: {
                    height: muiScroll,
                    callback: function () {
                        var self = this;
                        setTimeout(function () {
                            var ul = self.element.querySelector('.mui-table-view');
                            indexI++;
                            dropown(indexI);
                            self.endPullUpToRefresh();
                        }, 1000);
                    }
                }
            });
        });

    });
})(mui);



$('.private-custom-host').on('click', 'li',function(){
    if($('#timer').html() == '用餐时间'){
        mui.init({
            swipeBack: true, //启用右滑关闭功能
            duration: 3000
        });
        mui.toast('请选择用餐时间');
    }else {
            //console.log($(this).index());
            let index = $(this).index();
            let name = $(this).find('.name').html();
            let good_at_cook = $(this).find('.goodAt').html();
            let praise = $(this).find('.praise').attr('tip');
            let srcImage = $(this).find('.src-image').attr('src');
            let brief_introduction = $(this).attr("brief_introduction");
            let chefId = $(this).attr("chefid");
            //console.log(good_at_cook.replace('擅长：','擅长'));
            good_at_cook = good_at_cook.replace('擅长：','擅长');
            let id = arrId[index];
            console.log(arrId[index]);
            location.href = "chefDetails-chefRecipe.html?id="+chefId+"&good_at_cook="+good_at_cook+"&name="+name+"&praise="+praise+"&srcImage="+srcImage+"&brief_introduction="+brief_introduction + "&time=" + time + "&userId=" + userId;

    }
});

