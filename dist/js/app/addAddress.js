
$(function () {
    $('#serviceArea').on('tap',function () {
        $('.pickMask,.pickBox').show();
    })
    $('.pickMask,.pick-button').on('tap',function () {
        $('.pickMask,.pickBox').hide();
    })

    var URL = "http://localhost/wzs-api/s/api";
    $(".add-address-btn").on('tap',function(){
        var userName = $(".user-name").val();
        var userGender = $("input[name='gender']:checked").val();
        var userPhone = $(".user-phone").val();
        var userAddress = $(".address-textarea").val();
        var area = $("#selectedPlace").text();
        var detailPlace = $("#detailAddress").val();
        if(userName==""){
            mui.alert("请输入用户名！")
        }else if(userPhone=="") {
            mui.alert("请输入联系人电话！")
        }else if(detailPlace==""){
            mui.alert("请输入详细地址！")
        }else{
            $.post(URL, { accessToken: " ", version: " ",deviceType: "3",requestCode: "10101",member_id: "27",name: userName,sex: userGender,phone: userPhone,address: userAddress}, function () {
                location.href = "addressIndex.html";
            });
        }

    });
})

function selectedPlace(place) {
    $('#selectedPlace').text(place);
    $('.pickMask,.pickBox').hide();
}
