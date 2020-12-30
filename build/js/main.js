jQuery(function($){

  $('input[placeholder], textarea[placeholder]').placeholder();
  $(".mask-phone").mask("+1 (999) 999-99-99");

  // Pager slider 1
  var pager1 = $('.progress-bar__value_prev'),
      pager2 = $('.progress-bar__value_next'),
      progressBarInner = $('.progress-bar__line span'),
      slideshow = $('.slider_banner');

  function setProgress(index) {
    const calc = ((index + 1) / (slideshow.slick('getSlick').slideCount)) * 100;
  
    progressBarInner
      .css('width', `${calc}%`);
  }
  
  slideshow.on('beforeChange', function(event, slick, currentSlide, nextSlide) {   
    setProgress(nextSlide);
  });

  slideshow.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    var i = (currentSlide ? currentSlide : 0e0) + 1;
    pager1.text(function(){
      if( i >= 0 && i <= 9) {
          return "0" + i;
        }
        else { 
          return "" + i;
        }
    });
    pager2.text(function(){
      if( slick.slideCount >= 0 && slick.slideCount <= 9) {
          return "0" + slick.slideCount;
        }
        else { 
          return "" + slick.slideCount;
        }
    });
  });

  //slider 1
  slideshow.slick({
    autoplay: false,
    autoplaySpeed: 4000,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    fade: true,
    useTransform: true,
    speed: 400,
    cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
    appendArrows: $('.banner-nav')
  });

  setProgress(0);

  //slider 2
  $('.slider_share').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    fade: true,
    dots: true,
    arrows: false
  });
  //slider 3
  $('.slider_one').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    swipe: false,
    appendArrows: $('.nav-center'),
    speed: 300
  });
  //slider 4
  $('.slider_works').slick({
    infinite: false,
    variableWidth: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    draggable: false,
    arrows: true,
    appendArrows: $('.nav-st_there'),
    speed: 300
  });

  $('.slider_product').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    fade: true,
    asNavFor: '.slider_product-thumb'
  });
  $('.slider_product-thumb').slick({
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.slider_product',
    dots: false,
    arrows: false,
    // centerMode: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3
        }
      }
    ]
  });

  $(".open-fancy").fancybox({
    fitToView   : false,
    autoSize    : false,
    closeClick  : false
  });

  // add-open-class
  $('.burger-menu').click(function(){
    if($(this).parent().is('.menu-burger--opened')){
      $(this).parent().removeClass('menu-burger--opened');
      $('body').removeClass('menu-open-wrapper-page');
    }else{
      $(this).parent().addClass('menu-burger--opened');
      $('body').addClass('menu-open-wrapper-page');
    }
  });

  //form elements
  jcf.setOptions('File', {
    buttonText: '',
    placeholderText: 'Add photo if you need'
  });
  
  jcf.replaceAll();

});


//Plugin placeholder
(function(b,f,i){function l(){b(this).find(c).each(j)}function m(a){for(var a=a.attributes,b={},c=/^jQuery\d+/,e=0;e<a.length;e++)if(a[e].specified&&!c.test(a[e].name))b[a[e].name]=a[e].value;return b}function j(){var a=b(this),d;a.is(":password")||(a.data("password")?(d=a.next().show().focus(),b("label[for="+a.attr("id")+"]").attr("for",d.attr("id")),a.remove()):a.realVal()==a.attr("placeholder")&&(a.val(""),a.removeClass("placeholder")))}function k(){var a=b(this),d,c;placeholder=a.attr("placeholder");
b.trim(a.val()).length>0||(a.is(":password")?(c=a.attr("id")+"-clone",d=b("<input/>").attr(b.extend(m(this),{type:"text",value:placeholder,"data-password":1,id:c})).addClass("placeholder"),a.before(d).hide(),b("label[for="+a.attr("id")+"]").attr("for",c)):(a.val(placeholder),a.addClass("placeholder")))}var g="placeholder"in f.createElement("input"),h="placeholder"in f.createElement("textarea"),c=":input[placeholder]";b.placeholder={input:g,textarea:h};!i&&g&&h?b.fn.placeholder=function(){}:(!i&&g&&
!h&&(c="textarea[placeholder]"),b.fn.realVal=b.fn.val,b.fn.val=function(){var a=b(this),d;if(arguments.length>0)return a.realVal.apply(this,arguments);d=a.realVal();a=a.attr("placeholder");return d==a?"":d},b.fn.placeholder=function(){this.filter(c).each(k);return this},b(function(a){var b=a(f);b.on("submit","form",l);b.on("focus",c,j);b.on("blur",c,k);a(c).placeholder()}))})(jQuery,document,window.debug);

