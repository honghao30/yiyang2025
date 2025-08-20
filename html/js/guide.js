//javascript
function openWindowPop(url, name){
    var options = 'top=10, left=10, width=500, height=555, status=no, menubar=no, toolbar=no, resizable=no';
    window.open(url, name, options);
}

// 탭
$(document).ready(function() {
    $(".input_btn_area button").on("click", function() {
      $(".input_btn_area button").removeClass("on"); // input_btn_area 버튼에서 on 클래스 제거
      $(this).addClass("on"); // 클릭한 버튼에 on 클래스 추가
    });

    $(".table_btn_area button").on("click", function() {
      $(this).parent().find("button").removeClass("on"); // table_btn_area 안에서 버튼들의 on 클래스 제거
      $(this).addClass("on"); // 클릭한 버튼에 on 클래스 추가
    });
});

// 모달 레이어
function modalControl(type,id,size){ //type:열기(o),닫기(c) / id: 열 모달의 id / size: 모달 가로 사이즈
	var $html = $("html");
	if(type == "o"){ //모달 열기
	  $html.addClass("modal-open");//모달오픈 시 뒤의 스크롤이 움직이는 것을 방지
	  $(".modal_new").not(id).removeClass("modal_on");
	  var $modalOn = $(id).addClass("modal_on").on("click", function(e){
		if( $modalOn.hasClass("modal_overlay") && $(".modal_n_wrap").is(e.target) ){ //오버레이 클릭 시 닫기
		  $modalOn.removeClass("modal_on");
		  $html.removeClass("modal-open");
		}
	  });
	} else if(type == "c"){ //모달 닫기
	  $(".modal_new.modal_on").removeClass("modal_on");
	  $html.removeClass("modal-open");
	  // userInfoPop 모달창이 열리기 전에
	}
}

// 메인 레이어 공지 팝업
function imgNotiShow(action) {
  if (action === 'c') {
    $('.img_noti_show').hide(); // 해당 클래스를 감추는 방법을 사용합니다. show()를 사용하면 다시 보일 수 있습니다.
  }
}
// 메인 배너 sub 레이어 닫기
function imgShow(action) {
  if (action === 'c') {
    $('.img_show').hide(); // 해당 클래스를 감추는 방법을 사용합니다. show()를 사용하면 다시 보일 수 있습니다.
  }
}

// tooltip
$(document).ready(function() {
    const button = $('.tooltipBtn');
    const tooltip = $('.tooltip');
    const close = $('.tooltip_cont .close');

    button.on('click', function() {
      // 현재 버튼과 연결된 툴팁만 조작합니다.
      const thisButton = $(this);
      const thisTooltip = thisButton.next('.tooltip');

      // 이미 열려있는 툴팁인지 확인하여 토글 동작을 수행합니다.
      if (thisTooltip.hasClass('on')) {
        thisTooltip.removeClass('on');
      } else {
        // 모든 툴팁을 일단 닫은 후에 클릭한 버튼에 연결된 툴팁만 엽니다.
        tooltip.removeClass('on');
        thisTooltip.addClass('on');
      }
    });

    close.on('click', function() {
      // 현재 닫기 버튼과 연결된 툴팁만 닫습니다.
      const thisTooltip = $(this).closest('.tooltip');
      thisTooltip.removeClass('on');
    });

    $(document).on('click', function(event) {
      // 열려있는 툴팁들 중에서 클릭 이벤트가 발생한 대상이 툴팁이 아니며 버튼도 아닌 경우 닫습니다.
      const openTooltips = $('.tooltip.on');
      if (!openTooltips.is(event.target) && openTooltips.has(event.target).length === 0 &&
          !button.is(event.target)) {
        openTooltips.removeClass('on');
      }
    });
});

