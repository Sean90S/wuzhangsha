/**
 *
 * Created by dell on 2017/5/12.
 */

$(function(){
    (function(){

        // 手机号验证
        $('#phone').on('change',function(){

            var myreg = /^1[34578]\d{9}$/;
            if(!myreg.test($("#phone").val())){
                $('.phone-verification-host').html('请输入有效的手机号');
                return false;
            }else {
                $('.phone-verification-host').css('display','none');
            }
        });

       /* $('#code').on('change',function(){
            alert(333)
        })*/

        // 点击发送--倒计时
        $('.btn-Transparent-host').on('click',function(){

            var myreg = /^1[34578]\d{9}$/;
            if(!myreg.test($("#phone").val())){
                $('.phone-verification-host').html('请输入有效的手机号');
                return false;
            }else {
                $('.phone-verification-host').css('display','none');
            }

            $.ajax({
                type: "POST",
                url: "http://localhost/wzs-api/s/api",
                data:{
                    accessToken:"",
                    version:"",
                    deviceType:"3",
                    requestCode:"19000",
                    type: 1,
                    phone:$('#phone').val(),
                    res: 2
                },
                success: function(res){

                    if(res.statusCode == '00000'){
                        console.log(res.objects.code);
                        var code = res.objects.code;
                        console.log(code)
                        $('#code').on('click',function(){

                            if(code == $('.Enter-confirmation-code').val()){
                                $('.verification-code-host').css('display','none');
                            }else {
                                $('.verification-code-host').html('请输入正确的验证码');
                                return false;
                            }
                        });


                    }else if(res.statusCode == '99999'){
                        $('.verification-code-host').html('短信发送数量限制每日6次,您已超出!');
                    }
                },
                error:function(err){
                    console.log(err);
                    return;
                }
            });

            var time = 60;
            var timer = setInterval(function(){
                if(time <= 0){
                    clearInterval(timer);
                    $('.btn-Transparent-host').val('重发');
                    $('.btn-Transparent-host').css({'color': 'red','border':'1px solid red'});
                    $('.btn-Transparent-host').attr('disabled',false)
                }else {
                    time--;
                    $('.btn-Transparent-host').val(time+'S');
                    $('.btn-Transparent-host').attr('disabled',true);
                    $('.btn-Transparent-host').css({'color': '#fff','border':'1px solid rgba(255,255,255,0.60)'});
                }
            },1000);
        });

        // 验证码验证
  /*      $('.Enter-confirmation-code').on('change',function(){
            var BTNS = 'BTNS';

            // ajax

            if($('.Enter-confirmation-code').val() != BTNS){
                $('.verification-code-host').html('请输入正确的验证码');
                return false;
            }else {
                $('.verification-code-host').css('opacity','0');
            }
        });*/

        // 阅读协议书
        $('#female').on('click',function(){
            //let offNo = true;
            if($('.bg-host').css('display') == 'none') {
                $('.bg-host').show();
            }else {
                $('.bg-host').hide();
            }
        });

        // 未阅读协议输
        $('.login-ID-host').on('click',function(){

            var myreg = /^1[34578]\d{9}$/;
            if(!myreg.test($("#phone").val()) || $("#phone").val() == ''){
                $('.phone-verification-host').html('请输入有效的手机号');
                return;
            }else {
                $('.phone-verification-host').css('display','none');
            }

            if($('.Enter-confirmation-code').val() == ''){
                $('.verification-code-host').html('请输入正确的验证码');
                return false;
            }

            if($('.bg-host').css('display') == 'none'){
                $('.agre-agreement-host').html('请选择阅读协议');
                return;
            }else {
                $('.agre-agreement-host').css('display','none');
                $(this).css('background','red');
                //$('.login-ID-host').css('margin-top','4.26666667rem;');
            }

            $.ajax({
                type: "POST",
                url: "http://localhost/wzs-api/s/api",
                data:{
                    accessToken:"",
                    version:"",
                    deviceType:"3",
                    requestCode:"10003",
                    login_name:$('#phone').val()
                },
                success: function(res){
                    if(res.statusCode == '00000'){
                        console.log(res.wzsMember.id);
                        var userId = res.wzsMember.id;
                        location.href = 'index.html?userId=' + userId;
                    }
                },
                error:function(err){
                    console.log(err)
                }
            });

        });


    })();
});