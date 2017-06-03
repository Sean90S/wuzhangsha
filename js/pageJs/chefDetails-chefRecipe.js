/**
 *
 * Created by dell on 2017/5/15.
 */
$(function () {
    (function () {
        var Flag=true;
        // 轮播图
        $.ajax({
            type: "POST",
            url: "http://localhost/wzs-api/s/api",
            data: {
                accessToken: "",
                version: "",
                deviceType: "3",
                requestCode: "60000",
                type: 0
            },
            success: function (res) {
                if (res.statusCode == '00000') {
                    let link = '';
                    let objects = res.objects;
                    $.each(objects, function (i, item) {
                        link += '<div class="swiper-slide"><a href=""><img src="' + item.link + '" alt=""></a></div>'
                    });
                    $('.swiper-pang').html(link);

                    //显示分数
                    var mySwiper = new Swiper('.header-content .swiper-container', {
                        loop: true,
                        pagination: '.swiper-pagination',
                        //paginationBulletRender: function (swiper, index, className) {
                        //    return '<span class="' + className + '">' + (index + 1) + '</span>';
                        //},
                        autoplay: 2000
                    });
                }
            },
            error: function (err) {
                console.log(err)
            }
        });
        // 解析Url
        let decodeUrl = window.location.search.substr(1).split("&");
        let decodeUrlObj = {};
        $.each(decodeUrl, function (i, item) {
            var decodeUrlItem = item.split("=");
            decodeUrlObj[decodeUrlItem[0]] = decodeURI(decodeUrlItem[1]);
        });
        var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; // window height
        var muiBarHeight = $("#muiBar").height(); // 菜谱和评价bar Height
        var shopCartHeight = $("#shopCart").height(); // 底部购物 height
        var timer = decodeUrlObj.time;
        $("#greens").height(windowHeight - muiBarHeight - shopCartHeight);
        $('#userRating').height(windowHeight - muiBarHeight);
        var greenList = []; // 所有菜单及菜品
        console.log(decodeUrlObj)
        $.ajax({
            type: "POST",
            url: "http://localhost/wzs-api/s/api",
            data: {
                accessToken: "",
                version: "",
                deviceType: "3",
                requestCode: "10003",
                id: decodeUrlObj.id,
                type: 1
            },
            success: function (res) {
                if (res.statusCode == '00000') {
                }
            },
            error: function (err) {
                console.log(err)
            }
        });
        let chefResume = '';
        let chefImage = '';
        chefImage += '<img id="avatar-tou" src="' + decodeUrlObj.srcImage + '" alt="">';
        chefResume = '<div class="name">' + decodeUrlObj.name + '</div>\
                        <div class="Introduction-work">\
                            <p class="Introduction">简介：' + decodeUrlObj.good_at_cook + '</p>\
                            <p class="work-experience">工作经验：' + decodeUrlObj.brief_introduction + '</p>\
                        </div>\
                        <ul class="show_number clearfix">\
                            <li class="clearfix">\
                                <div class="atar_Show">\
                                <p tip="' + decodeUrlObj.praise + '" class="Chef-evaluation"></p>\
                                </div>\
                                <span></span>\
                            </li>\
                        </ul>';

        $('.personal-information').html(chefResume);
        $('.avatar').html(chefImage);
        // 星星判断
        let TipHook = $('.Chef-evaluation');
        if (TipHook.attr('tip') == 'null') {
            TipHook.css('width', '0');
        }
        if (TipHook.attr('tip') == 0) {
            TipHook.css('width', '0');
        }
        if (TipHook.attr('tip') == 1) {
            TipHook.css('width', '23px');
        }
        if (TipHook.attr('tip') == 2) {
            TipHook.css('width', '49px');
        }
        if (TipHook.attr('tip') == 3) {
            TipHook.css('width', '72px');
        }
        if (TipHook.attr('tip') == 4) {
            TipHook.css('width', '90px');
        }
        if (TipHook.attr('tip') == 5) {
            TipHook.css('width', '112px');
        }

        // 菜品分类
        var greenName = '';
        $.ajax({
            url: 'http://localhost/wzs-api/s/api',
            type: 'POST',
            data: {
                accessToken: "",
                version: "",
                deviceType: "3",
                requestCode: "20000",
                member_id: decodeUrlObj.id,
                res_type: 1
            }
        }).success(function (resource) {
            var caiItems = resource.objects,
                greenMenu = '';
            greenName = caiItems[0];
            $.each(caiItems, function (i, d) {
                var className = i == 0 ? 'menu-item active' : 'menu-item';
                greenMenu += '<li class="' + className + '" typeId="' + d.id + '"><span class="text">' + d.name + '</span></li>';
            });
            $('.typesOf').html(greenMenu);
            getCaiItem(caiItems[0].id);

            myscroll = new iScroll("wrapper", {
                lockDirection: false,
                scroller: true,
                scrollbars: true,
                vScrollbar: false
            });
        }).error(function (err) {
            alert('错了')
        });

        // 点击左侧菜单
        let id = '';
        let index = '';
        $('.typesOf').on("click", "li", function () {
            id = $(this).attr("typeId");
            $(this).addClass("active").siblings().removeClass("active");
            getCaiItem(id);
        });

        // 根据左侧分类获取菜品
        var chrfId = '';
        var numPage = 0;

        function getCaiItem(id) {
            $.ajax({
                type: "POST",
                url: "http://localhost/wzs-api/s/api",
                data: {
                    accessToken: "",
                    version: "",
                    deviceType: "3",
                    requestCode: "20001",
                    type: 1,
                    xl_id: id,
                    member_id: decodeUrlObj.id,
                    res_type: 1
                },
                success: function (resource) {
                    totalPage = resource.page.totalPage;
                    currentPage = resource.page.currentPage;
                    //numPage = resource.page.totalPage;
                    chrfId = id;
                    renderGreen(resource.objects);
                },
                error: function (err) {
                    console.log(err)
                }
            });
        }
        var totalPage = 0;
        var currentPage = '';
        var i = 1;
        function getCaiItemFen(id, i) {
            $.ajax({
                type: "POST",
                url: "http://localhost/wzs-api/s/api",
                data: {
                    accessToken: "",
                    version: "",
                    deviceType: "3",
                    requestCode: "20001",
                    type: 1,
                    xl_id: id,
                    member_id: decodeUrlObj.id,
                    res_type: 1,
                    'page.currentPage': i,
                    'page.showCount': 10
                },
                success: function (resource) {
                    totalPage = resource.page.totalPage;
                    currentPage = resource.page.currentPage;
                    chrfId = id;
                    renderGreenGundong(resource.objects);
                },
                error: function (err) {
                    console.log(err)
                }
            });
        }

        var mySwiper = new Swiper('#muiSwiper .swiper-container', {
            pagination: '.my-pagination-ul',
            paginationClickable :true,
            paginationBulletRender: function (swiper, index, className) {
                switch (index) {
                    case 0: name='大厨菜谱';break;
                    case 1: name='用户评价';break;
                    default: name='';
                }
                return '<li class="' + className + ' mySwiper-title-bg">' + name + '</li>';
            }
        });

        // 下拉刷新
        let foodWrap = $('.foods-wrapper').height();
        $('#scroll1').height(foodWrap);
        let headerHeight = $('.header').height();
        let personalInformationHeight = $('.personal-information').outerHeight();

        let headerPersonalHeight = personalInformationHeight + headerHeight;
        console.log(headerPersonalHeight);

        //mui.init({
        //    pullRefresh : {
        //        container:"#scroll1",
        //        down: {
        //            callback: function(){
        //                console.log('正在刷新');
        //                alert('正在刷新')
        //            }
        //        }
        //    }
        //});
        //
        //function pullupRefresh() {
        //    setTimeout(function () {
        //        getCaiItem(id)
        //        .mui('#scroll1').pullRefresh().endPulldownToRefresh(); //参数为true代表没有更多数据了。
        //    }, 1500);
        //}

          mui.init();
         (function ($) {
         //阻尼系数
         var deceleration = mui.os.ios ? 0.003 : 0.0001;
         $('.mui-scroll-wrapper').scroll({
         bounce: false,
         indicators: true, //是否显示滚动条
         deceleration: deceleration
         });
         $.ready(function () {
         //循环初始化所有下拉刷新，上拉加载。
         $.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function (index, pullRefreshEl) {
         $(pullRefreshEl).pullToRefresh({
         down: {
         callback: function () {
         var self = this;
         setTimeout(function () {
         var ul = self.element.querySelector('.mui-table-view');
         getCaiItem(id);
         self.endPullDownToRefresh();
         }, 10);
         }
         },
         //up: {
         //    height: 1000,//可选.默认50.触发上拉加载拖动距离
         //    auto:false,//可选,默认false.自动上拉加载一次height: 500,
         //    callback: function () {
         //        var self = this;
         //        console.log(self)
         //        i++;
         //        setTimeout(function () {
         //            if(currentPage == totalPage) {
         //                console.log('到底了');
         //            }else {
         //                getCaiItemFen(id, i);
         //            }
         //            self.endPullUpToRefresh();
         //        }, 1000);
         //    }
         //}
         });
         });

         });
         })(mui);

        let ling = 0
       /* $('#scroll1').scroll(function(){
            if($(this).scrollTop() <= 0){
                console.log('zhiwei0')
                $('body').animate({scrollTop: 0}, 800);
              /!*  mui.init();
                (function ($) {
                    //阻尼系数
                    var deceleration = mui.os.ios ? 0.003 : 0.0001;
                    $('.mui-scroll-wrapper').scroll({
                        bounce: false,
                        indicators: true, //是否显示滚动条
                        deceleration: deceleration
                    });
                    $.ready(function () {
                        //循环初始化所有下拉刷新，上拉加载。
                        $.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function (index, pullRefreshEl) {
                            $(pullRefreshEl).pullToRefresh({
                                down: {
                                    callback: function () {
                                        var self = this;
                                        setTimeout(function () {
                                            var ul = self.element.querySelector('.mui-table-view');
                                            getCaiItem(id);
                                            self.endPullDownToRefresh();
                                        }, 10);
                                    }
                                },
                                //up: {
                                //    height: 1000,//可选.默认50.触发上拉加载拖动距离
                                //    auto:false,//可选,默认false.自动上拉加载一次height: 500,
                                //    callback: function () {
                                //        var self = this;
                                //        console.log(self)
                                //        i++;
                                //        setTimeout(function () {
                                //            if(currentPage == totalPage) {
                                //                console.log('到底了');
                                //            }else {
                                //                getCaiItemFen(id, i);
                                //            }
                                //            self.endPullUpToRefresh();
                                //        }, 1000);
                                //    }
                                //}
                            });
                        });

                    });
                })(mui);*!/
            }else if($(this).scrollTop() >=){
                setTimeout(function(){
                    $('body').animate({scrollTop: headerPersonalHeight}, 800);
                },1000);
                //slideUp()
                //$('body').scrollTop(headerPersonalHeight);
                //$('body').animate({scrollTop: headerPersonalHeight}, 800);
                //$('body').animate()
            }
            //console.log($(this).scrollTop());
            //mui.init();
            //(function ($) {
            //    //阻尼系数
            //    var deceleration = mui.os.ios ? 0.003 : 0.0001;
            //    //$('.mui-scroll-wrapper').scroll({
            //    //    bounce: false,
            //    //    indicators: true, //是否显示滚动条
            //    //    deceleration: deceleration
            //    //});
            //    $.ready(function () {
            //        //循环初始化所有下拉刷新，上拉加载。
            //        $.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function (index, pullRefreshEl) {
            //            $(pullRefreshEl).pullToRefresh({
            //                down: {
            //                    callback: function () {
            //                        var self = this;
            //                        setTimeout(function () {
            //                            var ul = self.element.querySelector('.mui-table-view');
            //                            getCaiItem(id);
            //                            //$('#bg-ying').css('zIndex','500')
            //                            self.endPullDownToRefresh();
            //                        }, 10);
            //                    }
            //                },
            //                //up: {
            //                //    height: 1000,//可选.默认50.触发上拉加载拖动距离
            //                //    auto:false,//可选,默认false.自动上拉加载一次height: 500,
            //                //    callback: function () {
            //                //        var self = this;
            //                //        console.log(self)
            //                //        i++;
            //                //        setTimeout(function () {
            //                //            if(currentPage == totalPage) {
            //                //                console.log('到底了');
            //                //            }else {
            //                //                getCaiItemFen(id, i);
            //                //            }
            //                //            self.endPullUpToRefresh();
            //                //        }, 1000);
            //                //    }
            //                //}
            //            });
            //        });
            //
            //    });
            //})(mui);

        });*/

        // 渲染菜单及菜
        var listLiHeight = [];
        function renderGreen(resource) {
            var greenItems = ''; // 右侧菜列表
            var listItem = '';

            $.each(resource, function (ii, dd) {
                if (chrfId == 1) {
                    greenItems += '<li class="food-item">\
                                <div class="icon icon-host">\
                                    <img class="imageFood-host" width="100" height="70" src=' + dd.img_path + ' alt="">\
                                </div>\
                                <div class="content">\
                                    <h2 class="name">' + dd.name + '</h2>\
                                    <p class="desc"></p>\
                                    <div class="extra">\
                                        <span class="count"></span>\
                                        <span></span>\
                                    </div>\
                                    <div class="price">\
                                        <span class="now">￥' + dd.price + '</span>\
                                        <img class="imageTian-jia" src="image/ligin/tianjia.png" name="' + dd.name + '" price="' + dd.price + '" foodId="' + dd.id + '" alt="">\
                                    </div>\
                                </div>\
                            </li><span class="xian"></span>';
                } else {
                    listItem += '<li class="right-item">\
                                <div class="Integrated">\
                                <div class="list-img"><img src="' + dd.img_path + '" alt=""></div>\
                                <div class="caiming">' + dd.name + '</div>\
                                <div class="money">\
                                <span class="yuan">¥' + dd.price + '</span>\
                                <img class="imageTian-jia" src="image/ligin/tianjia.png" name="' + dd.name + '" price="' + dd.price + '" foodId="' + dd.id + '" alt="">\
                                </div>\
                                </div>\
                                </li>';
                }

            });
            greenItems == '' ? $('.empicon-box').show() : $('.empicon-box').hide();
            listItem == '' ? $('.empicon-box').show() : $('.empicon-box').hide();
            $('.food-list-hook').html(greenItems);
            $('.horizontal-list').html(listItem);

            let privateCustomHost = $('.private-custom-host').height();
            let scrollOne = $('#scroll1').height();
            if(privateCustomHost < scrollOne){
                $('.mui-pull-bottom-tips').hide();
            }else {
                $('.mui-pull-bottom-tips').show()
            }

            //foodList = new iScroll("foodList", {
            //    scrollbars: true,
            //    mouseWheel: true,
            //    interactiveScrollbars: true,
            //    shrinkScrollbars: 'scale',
            //    fadeScrollbars: true,
            //    onScrollMove: function (e) {
            //    console.log(this.y)
            //    //    if(this.y > 20){
            //    //        //getCaiItem(id);
            //    //}
            //    //
            //    //    if (this.y >= 0) {
            //    //        $('#bg-ying').css('zIndex', '500');
            //    //    } else if (this.y >= -10) {
            //    //        $('#bg-ying').css('zIndex', '0')
            //    //    }
            //    //
            //    //    var ulList = parseInt($('#foodList').height());
            //    //    var liHeight = parseInt($('.right-item').outerHeight() * 10 / 2);
            //    //    var foodsWrapper = $('.foods-wrapper').height();
            //    //    var Subtract = ulList - liHeight;
            //    //    //var total = ((totalPage == '' ? 1 : parseInt(totalPage)) * liHeight) - foodsWrapper;
            //    //    i++;
            //    //    if(this.y == Subtract && this.y == -total){
            //    //        console.log(1);
            //    //        getCaiItemFen(id, i);
            //    //    }
            //    }
            //});
        }

        function renderGreenGundong(resource) {
            var greenItems = ''; // 右侧菜列表
            var listItem = '';

            $.each(resource, function (ii, dd) {

                if (chrfId == 1) {
                    greenItems += '<li class="food-item">\
                                <div class="icon icon-host">\
                                    <img class="imageFood-host" width="100" height="70" src=' + dd.img_path + ' alt="">\
                                </div>\
                                <div class="content">\
                                    <h2 class="name">' + dd.name + '</h2>\
                                    <p class="desc"></p>\
                                    <div class="extra">\
                                        <span class="count"></span>\
                                        <span></span>\
                                    </div>\
                                    <div class="price">\
                                        <span class="now">￥' + dd.price + '</span>\
                                        <img class="imageTian-jia" src="image/ligin/tianjia.png" name="' + dd.name + '" price="' + dd.price + '" foodId="' + dd.id + '" alt="">\
                                    </div>\
                                </div>\
                            </li><span class="xian"></span>';
                } else {
                    listItem += '<li class="right-item">\
                                <div class="Integrated">\
                                <div class="list-img"><img src="' + dd.img_path + '" alt=""></div>\
                                <div class="caiming">' + dd.name + '</div>\
                                <div class="money">\
                                <span class="yuan">¥' + dd.price + '</span>\
                                <img class="imageTian-jia" src="image/ligin/tianjia.png" name="' + dd.name + '" price="' + dd.price + '" foodId="' + dd.id + '" alt="">\
                                </div>\
                                </div>\
                                </li>';
                }

            });
            $('.food-list-hook').html(greenItems);
            $('.horizontal-list').append(listItem);
            /*foodList = new iScroll("foodList", {
                scrollbars: true,
                mouseWheel: true,
                interactiveScrollbars: true,
                shrinkScrollbars: 'scale',
                fadeScrollbars: true,
                onScrollMove: function (e) {
                    var height = parseInt($('.header').height());
                    var personalInformation = parseInt($('.personal-information').outerHeight());
                    var sliderSegmentedControl = parseInt($('#sliderSegmentedControl').height()) + 1;
                    if (this.y >= 0) {
                        $('#bg-ying').css('zIndex', '500')
                    } else if (this.y >= -10) {
                        $('#bg-ying').css('zIndex', '0');

                    }
                }
            });*/
        }
        var listHeight = []; // 每个种类菜单高度累计
        var myscroll; // 左侧菜单
        var foodList; // 右侧菜品

        // load 滚动
        function loaded() {
            let menuH = $('.menu-item').outerHeight(); // 左侧单个目录高度
            let typesOfHeight = $('.typesOf').innerHeight(); // 左侧目录高度(内部)
            let switchMenuHeight = $(".Switch-menu").innerHeight(); // 左侧大厨菜谱高度（外部）
            let typesOfNum = (typesOfHeight - switchMenuHeight) > 0 ? Math.ceil((typesOfHeight - switchMenuHeight) / menuH) : 0;
            let resource = greenList;

            let liHeight = $('.food-item').innerHeight() + $('.xian').innerHeight(); // 右侧菜 单个 height
            var listHeightAll = 0;
            $.each(resource, function (i, d) {
                let oneLiHeight = d.child.length * liHeight;
                listHeightAll += oneLiHeight;
                listHeight.push(listHeightAll);
            });
            setTimeout(function () {
                myscroll = new iScroll("wrapper", {
                    lockDirection: false,
                    scroller: true,
                    scrollbars: true,
                    vScrollbar: false
                });

                foodList = new iScroll("foodList", {
                    scrollbars: true,
                    mouseWheel: true,
                    interactiveScrollbars: true,
                    shrinkScrollbars: 'scale',
                    fadeScrollbars: true,
                    onScrollMove: function (e) {
                        var y = -parseInt(this.y);
                        for (var i = 0, len = listHeight.length; i < len; i++) {
                            if (y >= listHeight[i] && y < listHeight[i + 1]) {
                                $('.typesOf li').eq(i).addClass("active").siblings().removeClass("active");
                                if (typesOfNum && i <= typesOfNum) {
                                    myscroll.scrollTo(0, i * menuH > (typesOfHeight - switchMenuHeight) ? (switchMenuHeight - typesOfHeight) : -i * menuH);
                                } else if (i > typesOfNum) {
                                    myscroll.scrollTo(0, switchMenuHeight - typesOfHeight);
                                }
                            } else if (y < listHeight[0]) {
                                $('.typesOf li').eq(0).addClass("active").siblings().removeClass("active");
                                myscroll.scrollTo(0, 0);
                            }
                        }
                    }
                });
            });
        }
        // 渲染购物车
        var writeCardList = function () {
            var cardHtml = '';
            var totalPrice = 0, totalNum = 0;
            for (var i = 0; i < cardList.length; i++) {
                console.log(cardList[i])
                cardHtml += '<li class="dish-name" index="' + i + '">\
                            <div class="dish">' + cardList[i].name + '</div>\
                            <div class="Price-list">￥' + cardList[i].price + '</div>\
                            <div class="cart">\
                            <span class="cardMinus"><img src="image/ligin/shanchu.png" alt=""></span>\
                            <span>' + cardList[i].num + '</span>\
                            <span class="cardAdd"><img src="image/ligin/tianjia.png" alt=""></span>\
                            </div>\
                            </li>';
                totalNum += cardList[i].num;
                totalPrice += cardList[i].num * cardList[i].price;
            }
            $("#cardList").html(cardHtml);
            $("#cardNum").text(totalNum);
            $("#cardPrice").text(totalPrice);
            let cardPrice = parseInt($('#cardPrice').text());
            if(cardPrice > 200){
                $('.shopcart-content-right').show();
                $('.orders').hide();
            }else {
                $('.shopcart-content-right').hide();
                $('.orders').show();
            }
        };

        var cardList = []; // 购物车列表
        // 添加购物车
        $('.food-list').on('click', 'li .imageTian-jia', function () {
            var id = $(this).attr("foodId");
            var index = -1;
            $.each(cardList, function (i, item) {
                if (id == item.id) index = i;
            });
            if (index != -1) {
                cardList[index].num++;
            } else {
                cardList.push({
                    name: $(this).attr("name"),
                    price: $(this).attr("price"),
                    id: id,
                    num: 1
                });
            }
            writeCardList();
        });

        // 购物车减
        $("#cardList").on("click", ".cardMinus", function () {
            var index = $(this).parents("li").attr("index");
            cardList[index].num--;
            if (cardList[index].num <= 0) {
                cardList.splice(index, 1);
            }
            writeCardList();
        });

        // 购物车加
        $("#cardList").on("click", ".cardAdd", function () {
            var index = $(this).parents("li").attr("index");
            cardList[index].num++;
            writeCardList();
        });

        // 清除购物车
        $(".empty-cart").on("click", function () {
            cardList = [];
            writeCardList();
            $('.selected-menu').hide();
        });

        $('#logo-wrapper').on('click', '.logo', function () {
            $('.selected-menu').toggle();
        });

        // 评价
        var ewitchEvaluation = 0;
        function switchMen() {
            $.ajax({
                type: "POST",
                url: "http://localhost/wzs-api/s/api",
                data: {
                    accessToken: "",
                    version: "",
                    deviceType: "3",
                    requestCode: "30002",
                    id: 27,
                },
                success: function (resource) {
                    let commentInfo = resource.objects;
                    let evaluation = '';
                    for(var i = 0 ; i < commentInfo.length ; i++){
                       chefName = commentInfo[i].bName;
                       chefId = commentInfo[i].b_member_id;
                       score = commentInfo[i].score;
                       remark = commentInfo[i].remark;
                       create_time = commentInfo[i].create_time;
                       img_path = commentInfo[i].img_path;
                        var img = "";
                        if (img_path){
                            var src = img_path.split(',');
                            for(var n=0; n <src.length; n++)
                                img +='<img src="'+src[i]+'" alt="" class="comment-img">'
                        }
                        img = img == '' ? '' : img;
                        evaluation += ' <div class="switch-list"><div class="switch-list"><div class="Evaluation-name">\
                                            <div class="name-image"><img src="image/ligin/touxiang.png" alt=""></div>\
                                            <div class="name">\
                                            <span class="username">'+ chefName +'</span> <span class="username-xian"></span> \
                                            <span class="name-star">\
                                            <ul class="show_number clearfix">\
                                            <li class="clearfix">\
                                            <div class="atar_Show">\
                                            <p tip="'+ score +'" class="Tip-hook"><span id="xingxing" style="margin-left: 4.5rem;">4.0</span></p>\
                                            </div>\
                                            <span></span>\
                                            </li>\
                                            </ul>\
                                        </span>\
                                            <span class="time">评价时间 : '+ create_time +'</span>\
                                        </div>\
                                        </div>\
                                            <div class="Evaluation-image">\
                                                    <div class="food-photos clearfix">'+ img +'</div>\
                                            </div>\
                                            <div class="Evaluation-language">\
                                            <span>'+ remark +'</span>\
                                        </div></div></div>';

                    }
                    $('#Switch-Evaluation').html(evaluation);
                    ewitchEvaluation = $('#Switch-Evaluation').outerHeight();
                    console.log(ewitchEvaluation)
                    let TipHook = $('.name-star').find('.Tip-hook');
                    $.each(TipHook, function(){

                           if ($(this).attr('tip') == 'null') {
                               $(this).css('width', '0');
                               $(this).find('#xingxing').text('0');
                           }
                           if ($(this).attr('tip') == 0) {
                               $(this).css('width', '0');
                               $(this).find('#xingxing').text('0');
                           }
                           if ($(this).attr('tip') == 1) {
                               $(this).css('width', '20px');
                               $(this).find('#xingxing').text('1.0');
                           }
                           if ($(this).attr('tip') == 2) {
                               $(this).css('width', '40px');
                               $(this).find('#xingxing').text('2.0');
                           }
                           if ($(this).attr('tip') == 3) {
                               $(this).css('width', '60px');
                               $(this).find('#xingxing').text('3.0');
                           }
                           if ($(this).attr('tip') == 4) {
                               $(this).css('width', '80px');
                               $(this).find('#xingxing').text('4.0');
                           }
                           if ($(this).attr('tip') == 5) {
                               $(this).css('width', '100px');
                               $(this).find('#xingxing').text('5.0');
                           }
                    });
                    $('#userRating').css('overflow', 'auto');
                    $('#userRating').scroll(function () {
                        if ($(this).scrollTop() == 0) {
                            $('#bg-ying').css('zIndex', '500');
                        } else if ($(this).scrollTop() >= 10) {
                            $('#bg-ying').css('zIndex', '0');
                        }
                    });

                },
                error: function (err) {
                    console.log(err)
                }
            });
        }
        switchMen();

        // JSON.stringify(cardList); // 数组转化为字符串
        // JSON.parse(cardList); // 字符串转化为数组

        // 预定
        $('.shopcart-content-right').on('click', function () {
            let storage = window.localStorage;
            let d = JSON.stringify(cardList);
            storage.setItem("data", d);
            let json = storage.getItem("data");
            let cardTotalPrice = $('#cardPrice').html();
            let cardTotal = $('#cardNum').html();
            let userName = $('.name').html();
            location.href = "confirmation-of-information.html?json=" + json + "&cardTotalPrice=" + cardTotalPrice + "&cardTotal=" + cardTotal + "&userName=" + userName + "&timer=" + timer;
            writeCardList();
        });
    })();
});

