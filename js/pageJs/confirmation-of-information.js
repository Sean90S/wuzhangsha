/**
 *
 * Created by dell on 2017/5/17.
 */

(function(){
    let information = window.location.search.substr(1).split("&");

    let decodeUrlObj = {};
    $.each(information, function (i, item) {
        let decodeUrlItem = item.split("=");
        decodeUrlObj[decodeUrlItem[0]] = decodeURI(decodeUrlItem[1]);
    });
    console.log(decodeUrlObj);
    // 地址
    let addressNameNumber = '';
    addressNameNumber += '  <div class="information-name">\
                            <span class="name">'+ decodeUrlObj.arrName +'</span>\
                            <span class="cellphone-number">'+ decodeUrlObj.arrTelephone +'</span>\
                            </div>\
                            <div class="address">\
                            <span class="address-name">'+ decodeUrlObj.arrAddress +'</span>\
                            <span class="add-git">></span>\
                            </div>';
    $('#address').html(addressNameNumber);
    let informationName = $('.information-name .name').html();
    if(informationName == 'undefined'){
        $('#homeAddress').show();
    }else {
        $('#address').show();
        $('#homeAddress').hide();
    }

    let chefCuisine = '';
    let chef = '';
    let totalPrice = '';
    let strJson = decodeUrlObj.json;
    let jsonStr = JSON.parse(strJson);
    let userName = decodeUrlObj.userName;
    let cardTotal = decodeUrlObj.cardTotal;
    let cardTotalPrice = decodeUrlObj.cardTotalPrice;
    let timer = decodeUrlObj.timer;
    // 厨师 总桌
    chefCuisine += '<span class="name">'+ decodeUrlObj.userName +'</span>\
               <span class="dish">共'+ decodeUrlObj.cardTotal +'道菜</span>';
    $('.cuisine').html(chefCuisine);
    // 总价
    $('.total').find('#money').html(+decodeUrlObj.cardTotalPrice);
    // 以点菜品
    for(let i = 0; i < jsonStr.length; i++){
        chef += '<li>\
                <p>'+ jsonStr[i].name +'</p>\
                <p class="cheng">X'+ jsonStr[i].num +'</p>\
                <p class="chef-reb">¥<span>'+ jsonStr[i].price +'</span></p>\
            </li>';
    }
    // 时间
    $('.dining-time').find('.time').text(timer)
    $('.chef').append(chef);
    // 点击阿姨多50块
    $('.Come-on-door').on('click','#box',function(){
        if($(this).is(':checked')){
            let auntiePlusPrice = parseInt($('.total').find('#money').text()) + 50;
            $('.total').find('#money').text(auntiePlusPrice);
            $('#bg-checked-hoot').css('opacity',1)
        }else {
            let auntiePlusPrice = parseInt($('.total').find('#money').text()) - 50;
            $('.total').find('#money').text(auntiePlusPrice);
            $('#bg-checked-hoot').css('opacity',0)
        }
    });


    // 菜品本地缓冲数据
    $('#homeAddress, #address').on('click',function(){
        let storage = window.localStorage;
        let d = JSON.stringify(jsonStr);
        storage.setItem("data", d);
        let json = storage.getItem("data");
       console.log(userName, cardTotal);
        location.href='addressIndex.html?json=' + json + '&userName=' + userName + '&cardTotal=' + cardTotal + '&cardTotalPrice=' + cardTotalPrice;
    });

    //倒是时
    var fifteenMinutes = document.getElementById('fifteen-minutes');
    var x = 15,
        interval;
    var d = new Date("1111/1/1,0:" + x + ":0");
    interval = setInterval(function() {
        var m = d.getMinutes();
        var s = d.getSeconds();
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;
        fifteenMinutes.innerHTML = m + ":" + s;
        if (m == 0 && s == 0) {
            clearInterval(interval);
            return;
        }
        d.setSeconds(s - 1);
    }, 1000);

    // 点击选着付款方式
    $('.payment-classification li').on('click','.the-number',function(){
        $(this).addClass('active').parents().siblings().children($(this)).removeClass('active')
    });

    $.ajax({
        type: "POST",
        url: "http://localhost/wzs-api/s/api",
        data:{
            accessToken:"",
            version:"",
            deviceType:"3",
            requestCode:"50000",
            order_type: 0
        },
        success: function(res){
            if(res.statusCode == '00000'){

            }
        },
        error:function(err){
            console.log(err)
        }
    });
})();

