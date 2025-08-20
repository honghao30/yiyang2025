// 모바일때 클래스 추가하기
// 파일첨부
 var sizeadd = 0;
 var fcntadd=0;//241210 이진하 파일갯수 추가
$(document).ready(function () {
	
	$(".ico_print").click(function(){//241213 이진하 공통영역 프린트 추가
		window.print();
	});
	$(".file_add").click(function(){//파일업로드 버튼 클릭 시 input 클릭 작동
		$(this).parent().find("input").trigger("click");
	});
	
	//250119 이진하 pdf다운로드 기능 추가
	
	$('#transPdf').on("click", function () {
      	html2canvas($('body')[0]).then(function(canvas) {
        let imgData = canvas.toDataURL('image/png');

        let imgWidth = 210; // 이미지 가로 길이(mm) A4 기준
        let pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
        let imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        let doc = new jsPDF('p', 'mm');
        let position = 0;

        // 첫 페이지 출력
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // 한 페이지 이상일 경우 루프 돌면서 출력
        while (heightLeft >= 20) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        let today = new Date();
        let year = today.getFullYear();
        let month = ('0' + (today.getMonth() + 1)).slice(-2);
        let day = ('0' + today.getDate()).slice(-2);
        let hours = ('0' + today.getHours()).slice(-2);
        let minutes = ('0' + today.getMinutes()).slice(-2);

        let dateString = year + month + day + hours + minutes;

        // 파일 저장
        doc.save("Report_"+dateString+'.pdf');
      	 });

    });
  var textsize = document.getElementById("fileSize");
  var $dropArea = $(".file-drop-trans");
  var $fileInput = $(".file-input-trans");
  var inputFile = document.querySelector('input[type="file"]');
  var dataTransfer_list = new DataTransfer();	
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
      var $fileList = $(this).find(".add_file_list");
      handleFiles(files, $fileList);
  });

  // 파일 선택 시 처리
  $fileInput.on("change", function () {
      var files = this.files;
      var $fileList = $(this).closest(".file-drop-trans").find(".add_file_list");
      handleFiles(files, $fileList);
  });

  // 파일 처리 함수
  function handleFiles(files, $fileList) {
      for (var i = 0; i < files.length; i++) {
		  var ext = /(.*?)\.(xls|xlsx|hwp|hwpx|pdf|jpeg|jpg|png|pptx|ppt|JPG)$/g;	
          var file = files[i];
          var filename = file.name;
          var filesize = 300*1024*1024; //MB //제한용량
          var listItem = $("<ul id=_"+i+"></ul>");
          var fileNameSpan = $("<li>" + file.name + "</li>");
          var fileSizeSpan = $("<li><span>" + formatBytes(file.size) + "</span></li>");
          var deleteBtn = $("<li><button type='button' class='btn-remove-x' >X</button></li>");
          if(!ext.test(filename)){//각 파일 확장자 체크
		  	document.getElementsByName('uploadfile')[i].value='';
			alert(file.name+"불가능한 확장자 입니다.");
			return false;
		  }
		  sizeadd += file.size;
		  fcntadd++;
		  if(filesize < file.size){
			  document.getElementsByName('uploadfile')[i].value='';
			  alert("파일크기 300MB를 초과 하였습니다." +"\n"+ file.name +"("+formatBytes(file.size)+")");
			  return;
		  }
		  
		  if(sizeadd > filesize){
			  document.getElementsByName('uploadfile')[i].value='';
			  alert("파일 업로드 총 300MB를 초과 하였습니다." +"\n"+ file.name +"("+formatBytes(file.size)+")");
			  return;
		  }
		  
		  textsize.innerHTML = "총<span class='sz'>"+formatBytes(sizeadd)+"</span> (<span class='ea'>"+ fcntadd+"</span>개)";
		  
			listItem.append(fileNameSpan);
			listItem.append(fileSizeSpan);
			listItem.append(deleteBtn);
			deleteBtn.on("click", function (e) {
				let files = $('input[type="file"]')[0].files;
				var fid = $(this).parent().index();//부모의 index값을 가지고와서 수정해야 배열이 일치함
			  	sizeadd -= inputFile.files[fid].size;
			  	fcntadd--;
				if(sizeadd != 0){
					textsize.innerHTML = "총<span class='sz'>"+formatBytes(sizeadd)+"</span> (<span class='ea'>"+fcntadd+"</span>개)";
				}else{
					textsize.innerHTML = "";
				}

				//input에 들어간값  배열제처리
				const dataTransferDel = new DataTransfer();
				
				let fileArray = Array.from(files);
				fileArray.splice(fid, 1);
				fileArray.forEach(filearr => { 
					dataTransfer_list = new DataTransfer();	
					dataTransferDel.items.add(filearr); 
				});
				inputFile.files = dataTransferDel.files;	//제거 처리된 FileList를 돌려줌
				 //li삭제
				$(this).parent().remove();

          });
          $fileList.append(listItem);
          dataTransfer_list.items.add(file);
          inputFile.files = dataTransfer_list.files;
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

function copymodalControl(type, id, size) { // type: 열기(o), 닫기(c) / id: 열 모달의 id / size: 모달 가로 사이즈
    var $html = $("html");
    
    if (type == "A") { // 모달 열기
        $html.addClass("modal-open"); // 모달 열리면 스크롤 방지

        // keep 클래스가 없는 모달들만 닫음
        $(".modal_new").not(".keep").not(id).removeClass("modal_on");
        
        var $modalOn = $(id).addClass("modal_on");

        // 모달에 modal_overlay 클래스가 있을 때만 오버레이 클릭 시 닫기
        if ($modalOn.hasClass("modal_overlay")) {
            $modalOn.on("click", function(e) {
                // 클릭한 부분이 .modal_n_wrap 내부가 아니라면 (즉, 오버레이 클릭 시)
                if (!$(e.target).closest('.modal_n_wrap').length) {
                    $modalOn.removeClass("modal_on");
                    if ($(".modal_new.modal_on").length === 0) {
                        $html.removeClass("modal-open"); // 모든 모달이 닫히면 스크롤 해제
                    }
                }
            });
        }
    } else if (type == "D") { // 모달 닫기
        // 모든 모달을 닫음 (keep 클래스가 있어도 닫음)
        $(".modal_new.modal_on").removeClass("modal_on");
		$("#lawcount").text("");
        if ($(".modal_new.modal_on").length === 0) {
            $html.removeClass("modal-open"); // 모든 모달이 닫히면 스크롤 해제
        }
    }else if (type == "i"){ 	
		$html.addClass("modal-open"); // 모달 열리면 스크롤 방지

        // keep 클래스가 없는 모달들만 닫음
        $(".modal_new").not(".keep").not(id).removeClass("modal_on");
        
        var $modalOn = $(id).addClass("modal_on");

        // 모달에 modal_overlay 클래스가 있을 때만 오버레이 클릭 시 닫기
        if ($modalOn.hasClass("modal_overlay")) {
            $modalOn.on("click", function(e) {
                // 클릭한 부분이 .modal_n_wrap 내부가 아니라면 (즉, 오버레이 클릭 시)
                if (!$(e.target).closest('.modal_n_wrap').length) {
                    $modalOn.removeClass("modal_on");
                    if ($(".modal_new.modal_on").length === 0) {
                        $html.removeClass("modal-open"); // 모든 모달이 닫히면 스크롤 해제
                    }
                }
            });
        }
        
        $.ajax({
		    url : "/trans/popup.do",
		    type : "post",
		    async : false, 
		    data : {number : "1"},
		 	success:function(result){
				$("#list").html(result);
			},
			error:function(jqXHR, textStatus, errorThrown){
				console.log("error");
			}
		}); 
	}
}