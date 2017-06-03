/**
 * 一些公用组件交互js
 * @version  1.0.1
 **/
    var URL = "http://localhost/wzs-api/s/api";
    $(function(){
        $.post(URL, { accessToken: " ", version: " ",deviceType: "3",requestCode: "10100",member_id: "7" }, function (data) {
            console.log(data);
            var addressInfo = data.objects;
            var address,telephone,name;
            for(var i = 0 ; i < addressInfo.length ; i++){
                address = addressInfo[i].address;
                name = addressInfo[i].name;
                telephone = addressInfo[i].phone;
                $(".personal-address-wrap").append("<li class='personal-address-list'><p class='address-name'>" + name + "</p><p class='address-tel'>" + telephone +
                    "</p><p class='address-details'>" + address + "</p><div class='address-select'></div></li>");
            }
        });
    });