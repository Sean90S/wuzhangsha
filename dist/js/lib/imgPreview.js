/**
 * Created by dell on 2017/5/24.
 */
;(function (w) {
    var o = {
        index: 0,
        previewImage: function (cfg) {
            var _this = this;
            _this.index = 0;
            var imgFile = cfg.imgFile;

            var files = imgFile.files;
            if (files) {
                for (var i = 0; i < files.length; i++) {
                    var reader = new FileReader();
                    reader.onload = function (evt) {
                        console.log("reader  onLoad");
                        _this.autoResizeImage(cfg,evt.target.result);
                    }
                    reader.readAsDataURL(files[i]);
                }

            }
        },
        autoResizeImage: function (cfg,imgSrc) {
            var _this=this;
            var _this=this;
            var img = new Image();
            img.src = imgSrc;
            img.onload=function(){
                var hRatio;
                var wRatio;
                var Ratio = 1;

                var maxWidth = cfg.width;
                var maxHeight = cfg.height;

                var w = img.width;
                var h = img.height;
                wRatio = maxWidth / w;
                hRatio = maxHeight / h;
                if (maxWidth == 0 && maxHeight == 0) {
                    Ratio = 1;
                } else if (maxWidth == 0) {
                    if (hRatio < 1) {
                        Ratio = hRatio;
                    }
                } else if (maxHeight == 0) {
                    if (wRatio < 1) {
                        Ratio = wRatio;
                    }
                } else if (wRatio < 1 || hRatio < 1) {
                    Ratio = (wRatio <= hRatio ? wRatio : hRatio);
                }

                if (Ratio < 1) {
                    w = w * Ratio;
                    h = h * Ratio;
                }

                cfg.callback({
                    index:_this.index++,
                    height:Math.round(h),
                    width:Math.round(w),
                    data:imgSrc
                });
            }
        }
    };
    w.imgPreview = o;
})(window);