// 카테고리
$(document).ready(function () {
  var $overlay = $(".overlay");
  var $menuContainer = $(".menu-container");
  var $btnCategory = $(".btn_category");

  $btnCategory.click(function () {
    // Toggle the overlay and menu container
    $overlay.toggle();
    $menuContainer.toggleClass("active");

    // Prevent body scrolling when the menu is open
    $("body").toggleClass("no-scroll");
  });

  $overlay.click(function () {
    // Close the menu when clicking on the overlay
    $overlay.hide();
    $menuContainer.removeClass("active");
    $("body").removeClass("no-scroll");
  });
});

// 즐겨찾기
$(document).ready(function() {
  // link_wish 클래스가 있는 a 태그를 클릭했을 때
  $("a.link_wish").click(function(e) {
    e.preventDefault(); // 기본 클릭 이벤트 방지

    // 클릭된 요소에 active 클래스 추가 및 제거
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
    } else {
      $(this).addClass("active"); // 클릭된 요소에 active 클래스 추가
    }
  });
});
// 추천상품 더보기
$(document).ready(function() {
  $('.more_btn').click(function() {
      var $recomendList = $('.recomend_list');

      if ($(this).hasClass('show')) {
          $(this).removeClass('show');
          $recomendList.removeClass('show');
      } else {
          $(this).addClass('show');
          $recomendList.addClass('show');
      }
  });
});
// 이 상품을 찾으셨나요?
$(document).ready(function() {
  // btn arrow를 클릭하면 find_box에 on 클래스 추가
  $('.find_product_cont .btn.arrow').click(function() {
      $('.find_product_cont .find_box').addClass('on');
  });

  // btn_close를 클릭하면 find_box의 on 클래스 제거
  $('.find_product_cont .btn_close').click(function() {
      $('.find_product_cont .find_box').removeClass('on');
  });
});

// GNB 메뉴 스크립트
$(document).ready(function() {
  // Add mouseenter event handler to .menu-item .more within .menu-container
  $('.menu-container .menu-item > .more').mouseenter(function() {
    // Add class 'on' to the corresponding sub_menu
    $(this).closest('.menu-item').find('.sub_menu').addClass('on');
  });

  // Add mouseleave event handler to .menu-item .more within .menu-container
  $('.menu-container .menu-item > .more').mouseleave(function() {
    // Remove class 'on' from the corresponding sub_menu
    $(this).closest('.menu-item').find('.sub_menu').removeClass('on');
  });

  // Add mouseenter event handler to .sub_menu
  $('.menu-container .sub_menu').mouseenter(function() {
    // Add class 'on' to the corresponding sub_menu
    $(this).addClass('on');
  });

  // Add mouseleave event handler to .sub_menu
  $('.menu-container .sub_menu').mouseleave(function() {
    // Remove class 'on' from the corresponding sub_menu
    $(this).removeClass('on');
  });

  // Add mouseenter event handler to .menu-container
  $('.menu-container').mouseenter(function() {
    // Remove class 'on' from all sub_menu elements
    $('.menu-container .sub_menu').removeClass('on');
  });
});

// 퀵메뉴
$(document).ready(function() {
  // 버튼 클릭 이벤트 핸들러
  $(document).on("click", ".btn_group, .btn_quick_open, .btn_quick_close", function() {
    var i = $(this).attr("data-target");
    var g = $(i).attr("data-group");

    $("[data-group='" + g + "']").not(i).removeClass("on");
    $(i).toggleClass("on");

    // 퀵메뉴 클릭 시 컨텐츠 왼쪽으로 밀림
    if ($(i).hasClass("on")) {
      $(".move").addClass("on");
      $(".left_cont_area").addClass("on");
      adjustMarginRight();
    } else {
      $(".move").removeClass("on");
      $(".left_cont_area").removeClass("on");
      adjustMarginRight();
    }
  });

  // 퀵메뉴 닫기 버튼 클릭 이벤트
  $('.btn_quick_close').click(function() {
    $('.btn_quick_open').removeClass('on');
    $('.quick_menu_area').removeClass('on');
  });

  // 퀵메뉴 열기 버튼 클릭 이벤트
  $(document).ready(function() {
    // btn_quick_open 버튼 클릭 이벤트
    $('.btn_quick_open').click(function() {
      $(this).toggleClass('on'); // btn_quick_open에 on 클래스 토글
      if ($(this).hasClass('on')) {
        // on 클래스가 추가될 때 rnb_list에도 on 클래스 추가
        $('.rnb_list').addClass('on');
        $('.quick_menu_area').removeClass('on');
      } else {
        // on 클래스가 제거될 때 rnb_list에서도 on 클래스 제거
        $('.rnb_list').removeClass('on');
        $('.move').removeClass('on');
        $('.left_cont_area').removeClass('on');
      }
    });

    // rnb_list에서 on 클래스가 제거될 때, 관련 클래스에서도 on 클래스 제거
    $('.rnb_list').on('classChange', function() {
      if (!$(this).hasClass('on')) {
        $('.move').removeClass('on');
        $('.left_cont_area').removeClass('on');
      }
    });

    // rnb_list 클래스 변경 감지
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
          $(mutation.target).trigger('classChange');
        }
      });
    });

    $('.rnb_list').each(function() {
      observer.observe(this, {
        attributes: true
      });
    });
  });

