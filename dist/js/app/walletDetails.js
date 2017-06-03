/**
 * 一些公用组件交互js
 * @version  1.0.1
 **/
    var URL = "http://localhost/wzs-api/s/api";
    $(function(){

        $.post(URL, { accessToken: " ", version: " ",deviceType: "3",requestCode: "10501",member_id: "7"}, function (data) {
            $(".account-balance").text(data.objects.assets);
        });


        $.post(URL, { accessToken: " ", version: " ",deviceType: "3",requestCode: "10500",member_id: "7","page.showCount": "50","page.currentPage": "1" }, function (data) {
            console.log(data)
            var accountDetail = data.objects;
            var time,email,resourse,num,cls;
            for(var i = 0 ; i < accountDetail.length ; i++){
                time = accountDetail[i].create_time;
                resourse = accountDetail[i].resource_remark;
                num = accountDetail[i].money; if(num > 0) num = "+" + num;
                if(accountDetail[i].type === 0){
                    cls = "detail-income";
                }else{
                    cls = "detail-pay";
                }
                $(".account-details-wrap").append("<li class='account-detail-list " + cls + "'><p class='detail-time'>" + time + "</p><span class='detail-title'>" + resourse +
                    "</span><span class='detail-email'></span><span class='detail-num'>" + num + "</span></li>");
            }
        });
    });