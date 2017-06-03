/**
 *
 * Created by dell on 2017/5/16.
 */
let decodeUrl = window.location.search.substr(1).split("&");
let decodeUrlObj = {};
$.each(decodeUrl, function (i, item) {
    var decodeUrlItem = item.split("=");
    decodeUrlObj[decodeUrlItem[0]] = decodeURI(decodeUrlItem[1]);
});
console.log(decodeUrlObj);
let userId = decodeUrlObj.userId;
$.ajax({
    type: "POST",
    url: "http://localhost/wzs-api/s/api",
    data:{
        accessToken:"",
        version:"",
        deviceType:"3",
        requestCode:"60000",
        type: 0
    },
    success: function(res){

        if(res.statusCode == '00000'){
            let link = '';
            let objects = res.objects;
            $.each(objects, function(i, item){
                console.log(item.link);
                link += '<div class="swiper-slide"><a href=""><img src="'+ item.link +'" alt=""></a></div>'
            });
            $('.swiper-wrapper').html(link);

            var mySwiper = new Swiper ('.swiper-container', {
                loop: true,
                pagination: '.swiper-pagination',
                autoplay: 2000
            });
        }
    },
    error:function(err){
        console.log(err)
    }
});

$('.made-image').on('click', function(){
    alert(1)
   location.href = "home-private-custom.html?userId=" + userId;
});