// 퀵 메뉴 열렸을때 content_wrap 이 좌측으로 밀리는 코드
  function adjustMarginRight() {
    var windowWidth = $(window).width();
    var newMarginRight = -(windowWidth - 2550); // 음수 값으로 설정

    $('.content_wrap').each(function() {
      if ($(this).hasClass('on')) {
        $(this).css('margin-right', newMarginRight + 'px');
      } else {
        $(this).css('margin-right', '0'); // on 클래스가 없을 때 0으로 설정
      }
    });
  }

  // 페이지 로드 시 초기 설정
  adjustMarginRight();

  // on 클래스가 추가될 때 마진을 조정
  $('.content_wrap').on('classChange', function() {
    adjustMarginRight();
  });

  // 창 크기 변경 시 마진을 재조정
  $(window).resize(function() {
    adjustMarginRight();
  });

  // left_cont_area 클릭 시 처리
  /*$('.left_cont_area').click(function() {
    var contentWrap = $('.content_wrap');

    // toggle the class on content_wrap
    contentWrap.toggleClass('on');

    // trigger the custom classChange event
    contentWrap.trigger('classChange');
  });*/
});

// 탭 hover 이벤트
$(document).ready(function() {
  // Function to handle tab item hover
  $('.tab_list .tab-menu .tab-item').mouseenter(function() {
    var $tabMenu = $(this).closest('.tab-menu');
    var index = $(this).index();

    // Add active class to hovered tab item and corresponding tab pane
    $tabMenu.find('.tab-item').removeClass('active');
    $(this).addClass('active');
    $tabMenu.siblings('.tab-content').children('.tab-pane').removeClass('active');
    $tabMenu.siblings('.tab-content').children('.tab-pane').eq(index).addClass('active');
  });
});

$(document).ready(function() {
  // 탭 항목 클릭 이벤트 처리
  $('.tab_list_click .tab-menu .tab-item').click(function() {
    var $tabMenu = $(this).closest('.tab-menu'); // 현재 탭 메뉴 찾기
    var index = $(this).index(); // 현재 탭 항목의 인덱스 찾기

    // 모든 탭 항목에서 active 클래스 제거
    $tabMenu.find('.tab-item').removeClass('active');
    // 현재 탭 항목에 active 클래스 추가
    $(this).addClass('active');

    // 모든 탭 내용에서 active 클래스 제거
    $tabMenu.siblings('.tab-content').children('.tab-pane').removeClass('active');
    // 현재 탭 항목에 대응하는 탭 내용에 active 클래스 추가
    $tabMenu.siblings('.tab-content').children('.tab-pane').eq(index).addClass('active');
  });
});

