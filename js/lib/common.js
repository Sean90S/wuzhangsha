/**
 * 一些公用组件交互js
 * @version  1.0.1
 **/
require(["zepto"], function() {

    /*服务范围页面设置服务范围地图高度为屏幕高度*/

    $(function(){
        var screenHeight = $(window).height();
        $(".wzs-service-area").height(screenHeight);
        $(window).resize(function(){
            var screenHeight = $(window).height();
            $(".wzs-service-area").height(screenHeight);
        });
    });

    /*选择地址*/
    $(".personal-address-wrap").on("click",".personal-address-list",function(){
        $(this).find(".address-select").addClass("cur").parent().siblings().find(".address-select").removeClass("cur");
    });

    /*删除已存储地址*/
    $(".address-delete").click(function(){
        $(this).parent().remove();
    });

    /*新增地址-选择性别*/
    $(".add-address-radio").click(function(){
        $(this).addClass("cur").siblings().removeClass("cur");
        $(this).prev().attr("checked","true").siblings().removeAttr("checked");
    });

    //底部固定栏状态切换
    $('.foot-list').on('tap',function(){
        $('.foot-list').find('a').removeClass('active-page');
        $(this).find('a').addClass('active-page');
    })

    //点击星星进行评价
    var num;
    var lis = document.getElementsByClassName("star");

    function fnShow(num) {
        for (var i = 0; i < num; i++) {
            $(lis[i]).addClass("light");
        }
    }

    $('.star').on('tap', function(){
        $('.star').removeClass("light");
        num = $(this).index() + 1;
        for (var i = 1; i < num; i++){
            fnShow(num);
        }
    })


    //订单页面sweiper
    require(["swiper"], function () {
        $(function(){
            var swiper = new Swiper('.swiper-service-container', {
                pagination: '.swiper-pagination',
                paginationClickable :true,
                effect: 'coverflow',
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                onSlideChangeStart:function(swiper){
                    var index  = swiper.activeIndex;
                    $(".swiper-info-list").eq(index).addClass("cur").siblings().removeClass("cur");
                },
                coverflow: {
                    rotate: 0,
                    stretch: 0,
                    depth: 600,
                    modifier: 1,
                    slideShadows : true
                }
            });
        });

    })

    //取消订单事件
    require(["mui"], function () {
        document.getElementById("tuidanBtn").addEventListener('tap', function() {
            var btnArray = ['取消', '确认'];
            mui.confirm('用餐前两个小时退款40%\n用餐两个小时内退款30%', '退单须知', btnArray, function(e) {
                if (e.index == 1) {

                }
            })

        });

        /*点击联系客服弹出联系客服弹框*/
        $(".mui-table-view-cell:last-child").click(function(){
            mui.confirm('134-5675-4323','是否拨打电话 ',['否','是'],function(e){
                if(e.index == 1){

                }else{

                }
            });
        });
    })
});