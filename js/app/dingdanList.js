
var URL = "http://localhost/wzs-api/s/api";
var page1 = 1;
var page2 = 1;

$(function(){

    orderLoad();
    noCommentOrder();
    //跳转到订单详情
    $('.dingdan-info-link').live('tap', function(){
        var orderid = $(this).attr('id');
        var ordertype = $(this).attr('type');
        $(this).attr('href','dingdan-ing.html?id='+orderid+"&type="+ordertype)

    });


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



});
function orderLoad() {

    $.post(URL, { accessToken: " ", version: " ",deviceType: "3",requestCode: "50001",member_id: 27,res_type: 0,showCount: 50,currentPag:1, state:"0"}, function (data) {
        console.log(data);
        var orderInfo = data.objects;

        var totalPage = data.page.totalPage;

        var chefId,caidanNum,dingdanState,dinnerTime,totalPrice,remark,caidanList,dingdanId,dingdanType,memberId,orederCode;
        for(var i = 0 ; i < orderInfo.length ; i++){
            dingdanId = orderInfo[i].id;
            dingdanType = orderInfo[i].order_type;
            chefId = orderInfo[i].cook_id;
            memberId = orderInfo[i].member_id;
            orederCode = orderInfo[i].order_code; // 订单编号
            caidanNum = orderInfo[i].orderDetailList.length;
            dingdanState = orderInfo[i].state;
            dinnerTime = orderInfo[i].dinner_time;
            totalPrice = orderInfo[i].total_price;
            remark = orderInfo[i].remark; if(!remark) remark = "暂无数据";
            caidanList = orderInfo[i].orderDetailList;


            var list = "";
            for(var j = 0 ; j < caidanList.length; j++){
                var detailInfo = caidanList[j];
                if (!detailInfo) continue;

                list += "<div class='mui-row'>"+
                    "<div class='mui-col-xs-6 mui-text-left'>" + detailInfo.name + "</div>"+
                    "<div class='mui-col-xs-6 mui-text-right'>X<i>"+ detailInfo.number + "</i></div>"+
                    "</div>"
            }

            var btn = "";
            var switchState = dingdanState;
            switch (dingdanState){
                case (0):
                    dingdanState = "待支付";
                    btn = "<div class='mui-text-right'><a class='dingdan-btn dingdan-btn-gotopay'>去支付</a><a class='dingdan-btn dingdan-btn-cancel'>取消</a></div>";
                    break;
                case (-1):
                    dingdanState = "取消订单";
                    break;
                case (1):
                    dingdanState = "支付中";
                    break;
                case (2 || 3):
                    dingdanState = "正在进行中";
                    btn = "<div class='mui-text-right'><a class='dingdan-btn dingdan-btn-tuidan' state=\""+switchState+"\" code=\""+orederCode+"\">退单</a></div>";
                    break;
                case (4):
                    dingdanState = "交易完成";
                    btn = "<div class='mui-text-right'><a class='dingdan-btn dingdan-btn-weipingjia' chef=\""+chefId+"\" customer=\""+memberId+"\" orederCode=\""+orederCode+"\">评价</a></div>";
                    break;
                case (5):
                    dingdanState = "已评价";
                    break;
                case (6):
                    dingdanState = "申请退款中";
                    break;
                case (7):
                    dingdanState = "退款成功";
                    break;
                case (8):
                    dingdanState = "退款失败";
                    break;
            }


            $("#allOrder").append(
                "<div class= 'dingdan-list'>" +
                "<div class='dingdan-list-title'>" +
                "<a href='#' class=' mui-clearfix'>" +
                "<a href='#' class=' mui-clearfix'>" +
                "<div class='mui-pull-left opcity06'>"+ chefId + "&nbsp;&nbsp;(共<i>" + caidanNum + "</i>道菜)</div>" +
                "<div class='mui-pull-right '><span class='text-ing-finish-color marginr10'>" +dingdanState + "</span><span class='icon-vertical opcity06 mui-icon mui-icon-arrowright'></span></div>"+
                "</a>" +
                "</div>" +
                "<div class='dingdan-list-content'><a href='#' class='dingdan-info-link' id = \""+ dingdanId +"\" type=\""+ dingdanType +"\">"+ list + "</a></div>" +
                "<div class='dingdan-list-bottom'>" +
                "<div class='mui-row line-height28'>" +
                "<div class='mui-col-xs-3 mui-text-left opcity06'>用餐时间:</div>" +
                "<div class='mui-col-xs-6 mui-text-left opcity06'>" + dinnerTime + "</div>" +
                "<div class='mui-col-xs-3 mui-text-right'>&yen;<span class='rmb'>" + totalPrice + "</span></div>" +
                "</div>" +
                "<div class='mui-row opcity06'>"+
                "<div class='mui-col-xs-3 mui-text-left'>备注详情:</div>" +
                "<div class='mui-col-xs-9 mui-text-left'>" + remark + "</div>" +
                "</div>" + btn +
                "</div>"+
                "</div>"
            );
        }

    })
}