// 카테고리 펼침, 닫힘
$(document).ready(function() {
  $('.ico_category').click(function() {
    // Toggle the 'on' class for ico_category
    $(this).toggleClass('on');

    // Find the target element with data-target="tab-category"
    var target = $('[data-target="tab-category"]');

    // Check if the 'on' class is added or removed
    if ($(this).hasClass('on')) {
      // If 'on' class is added, change the text to "카테고리 닫힘"
      $(this).text("카테고리 닫힘");
      // Add 'on' class to the target element
      target.addClass('on');
    } else {
      // If 'on' class is removed, change the text to "카테고리 펼침"
      $(this).text("카테고리 펼침");
      // Remove 'on' class from the target element
      target.removeClass('on');
    }
  });
});

$(document).ready(function (){
  // Entire menu (over)
  function navOn(){
    $(this).siblings(".nav").find("[data-depth='1']").addClass("on");
  };
  $(document).on("mouseenter", ".nav_wrap > a", navOn);

  // Entire menu (leave)
  function navOff(){
    $(this).find(".on").removeClass("on");
  };
  $(document).on("mouseleave", ".nav_wrap", navOff);

  // menu depth (over)
  function depthOn(){
    var n = 1;
    var depth = $(this).parents("[data-depth]"); //Current selection - depth 'selection'
    var depthNumber = parseInt(depth.attr("data-depth")); //Current selection - depth 'value'
    var depthLength = $(this).closest(".nav_wrap").find("[data-depth]").length; //Total depth 'number'
    var group = $(this).parent().attr("data-group"); //Current selection - data-group 'value'
    var childGroup = $(this).closest(".nav_wrap").find("ul[data-group='" + group + "']"); // Current selection - connected child ul 'selection'

    // current selection li
    $(this).parent().addClass("on").siblings().removeClass("on");

    // Current selection - connected child ul
    childGroup.addClass("on").siblings().removeClass("on").parent().addClass("on");
    childGroup.parents("[data-depth]").addClass("on");

    // Current selection - child children (condition)
    for( i=n; i<=depthLength; i++ ){
      //Current selection - If there are no children (all lower children are turned off)
      if(childGroup.length == 0){
        n = 0;
      }

      var closeDepth = $(this).closest(".nav_wrap").find("[data-depth='" + (depthNumber + i + n) + "']"); //Current selection - connected child depth 'selection'

      closeDepth.removeClass("on").find(".on").removeClass("on");
    };
  };
  $(document).on("mouseenter", ".nav_wrap .nav li > a", depthOn);
});

// 퀵메뉴 장바구니 미리보기 (중복되는 경우)
// $(document).ready(function(){
//   $(".btn_sub_cont").click(function(){
//       // 클릭된 버튼의 부모 요소 중에서 st_body_cont 클래스를 찾아서 on 클래스를 추가하거나 제거함
//       $(this).closest(".st_body_cont").toggleClass("on");
//       // 클릭된 버튼의 클래스 on을 추가하거나 제거함
//       $(this).toggleClass("on");
//   });
// });

// 퀵메뉴 장바구니 미리보기 (중복되지 않는 경우)
// $(document).ready(function(){
//   $(".btn_sub_cont").click(function(){
//       var stBodyCont = $(this).closest(".st_body_cont");
//       var btnSubCont = $(this);

//       if (!btnSubCont.hasClass("on")) {
//           // 다른 .st_body_cont 요소에서 on 클래스 제거
//           $(".st_body_cont").removeClass("on");
//           // 현재 클릭된 버튼의 부모 요소에만 on 클래스 추가
//           stBodyCont.addClass("on");
//           // 모든 btn_sub_cont 요소에서 on 클래스 제거
//           $(".btn_sub_cont").removeClass("on");
//           // 현재 클릭된 버튼에만 on 클래스 추가
//           btnSubCont.addClass("on");
//       } else {
//           // 현재 클릭된 버튼의 부모 요소에만 on 클래스 제거
//           stBodyCont.removeClass("on");
//           // 현재 클릭된 버튼에만 on 클래스 제거
//           btnSubCont.removeClass("on");
//       }
//   });
// });