//file
!function(e){e.addModule(function(e){"use strict";return{name:"File",selector:'input[type="file"]',options:{fakeStructure:'<span class="jcf-file"><span class="jcf-fake-input"></span><span class="jcf-upload-button"><span class="jcf-button-content"></span></span></span>',buttonText:"Choose file",placeholderText:"No file chosen",realElementClass:"jcf-real-element",extensionPrefixClass:"jcf-extension-",selectedFileBlock:".jcf-fake-input",buttonTextBlock:".jcf-button-content"},matchElement:function(e){return e.is('input[type="file"]')},init:function(){this.initStructure(),this.attachEvents(),this.refresh()},initStructure:function(){this.doc=e(document),this.realElement=e(this.options.element).addClass(this.options.realElementClass),this.fakeElement=e(this.options.fakeStructure).insertBefore(this.realElement),this.fileNameBlock=this.fakeElement.find(this.options.selectedFileBlock),this.buttonTextBlock=this.fakeElement.find(this.options.buttonTextBlock).text(this.options.buttonText),this.realElement.appendTo(this.fakeElement).css({position:"absolute",opacity:0})},attachEvents:function(){this.realElement.on({"jcf-pointerdown":this.onPress,change:this.onChange,focus:this.onFocus})},onChange:function(){this.refresh()},onFocus:function(){this.fakeElement.addClass(this.options.focusClass),this.realElement.on("blur",this.onBlur)},onBlur:function(){this.fakeElement.removeClass(this.options.focusClass),this.realElement.off("blur",this.onBlur)},onPress:function(){this.fakeElement.addClass(this.options.pressedClass),this.doc.on("jcf-pointerup",this.onRelease)},onRelease:function(){this.fakeElement.removeClass(this.options.pressedClass),this.doc.off("jcf-pointerup",this.onRelease)},getFileName:function(){var t="",s=this.realElement.prop("files");return s&&s.length?e.each(s,function(e,s){t+=(e>0?", ":"")+s.name}):t=this.realElement.val().replace(/^[\s\S]*(?:\|\/)([\s\S^\\/]*)$/g,"$1"),t},getFileExtension:function(){var e=this.realElement.val();return e.lastIndexOf(".")<0?"":e.substring(e.lastIndexOf(".")+1).toLowerCase()},updateExtensionClass:function(){var e=this.getFileExtension(),t=this.fakeElement.prop("className"),s=t.replace(new RegExp("(\s|^)"+this.options.extensionPrefixClass+"[^ ]+","gi"),"");this.fakeElement.prop("className",s),e&&this.fakeElement.addClass(this.options.extensionPrefixClass+e)},refresh:function(){var e=this.getFileName()||this.options.placeholderText;this.fakeElement.toggleClass(this.options.disabledClass,this.realElement.is(":disabled")),this.fileNameBlock.text(e),this.updateExtensionClass()},destroy:function(){this.realElement.insertBefore(this.fakeElement).removeClass(this.options.realElementClass).css({position:"",opacity:""}),this.fakeElement.remove(),this.realElement.off({"jcf-pointerdown":this.onPress,change:this.onChange,focus:this.onFocus,blur:this.onBlur}),this.doc.off("jcf-pointerup",this.onRelease)}}})}(jcf);


