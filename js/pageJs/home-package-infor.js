/**
 *
 * Created by dell on 2017/5/22.
 */

(function(){
    let information = window.location.search.substr(1).split("&");
    let decodeUrlObj = {};
    $.each(information, function (i, item) {
        let decodeUrlItem = item.split("=");
        decodeUrlObj[decodeUrlItem[0]] = decodeURI(decodeUrlItem[1]);
    });
    console.log(decodeUrlObj);
    let companyName = decodeUrlObj.companyName;
    let num = decodeUrlObj.num;
    let totalPrices = decodeUrlObj.totalPrices;
    let timer = decodeUrlObj.timer;
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

    let strJson = decodeUrlObj.json;
    let jsonStr = JSON.parse(strJson);
    let foodShow = '';
    let chefCuisine = '';
    // 总价
    $('.total').find('#money').html(decodeUrlObj.totalPrices);
    $.each(jsonStr,function (i, item) {
        $.each(item.dis_list,function (i, listItem) {
            console.log(listItem)
            foodShow += '<li>\
                    <p>'+ listItem.dis_name +'</p>\
                    <p class="cheng">X'+ decodeUrlObj.num +'</p>\
                </li>';
        });
        $('.chef').html(foodShow);
    });
    var chengLength = $('.chef').find('.cheng').length;
    chefCuisine += '<span class="name">'+ decodeUrlObj.companyName +'</span>\
                   <span class="dish">共'+ chengLength +'道菜</span>';
    $('.cuisine').html(chefCuisine);
    // 时间
    $('.dining-time').find('.time').text(timer)

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
        //console.log(userName, cardTotal);
        console.log(json);
        console.log(companyName, num, totalPrices)
        location.href='addressIndex.html?json=' + json + '&companyName=' + companyName + '&num=' + num + '&totalPrices=' + totalPrices;
    });

    // 15分钟倒计时
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

    // 点击付款方式
    $('.payment-classification li').on('click','.the-number',function(){
        $(this).addClass('active').parents().siblings().children($(this)).removeClass('active')
    });




    // 确认支付

})();
