/**
 *
 * Created by dell on 2017/5/17.
 */
let decodeUrl = window.location.search.substr(1).split("&");
let decodeUrlObj = {};
$.each(decodeUrl, function (i, item) {
    var decodeUrlItem = item.split("=");
    decodeUrlObj[decodeUrlItem[0]] = decodeURI(decodeUrlItem[1]);
});
var id = decodeUrlObj.id;
var timer = decodeUrlObj.time;
console.log(timer)
$.ajax({
    type: "POST",
    url: "http://localhost/wzs-api/s/api",
    data: {
        accessToken: "",
        version: "",
        deviceType: "3",
        requestCode: "20004",
        member_id: id,
        res_type: 1
    },
    success: function (res) {
        if (res.statusCode == '00000') {
            let company = res.objects;
            console.log(company)
            var clas = '', orgName = '', imgList = '';
            $.each(company, function (ii, item) {
                //console.log(item.id)
                orgName += '<div class="swiper-slide swiper-slide-image" id="' + item.id + '" id="swiper-slide-hoot">\
                                <div class="ligin-image">\
                                    <div class="Introduction-company">\
                                        <div class="company">' + item.org_name + '</div>\
                                        <div class="companyTeam-Introduction">\
                                            <span class="ellipses">简介：' + item.brief_introduction + '</span> <br />\
                                            <span>公司团队：一共' + item.id + '个人，擅长' + item.good_at_cook + '</span>\
                                        </div>\
                                    </div>\
                                    <img src="' + item.img_path + '" alt="">\
                                    <div class="name-price">\
                                        <h3 class="title">' + item.name + '</h3>\
                                        <p class="memo-name">\
                                            <span>' + item.introduction + '</span> <br />\
                                            <span><span id="companyPrice">' + item.price + '</span>元/套 ' + item.dinner_number + '</span>\
                                        </p>\
                                    </div>\
                                </div>\
                            </div>';
                // 轮播图
                let imgWarpper = item.img_list;
                for (var j = 0; j < imgWarpper.length; j++) {
                    imgList += '<div class="swiper-slide"><a href=""><img src="' + imgWarpper[j].pic_path + '" alt=""></a></div>';
                }
                // 套餐菜单
                var clas_s = item.clas_s;
                for (var j = 0; j < clas_s.length; j++) {
                    var disList = clas_s[j].dis_list;
                    for (i = 0; i < disList.length; i++) {
                        clas = '<ul>\
                                <h3 class="dish-name">\
                                    <span class="square"><img src="image/ligin/reddot.png" alt=""></span>\
                                    <span>' + clas_s[j].classification_name + '</span>\
                                </h3>\
                                <li>' + disList[i].dis_name + '</li>\
                            </ul>';
                    }


                }
            });

            $('#swiper-wrapper-hoot').append(orgName);
            $('#swiper-wrapper-swiper').html(imgList);

            var copyNum = 0;
            var disName = '';
            var companyName = '';
            // 轮播切换
            var swiper = new Swiper('.swiper-service-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                effect: 'coverflow',
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                /* onSlideChangeStart:function(swiper){
                 var index  = swiper.activeIndex;
                 $(".swiper-info-list").eq(index).addClass("cur").siblings().removeClass("cur");
                 },*/
                coverflow: {
                    rotate: 0,
                    stretch: 0,
                    depth: 600,
                    modifier: 1,
                    slideShadows: true
                },
                onInit: function (e) {
                    if (e.activeIndex == 0) {
                        $.each(company, function (ii, it) {
                            let index = e.activeIndex;
                            if (index == ii) {
                                $('.booked-money').find('#money-reb').text(it.price);
                                let clas_s = it.clas_s;
                                let hclass = '';
                                let classificationName = '';
                                let hotDishes = '';
                                copyNum = it.price;
                                disName = it.clas_s;
                                companyName = it.name;
                                $.each(clas_s, function (iii, ite) {
                                    let dd = ite;
                                    $.each(ite.dis_list, function (iiii, itec) {
                                        dd.child = itec.dis_name
                                    });
                                    if (dd.classification_name == '热菜') {
                                        hotDishes += '\
                                                        <h3 class="dish-name">\
                                                        <span class="square"><img src="image/ligin/reddot.png" alt=""></span>\
                                                        <span class="can">' + dd.classification_name + '</span>\
                                                        </h3>\
                                                        <ul>\
                                                        <li>' + dd.child + '</li>\
                                                        </ul>\
                                                        ';
                                    } else {
                                        classificationName += '\
                                                        <h3 class="dish-name">\
                                                        <span class="square"><img src="image/ligin/reddot.png" alt=""></span>\
                                                        <span class="can">' + dd.classification_name + '</span>\
                                                        </h3>\
                                                        <ul>\
                                                        <li>' + dd.child + '</li>\
                                                        </ul>\
                                                        ';
                                    }
                                });
                                $('.itemLiRight').html(hotDishes);
                                $('.itemLi').html(classificationName);
                            }
                        });
                    }
                },
                onSlideChangeStart: function (swiper) {
                    let index = swiper.activeIndex;
                    $('#booked-number').find('.number').text(1);
                    let clas = '';
                    let it = company[index];
                    $('.booked-money').find('#money-reb').text(it.price);
                    let clas_s = it.clas_s;
                    let hclass = '';
                    let classificationName = '';
                    let hotDishes = '';
                    copyNum = it.price;
                    disName = it.clas_s;
                    companyName = it.name;
                    console.log(it);
                    $.each(clas_s, function (iii, ite) {
                        let dd = ite;
                        let liHtml = '';
                        $.each(ite.dis_list, function (iiii, itec) {
                            liHtml += '<li>' + itec.dis_name + '</li>'
                        });
                        if (dd.classification_name == '热菜') {
                            hotDishes += '\
                                                        <h3 class="dish-name">\
                                                        <span class="square"><img src="image/ligin/reddot.png" alt=""></span>\
                                                        <span class="can">' + dd.classification_name + '</span>\
                                                        </h3>\
                                                        <ul>\
                                                        <li>' + liHtml + '</li>\
                                                        </ul>\
                                                        ';
                        } else {
                            classificationName += '\
                                                        <h3 class="dish-name">\
                                                        <span class="square"><img src="image/ligin/reddot.png" alt=""></span>\
                                                        <span class="can">' + dd.classification_name + '</span>\
                                                        </h3>\
                                                        <ul>\
                                                        <li>' + liHtml  + '</li>\
                                                        </ul>\
                                                        ';
                        }
                    });
                    $('.itemLiRight').html(hotDishes);
                    $('.itemLi').html(classificationName);
                }
            });

            // 点击加加
            $('#booked-number').on('click', '.jia', function () {
                let companyPrice = parseInt($('#booked-number').find('.number').text());
                let totalPrice = parseInt($('.booked-money').find('#money-reb').text());
                companyPrice++;
                $('#booked-number').find('.number').text(companyPrice);
                $('.booked-money').find('#money-reb').text(copyNum * companyPrice);
            });

            // 点击减减
            $('#booked-number').on('click', '.jian', function () {
                let companyPrice = parseInt($('#booked-number').find('.number').text());
                let totalPrice = parseInt($('.booked-money').find('#money-reb').text());
                companyPrice--;
                if(companyPrice <= 0){
                    return false;
                }
                $('#booked-number').find('.number').text(companyPrice);
                $('.booked-money').find('#money-reb').text(totalPrice - copyNum);
            });


            $('#booked').on('click', function () {
                console.log(disName)
                let storage = window.localStorage;
                let d = JSON.stringify(disName);
                let num = parseInt($('#booked-number').find('.number').text());
                let totalPrices = $('#money-reb').text();
                storage.setItem("data", d);
                let json = storage.getItem("data");
                location.href = "home-package-infor.html?json="+ json + "&companyName=" + companyName +"&num=" + num + "&totalPrices=" + totalPrices +"&timer=" + timer;
            });

            var mySwiper = new Swiper('.details-swiper-menu .swiper-container', {
                loop: true,
                pagination: '.swiper-pagination',
                paginationBulletRender: function (swiper, index, className) {
                    return '<span class="' + className + '">' + (index + 1) + '</span>';
                },
                autoplay: 2000
            });

        }
    },
    error: function (err) {
        console.log(err)
    }


});


// 桌面
$('.booked-number .jian').on()
