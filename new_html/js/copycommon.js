document.addEventListener("DOMContentLoaded", () => {

	const dynamicAddList = (containerId, itemHTML) => {
        const listElement = document.querySelector(containerId);
    
        const handleAddClick = (itemHTML) => {
            const newListItem = document.createElement('li');
            const newItemadd = document.createElement('tr');
            newListItem.classList.add('input-wrap', 'flex-row');
            newItemadd.classList.add('Itm-add');
            newListItem.innerHTML = itemHTML;
            newItemadd.innerHTML = itemHTML;
            if(listElement.className == 'form-el-list-wrap dynamic_add-list_JM'){
				if(listElement.children.length == 5){
					alert("5개 이상은 추가 할 수 없습니다.");
					return;
				}
				
				for(var i = 0; i < listElement.children.length; i++){
					console.log("newListItem.children[0].name ",newListItem.children[0].name);
					if(newListItem.children[0].name == ""){
						newListItem.children[0].name = "jrsdMaoNm"+(listElement.children.length+1);
						newListItem.children[0].id = "jrsdMaoNm"+(listElement.children.length+1);
					}
				}
			}
			
			if(listElement.className == 'form-el-list-wrap dynamic_add-list2_TD'){
				if(listElement.children.length == 4){
					alert("4개 이상은 추가 할 수 없습니다.");
					return;
				}
				
				for(var i = 0; i < listElement.children.length; i++){
					console.log("newListItem.children[0].name ",newListItem.children[0].name);
					if(newListItem.children[0].name == ""){
						newListItem.children[0].name = "transfDptreCd"+(listElement.children.length+1);
						newListItem.children[0].id = "transfDptreCd"+(listElement.children.length+1);
						newListItem.children[1].name = "transfArvlCd"+(listElement.children.length+1);
						newListItem.children[1].id = "transfArvlCd"+(listElement.children.length+1);
						newListItem.children[2].children[0].name = "etc1";
						newListItem.children[2].children[0].id = "etcId"+(listElement.children.length+1);
						newListItem.children[3].name = "transfDrcEtc"+(listElement.children.length+1);
						newListItem.children[3].id = "transfDrcEtc"+(listElement.children.length+1);
						
					}
				}
			}
			
			//구분입력
			if(listElement.className == 'dynamic_add-list_Itm'){
				if(listElement.getElementsByClassName('Itm-add').length == 5){
					alert("5개 이상은 추가 할 수 없습니다.");
					return;
				}
				//for(var i = 0; i < listElement.getElementsByClassName('Itm-add').length; i++){
					if(newItemadd.children[0].children[0].children[1].children[0].name == ""){
						newItemadd.children[0].children[0].children[1].children[0].name = "addItmttl"+(listElement.getElementsByClassName('Itm-add').length+1);
						newItemadd.children[0].children[0].children[1].children[0].id = "addItmttl"+(listElement.getElementsByClassName('Itm-add').length+1);
					}
					if(newItemadd.children[1].children[0].children[0].children[0].name == ""){
						newItemadd.children[1].children[0].children[0].children[0].name = "addItmcn"+(listElement.getElementsByClassName('Itm-add').length+1);
						newItemadd.children[1].children[0].children[0].children[0].id = "addItmcn"+(listElement.getElementsByClassName('Itm-add').length+1);
					}
				//}
				//구분입력
				listElement.insertBefore(newItemadd,listElement.lastElementChild);
			}
			if(listElement.className != 'dynamic_add-list_Itm'){
            	listElement.insertBefore(newListItem, null);//241128 이진하 추가하면 추가영역이 아래쪽에 붙도록 수정
            }
            //추가한 select box 값을 동적으로 추가하기 위해 밑에 추가 소관부처
            if(listElement.className == 'form-el-list-wrap dynamic_add-list_JM'){
	            for(var i = 0; i <= sum_main_value.jrsdMaoNm1.options.length-1; i++){
					if(newListItem.children[0].options[i] == undefined){
						$("#"+newListItem.children[0].id).append('<option value="'+sum_main_value.jrsdMaoNm1.options[i].value+'">'+sum_main_value.jrsdMaoNm1.options[i].text+'</option>');
					}
				}
			}
			//추가한 select box 값을 동적으로 추가하기 위해 밑에 추가 이양방향
			if(listElement.className == 'form-el-list-wrap dynamic_add-list2_TD'){
	            for(var i = 0; i <= sum_main_value.transfDptreCd1.options.length-1; i++){
					if(newListItem.children[0].options[i] == undefined){
						$("#"+newListItem.children[0].id).append('<option value="'+sum_main_value.transfDptreCd1.options[i].value+'">'+sum_main_value.transfDptreCd1.options[i].text+'</option>');
					}
					
					if(newListItem.children[1].options[i] == undefined){
						$("#"+newListItem.children[1].id).append('<option value="'+sum_main_value.transfDptreCd1.options[i].value+'">'+sum_main_value.transfDptreCd1.options[i].text+'</option>');
					}
					
				}
			}
            
        };
    
        listElement && listElement.addEventListener('click', (e) => {
            if (e.target.closest('.btn-add')) {
                handleAddClick(itemHTML);
            }
            
            if (e.target.closest('.btn-delete')) {
                const listItem = e.target.closest('li');
                listItem.remove();
            }
    
            if (e.target.closest('.btn-delete_YI')) {
                const listItem = e.target.closest('li');
                listItem.remove();
            }

			if (e.target.closest('.btn-minus')) {//241205 이진하 구분추가는 체크된것을 삭제해야 하므로 class명을 다른걸로 사용하
				$("input:checkbox[name=additemchk]:checked").each(function(l){
					$(this).closest("tr").remove();
				});
            }
			//241128 이진하 버튼 밑 네이밍 제어 추가
			 const newList = listElement.querySelectorAll('li');
			 const newListtr = listElement.querySelectorAll('tr');
			var regex=/[0-9]/g;
            if(newList.length > 0) {
                newList.forEach((item,index) => {
                    item.querySelector('.btn-add').style.display = 'none'; // 기존 스타일 초기화
					if (e.target.closest('.btn-delete') || e.target.closest('.btn-delete_YI')) {//삭제일때 input name,id 재 정렬
					var thisselect=item.querySelectorAll('select');
					var thisinput=item.querySelectorAll('input');
					var thistextarea=item.querySelectorAll('textarea');
					thisselect.forEach((item1) => {
						var inputtnm=item1.getAttribute("name");
						item1.setAttribute("name",inputtnm.replace(regex,(index+1)));
						var inputid=item1.getAttribute("id");
						if(inputid) item1.setAttribute("id",inputid.replace(regex,(index+1)));
					 });
					thisinput.forEach((item2) => {
						var inputtnm=item2.getAttribute("name");
						item2.setAttribute("name",inputtnm.replace(regex,(index+1)));
						var inputid=item2.getAttribute("id");
						if(inputid) item2.setAttribute("id",inputid.replace(regex,(index+1)));
					 });
					}
                });
                // 마지막 요소에만 style.display = 'flex' 설정
                const lastItem = newList[newList.length - 1];
                lastItem.querySelector('.btn-add').style.display = 'flex';
            } 
			 if(newListtr.length > 0) {//구분추가용 추가
                newListtr.forEach((item,index) => {
					if(index>2){//앞에3게 제외
						if (e.target.closest('.btn-minus')) {//삭제일때 input name,id 재 정렬
						var thisinput=item.querySelectorAll('input');
						var thistextarea=item.querySelectorAll('textarea');
						thisinput.forEach((item1) => {
							var inputtnm=item1.getAttribute("name");
							item1.setAttribute("name",inputtnm.replace(regex,(index-3+1)));
							var inputid=item1.getAttribute("id");
							if(inputid) item1.setAttribute("id",inputid.replace(regex,(index-3+1)));
						 });
						 thistextarea.forEach((item2) => {
							var inputtnm=item2.getAttribute("name");
							item2.setAttribute("name",inputtnm.replace(regex,(index-3+1)));
							var inputid=item2.getAttribute("id");
							if(inputid) item2.setAttribute("id",inputid.replace(regex,(index-3+1)));
						 });
						}
					}
                });
            } 

        });
    };
    
    //소관부처
    //공통으로 만든거 같아서 따로 하나 추가 했습니다.
    const JM_govPartSelectHtml = `
        <select name="" id="" title="소관부처"  style="width: 408px;"  title="선택하세요">
            <option value="">선택</option>
        </select>
        <button type="button" class="btn-dark-light btn-delete">
            <i class="ico-minus"></i> 삭제
        </button>                                                  
        <button type="button" class="btn-dark-light btn-add">
            <i class="ico-plus"></i> 추가
        </button>
    `;
    dynamicAddList('.dynamic_add-list_JM', JM_govPartSelectHtml);
    
    //이양방향
    //공통으로 만든거 같아서 따로 하나 추가 했습니다.
    const TD_yiYangPart = `
            <select name="" id="" title="이양방향"  style="width: 188px;" title="선택하세요">
                <option value="">이양방향 선택</option>
            </select>
            →
            <select name="" id="" title="이양방향"  style="width: 188px;">
                <option value="">이양방향 선택</option>
            </select>
            <label class="input_type check">
                <input type="checkbox" name="" id="">
                <span class="txt"></span>
            </label>
            <input type="hidden" title="예외상황" name="" id="" value="" maxlength="30"  style="width: 240px;">
            <button type="button" class="btn-dark-light btn-delete_YI">
                <i class="ico-minus"></i> 삭제
            </button>      
            <button type="button" class="btn-dark-light btn-add">
                <i class="ico-plus"></i> 추가
            </button>                                                                              
    `;
    dynamicAddList('.dynamic_add-list2_TD', TD_yiYangPart);
    
    
    const Itm_list = `
    				<tr class="Itm-add">    
                      <th scope="row">
                        <div class="form-element__wrap flex-row">                                  
                          <label class="input_type check mr-0">
                            <input type="checkbox" name="additemchk">
                            <span class="txt"></span>
                          </label>
                          <span class="form-element__inner input-type">
                            <input type="text" name="" id="" class="input-type1-font14" maxlength="50" placeholder="구분 입력"  title="구분을 입력하세요.">
                          </span>
                        </div>
                      </th>                                      
                      <td>
                        <div class="form-element__wrap">                                  
                          <span class="form-element__inner text-area" style="height: 150px;">
                            <textarea name="" id=""  class="lenchk" style="height: 100%;" title="내용을 입력하세요" placeholder="내용을 입력하세요."></textarea>                          
                          </span>
                          <div class="input-text-count text-area">
                              <strong class="current">0</strong> / <strong>100,000자</strong>
                          </div>
                        </div>  
                      </td>                                                                         
                    </tr>     `;
    
    dynamicAddList('.dynamic_add-list_Itm', Itm_list);

});


// 탭
$(document).ready(function() {
  $('.tabOp-menu li a').click(function(e) {
    e.preventDefault(); // 링크 기본 동작 방지

    var index = $(this).parent().index(); // 클릭한 탭의 인덱스 가져오기

    // 탭 메뉴 활성화 클래스 전환
    $('.tabOp-menu li').removeClass('active');
    $(this).parent().addClass('active');

    // 탭 콘텐츠 활성화 클래스 전환 (인덱스 기준으로 매칭)
    $('.tabOp').removeClass('active');
    $('.tabOp').eq(index).addClass('active');
  });
});
