// 모바일때 클래스 추가하기
$(document).ready(function() {
  function checkWindowSize() {
    if ($(window).width() <= 480) {
      $('body').addClass('mo_mode');
      $('body').removeClass('pc_mode');
    } else {
      $('body').removeClass('mo_mode');
      $('body').addClass('pc_mode');
    }
  }
  // 페이지 로드 시 및 창 크기 변경 시 실행
  checkWindowSize();
  $(window).resize(function() {
    checkWindowSize();
  });
});

// 탑버튼
$(document).ready(function() {
  var lastScrollTop = 0; // 마지막 스크롤 위치를 저장할 변수

  // 'top' 버튼 클릭 시 화면 최상단으로 스크롤
  $('#top').click(function() {
    window.scroll({
       top: 0,
       left: 0,
       behavior: "smooth"
     });
  });

  // 스크롤 위치에 따라 'top' 버튼 표시/숨김
  $(window).scroll(function() {
    var currentScrollTop = $(this).scrollTop();

    // 스크롤 위치가 상위 100 이하인 경우 버튼 숨김
    if (currentScrollTop <= 100) {
      $('#top').fadeOut();
    } else {
      // 스크롤 내리기: 버튼 숨김
      if (currentScrollTop > lastScrollTop) {
        $('#top').fadeOut();
      } else { // 스크롤 올리기: 버튼 보임
        $('#top').fadeIn();
      }
    }

    // 현재 스크롤 위치를 마지막 스크롤 위치로 업데이트
    lastScrollTop = currentScrollTop;
  });
});

// 모달 레이어
function modalControl(type, id, size) { // type: 열기(o), 닫기(c) / id: 열 모달의 id / size: 모달 가로 사이즈
  var $html = $("html");

  if (type == "o") { // 모달 열기
      $html.addClass("modal-open"); // 모달 열리면 스크롤 방지

      // keep 클래스가 없는 모달들만 닫음
      $(".modal_new").not(".keep").not(id).removeClass("modal_on");

      var $modalOn = $(id).addClass("modal_on");

      // 모달에 modal_overlay 클래스가 있을 때만 오버레이 클릭 시 닫기
      if ($modalOn.hasClass("modal_overlay")) {
          $modalOn.off("click").on("click", function(e) {
              var $target = $(e.target);
              
              // 클릭한 부분이 .modal_n_wrap 내부가 아니고, .delete-btn이 아닌 경우 모달 닫기
              if (!$target.closest('.modal_n_wrap').length && !$target.hasClass("delete-btn")) {
                  modalControl("c"); // 모달 닫기 실행
              }
          });
      }
  } else if (type == "c") { // 모달 닫기
      // 모든 모달을 닫음 (keep 클래스가 있어도 닫음)
      $(".modal_new.modal_on").removeClass("modal_on");

      if ($(".modal_new.modal_on").length === 0) {
          $html.removeClass("modal-open"); // 모든 모달이 닫히면 스크롤 해제
      }
  }
}

// function modalControl(type, id) { 
//   // type: 열기(o), 닫기(c)
//   // id: 열 모달의 id

//   var $html = $("html");
//   var $modal = $(id);

//   if (type == "o") { // 모달 열기
//       // type02 클래스가 없는 경우만 html에 클래스 추가
//       if (!$modal.hasClass("type02")) {
//           $html.addClass("modal-open");
//       }

//       // keep 클래스가 없는 다른 모달들 닫기
//       $(".modal_new").not(".keep").not(id).removeClass("modal_on");

//       // 현재 모달 열기
//       $modal.addClass("modal_on");

//       // modal_overlay 기능 처리
//       if ($modal.hasClass("modal_overlay")) {
//           $modal.on("click", function(e) {
//               // 클릭한 부분이 .modal_n_wrap 내부가 아니라면 (즉, 오버레이 클릭 시)
//               if (!$(e.target).closest('.modal_n_wrap').length) {
//                   $modal.removeClass("modal_on");

//                   // 모든 모달이 닫힌 경우에만 html 클래스 제거
//                   if ($(".modal_new.modal_on").length === 0 && !$modal.hasClass("type02")) {
//                       $html.removeClass("modal-open");
//                   }
//               }
//           });
//       }
//   } else if (type == "c") { // 모달 닫기
//       // type02 클래스가 없는 경우만 html에서 클래스 제거
//       if (!$modal.hasClass("type02")) {
//           $html.removeClass("modal-open");
//       }

//       // 모든 모달 닫기
//       $(".modal_new.modal_on").removeClass("modal_on");
//   }
// }