/* mask input*/
(function(e){function t(){var e=document.createElement("input"),t="onpaste";return e.setAttribute(t,""),"function"==typeof e[t]?"paste":"input"}var n,a=t()+".mask",r=navigator.userAgent,i=/iphone/i.test(r),o=/android/i.test(r);e.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},dataName:"rawMaskFn",placeholder:"_"},e.fn.extend({caret:function(e,t){var n;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof e?(t="number"==typeof t?t:e,this.each(function(){this.setSelectionRange?this.setSelectionRange(e,t):this.createTextRange&&(n=this.createTextRange(),n.collapse(!0),n.moveEnd("character",t),n.moveStart("character",e),n.select())})):(this[0].setSelectionRange?(e=this[0].selectionStart,t=this[0].selectionEnd):document.selection&&document.selection.createRange&&(n=document.selection.createRange(),e=0-n.duplicate().moveStart("character",-1e5),t=e+n.text.length),{begin:e,end:t})},unmask:function(){return this.trigger("unmask")},mask:function(t,r){var c,l,s,u,f,h;return!t&&this.length>0?(c=e(this[0]),c.data(e.mask.dataName)()):(r=e.extend({placeholder:e.mask.placeholder,completed:null},r),l=e.mask.definitions,s=[],u=h=t.length,f=null,e.each(t.split(""),function(e,t){"?"==t?(h--,u=e):l[t]?(s.push(RegExp(l[t])),null===f&&(f=s.length-1)):s.push(null)}),this.trigger("unmask").each(function(){function c(e){for(;h>++e&&!s[e];);return e}function d(e){for(;--e>=0&&!s[e];);return e}function m(e,t){var n,a;if(!(0>e)){for(n=e,a=c(t);h>n;n++)if(s[n]){if(!(h>a&&s[n].test(R[a])))break;R[n]=R[a],R[a]=r.placeholder,a=c(a)}b(),x.caret(Math.max(f,e))}}function p(e){var t,n,a,i;for(t=e,n=r.placeholder;h>t;t++)if(s[t]){if(a=c(t),i=R[t],R[t]=n,!(h>a&&s[a].test(i)))break;n=i}}function g(e){var t,n,a,r=e.which;8===r||46===r||i&&127===r?(t=x.caret(),n=t.begin,a=t.end,0===a-n&&(n=46!==r?d(n):a=c(n-1),a=46===r?c(a):a),k(n,a),m(n,a-1),e.preventDefault()):27==r&&(x.val(S),x.caret(0,y()),e.preventDefault())}function v(t){var n,a,i,l=t.which,u=x.caret();t.ctrlKey||t.altKey||t.metaKey||32>l||l&&(0!==u.end-u.begin&&(k(u.begin,u.end),m(u.begin,u.end-1)),n=c(u.begin-1),h>n&&(a=String.fromCharCode(l),s[n].test(a)&&(p(n),R[n]=a,b(),i=c(n),o?setTimeout(e.proxy(e.fn.caret,x,i),0):x.caret(i),r.completed&&i>=h&&r.completed.call(x))),t.preventDefault())}function k(e,t){var n;for(n=e;t>n&&h>n;n++)s[n]&&(R[n]=r.placeholder)}function b(){x.val(R.join(""))}function y(e){var t,n,a=x.val(),i=-1;for(t=0,pos=0;h>t;t++)if(s[t]){for(R[t]=r.placeholder;pos++<a.length;)if(n=a.charAt(pos-1),s[t].test(n)){R[t]=n,i=t;break}if(pos>a.length)break}else R[t]===a.charAt(pos)&&t!==u&&(pos++,i=t);return e?b():u>i+1?(x.val(""),k(0,h)):(b(),x.val(x.val().substring(0,i+1))),u?t:f}var x=e(this),R=e.map(t.split(""),function(e){return"?"!=e?l[e]?r.placeholder:e:void 0}),S=x.val();x.data(e.mask.dataName,function(){return e.map(R,function(e,t){return s[t]&&e!=r.placeholder?e:null}).join("")}),x.attr("readonly")||x.one("unmask",function(){x.unbind(".mask").removeData(e.mask.dataName)}).bind("focus.mask",function(){clearTimeout(n);var e;S=x.val(),e=y(),n=setTimeout(function(){b(),e==t.length?x.caret(0,e):x.caret(e)},10)}).bind("blur.mask",function(){y(),x.val()!=S&&x.change()}).bind("keydown.mask",g).bind("keypress.mask",v).bind(a,function(){setTimeout(function(){var e=y(!0);x.caret(e),r.completed&&e==x.val().length&&r.completed.call(x)},0)}),y()}))}})})(jQuery);
