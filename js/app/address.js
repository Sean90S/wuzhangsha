$(function(){
    let information = window.location.search.substr(1).split("&");

    let decodeUrlObj = {};
    $.each(information, function (i, item) {
        let decodeUrlItem = item.split("=");
        decodeUrlObj[decodeUrlItem[0]] = decodeURI(decodeUrlItem[1]);
    });
    console.log(decodeUrlObj);
    // 厨师列表
    let strJson = decodeUrlObj.json;
    let jsonStr = JSON.parse(strJson);
    let cardTotal = decodeUrlObj.cardTotal;
    let userName = decodeUrlObj.userName;
    let cardTotalPrice = decodeUrlObj.cardTotalPrice;
    // 家有宴席


    var URL = "http://localhost/wzs-api/s/api";
    var assressArr = [];

    $.post(URL, {
            accessToken: " ",
            version: " ",
            deviceType: "3",
            requestCode: "10100",
            member_id: "7"
        }, function (data) {
        //console.log(data);
        var addressInfo = data.objects;
        var address, telephone, name;
        for(var i = 0 ; i < addressInfo.length ; i++){
            address = addressInfo[i].address;
            name = addressInfo[i].name;
            telephone = addressInfo[i].phone;
            assressArr.push({
               address: address,
               name: name,
               telephone: telephone
            });
            $(".personal-address-wrap").append(
                "<li class='personal-address-list'><p class='address-name'>" + name + "</p><p class='address-tel'>" + telephone +
                "</p><p class='address-details'>" + address + "</p><div class='address-select'></div></li>");
        }
    });

    /*选择地址*/
    var index = 0;
    $(".personal-address-wrap").on("click",".personal-address-list",function(){
        index = $(this).index();
        $(this).find(".address-select").addClass("cur").parent().siblings().find(".address-select").removeClass("cur");
    });

    $('#iconGou').on('click',function(){
        //console.log(assressArr)
        $.each(assressArr, function(ii, item){
            if(index == ii){
                //console.log(item);
                let arrAddress = item.address;
                let arrName = item.name;
                let arrTelephone = item.telephone;
                let storage = window.localStorage;
                let d = JSON.stringify(jsonStr);
                storage.setItem("data", d);
                let json = storage.getItem("data");
                //console.log(cardTotal, userName, cardTotalPrice);
                if(cardTotal !=undefined && userName !=undefined && cardTotalPrice != undefined){
                location.href =
                    'confirmation-of-information.html?arrAddress=' + arrAddress + '&arrName=' + arrName + '&arrTelephone=' + arrTelephone + '&cardTotal=' + cardTotal + '&json=' + json + '&userName=' + userName + '&cardTotalPrice=' + cardTotalPrice;
                }else {
                    let companyName = decodeUrlObj.companyName;
                    let num = decodeUrlObj.num;
                    let totalPrices = decodeUrlObj.totalPrices;
                    console.log(totalPrices);
                    location.href =
                        'home-package-infor.html?arrAddress=' + arrAddress + '&arrName=' + arrName + '&arrTelephone=' + arrTelephone + '&json=' + json + '&companyName=' + companyName + '&num=' + num + '&totalPrices=' + totalPrices;
                }
            }
        });
    });

    setTimeout(function () {
        $(".personal-address-list").first().find('.address-select').addClass('cur');
    },100)
});