/**
 * main
 * 程序入口 require
**/
//配置页面加载模块参数
require.config({

    //配置Javascript文件映射路径
    paths: {
        zepto				  :"../lib/zepto.min",/* 库类 */
        touch				  :"../lib/touch",/* 库类 */
        mui				      :"../lib/mui.min",/* 库类 */
        swiper                :"../lib/swiper.min"/* swiper */
        // vue                :"../lib/vue.min"/* swiper */
    }

});

require(['common'], function (){

});
