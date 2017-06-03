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

        // 验证码验证
        $('.Enter-confirmation-code').on('change',function(){
            var BTNS = 'BTNS';

            // ajax

            if($('.Enter-confirmation-code').val() != BTNS){
                $('.verification-code-host').html('请输入正确的验证码');
                return false;
            }else {
                $('.verification-code-host').css('opacity','0');
            }
        });

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

            if($('.bg-host').css('display') == 'none'){
                $('.agre-agreement-host').html('请同意吾掌勺用户协议');
                $(this).css('background','#343439');
                return false;
            }else {
                $('.agre-agreement-host').css('display','none');
                $(this).css('background','red');
                //$('.login-ID-host').css('margin-top','4.26666667rem;');
            }

           /* if($("#phone").val() == '' || $('.Enter-confirmation-code').val() == ''){
                return;
            }*/

            // ajax
        });

        // 点击发送--倒计时
        $('.btn-Transparent-host').on('click',function(){

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

    })();
});