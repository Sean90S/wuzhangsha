
// var URL = "http://localhost/wzs-api/s/api";

$(function(){

    var a=GetRequest();
    var chef=a['chef'];
    var customer=a['customer'];
    var orederCode=a['orederCode'];

     // 获取厨师信息
     $.ajax({
         type: 'POST',
         url: 'http://localhost/wzs-api/s/api',
         data:{accessToken: '',version: '',deviceType: '3', requestCode: '10003',id:customer, type:'0'},
         dataType:'json',
         timeout:10000,
         success:function(data){
             console.log(data);
             var chefInfo,chefBrief,chefPic,chefName;
             chefInfo = data.wzsMember;
             chefBrief =chefInfo.brief_introduction;
             chefName =chefInfo.name;
             chefPic = chefInfo.head_img_path;
            if(data.message == "SUCCESS"){
                $('#chef_head_img').attr('src',chefPic);
                $('#chefName').text(chefName);
                $('#chefBrief').text(chefBrief);

            }else {
                mui.toast('厨师信息请求失败！')
            }
         },
         error:function(xhr,type,errorThrown) {
             mui.toast('网络异常！');
             console.log(type);
         }
     });

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
        for (var i = 0; i < num; i++){
            fnShow(num);
        }
    })

    // 输入文本内容提交按钮变为红色
    $(document).bind('input onpropertychange', 'textarea', function() {

        var txt = $('.text-comment').val().length;
        if(txt){
            $('.comment-foot-btn').attr('state',1).css({'opacity':1,'background':'#EF2432'});
        }else {
            $('.comment-foot-btn').attr('state',0).css({'opacity':0.69,'background': 'rgba(255,255,255,0.1)'});
        }
    });

    var recievePath=[];  // 保存上传图片地址
    var w =$(window).width();
    var h =$(window).height();

    $("#uploadFile").change(function(){
        var imgFile = $("#uploadFile")[0];
        var num1 = $("#imageList img").length;
        var num2 = imgFile.files.length;
        var allnum = num1 + num2;
        if(allnum == 3){
            $(".z_file").hide();
        }else if(allnum > 3){
            mui.alert("最多可上传3张照片！");
            console.log("images number  limit 3");
            return ;
        }

        var imgParent=$("#imageList");

        imgPreview.previewImage({
            imgFile: imgFile,
            width: w/4 - 10,
            height: h/5,
            callback:function (cfx) {
                var elem=null;
                // imgParent.append("<img  src='"+cfx.data+"' style='width: 31%;height: 7rem;'/>");
                imgParent.append("<img  src='"+cfx.data+"' style='display: inline-block;margin-left:1%;margin-right:1%;width:31%;height:7rem;'/>");

//            console.log("preview Image complate  index:"+cfx.index+"   height:"+cfx.height+"   width "+cfx.width);
            }
        });

        var formData = new FormData();
        var img1 = imgFile.files[0];
        var img2 = imgFile.files[1];


        formData.append("imgFile", img1);
        formData.append("imgFile", img2);
        formData.append("accessToken", '');
        formData.append("version", '');
        formData.append("deviceType", '');
        formData.append("requestCode", '93333');

        /**
         *必须false才会自动加上正确的Content-Type
         */

        $.ajax({
            url: "http://localhost/wzs-api/s/api",
            type: "POST",
            data: formData,

            contentType: false,
            processData: false,
            success: function (data) {

                recievePath.push(data.filePath);
                console.log(recievePath)

            },
            error: function (error) {
                console.log(JSON.stringify(error));
            }
        });
    });

// 提交评价
    $('.comment-foot-btn').on('tap', function() {

        var score = $('.light').length;
        var remark =$('#commentTxt').val();
        var state = $('.comment-foot-btn').attr('state');
        var pathStr = recievePath.join(',');

        if(state == 1){


            mui.ajax({
                type: 'POST',
                url: 'http://localhost/wzs-api/s/api',
                data:{accessToken: '', version: '', deviceType: '3', requestCode: '30000', e_member_id:customer, b_member_id:chef, order_id:orederCode,score:score, remark:remark,img_path:pathStr},
                dataType:'json',
                timeout:10000,
                success:function(data){
                    console.log(data);

                    if(data.message == "SUCCESS") {
                        mui.toast('评论成功！')
                    }else{
                        mui.alert("评论失败！");
                    }
                },
                error:function(xhr,type,errorThrown) {
                    //异常处理；
                    mui.alert(type);
                    console.log(type);
                }
            });
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