// 레이어팝업
$(document).ready(function(){
  // data-target="btn_close" 속성을 가진 요소 클릭 시 foot_banner_cont 클래스에서 on 클래스 제거
  $(document).on("click", "[data-target='btn_close']", function(){
      $(".foot_banner_cont").removeClass("on");
  });

  // btn_fixed_up 버튼 클릭 시 foot_banner_cont 클래스에 on 클래스 추가
  $(".btn_fixed_up").click(function(){
      $(".foot_banner_cont").addClass("on");
  });
  
  // 하단 팝업(foot_banner_cont)의 외부영역 클릭시 팝업 닫기
  $("#main_new").on("mouseup", function(e) {
      var footBannerSwiper = $('.foot_banner_cont');
      if (!$("#main_layer_pop").hasClass("modal_on") && $(".foot_banner_cont").hasClass("on") && footBannerSwiper.has(e.target).length === 0) {
        $(".foot_banner_cont").removeClass("on");
      }
  });
});

// 탑버튼
$(document).ready(function() {
  // 'top' 버튼 클릭 시 화면 최상단으로 스크롤
  $('#top').click(function() {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  });
});

// 슬라이드 1장일때 버튼 숨김
// $(document).ready(function() {
//   // swiper_wrap 중에 swiper-button-lock 클래스를 포함하는 요소 찾기
//   $('.swiper_wrap').each(function() {
//     if ($(this).find('.swiper-button-lock').length > 0) {
//       // swiper-button-lock 클래스가 있으면 해당 swiper_wrap에 no_btn 클래스 추가
//       $(this).addClass('no_btn');
//     }
//   });
// });

// 슬라이드 위에  슬라이드
$(document).ready(function() {
  // sw 클래스 요소에 hover 이벤트 추가
  $('.brand_content .sw').hover(
    function() {
      // 마우스가 올라갔을 때
      $(this).addClass('hover');
      $(this).siblings('.banner_cont').addClass('none');
    },
    function() {
      // 마우스가 빠졌을 때
      $(this).removeClass('hover');
      $(this).siblings('.banner_cont').removeClass('none');
    }
  );
});

// gnb 메뉴 스크롤 동작시 클래스 hover 가 되는 쿼리
$(document).ready(function() {
  // header 또는 fixed_box에 마우스가 올라갈 때
  $('.header, .fixed_box').mouseenter(function() {
    $('.fixed_box').addClass('hover');
  });

  // header 또는 fixed_box에서 마우스가 벗어날 때
  $('.header, .fixed_box').mouseleave(function() {
    if ($(window).scrollTop() !== 0 && !$('.header:hover').length && !$('.fixed_box:hover').length) {
      $('.fixed_box').removeClass('hover');
    }
  });

  // 스크롤할 때 상태 체크
  $(window).scroll(function() {
    if ($(window).scrollTop() === 0) {
      $('.fixed_box').addClass('hover');
    } else {
      if (!$('.header:hover').length && !$('.fixed_box:hover').length) {
        $('.fixed_box').removeClass('hover');
      }
    }
  });

  // 페이지 로드 시 상태 체크
  if ($(window).scrollTop() === 0) {
    $('.fixed_box').addClass('hover');
  } else {
    $('.fixed_box').removeClass('hover');
  }
});

// 장바구니 담기 영역 footer 위로 올리기
$(document).ready(function() {
  $(window).scroll(function() {
    var footerOffset = $('#footer').offset().top;
    var windowHeight = $(window).height();
    var scrollPos = $(window).scrollTop() + windowHeight;
    var orderFloatingBottom = $('.order_floating_bottom');

    // 조건을 만족하면 스타일 추가
    if (scrollPos >= footerOffset) {
      orderFloatingBottom.css({
        'position': 'absolute',
        'bottom': '-80px'
      });
    } else {
      // 조건을 만족하지 않으면 원래 스타일로 복원
      orderFloatingBottom.css({
        'position': '',
        'bottom': ''
      });
    }
  });
});

