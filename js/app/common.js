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

    /*新增地址-选择性别*/
    $(".add-address-radio").click(function(){
        $(this).addClass("cur").siblings().removeClass("cur");
        $(this).prev().attr("checked","true").siblings().removeAttr("checked");
    });

    /*选择充值金额*/
    $(".recharge-list").click(function(){
        $(this).find(".recharge-select").addClass("cur").parent().siblings().find(".recharge-select").removeClass("cur");
    });

    //底部固定栏状态切换
    $('.foot-list').on('tap',function(){
        $(this).addClass('active-page').siblings().removeClass('active-page');
    });


    // 家有宴席、私人订制 菜单显示
    $(function () {
        var len = $('.family-order-list').length;
        if(len>5){
            $('.family-order-list').slice(5).hide();
            $('.family-order-more').show();
        }

        $('.family-order-more').on('tap',function () {
            $('.family-order-list').slice(5).show();
            $(this).hide();
        })
        $('#pom-icon').live('tap',function () {
            $(this).parent().prev('.taocan-list').toggle();
            if($(this).hasClass('mui-icon-arrowdown')){
                $(this).removeClass('mui-icon-arrowdown').addClass("mui-icon-arrowup");
            }else {
                $(this).removeClass('mui-icon-arrowup').addClass("mui-icon-arrowdown");
            }
        })
    })
    //订单页面sweiper
    require(["swiper"], function () {

        var  H = $(window).height()-$('.mui-bar-footer').height()-40;
        $(".mxr-swiper-wrapper").css({'height': H + 'px'});
        var mySwiper = new Swiper('.mxr-swiper',{
            pagination: '.my-pagination-ul',
            paginationClickable: true,
            paginationBulletRender: function (index, className) {
                switch (index) {
                    case 0: name='全部订单';break;
                    case 1: name='待评价';break;
                    default: name='';
                }
                return '<li class="' + className + ' mySwiper-title-bg">' + name + '</li>';
            }
        });
        var collectSwiper = new Swiper('.mxr-swiper-container-collect',{
            pagination: '.my-pagination-ul',
            paginationClickable: true,
            paginationBulletRender: function (index, className) {
                switch (index) {
                    case 0: name='收藏的厨师';break;
                    case 1: name='收藏的公司';break;
                    default: name='';
                }
                return '<li class="' + className + ' mySwiper-title-bg">' + name + '</li>';
            }
        });

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
             $(".swiper-info-list").first().addClass('cur');
        });
    });

    //取消订单事件
    require(["mui"], function () {
/*

        //退单按钮

        $('.dingdan-btn-tuidan ,.tuidanBtn').live('tap',function() {
            var orderCode = $(this).attr('code');
            var orderState = $(this).attr('state');
            var btnArray = ['取消', '确认'];
            mui.confirm('用餐前两个小时退款40%\n用餐两个小时内退款30%', '退单须知', btnArray, function(e) {
                if (e.index == 1) {

                    mui.ajax("http://localhost/wzs-api/s/api",
                        {
                            data:{'accessToken': '', 'version': '','deviceType': '3','requestCode': '50003','order_code':'"+orderCode+"','state':'"+state+"'},
                            type:'POST',
                            dataType:'json',
                            timeout:10000,//超时时间设置为10秒；
                            success:function(data)
                            {
                                console.log(data);

                                if(data.message == "SUCCESS")

                                {
                                    mui.openWindow({
                                        url: 'tuidan-success.html'
                                    });
                                }else

                                {
                                    mui.alert("申请失败");
                                }
                            },
                            error:function(xhr,type,errorThrown)
                            {
                                //异常处理；
                                mui.alert(type);
                                console.log(type);
                            }
                        });

                }
            })
        });

        // 评价按钮

        $('.dingdan-btn-weipingjia').live('tap', function() {
            var chef = $(this).attr('chef');
            var customer = $(this).attr('customer');
            var code = $(this).attr('orederCode');
            mui.openWindow({
                url: 'dingdan-comment.html?chef='+chef+"&customer="+customer+"&orederCode="+code
            });

        });
*/

        /*点击联系客服弹出联系客服弹框*/
        $("#kefu").on('tap',function(){
            var phone =$(this).attr('phone');
            mui.confirm(phone,'是否拨打电话 ',['否','是'],function(e){
                if(e.index == 1){

                }else{

                }
            });
        });
    })
});