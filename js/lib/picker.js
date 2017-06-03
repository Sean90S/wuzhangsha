/**
 * Created by Amy on 2016/8/23.
 */
(function($, doc) {
    $.init();
    $.ready(function() {
//            城市
        var cityPicker = new $.PopPicker();
        cityPicker.setData([{
            value: 'adsf',
            text: '1人'
        }, {
            value: 'adsf',
            text: '2人'
        }, {
            value: 'adsf',
            text: '3人'
        }, {
            value: 'adsf',
            text: '4人'
        }, {
            value: 'adsf',
            text: '5人'
        }, {
            value: 'adsf',
            text: '6人'
        }, {
            value: 'adsf',
            text: '7人'
        }, {
            value: 'adsf',
            text: '8人'
        }, {
            value: 'adf',
            text: '9人'
        }, {
            value: 'adf',
            text: '10人'
        }]);


        var showCityPickerButton = doc.getElementById('showCityPicker');
        var cityResult= doc.getElementById('cityResult');
        showCityPickerButton.addEventListener('tap', function(event) {
            cityPicker.show(function(items) {
                var city=document.getElementById('showCityPicker');
                city.innerHTML=items[0].text;
                //console.log(city.value);

                //返回 false 可以阻止选择框的关闭
                //return false;
            });
        }, false);


        //年级
       /* var userPicker = new $.PopPicker();
        userPicker.setData([{
            value: '',
            text: '一年级'
        }, {
            value: '',
            text: '二年级'
        }, {
            value: '',
            text: '三年级'
        }, {
            value: '',
            text: '四年级'
        }, {
            value: '',
            text: '五年级'
        }, {
            value: '',
            text: '六年级'
        }, {
            value: '',
            text: '初一'
        }, {
            value: '',
            text: '初二'
        }, {
            value: '',
            text: '初三'
        }, {
            value: '',
            text: '高一'
        }]);*/
        var showUserPickerButton = doc.getElementById('showUserPicker');
        var userResult = doc.getElementById('userResult');
        showUserPickerButton.addEventListener('tap', function(event) {
            userPicker.show(function(items) {
                var  el=document.getElementById('showUserPicker')
                el.value=items[0].text;
                //返回 false 可以阻止选择框的关闭
                //return false;
            });
        }, false);
        //学校
        var schoolPicker = new $.PopPicker();
        schoolPicker.setData([{
            value: '',
            text: '郑大'
        }, {
            value: '',
            text: '上戏'
        }, {
            value: '',
            text: '上海大学'
        }, {
            value: '',
            text: '财经学院'
        }, {
            value: '',
            text: '财经学院'
        }, {
            value: '',
            text: '财经学院'
        }, {
            value: '',
            text: '财经学院'
        }, {
            value: '',
            text: '财经学院'
        }, {
            value: '',
            text: '财经学院'
        }, {
            value: '',
            text: '财经学院'
        }]);
        var showSchoolPickerButton = doc.getElementById('showSchoolPicker');
        var schoolResult = doc.getElementById('schoolResult');
        showSchoolPickerButton.addEventListener('tap', function(event) {
            schoolPicker.show(function(items) {
                var  sch=document.getElementById('showSchoolPicker')
                sch.value=items[0].text;
                //返回 false 可以阻止选择框的关闭
                //return false;
            });
        }, false);
    });
})(mui, document);