// floating_cont 영역 footer 위로 올리기
$(document).ready(function() {
  $(window).scroll(function() {
    var footerOffset = $('#footer').offset().top;
    var windowHeight = $(window).height();
    var scrollPos = $(window).scrollTop() + windowHeight;
    var orderFloatingBottom = $('.floating_wrap');

    // 조건을 만족하면 스타일 추가
    if (scrollPos >= footerOffset) {
      orderFloatingBottom.css({
        'position': 'absolute',
        'bottom': '-80px'
      });
    } else {
      // 조건을 만족하지 않으면 원래 스타일로 복원
      orderFloatingBottom.css({
        'position': '',
        'bottom': ''
      });
    }
  });
});

// floating_wrap 동작
$(document).ready(function() {
  $('.floating_wrap .floating_btn').click(function() {
    $(this).closest('.floating_wrap').toggleClass('close');
  });
});

// 퀵메뉴 열림시 컨텐츠 밀리는 move가 있을 시 동작하는 코드
$(document).ready(function() {
  if ($('.content_wrap').hasClass('move')) {
      $('.side_menu_cont').addClass('move');
  }
});

// 커스텀 스크롤 속도
$(document).ready(function(){
  $(".mCustomScrollbar").mCustomScrollbar({
      theme: "dark",
      scrollInertia: 100, // Adjust the scroll speed (lower values mean faster scroll)
      mouseWheel: {
          scrollAmount: 80 // Adjust this value to control scroll speed (higher values for faster scroll)
      }
  });
});

// 퀵메뉴 열릴때 백그라운드 스크롤 제어
var scroll = {
  disable: function() {
      var scrollTop = $(window).scrollTop();
      $('html').css('overflow-y', 'scroll');
      $('html').css({
          'position': 'fixed',
          'top': -scrollTop,
          'left': 0,
          'width': '100%'
      });
  },
  enable: function() {
      var scrollPosition = Math.abs($('html').css('top').split('px')[0]);
      $('html').removeAttr('style');
      $(window).scrollTop(scrollPosition);
      $('html').removeAttr('style');
  }
};

$(document).ready(function() {
  $('.quick_menu_area').hover(
      function() {
          scroll.disable();
      },
      function() {
          scroll.enable();
      }
  );
});

// 이미지 추출 top_banner 코드
/*
$(document).ready(function() {
  function updateBackgroundColor() {
      var activeSlideImg = $('.swiper-slide-active img')[0];
      if (activeSlideImg) {
          var img = new Image();
          img.crossOrigin = "Anonymous"; // CORS 설정
          img.src = activeSlideImg.src;
          img.onload = function() {
              var canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              var context = canvas.getContext('2d');
              context.drawImage(img, 0, 0);

              // Get the color data of the first pixel
              var imageData = context.getImageData(0, 0, 1, 1).data;
              var rgb = 'rgb(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ')';

              // Set the background color
              $('.top_banner_cont').css('background-color', rgb);
          };
          img.onerror = function() {
              console.error("Failed to load image:", img.src);
          };
      }
  }

  // Initialize Swiper
  var swiper = new Swiper('.swiper-container', {
      autoplay: {
          delay: 1000, // 슬라이드 자동 전환 시간 설정
          disableOnInteraction: false, // 사용자 상호작용 후에도 autoplay 계속
      },
      on: {
          slideChange: function () {
              updateBackgroundColor();
          }
      }
  });

  // Initial background color update
  updateBackgroundColor();

  // Set interval to update background color every 3 seconds
  setInterval(updateBackgroundColor, 0);
});*/

// 슬라이드 input 드래그 막음, 드래그 되면 간헐적으로 슬라이드 오휴생김
$(document).ready(function() {
  $('.over input').on('focus', function() {
      $(this).blur();
  });
});

// 검색영역 search_input 에 on 이 있으면 search_txt_banner 안보여지게 하는 코드
$(document).ready(function() {
  $('.txt_list').hover(
      function() {
          // 마우스가 올라갔을 때
          if ($('.search_input').hasClass('on')) {
              $('.txt_list .search_txt_banner').css('display', 'none');
          } else {
              $('.txt_list .search_txt_banner').css('display', '');
          }
      }
  );
});