// 상세검색 열기
$(document).ready(function(){
  // search_cont_detail 안의 btn_search 버튼 클릭 시 on 클래스 추가
  $('.btn_search_detail').on('click', function() {
    $('.search_cont_detail').addClass('on');
  });

  // search_cont_detail 안의 btn_close 버튼 클릭 시 on 클래스 제거
  $('.search_cont_detail .btn_close').on('click', function() {
    $(this).closest('.search_cont_detail').removeClass('on');
  });
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

// 셀렉트 박스
$(document).ready(function() {
  $('.select_box .select').on('click', function() {
    var $currentSelectBox = $(this).closest('.select_box');
    var $currentOption = $currentSelectBox.find('.option');

    // 모든 select_box의 옵션 목록을 숨기고, on 클래스를 제거
    $('.select_box').not($currentSelectBox).each(function() {
      var $otherOption = $(this).find('.option');
      $otherOption.hide();
      $(this).removeClass('on');
    });

    // 현재 클릭된 select_box의 옵션 목록을 토글
    if ($currentOption.is(':visible')) {
      $currentOption.hide();
      $currentSelectBox.removeClass('on');
    } else {
      $currentOption.show();
      $currentSelectBox.addClass('on');
    }
  });

  $('.select_box .option ul li').on('click', function() {
    var $selectBox = $(this).closest('.select_box');
    var selectedText = $(this).text();
    
    // 선택된 항목 텍스트 업데이트
    $selectBox.find('.select').text(selectedText);
    $selectBox.find('.option').hide();
    $selectBox.removeClass('on');
  });

  $(document).on('click', function(e) {
    if (!$(e.target).closest('.select_box').length) {
      $('.select_box .option').hide();
      $('.select_box').removeClass('on');
    }
  });
});

// 셀렉트 박스 select_box option 에 마우스가 올라가면 페이지 scroll 생기지 않게 막기
// $(document).ready(function() {
//   var scrollTop = 0; // 현재 스크롤 위치를 저장할 변수

//   $('.pc_mode .select_box .option').hover(
//     function() {
//       // 마우스가 .select_box 위에 있을 때
//       scrollTop = $(window).scrollTop(); // 현재 스크롤 위치 저장
//       $('html').css({
//         'overflow-y': 'scroll',
//         'position': 'fixed',
//         'top': -scrollTop + 'px', // 현재 스크롤 위치 유지
//         'left': '0px',
//         'width': '100%'
//       });
//     },
//     function() {
//       // 마우스가 .select_box 밖으로 나갔을 때
//       $('html').css({
//         'overflow-y': '',
//         'position': '',
//         'top': '',
//         'left': '',
//         'width': ''
//       });
//       $(window).scrollTop(scrollTop); // 원래 위치로 스크롤 복원
//     }
//   );

//   // .option 영역 내에서 클릭했을 때도 CSS 초기화
//   $('.pc_mode .select_box .option').on('click', function() {
//     $('html').css({
//       'overflow-y': '',
//       'position': '',
//       'top': '',
//       'left': '',
//       'width': ''
//     });
//     $(window).scrollTop(scrollTop); // 원래 위치로 스크롤 복원
//   });
// });

// 모바일에서 select_box 눌렀을때
// $(document).ready(function() {
//   var scrollTop = 0; // 현재 스크롤 위치를 저장할 변수

//   // .select_box에 on 클래스가 추가될 때 처리
//   $('.select_box').on('classChange', function() {
//     if ($('body').hasClass('mo_mode') && $(this).hasClass('on')) {
//       // 현재 스크롤 위치 저장
//       scrollTop = $(window).scrollTop();
//       // 스크롤 및 위치 고정
//       $('html').css({
//         'overflow-y': 'scroll',
//         'position': 'fixed',
//         'top': -scrollTop + 'px', // 현재 스크롤 위치 유지
//         'left': '0px',
//         'width': '100%'
//       });
//     } else {
//       // .select_box에서 on 클래스가 제거될 때 스크롤 및 위치 초기화
//       $('html').css({
//         'overflow-y': '',
//         'position': '',
//         'top': '',
//         'left': '',
//         'width': ''
//       });
//     }
//   });

//   // MutationObserver를 사용하여 .select_box의 클래스 변화를 감지
//   var observer = new MutationObserver(function(mutations) {
//     mutations.forEach(function(mutation) {
//       if (mutation.attributeName === 'class') {
//         $(mutation.target).trigger('classChange');
//       }
//     });
//   });

//   // .select_box 요소들에 대해 MutationObserver를 적용
//   $('.select_box').each(function() {
//     observer.observe(this, { attributes: true });
//   });
// });

// 모바일 상세검색 레이어 searchlayer
function searchLayer() {
  // .searchlayer 요소에 left: 0; 스타일 적용
  $('.searchlayer').css('left', '0');
  // body에 leftmode 클래스 추가
  $('body').addClass('leftmode');
}
function searchClose() {
  // .searchlayer 요소의 left 값을 -100%로 초기화하여 숨기기
  $('.searchlayer').css('left', '-100%');
  // body에서 leftmode 클래스 제거
  $('body').removeClass('leftmode');
}

// 모바일 마이페이지 레이어 mypagelayer
function mypagelayer() {
  // .mypagelayer 요소에 left: 0; 스타일 적용
  $('.mypagelayer').css('left', '0');
  // body에 leftmode 클래스 추가
  $('body').addClass('leftmode');
}
function mypageClose() {
  // .mypagelayer 요소의 left 값을 -100%로 초기화하여 숨기기
  $('.mypagelayer').css('left', '-100%');
  // body에서 leftmode 클래스 제거
  $('body').removeClass('leftmode');
}

// 모바일 상세검색 레이어 gnbLayer01
function gnbLayer01() {
  // .gnbLayer01 요소에 left: 0; 스타일 적용
  $('.gnbLayer01').css('left', '0');
  // body에 leftmode 클래스 추가
  $('body').addClass('leftmode');
}
function gnbLayer01Close() {
  // .gnbLayer01 요소의 left 값을 -100%로 초기화하여 숨기기
  $('.gnbLayer01').css('left', '-100%');
  // body에서 leftmode 클래스 제거
  $('body').removeClass('leftmode');
}
// 모바일 상세검색 레이어 gnbLayer02
function gnbLayer02() {
  // .gnbLayer02 요소에 left: 0; 스타일 적용
  $('.gnbLayer02').css('left', '0');
  // body에 leftmode 클래스 추가
  $('body').addClass('leftmode');
}
function gnbLayer02Close() {
  // .gnbLayer02 요소의 left 값을 -100%로 초기화하여 숨기기
  $('.gnbLayer02').css('left', '-100%');
  // body에서 leftmode 클래스 제거
  $('body').removeClass('leftmode');
}

// 검색결과 x 버튼 누를때
$(document).ready(function() {
  // .btn_del 버튼 클릭 시 해당 li 삭제
  $('.search_total').on('click', '.btn_del', function() {
    $(this).closest('li').remove();
  });
});

// pc 검색영역 마우스 포커스 일때
$(document).ready(function() {
  let isMouseInSearchTotal = false;

  // input 요소에 포커스가 가면 active 클래스 추가
  $('.search_box .ico_search').on('focus', function() {
    $('.search_total').addClass('active');
  });

  // input 요소에서 포커스가 빠지면 active 클래스 제거 (단, 마우스가 search_total에 없을 때만)
  $('.search_box .ico_search').on('blur', function() {
    if (!isMouseInSearchTotal) {
      $('.search_total').removeClass('active');
    }
  });

  // search_total에 마우스가 들어오면 active 클래스 유지
  $('.search_total').on('mouseenter', function() {
    isMouseInSearchTotal = true;
    $(this).addClass('active');
  });

  // search_total에서 마우스가 나가면 active 클래스 제거 (단, input이 포커스 상태가 아닐 때만)
  $('.search_total').on('mouseleave', function() {
    isMouseInSearchTotal = false;
    if (!$('.search_box .ico_search').is(':focus')) {
      $(this).removeClass('active');
    }
  });
});

// 탭
$(document).ready(function() {
  $('.tabs').each(function() {
    var $tabs = $(this); // 현재 탭 컨테이너 참조

    $tabs.find('.tab-menu li a').click(function(e) {
      e.preventDefault(); // 링크 기본 동작 방지

      var index = $(this).parent().index(); // 클릭한 탭의 인덱스 가져오기

      // 탭 메뉴 활성화 클래스 전환
      $tabs.find('.tab-menu li').removeClass('active');
      $(this).parent().addClass('active');

      // 탭 콘텐츠 활성화 클래스 전환
      $tabs.find('.tab').removeClass('active');
      $tabs.find('.tab').eq(index).addClass('active');
    });
  });
});


// 테이블에 체크박스 중복눌림 제어
$(document).ready(function() {
  // tr 클릭 시 data-href로 이동
  $('.clickable-row').on('click', function() {
    window.location.href = $(this).data('href');
  });

  // 체크박스 클릭 시 이벤트 전파를 막음
  $('.no-click').on('click', function(event) {
    event.stopPropagation();  // 부모 tr의 클릭 이벤트 전파를 막음
  });
});

// input del btn
$(document).ready(function() {
  // input에 내용이 있을 때 'on' 클래스 추가
  $('.input_del input').on('input', function() {
    if ($(this).val().length > 0) {
      $(this).closest('.input_del').addClass('on');
    } else {
      $(this).closest('.input_del').removeClass('on');
    }
  });

  // 삭제 버튼 클릭 시 input 내용 지우기
  $('.input_del .del').on('click', function() {
    $(this).siblings('input').val(''); // input 내용 지우기
    $(this).closest('.input_del').removeClass('on'); // 'on' 클래스 제거
  });
});

// input view
$(document).ready(function() {
  // input에 내용이 있을 때 'on' 클래스 추가, 없으면 제거
  $('.input_view input').on('input', function() {
    if ($(this).val().length > 0) {
      $(this).closest('.input_view').addClass('on');
    } else {
      $(this).closest('.input_view').removeClass('on');
    }
  });
  // 비밀번호 보기/숨기기 버튼 클릭 시
  $('.input_view .view').on('click', function(e) {
    e.preventDefault(); // 버튼의 기본 동작 방지
    var $input = $(this).siblings('input'); // 형제 input 요소 선택

    // 비밀번호 필드 타입이 'password'이면 'text'로 바꿔서 보여주기, 아니면 다시 'password'로 바꿈
    if ($input.attr('type') === 'password') {
      $input.attr('type', 'text');
      $(this).addClass('active'); // 버튼에 active 클래스 추가 (눈 모양 바꾸기 등 시각 효과)
    } else {
      $input.attr('type', 'password');
      $(this).removeClass('active'); // active 클래스 제거
    }
  });
});

// 파일첨부
$(document).ready(function () {
  var $dropArea = $(".file-drop");
  var $fileInput = $(".file-input");

  // 파일 드래그 앤 드롭 이벤트 처리
  $dropArea.on("dragover", function (e) {
      e.preventDefault();
      $(this).addClass("drag-over");
  });

  $dropArea.on("dragleave", function () {
      $(this).removeClass("drag-over");
  });

  $dropArea.on("drop", function (e) {
      e.preventDefault();
      $(this).removeClass("drag-over");

      var files = e.originalEvent.dataTransfer.files;
      var $fileList = $(this).find(".file-list");
      handleFiles(files, $fileList);
  });

  // 파일 선택 시 처리
  $fileInput.on("change", function () {
      var files = this.files;
      var $fileList = $(this).closest(".file-drop").find(".file-list");
      handleFiles(files, $fileList);
  });

  // 파일 처리 함수
  function handleFiles(files, $fileList) {
      for (var i = 0; i < files.length; i++) {
          var file = files[i];
          var listItem = $("<li class='file-item'></li>");
          var fileNameSpan = $("<span class='file-info'>" + file.name + "</span>");
          var fileSizeSpan = $("<span class='file-info'> (" + formatBytes(file.size) + ")</span>");
          var deleteBtn = $("<span class='delete-btn'>X</span>");

          listItem.append(fileNameSpan);
          listItem.append(fileSizeSpan);
          listItem.append(deleteBtn);

          deleteBtn.on("click", function () {
              $(this).parent().remove();
          });

          $fileList.append(listItem);
      }
  }

  // 파일 크기 포맷팅 함수
  function formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
});


// 설문조사 상세 아코디언
$(document).ready(function () {
  $(".accordion button").click(function () {

    // 클릭한 버튼의 부모인 li에서만 다음 sibling인 depth2를 빠르게 보이거나 감춤
    $(this).parent().find(".accordion-detail").slideToggle(150);
    // 클릭한 버튼의 부모인 li에 on 클래스를 토글
    $(this).parent().toggleClass("on");

    // 다른 depth1 항목들의 on 클래스 제거 및 각 항목의 depth2 감추기
    // $(".accordion .on").not($(this).parent()).removeClass("on");
    // $(".accordion .accordion-detail").not($(this).parent().find(".accordion-detail")).slideUp(300);
  });
});

// view_check 안에 input check 에 check 가 되면 view 를 보여주는 제이쿼리
$(document).ready(function () {
  $('.view_check input[type="checkbox"]').on('change', function () {
    if ($(this).is(':checked')) {
      $('.view').addClass('on'); // 체크되면 'on' 클래스 추가
    } else {
      $('.view').removeClass('on'); // 체크 해제되면 'on' 클래스 제거
    }
  });
});

// 피씨 GNB 메뉴
$(document).ready(function() {
  // .menu_layer 클릭 시
  $('.menu_layer').on('click', function() {
    // 모든 .menu_layer에서 'on' 클래스 제거
    $('.menu_layer').removeClass('on');
    // 클릭한 항목에 'on' 클래스 추가
    $(this).addClass('on');
  });

  // .btn_layer_close 클릭 시 모든 .menu_layer에서 'on' 클래스 제거
  $('.btn_layer_close').on('click', function() {
    $('.menu_layer').removeClass('on');
  });
});

// 피씨 GNB 메뉴 메뉴 열렸을떄 동작
$(document).ready(function() {
  // 클릭 핸들러
  function handleClick(depthClass, nextClass) {
    $(depthClass + ' > a').click(function(e) {
      // 클릭한 항목 안에 ul이 있는지 확인
      if ($(this).siblings('ul').length > 0) {
        e.preventDefault(); // ul이 있을 때만 a 태그의 기본 동작을 막음
        // 모든 해당 depth에서 'on' 클래스 제거
        $(depthClass).removeClass('on');
        // 클릭한 항목에 'on' 클래스 추가
        $(this).parent().addClass('on');
        // list_box > ul의 클래스를 변경
        $('.list_box > ul').removeClass('on_depth01 on_depth02 on_depth03').addClass(nextClass);
      }
      // ul이 없으면 기본 동작이 가능하므로 e.preventDefault()를 호출하지 않음
    });
  }

  // depth 클릭 핸들러 설정
  // handleClick('.depth01', 'on_depth02');
  // handleClick('.depth02', 'on_depth03');

  // depth03 클릭 시
  $('.depth03 > a').click(function(e) {
    // 클릭한 항목 안에 ul이 있는지 확인
    if ($(this).siblings('ul').length > 0) {
      e.preventDefault(); // ul이 있을 때만 a 태그의 기본 동작을 막음
      // 모든 depth03에서 'on' 클래스 제거
      $('.depth03').removeClass('on');
      // 클릭한 depth03에 'on' 클래스 추가
      $(this).parent().addClass('on');
      // list_box > ul의 클래스를 on_depth03으로 변경
      $('menu_layer.on .list_box > ul').removeClass('on_depth01 on_depth02').addClass('on_depth03');
    }
    // ul이 없으면 기본 동작이 가능하므로 e.preventDefault()를 호출하지 않음
  });

  // btn_layer_close 버튼 클릭 시 초기화
  $('.btn_layer_close').click(function() {
    // 모든 depth 메뉴에서 'on' 클래스 제거
    $('.depth01, .depth02, .depth03').removeClass('on');
    // list_box > ul의 클래스를 on_depth01으로 초기화
    $('.list_box > ul').removeClass('on_depth02 on_depth03').addClass('on_depth01');
  });
});

// 메인 상세검색 버튼
// $(document).ready(function() {
//   $('.btn_search_detail').click(function() {
//     $('.search_detail_area').addClass('active');
//   });
// });

$(document).ready(function () {
  // btn-detail 클릭 이벤트
  $(".searchlayer .btn-detail").on("click", function () {
      const $this = $(this); // 현재 클릭한 버튼
      const $detailContent = $(".searchlayer .search_cont_detail.type02");

      // 클래스 on 토글
      $this.toggleClass("on");
      $detailContent.toggleClass("on");
  });
});

$(document).ready(function () {
  $(document).on('click', function (e) {
      // 클릭된 요소가 .btn.ico_file_download 내부가 아니라면 모든 on 제거
      if (!$(e.target).closest('.area_file_download').length) {
          $('.area_file_download.on').removeClass('on');
      }
  });

  $('.btn.ico_file_download').on('click', function (e) {
      e.stopPropagation(); // 클릭 이벤트가 상위 요소로 전파되지 않도록 방지
      const $parent = $(this).closest('.area_file_download');

      // 클릭한 부모 요소에 on 클래스가 있으면 제거, 없으면 추가
      if ($parent.hasClass('on')) {
          $parent.removeClass('on');
      } else {
          $('.area_file_download.on').removeClass('on'); // 기존의 on 제거
          $parent.addClass('on'); // 현재 요소에 on 추가
      }
  });
});