function noCommentOrder() {

    $.post(URL, { accessToken: " ", version: " ",deviceType: "3",requestCode: "50001",member_id: 27,res_type: 0,showCount: 50,currentPag:1, state:"1"}, function (data) {
        console.log(data);
        var orderInfo = data.objects;
        var chefId,caidanNum,dingdanState,dinnerTime,totalPrice,remark,caidanList,dingdanId,memberId,orederCode;
        if(orderInfo){
            for(var i = 0 ; i < orderInfo.length ; i++){

                dingdanId = orderInfo[i].id;
                chefId = orderInfo[i].cook_id;
                memberId = orderInfo[i].member_id;
                orederCode = orderInfo[i].order_code;
                caidanNum = orderInfo[i].orderDetailList.length;
                dingdanState = "交易完成";
                dinnerTime = orderInfo[i].dinner_time;
                totalPrice = orderInfo[i].total_price;
                remark = orderInfo[i].remark; if(!remark) remark = "暂无数据";
                caidanList = orderInfo[i].orderDetailList;

                var list = "";
                for(var j = 0 ; j < caidanList.length; j++){
                    var detailInfo = caidanList[j];
                    if (!detailInfo) continue;

                    list += "<div class='mui-row'>"+
                        "<div class='mui-col-xs-6 mui-text-left'>" + detailInfo.name + "</div>"+
                        "<div class='mui-col-xs-6 mui-text-right'>X<i>"+ detailInfo.number + "</i></div>"+
                        "</div>"
                }

                $("#noCommentOrder").append(
                    "<div class= 'dingdan-list'>" +
                    "<div class='dingdan-list-title'>" +
                    "<a href='#' class=' mui-clearfix'>" +
                    "<a href='#' class=' mui-clearfix'>" +
                    "<div class='mui-pull-left opcity06'>"+ chefId + "&nbsp;&nbsp;(共<i>" + caidanNum + "</i>道菜)</div>" +
                    "<div class='mui-pull-right '><span class='text-ing-finish-color marginr10'>" +dingdanState + "</span><span class='icon-vertical opcity06 mui-icon mui-icon-arrowright'></span></div>"+
                    "</a>" +
                    "</div>" +
                    "<div class='dingdan-list-content'><a href='#' id = \""+ dingdanId +"\">"+ list + "</a></div>" +
                    "<div class='dingdan-list-bottom'>" +
                    "<div class='mui-row line-height28'>" +
                    "<div class='mui-col-xs-3 mui-text-left opcity06'>用餐时间:</div>" +
                    "<div class='mui-col-xs-6 mui-text-left opcity06'>" + dinnerTime + "</div>" +
                    "<div class='mui-col-xs-3 mui-text-right'>&yen;<span class='rmb'>" + totalPrice + "</span></div>" +
                    "</div>" +
                    "<div class='mui-row opcity06'>"+
                    "<div class='mui-col-xs-3 mui-text-left'>备注详情:</div>" +
                    "<div class='mui-col-xs-9 mui-text-left'>" + remark + "</div>" +
                    "</div>" +
                    "<div class='mui-text-right'><a class='dingdan-btn dingdan-btn-weipingjia' chef=\""+chefId+"\" customer=\""+memberId+"\" orderId=\""+dingdanId+"\">评价</a></div>" +
                    "</div>"+
                    "</div>"
                );
            }
            page2 ++;
        }

    })
}