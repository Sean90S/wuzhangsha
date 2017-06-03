
var URL = "http://localhost/wzs-api/s/api";

$(function(){
    var a=GetRequest();
    var get_id=a['id'];

    $.post(URL, { accessToken: " ", version: " ",deviceType: "3",requestCode: "50002",id: get_id,res_type: 0}, function (data) {
        console.log(data);
        var orderInfo = data.wzsOrder;
        var chefId,mealNum,dinnerTime,createTime,totalPrice,addAddress,addName,addPhone,remark,orderState,cleanUp,cleanUpPrice,chefPhone,dingdanId;

        chefId = orderInfo.cook_id;
        chefPhone = orderInfo.phone;
        mealNum =  orderInfo.orderDetailList.length;
        dinnerTime = orderInfo.dinner_time;
        createTime = orderInfo.create_time;
        totalPrice = orderInfo.total_price;
        cleanUp = orderInfo.clean_up; if(!cleanUp){$('.dingdan-clean_room').hide();}
        cleanUpPrice = orderInfo.clean_up_price;
        addAddress = orderInfo.add_address;
        addName = orderInfo.name;
        remark = orderInfo.remark;if(!remark) remark = "暂无数据";
        addPhone = orderInfo.add_phone;
        orderState = orderInfo.state;
        switch (orderState){
            case (-1):
                orderState = "取消订单";
                $('#tuiDan').hide();
                $('#footer-btn').hide();
                break;
            case (0):
                orderState = "待支付";
                $('#tuiDan').hide();
                $('#footer-btn').hide();
                break;
            case (1):
                orderState = "支付中";
                $('#tuiDan').hide();
                $('#footer-btn').hide();
                break;
            case (2 || 3):
                orderState = "正在进行";
                break;
            case (4):
                orderState = "交易完成";
                $('#tuiDan').hide();
                break;
            case (5):
                orderState = "已评价";
                $('#tuiDan').hide();
                $('#footer-btn').hide();
                break;
            case (6):
                orderState = "申请退款中";
                $('#tuiDan').hide();
                $('#footer-btn').hide();
                break;
            case (7):
                orderState = "退款成功";
                $('#tuiDan').hide();
                $('#footer-btn').hide();
                break;
            case (8):
                orderState = "支付失败";
                $('#tuiDan').hide();
                $('#footer-btn').hide();
                break;
        }

        $('#chefName').text(chefId);
        $('#chefPhone').text(chefPhone);
        $('#totalDish').text(mealNum);
        $('#dish-use-time').text(dinnerTime);
        $('#clean_RMB').text(cleanUpPrice);
        $('#RMB').text(totalPrice);
        $('#booker').text(addName);
        $('#bookerPhone').text(addPhone);
        $('#restaurantAddress').text(addAddress);
        $('#note').text(remark);
        $('#dish-book-time').text(createTime);
        $('#orderState').text(orderState);


        for(var i = 0 ; i < mealNum ; i++){
            var dishList = orderInfo.orderDetailList[i];
            var type = dishList.type;
            var disMap = dishList.dis_map;
            var map = "";
            if(disMap.length > 0){
                for(var j = 0; j < disMap.length; j++){
                    var mapList = disMap[j];
                    if(!mapList) continue;
                    map += "<div>" + mapList.name +"</div>"
                }
            }
             if (!dishList) continue;
             $("#dish-list-info").append(
                 "<div class='mui-row'>"+
                     "<div class='mui-col-xs-7 mui-text-left'>" + dishList.name +"</div>" +
                     "<div class='mui-col-xs-2 mui-text-right'>X<i>"+ dishList.number +"</i></div>"+
                     "<div class='mui-col-xs-3 mui-text-right'>&yen;<i>" + dishList.price +"</i></div>"+
                "</div>"+
                 "<div><div class='taocan-list'>" + map + "</div>" +
                 "<div class='personal-order-more mui-text-right p"+ type +"'><span id='pom-icon' class='mui-icon mui-icon-arrowdown'></span></div></div> "
             );
        }
    })

});

//获取url中"?"符后的字串
function GetRequest() {
    var url = location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}