/**
 * jquery.easyBanner.js
 * version   1.3.8
 * url       https://github.com/happyfreelife/easyBanner/
 */

(function ($, window, document) {

    // 判断浏览器是否支持CSS3的transition属性
    isSupportTransition = 'transition' in document.documentElement.style;

    // 判断浏览器是否是ie
    isIE = /msie|trident/i.test(navigator.userAgent);


    /******************** Automatic ********************/
    function Automatic($elem) {

        /**
         * 样式检测
         * @param  {String} prop css属性名
         * @param  {String || Array} val  css属性值
         * @return {Boolean}
         */
        function cssDetector($elem, prop, val) {
            if ($.isArray(val)) {
                for (var i in val) {
                    if ($elem.css(prop) === val[i]) {
                        return true;
                    }    
                }
                return false;
            }
            return $elem.css(prop) === val;
        }

        var T = $elem;

        T.automatic = {
            /********** 主容器 **********/
            containerPos: function() {
                if (cssDetector(T, 'position', 'static')) {
                    T.css('position', 'relative');
                }
            },

            /********** 箭头 **********/
            arrowBg: function($elem) {
                if (cssDetector($elem, 'background-image', 'none')) {
                    $elem.filter('.prev').html('&lt;');
                    $elem.filter('.next').html('&gt;');

                    $elem.css({
                        lineHeight: $elem.height() + 'px',
                        fontSize  : T.height() * 0.133,
                        fontFamily: isIE ? 'SimHei' : 'monospace',
                        userSelect: 'none',
                        cursor    : 'pointer',
                        color     : '#fff'
                    });
                }
            },

            arrowWrapBox: function ($elem) {
                if ($elem.width() === T.width()) {
                    $elem.css('width', '96%');
                }
            },

            arrowWrapPos: function($elem) {
                if (cssDetector($elem, 'top', 'auto') && cssDetector($elem, 'bottom', 'auto')) {
                    $elem.css({
                        top: '50%',
                        marginTop: -$elem.height() / 2
                    });
                }

                if (cssDetector($elem, 'left', 'auto') && cssDetector($elem, 'right', 'auto')) {
                    $elem.css('marginLeft', (1 - $elem.width() / T.width()) / 2 * 100 + '%');
                }
            },

            /********** 序列按钮 **********/
            serialBtnBg: function($elem) {
                if (
                    cssDetector($elem, 'background-color', ['rgba(0, 0, 0, 0)', 'transparent']) &&
                    cssDetector($elem, 'background-image', 'none')
                ) {
                    return '.eb-serial > *{background-color: #fff;border-radius: 50%;}\n' +
                    '.eb-serial > .active{background-color: #ffa500;}\n';
                }
            },
            
            serialBtnBox: function($elem, type) {
                if (type === 'equal') {
                    var len = $elem.length;

                    if (cssDetector($elem, 'borderRightWidth', ['0px', 'medium'])) {
                        $elem.css('borderRightWidth', 1);
                    }

                    if (cssDetector($elem, 'borderRightColor', ['#999', 'rgb(153, 153, 153)'])) {
                        $elem.css('borderRightColor', '#fff');
                    }

                    if (cssDetector($elem, 'borderRightStyle', 'none')) {
                        $elem.css('borderRightStyle', 'solid');
                    }

                    if (cssDetector($elem, 'height', '0px')) {
                        $elem.css('height', 10);
                    }

                    $elem.css({
                        width: $elem.parent().width() / len - parseInt($elem.css('border-right-width')),
                        borderLeft  : 'none',
                        borderRadius: 0
                    });

                    $elem.eq(len - 1).css({
                        width: $elem.parent().width() / len,
                        borderRightWidth: 0
                    });
                } else {
                    if (cssDetector($elem, 'width', '0px') && cssDetector($elem, 'height', '0px')) {
                        $elem.css({
                            width : 10,
                            height: 10
                        });
                    }

                    if (cssDetector($elem, 'margin', ['auto', '0px', ''])) {
                        $elem.css('margin', '0 5px');
                    }
                }
            },

            serialBtnWrapPos: function($elem) {
                if (cssDetector($elem, 'top', 'auto') && cssDetector($elem, 'bottom', 'auto')) {
                    $elem.css('bottom', T.height() * 0.04);
                }
        
                if (cssDetector($elem, 'left', 'auto') && cssDetector($elem, 'right', 'auto')) {
                    $elem.css({
                        left: '50%',
                        marginLeft: -$elem.children().outerWidth(true) * $elem.children().length / 2
                    });
                }
            },

            /********** 缩略图 **********/
            thumbImgBox: function($elem) {
                var $thumbItem = $elem.parent();

                if (!cssDetector($thumbItem, 'height', '0px')) {
                    $elem.height($thumbItem.height());
                } else {
                    $elem.height(T.height() * 0.125);
                    $thumbItem.height($elem.height());
                }

                if (!cssDetector($thumbItem, 'width', '0px')) {
                    $elem.css({
                        position  : 'relative',
                        left      : '50%',
                        marginLeft: -$elem.outerWidth() / 2
                    });
                }
            },

            thumbArrowBg: function($elem) {
                if (
                    cssDetector($elem, 'background-color', ['rgba(0, 0, 0, 0)', 'transparent']) &&
                    cssDetector($elem, 'background-image', 'none')
                ) {
                    $elem.filter('.prev').html('&lt;');
                    $elem.filter('.next').html('&gt;');

                    $elem.css({
                        fontSize  :$elem.parent().height() * 0.5,
                        lineHeight: $elem.height() + 'px',
                        fontFamily: isIE ? 'SimHei' : 'monospace',
                        userSelect: 'none',
                        cursor    : 'pointer',
                        color     : '#fff'
                    });
                }
            },

            thumbArrowPos: function($elem) {
                $elem.each(function() {
                    if (cssDetector($(this), 'marginTop', '0px')) {
                        $(this).css('marginTop', ($(this).parent().height() - $(this).height()) / 2);
                    }
                    
                });
            },

            thumbListBox: function($elem) {
                var thumbListWidth = $elem.parent().width() - $elem.siblings('a').outerWidth(true) * 2;

                $elem.wrap('<div/>').parent().css({
                    float     : 'left',
                    width     : thumbListWidth,
                    height    : $elem.height(),
                    overflow  : 'hidden',
                    userSelect: 'none'
                });
            },

            thumbListWrapPos: function($elem) {
                if (cssDetector($elem, 'top', 'auto') && cssDetector($elem, 'bottom', 'auto')) {
                    $elem.css('bottom', T.height() / 25);
                }

                var w = $elem.children().width() < $elem.width() ?
                $elem.children().width() : $elem.width();

                if (w <= T.width()) {
                    $elem.css('left', (1 - w / T.width()) / 2 * 100 + '%');
                } else {
                    $elem.width('100%');
                }
            }
        };
    }


    /******************** Animation ********************/
    function Animation($elem) {
        var T = $elem;

        T.animation = {
            // 判定当前显示项的索引是否溢出
            determineIndex: function() {
                T.activeIndex =
                T.currentIndex =
                T.currentIndex === T.len ? 0 : T.currentIndex === -1 ? T.len - 1 : T.currentIndex;
            },

            // 序列元素当前项高亮
            serialActive: function() {
                this.determineIndex();

                if (T.options.serial === true || T.options.serial === 'equal') {
                    T.$serialBtn.eq(T.activeIndex).addClass('active').siblings().removeClass('active');
                }

                if (T.options.serial === 'thumb') {
                    T.$thumbItem.eq(T.activeIndex).addClass('active').siblings().removeClass('active');

                    // 判定当前图片对应的缩略图是否在缩略图列表的可见范围内
                    var currentItemThumbLeft = T.currentIndex * T.$thumbItem.outerWidth(true),
                        currentThumbListLeft = Math.abs(parseInt(T.$thumbList.css('left'))),
                        thumbListWrapWidth = T.$thumbList.parent().width();

                    // 如果不在列表的可见范围内，滑动到当前图片对应的缩略图的位置
                    if (
                        currentItemThumbLeft < currentThumbListLeft ||
                        currentItemThumbLeft > (currentThumbListLeft + thumbListWrapWidth)
                    ) {
                        var left = -parseInt(currentItemThumbLeft / thumbListWrapWidth) * thumbListWrapWidth;
                        this.thumbSlide(left);
                    }
                }
            },

            // 缩略图列表滑动
            thumbSlide: function(left) {
                if (T.$thumbList.animating) { return false; }

                if (isSupportTransition) {
                    T.$thumbList.animating = true;
                    T.$thumbList.css('left', left).addClass('transition-left-' + T.options.speed);

                    setTimeout(T.animation.thumbSlideComplete, T.options.speed + 20);
                } else {
                    T.$thumbList.animating = true;
                    T.$thumbList.animate({ left: left }, {
                        duration: T.options.speed,
                        complete: T.animation.thumbSlideComplete
                    });
                }
            },

            // 动画模式 - 无效果
            none: function() {
                this.determineIndex();
                T.$item.eq(T.currentIndex).show().siblings().hide();
                this.serialActive();
                Preload(T.$item, T.currentIndex, T.currentIndex);
            },

            // 动画模式 - 淡入淡出
            fade: function() {
                this.determineIndex();

                T.$list.animating = true;
                T.$item.removeClass().eq(T.currentIndex).addClass('top-item');

                if (isSupportTransition) {
                    T.$item.eq(T.currentIndex).addClass('transition-fade-' + T.options.speed).css('opacity', 1);

                    setTimeout(T.animation.fadeComplete, T.options.speed);
                } else {
                    T.$item.eq(T.currentIndex).animate({
                        opacity: 1
                    }, {
                        duration: T.options.speed,
                        complete: T.animation.fadeComplete
                    });
                }

                this.serialActive();

                Preload(T.$item, T.currentIndex, T.currentIndex);
            },

            // 动画模式 - 滑动
            slide: function() {
                T.$item = T.$list.children();

                var lastIndex = T.$list.data('lastIndex'),
                    slideDirection = 'left';

                if (T.currentIndex === lastIndex) {
                    return;
                }

                /**
                 * 滑动动画在执行之前需要将第1个item克隆一份
                 * 还需要判定此次动画的方向，所以不能使用普通的索引判定方法
                 */
                if (T.currentIndex < lastIndex) {
                    slideDirection = 'right';
                }

                // first item >> last item
                if (T.currentIndex < 0) {
                    T.currentIndex = T.len - 1;
                    T.$item.eq(T.len).show().siblings().hide();
                    slideDirection = 'right';
                }

                // first item >> last item
                if (T.currentIndex > T.len) {
                    T.currentIndex = 1;
                    slideDirection = 'left';
                }

                if (slideDirection === 'right') {
                    T.$list.css('left', '-100%');
                }

                T.$item.eq(T.currentIndex).show();

                // CSS3 transition
                if (isSupportTransition) {
                    setTimeout(function() {
                        T.$list.animating = true;
                        T.$list.css('left', slideDirection === 'left' ? '-100%' : 0)
                        .addClass('transition-left-' + T.options.speed);

                        setTimeout(T.animation.slideComplete, T.options.speed - 20);
                    }, 20);
                }
                // jQuery animate
                if (!isSupportTransition) {
                    T.$list.animating = true;
                    T.$list.animate({
                        left: slideDirection === 'left' ? '-100%' : 0
                    }, {
                        duration: T.options.speed,
                        complete: T.animation.slideComplete
                    });
                }

                this.serialActive();

                Preload(T.$item, T.currentIndex, T.currentIndex);
            },

            // 单次fade动画执行完之后调用的函数
            fadeComplete: function() {
                T.$list.animating = false;
                T.$item.eq(T.currentIndex).siblings().css('opacity', 0);
                if (T.options.autoPlay && !T.$list.hovering) {
                    T.setPlayTimer();
                }
            },

            // 单次slide动画执行完之后调用的函数
            slideComplete: function() {
                if (T.currentIndex === T.len) {
                    T.$item.first().show().siblings().hide();
                    T.currentIndex = 0;
                }

                T.$list.animating = false;
                T.$list.css('left', 0).removeClass();
                T.$list.data('lastIndex', T.currentIndex);

                T.$item.eq(T.currentIndex).show().siblings().hide();

                if (T.options.autoPlay && !T.$list.hovering) {
                    T.setPlayTimer();
                }
            },

            // 单次thumbSlide动画执行完之后调用的函数
            thumbSlideComplete: function() {
                T.$thumbList.animating = false;

                var left = parseInt(T.$thumbList.css('left')),
                    $prev = T.$thumbList.parent().prev(),
                    $next = T.$thumbList.parent().next();

                // 缩略图列表滑动到左右边界时给对应的按钮添加禁用样式
                left ? $prev.removeClass('disabled') : $prev.addClass('disabled');

                if (T.$thumbList.parent().width() - T.$thumbList.width() !== left) {
                    $next.removeClass('disabled');
                } else {
                    $next.addClass('disabled');
                }
            }
        };
    }


    /******************** Preload ********************/
    /**
     * 图片预加载
     * @param  {HTMLElement} $item   列表项元素
     * @param  {Number} loadingIndex 当前加载项的索引
     * @param  {Number} currentIndex 当前显示项的索引
     */
    function Preload($item, loadingIndex, currentIndex) {
        if (loadingIndex >= $item.length) { return; }

        if ($item.filter('.loading').css('backgroundImage') === 'none' &&    // 没有手动设置loading动画
            !$('#loading-animation').length                                  // 自动化的loading样式还没有添加
        ){
            setLoadingStyle();
        }

        var img = new Image(),
            $loadAnimation = $('<div class="loading-animation"><i></i><span>loading</span></div>'),
            $loadingItem = $item.eq(loadingIndex),
            loadingItemSrc = $loadingItem.attr('data-src');

        if ($loadingItem.attr('data-src')) {
            $loadingItem.removeAttr('data-src');

            // 不对第1张图片设置loading动画
            if (!loadingIndex) {
                $loadingItem.css('background-image', 'url(' + loadingItemSrc + ')');
            } else {
                $loadingItem.addClass('loading');
                $loadingItem.append($loadAnimation);
            }
            
            // 给图片绑定加载完成事件
            img.src = loadingItemSrc;
            if (img.complte) {
                showLoadingItem();
            } else {
                img.onload = showLoadingItem;
            }
        } else {
            // 当前项没有data-src属性说明已加载，直接加载下一张
            Preload($item, ++loadingIndex, currentIndex);
        }

        // 设置loading动画的样式
        function setLoadingStyle() {
            var style = 
                '.loading-animation {' +
                    'position: relative;' +
                    'width: 100%;' +
                    'height: 100%;' +
                    'background: #e5e5e5;' +
                '}' + '\n' +

                '.loading-animation span {' +
                    'position: absolute;' +
                    'width:' + $item.height() / 4 + 'px;' +
                    'height:' + $item.height() / 4 + 'px;' +
                    'line-height:' + $item.height() / 4 + 'px;' +
                    'top: 50%;' +
                    'left: 50%;' +
                    'margin-top: -' + $item.height() / 4 / 2 + 'px;' +
                    'margin-left: -' + $item.height() / 4 / 2 + 'px;' +
                    'font-size:' + $item.height() / 28 + 'px;' +
                    'text-align: center;' +
                    'color: #333;' +
                '}' + '\n';

            if (isSupportTransition) {
                style +=
                    '.loading-animation i {' +
                        'position: absolute;' + 
                        'top: 50%;' + 
                        'left: 50%;' + 
                        'width:' + $item.height() / 4 + 'px;' + 
                        'height:' + $item.height() / 4 + 'px;' + 
                        'line-height:' + $item.height() / 4 + 'px;' + 
                        'margin-top: -' + $item.height() / 4 / 2 + 'px;' + 
                        'margin-left: -' + $item.height() / 4 / 2 + 'px;' + 
                        'background: linear-gradient(to right, #fff 10%, transparent 42%);' + 
                        'background: -webkit-linear-gradient(left, #fff 10%, transparent 42%);' + 
                        'border-radius: 50%;' + 
                        'animation: loading 1.5s infinite linear;' + 
                        '-webkit-animation: loading 1.5s infinite linear;' + 
                    '}' + '\n' +

                    '.loading-animation i:before {' +
                        'position: absolute;' +
                        'top: 0;' +
                        'left: 0;' +
                        'content: "";' +
                        'width: 50%;' +
                        'height: 50%;' +
                        'background: #fff;' +
                        'border-top-left-radius: 100%;' +
                    '}' + '\n' +

                    '.loading-animation i:after {' +
                        'position: absolute;' +
                        'top: 12.5%;' +
                        'left: 12.5%;' +
                        'content: "";' +
                        'width: 75%;' +
                        'height: 75%;' +
                        'background: #e5e5e5;' +
                        'border-radius: 50%;' +
                    '}' + '\n' +

                    '@-webkit-keyframes loading {' +
                        '0% {-webkit-transform: rotate(0deg);}' +
                        '100% {-webkit-transform: rotate(360deg);}' +
                    '}' + '\n' +

                    '@keyframes loading {' +
                        '0% {transform: rotate(0deg);}' +
                        '100% {transform: rotate(360deg);}' +
                    '}';
            }

            $('head').append('<style id="loading-animation">' + style + '</style>');
        }

        function showLoadingItem() {
            // 预加载下一张图片
            Preload($item, loadingIndex + 1, currentIndex);

            /**
             * $loadingItem已缓存，在这里必须更新一次
             * 否则会导致调用的$loadingItem不是该方法需要的引起异常
             */
            $loadingItem = $item.eq(loadingIndex);
            $loadingItem.css('background-image', 'url(' + loadingItemSrc + ')');
            $loadingItem.children('.loading-animation').remove();

            if (loadingIndex === currentIndex) {
                if ($loadingItem.hasClass('loading') &&    // 正在加载项有loading样式
                    $loadingItem.is(':visible') &&         // 正在加载项是可见的(animation: slide)
                    $loadingItem.css('opacity') === '1'    // 正在加载项是完全不透明的(animation: fade)
                ) {
                    $loadingItem.hide().fadeIn();
                }
            }

            // 当前显示项已加载并且下一项也加载完了
            if (loadingIndex !== currentIndex) {
                /**
                 * 动画模式不是fade，把预加载完成的item隐藏
                 * 动画模式是fade，不可隐藏任何item，因为fade动画仅仅是改变item的opacity和z-index属性
                 */
                if ($loadingItem.css('zIndex') === 'auto') {
                    $loadingItem.hide();
                }
            }

            $loadingItem.removeClass('loading').addClass('loaded');
        }
    }

    
    $.fn.easyBanner = function(option) {
        var options = $.extend({
            animation: 'slide',    // 动画模式: ['slide', 'fade']
            trigger  : 'click',    // 触发动画的事件类型: ['click', 'hover']
            arrow    : true,       // 左右箭头按钮
            serial   : true,       // 序列按钮[true, false, 'equal', 'thumb']
            autoPlay : true,       // 自动轮播
            speed    : 800,        // 动画速度
            interval : 5000        // 自动轮播间隔
        }, option);

        return this.each(function() {
            var $this = $(this),
                $list = $this.children(),
                $item = $list.children(),
                len   = $item.length,
                currentIndex = 0,
                embeddedStyle = '';

            // 轮播列表初始化
            function init() {
                // 给主容器绑定属性
                $this.$list = $list;
                $this.$item = $item;
                $this.len = len;
                $this.options = options;
                $this.currentIndex = currentIndex;

                $list.hovering = false;

                $list.wrap('<div class="eb-list"/>').parent().css({
                    position: 'relative',
                    width   : '100%',
                    height  : '100%',
                    overflow: 'hidden'
                });

                $list.css({
                    position: 'relative',
                    display : 'block',
                    height  : '100%'
                });

                $item.css({
                    display: 'block',
                    width  : $this.width(),
                    height : $this.height(),
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center top'
                });
                
                $this.automatic.containerPos();

                switch(options.animation) {
                    case 'fade':
                        if (isSupportTransition) {
                            embeddedStyle +=
                            '.transition-fade-' + options.speed + '{' +
                                'transition: opacity ' + options.speed + 'ms ease;' +
                                '-webkit-transition: opacity ' + options.speed + 'ms ease;' +
                            '}\n';
                        }
                        embeddedStyle += '.top-item{z-index: 0 !important;}\n';

                        $item.css({
                            position: 'absolute',
                            left  : 0,
                            top   : 0,
                            zIndex: -10
                        });
                        $item.first().addClass('top-item').siblings().css('opacity', 0);
                        break;

                    case 'slide':
                        if (isSupportTransition) {
                            embeddedStyle +=
                            '.transition-left-' + options.speed + '{' +
                                'transition: left ' + options.speed + 'ms ease;' +
                                '-webkit-transition: left ' + options.speed + 'ms ease;' +
                            '}\n';
                        }

                        $list.css({
                            left : 0,
                            width: (len + 1) * 100 + '%'
                        });

                        $item.css({
                            float: 'left',
                            width: $this.css('width')
                        });
                        $item.first().clone(true).appendTo($list);
                        $item.first().show().siblings().hide();
                        break;
                }

                // 改变浏览器视口大小时自动调整背景图片的位置
                $(window).resize(function() {
                    $list.children().width($this.width());
                });
            }

            // 提取图片: 将图片转为背景图片;获取手动设置的缩略图地址
            function convertImage() {
                var $itemImg = $item.find('img'),
                    thumbSrcArr = [],
                    thumbSrcRegExp = new RegExp('\\?thumb=(.*\\.(jpg|jpeg|gif|png))$');

                // 获取手动设置的缩略图的地址
                $itemImg.each(function() {
                    var src = $(this).attr('src') || $(this).data('src');
                    if (src.match(thumbSrcRegExp)) {
                        thumbSrcArr.push(src.match(thumbSrcRegExp)[1]);
                    }
                    $this.thumbSrcArr = thumbSrcArr;
                });

                if ($itemImg.filter('[data-src]').length === len) {
                    // 根据data-src自动开启Preload
                    $itemImg.each(function() {
                        var src = $(this).data('src');
                        $(this).parent().attr('data-src', src).data('thumb', src);
                        $(this).remove();
                    });

                    /**
                     * 在这里添加loading样式是为了在Preload方法中选取这个元素
                     * 然后检测有无手动设置loading的动画样式
                     */
                    $item.last().addClass('loading');
                    Preload($item, currentIndex, currentIndex);
                } else {
                    // 标准模式，将图片转为父级元素的背景图片后删除
                    $itemImg.each(function() {
                        var src = $(this).attr('src');
                        $(this).parent().css('background-image', 'url(' + src + ')').data('thumb', src);
                        $(this).remove();
                    });
                }
            }

            // 给轮播添加方向箭头
            function createArrow() {
                $this.append(
                    '<div class="eb-arrow">' +
                       '<a class="prev" style="float: left;"></a>' +
                       '<a class="next" style="float: right;"></a>' +
                   '</div>'
                );

                var $arrowWrap = $('.eb-arrow', $this),
                    $arrow = $arrowWrap.children();

                // 自动化样式
                $this.automatic.arrowWrapBox($arrowWrap);
                $this.automatic.arrowWrapPos($arrowWrap);
                $this.automatic.arrowBg($arrow);

                $arrowWrap.appendTo($this).css({
                    position:'absolute',
                    zIndex  : 20,
                    height  : 0
                });
                
                arrowBindEvent.call($arrow);
            }

            // 给轮播添加序列按钮
            function createSerialBtn() {
                for (var i = 0, item = ''; i < len; i++) {
                    item += '<a></a>';
                }
                $this.append('<div class="eb-serial">' + item + '</div>');

                var $serialBtnWrap = $('.eb-serial', $this),
                    $serialBtn = $serialBtnWrap.children();
                
                // 自动化样式
                $serialBtn.css('float', 'left');
                $this.automatic.serialBtnBox($serialBtn, options.serial);
                embeddedStyle += $this.automatic.serialBtnBg($serialBtn);
                $this.automatic.serialBtnWrapPos($serialBtnWrap);

                $serialBtnWrap.appendTo($this).css({
                    position:'absolute',
                    zIndex  : 20
                }).children(':first').addClass('active');

                serialBindEvent.call($serialBtn);

                $this.$serialBtn = $serialBtn;
            }

            // 给轮播添加序列缩略图
            function createSerialThumb() {
                for (var i = 0, src = '', item = ''; i < len; i++) {
                    src = $this.thumbSrcArr[i] || $item.eq(i).data('thumb');
                    item += '<li><img src="' + src + '"></li>';
                }
                $this.append('<div class="eb-thumb"><ul>' + item + '</ul></div>');

                var $thumbListWrap = $('.eb-thumb', $this),        // 缩略图列表容器
                    $thumbList     = $thumbListWrap.children(),    // 缩略图列表
                    $thumbItem     = $thumbList.children(),        // 缩略图列表项
                    $thumbImg      = $thumbItem.children(),        // 缩略图列表项中的图片
                    $thumbArrow;                                   // 缩略图的方向箭头

                $thumbItem.css({
                    float     : 'left',
                    overflow  : 'hidden',
                    marginLeft: 0,
                    cursor    : 'pointer'
                });
                $thumbItem.first().addClass('active');
                $thumbItem.last().css('marginRight', 0);

                // 自动化样式
                $thumbImg.hide();
                $this.automatic.thumbImgBox($thumbImg);
                $thumbImg.show();

                // 必须在获取到缩略图尺寸之后才能进行自动化处理和事件绑定
                if ($thumbImg[0].complete) {
                    thumbAutomatic();
                } else {
                    $thumbImg[0].onload = thumbAutomatic;
                }

                function thumbAutomatic() {
                    // 计算缩略图列表的宽度
                    $thumbList = $thumbListWrap.children();
                    $thumbList.css({
                        position: 'relative',
                        left    : 0,
                        width   : $thumbItem.outerWidth(true) * $thumbItem.length - parseInt($thumbItem.css('margin-right')),
                        height  : $thumbItem.outerHeight(true)
                    });

                    // 缩略图列表容器定位
                    $thumbListWrap.css({
                        position:'absolute',
                        zIndex  : 20,
                        overflow: 'hidden',
                        height  : $thumbItem.outerHeight(true)
                    });
                    $this.automatic.thumbListWrapPos($thumbListWrap);

                    // 缩略图列表过长时，自动添加方向箭头并绑定滚动事件
                    if ($thumbList.width() > $thumbListWrap.width()) {
                        $thumbListWrap.prepend('<a class="prev disabled"/>');
                        $thumbListWrap.append('<a class="next"/>');

                        $thumbArrow = $('a', $thumbListWrap);
                        $thumbArrow.css({
                            position: 'relative',
                            zIndex: 20
                        });

                        $thumbArrow.filter('.prev').css('float', 'left');
                        $thumbArrow.filter('.next').css('float', 'right');

                        $this.automatic.thumbArrowBg($thumbArrow);
                        $this.automatic.thumbArrowPos($thumbArrow);
                    }

                    $this.automatic.thumbListBox($thumbList);
                    
                    thumbArrowBindEvent.call($thumbArrow);
                    serialBindEvent.call($thumbItem);
                }

                $this.$thumbItem = $thumbItem;
                $this.$thumbList = $thumbList;
            }

            // 给方向箭头绑定事件
            function arrowBindEvent() {
                $(this).on({
                    click: function() {
                        if ($list.animating) { return; }
                        $(this).hasClass('prev') ? currentIndex-- : currentIndex++;
                        play();
                    },

                    // 阻止连续点击箭头按钮时选中按钮
                    selectstart: function() { return false; }
                });
            }

            // 给序列按钮、缩略图绑定事件
            function serialBindEvent() {
                $(this).on(
                    options.trigger === 'click' ? 'click' : 'mouseenter',
                    function() {
                        if ($list.animating) { return; }
                        currentIndex = $(this).index();
                        play();
                    }
                );
            }

            // 给缩略图列表按钮绑定事件
            function thumbArrowBindEvent() {
                $(this).click(function() {
                    var $thumbList = $this.$thumbList,           // 缩略图列表
                        $thumbListWrap = $thumbList.parent(),    // 缩略图列表容器
                        left = parseInt($thumbList.css('left')), // 缩略图列表位置
                    
                        thumbListLeftOverWidth = Math.abs(parseInt($thumbList.css('left'))),    // 缩略图列表溢出列表容器的左侧宽度
                        thumbListRightOverWidth = $thumbList.width() - $thumbListWrap.width() - // 缩略图列表溢出列表容器的右侧宽度
                        Math.abs(parseInt($thumbList.css('left')));

                    if ($(this).hasClass('prev')) {
                        // 比较"列表溢出的宽度"和"列表容器的宽度"来设置列表滑动的距离
                        if (!thumbListLeftOverWidth) { return; }

                        left = thumbListLeftOverWidth < $thumbListWrap.width() ? 0 : left + $thumbListWrap.width();
                    }

                    if ($(this).hasClass('next')) {
                        if (!thumbListRightOverWidth) { return; }

                        left = thumbListRightOverWidth < $thumbListWrap.width() ? left - thumbListRightOverWidth :
                        left - $thumbListWrap.width();
                    }

                    $this.animation.thumbSlide(left);
                });
            }

            // 播放轮播动画
            function play() {
                $this.activeIndex = $this.currentIndex = currentIndex;

                $this.animation[$this.options.animation]();

                // 防止当前上下文中的currentIndex溢出导致animation组件中的T.currentIndex溢出
                if (currentIndex >= len || currentIndex <= 0) {
                    currentIndex = $this.activeIndex;
                }
            }

            // 设置轮播自动播放的定时器
            function setPlayTimer() {
                /**
                 * 动画执行完之后，清除原来的自动定时器再重新设置一个
                 * 这样可以避免动画执行时间对自动播放间隔时间造成的误差
                 */
                clearInterval($this.playTimer);

                $this.playTimer = setInterval(function() {
                    currentIndex++;
                    play();
                }, options.interval);
            }

            // 取消轮播自动播放的定时器
            function cancelPlayTimer() {
                $this.hover(function() {
                    $list.hovering = true;
                    clearInterval($this.playTimer);
                }, function() {
                    $list.hovering = false;
                    if (!$list.animating) { setPlayTimer(); }
                });
            }
            
            (function() {
                Automatic($this);
                init();
                convertImage();
                Animation($this);

                if (len <= 1) { return; }
                if (options.arrow) { createArrow(); }
                if (options.serial === true || options.serial === 'equal') { createSerialBtn(); }
                if (options.serial === 'thumb') { createSerialThumb(); }
                if (options.autoPlay) { setPlayTimer(); cancelPlayTimer(); }

                $this.setPlayTimer = setPlayTimer;

                $('head').append('<style>' + embeddedStyle + '</style>');
            }());
        });
    };
}(jQuery, window, document));
