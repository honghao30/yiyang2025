document.addEventListener("DOMContentLoaded", () => {

    const treeMenu = (containerId) => {
        if (!containerId) {
            return;
        }
    
        const container = document.querySelector(containerId);
        if (!container) {
            return;
        }
    
        const menuAll = container.querySelector('.all-tree');
        const oneDepth = container.querySelector('.two-depth-list')
        const twoDepthMenuButtons = container.querySelectorAll('.two-depth-button');
        const treeDepthMenuList = container.querySelectorAll('.tree-depth-list');
        const treeDepthMenus = container.querySelectorAll('.tree-depth-list li a');
        const depthTreeMenus = container.querySelectorAll('.depthmenu03 li a');
        console.log(menuAll, oneDepth)
        if (menuAll) {
            menuAll.addEventListener('click', () => {
                menuAll.classList.toggle('is-active');
                // twoDepthMenuButtons.forEach(button => {
                //     button.classList.toggle('is-active');
                // });
                oneDepth.classList.toggle('is-active');
                // treeDepthMenuList.forEach(list => {      
                //     list.classList.toggle('is-active');
                // });
            });
        }
    
        twoDepthMenuButtons.forEach(menu => {
            menu.addEventListener('click', (event) => {
                event.preventDefault();
                menu.classList.toggle('is-active');
                if (menu.parentElement.nextElementSibling) {
                    menu.parentElement.nextElementSibling.classList.toggle('is-active');
                }
            });
        });
    
        treeDepthMenus.forEach(menu => {
            menu.addEventListener('click', (event) => {
                event.preventDefault();
                const activeItem = container.querySelector('.tree-menu li.is-active');
                if (activeItem) {
                    activeItem.classList.remove('is-active');
                }
                menu.parentElement.classList.add('is-active');
                const selectData = menu.textContent;
                const lawContent = document.querySelector('.law-content .table_cont');
                if (lawContent) {
                    lawContent.setAttribute('data-name', selectData);
                }
            });
        });

        depthTreeMenus.forEach(menu => {
            menu.addEventListener('click', (event) => {
                event.preventDefault();
                menu.classList.toggle('is-active');
                if (menu.parentElement.nextElementSibling) {
                    menu.parentElement.nextElementSibling.classList.toggle('is-active');
                }
            });
        });        
    };
    
    treeMenu('#coverment');
    treeMenu('#law-list');

    // 메뉴 관리 전체메뉴
    const treeMenuFn = (containerId) => {
        if (!containerId) return;
    
        const container = document.querySelector(containerId);
        if (!container) return;        
    
        const menuOnes = container.querySelectorAll('.one-depth button');
        menuOnes.forEach(menu => {
            menu.addEventListener('click', () => {
                menu.classList.toggle('is-active');
                const twoDepthList = menu.closest('li').querySelector('.two-depth-list');
                if (twoDepthList) {
                    twoDepthList.classList.toggle('is-active');
                }
            });
    
            const menuTwoDepth = menu.closest('li').querySelectorAll('.two-depth-button');
            menuTwoDepth.forEach(twoMenu => {
                twoMenu.addEventListener('click', () => {
                    twoMenu.classList.toggle('is-active');
                    const treeDepthList = twoMenu.closest('li').querySelector('.tree-depth-list');
                    if (treeDepthList) {
                        treeDepthList.classList.toggle('is-active');
                    }
                });
            });
        });     
    }
    
    treeMenuFn('#menuManage');
    treeMenuFn('#menuManage2');
    
    // 탭
    // 탭메뉴
    function tabMenus(tabGroupSelector) {
        const tabGroup = document.querySelector(tabGroupSelector);
        if (!tabGroup) return; 

        const tabButtons = tabGroup.querySelectorAll('.tree-tab-head button');
        const tabPanes = tabGroup.querySelectorAll('.tree-menu');

        if (!tabButtons.length || !tabPanes.length) return; 

        tabButtons.forEach((button, index) => {
            button.addEventListener('click', event => {
                event.preventDefault();
                handleTabClick(index);
            });
        });

        function handleTabClick(index) {
            tabButtons.forEach(btn => btn.classList.remove('is-active'));
            tabButtons[index].classList.add('is-active');
            tabPanes.forEach(pane => pane.classList.remove('is-active'));
            tabPanes[index].classList.add('is-active');
        }
    }
    tabMenus('.law-tree-menu');

    const checkFormValLength = () => {
        const formEls = document.querySelectorAll('.has-text-count input[type="text"]');
    
        formEls.forEach(el => {
            const countVal = parseInt(el.value.length);
            const countEl = el.closest('.input-multi').querySelector('.input-text-count .current');
            if(countEl) {
                countEl.innerText = countVal;
            } 
        });
    
        formEls.forEach(el => {            
            el.addEventListener('input', event => {
                const countVal = parseInt(el.value.length);
                const countEl = el.closest('.input-multi').querySelector('.input-text-count .current');
                if(countEl) {
                    countEl.innerText = countVal; 
                }
                const total = parseInt(el.closest('.input-multi').querySelector('.input-text-count .total').textContent);
    
                if (countVal > total) {
                    el.value = el.value.substring(0, total);
                }               
            })         
        })
    }
    
    checkFormValLength();
    
    // 파일 첨부
    // 파일명 표시 기능
    const addFileNameListener = (fileInput) => {
        if (fileInput) { // fileInput 요소가 존재하는지 확인
            fileInput.addEventListener('change', () => {
                const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : '';
                const textInput = fileInput.closest('li').querySelector('.input-type input[type="text"]');
                if (textInput) {
                    textInput.value = fileName;
                }
            });
        }
    };

    // 파일 입력란 삭제 기능
    const addFileRemoveListener = (button) => {
        if (button) {
            button.addEventListener('click', (event) => {
                event.stopPropagation(); 
                console.log(button, button.closest('li'))
                button.closest('li').remove();
            });
        }
    };
    

    // 파일 입력란 추가 기능
    const addFileAddListener = (button) => {            
        if (button) { // button 요소가 존재하는지 확인
            button.addEventListener('click', () => {
                const newListItem = document.createElement('li');
                const m_newListItem = document.createElement('li');
                console.log(newListItem)

                if (fileListWrap[0].classList.value.includes('file-list-multi')) {
                    newListItem.innerHTML = `
                        <div class="input-wrap">
                            <input type="file" name="file_1" class="file" style="width: 382px;"/>
                            <div class="form-element__wrap">
                                <div class="input-multi file-up">
                                    <span class="form-element__inner input-type" style="width: 272px; flex: none;">
                                        <input type="text" placeholder="파일을 선택해 주세요." title="파일첨부">
                                    </span>
                                    <button type="button" class="btn-border-gray">
                                        <i class="icon-file"></i>
                                        파일찾기
                                    </button>
                                    <button type="button" class="btn-dark-light file-remove">
                                        <i class="ico-minus"></i>
                                        삭제
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="form-element__wrap flex-row" style="margin-left: 87px;">
                            <div class="input-label">대체 텍스트</div>
                            <span class="form-element__inner input-type">
                            <input type="text" class="input-type1-font14" maxlength="" placeholder="내용을 입력해 주세요." title="대체텍스트">
                            </span>
                        </div>
                    `;
                } else {
                    newListItem.innerHTML = `
                        <input type="file" name="file_1" class="file"  width: 70%; multiple />
                        <div class="form-element__wrap">
                            <div class="input-multi file-up">
                                <span class="form-element__inner input-type">
                                    <input type="text" placeholder="" title="파일첨부">
                                </span>
                                <button type="button" class="btn-border-gray">
                                    <i class="icon-file"></i>
                                    파일찾기
                                </button>
                                <button type="button" class="btn-dark-light file-remove">
                                    <i class="ico-minus"></i>
                                    삭제
                                </button>

                            </div>
                        </div>
                    `;
                }

                if (fileListWrap[1] && fileListWrap[1].classList.contains('mo-file-list')) {
                    m_newListItem.innerHTML = `
                        <div class="input-wrap">
                            <input type="file" name="file_1" class="file" style="width: 20%;" />
                            <div class="file-up">
                                <span class="form-element__inner input-type">
                                    <input type="text" placeholder="파일을 첨부해 주세요." title="파일첨부">
                                </span>
                                <button type="button" class="btn-delete file-remove">
                                    <i class="ico-minus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="input-wrap mt-16">
                            <div class="input-label">대체 텍스트</div>
                            <span class="form-element__inner input-type">
                                <input type="text" class="input-type1-font14" maxlength="" placeholder="내용을 입력해 주세요." title="대체텍스트">
                            </span>
                        </div>
                    `;
                }

                // fileListWrap[0]에 newListItem을 위쪽에 추가
                if (fileListWrap[0]) {
                    if (fileListWrap[0].firstChild) {
                        fileListWrap[0].insertBefore(newListItem, fileListWrap[0].firstChild);
                    } else {
                        fileListWrap[0].appendChild(newListItem);
                    }
                }

                // fileListWrap[1]에 m_newListItem을 위쪽에 추가
                if (fileListWrap[1]) {
                    if (fileListWrap[1].firstChild) {
                        fileListWrap[1].insertBefore(m_newListItem, fileListWrap[1].firstChild);
                    } else {
                        fileListWrap[1].appendChild(m_newListItem);
                    }
                }

                // 새로 추가된 파일 입력란과 버튼에 이벤트 리스너 추가
                const newFileInput = newListItem.querySelector('input[type="file"]');
                const m_newFileInput = m_newListItem.querySelector('input[type="file"]');
                addFileNameListener(newFileInput);
                addFileNameListener(m_newFileInput);

                const newAddButton = newListItem.querySelector('.btn-add');
                const m_newAddButton = m_newListItem.querySelector('.btn-add');
                addFileAddListener(newAddButton);
                addFileAddListener(m_newAddButton);

                const newRemoveButton = newListItem.querySelector('.file-remove');
                const m_newRemoveButton = m_newListItem.querySelector('.file-remove');
                addFileRemoveListener(newRemoveButton);
                addFileRemoveListener(m_newRemoveButton);
            });
        }
    };

    // 초기화 및 리스너 등록
    const fileListWrap = document.querySelectorAll('.file-list');
    const fileLists = document.querySelectorAll('.file-list li input[type=file]');
    fileLists.forEach(el => {
        addFileNameListener(el);
    });

    const fileAddButtons = document.querySelectorAll('.file-list li .btn-add, .mo-file-list li .btn-add');
    fileAddButtons.forEach(button => {
        addFileAddListener(button);
    });

    const fileRemoveButtons = document.querySelectorAll('.file-list li .file-remove');
    fileRemoveButtons.forEach(button => {
        addFileRemoveListener(button);
    });
    
    // 모바일 검색
    const toggleButtons = document.querySelector('.btn-detail-mo-toggle');
    toggleButtons && toggleButtons.addEventListener('click', () => {
        toggleButtons.innerText = toggleButtons.innerText === '상세조회 열기' ? '상세조회 닫기' : '상세조회 열기';
        document.querySelector('.mo-search-detail-content').classList.toggle('is-active');
    });
    
    //추가 버튼
    const dynamicAddList = (containerId, itemHTML) => {
        const listElement = document.querySelector(containerId);
    
        const handleAddClick = (itemHTML) => {
            const newListItem = document.createElement('li');
            newListItem.classList.add('input-wrap', 'flex-row');
            newListItem.innerHTML = itemHTML;
            listElement.appendChild(newListItem, listElement.firstChild);

            //listElement.insertBefore(newListItem, listElement.firstChild);
        };
    
        listElement && listElement.addEventListener('click', (e) => {
            if (e.target.closest('.btn-add')) {
                e.target.closest('.btn-add').style.display = 'none';
                handleAddClick(itemHTML);
                checkedLists();
            }
    
            if (e.target.closest('.btn-delete')) {       
                const items = listElement.querySelectorAll('li');
                const itemCount = items.length;         
                const listItem = e.target.closest('li');
            
                // 리스트 삭제 로직
                listItem.remove();
            
                // 삭제 후 리스트 다시 가져오기
                const updatedItems = listElement.querySelectorAll('li');
                const updatedItemCount = updatedItems.length;
            
                // 조건에 따라 .btn-add 표시
                if (updatedItemCount >= 2) {
                    const index = Array.from(updatedItems).indexOf(listItem.previousElementSibling);
                    if (index !== 0) {
                        listItem.previousElementSibling.querySelector('.btn-add').style.display = 'flex';
                    }
                } else if (updatedItemCount === 1) {
                    // 리스트가 1개만 남은 경우
                    updatedItems[0].querySelector('.btn-add').style.display = 'flex';
                }
            }            
        });
        if(listElement) {
            const newList = listElement.querySelectorAll('li');
            if(newList.length > 1) {
                newList.forEach((item) => {
                    item.querySelector('.btn-add').style.display = 'none'; // 기존 스타일 초기화
                });
            
                // 마지막 요소에만 style.display = 'flex' 설정
                const lastItem = newList[newList.length - 1];
                lastItem.querySelector('.btn-add').style.display = 'flex';
            } 
        }       

    };
    const govPartSelectHtml = `
        <select name="" id="" style="width: 408px;"  title="선택하세요">
            <option value="선택함1">선택함1</option>
            <option value="선택함2">선택함2</option>
            <option value="선택함3">선택함3</option>
        </select>
        <button type="button" class="btn-dark-light btn-delete">
            <i class="ico-minus"></i> 삭제
        </button>                                                  
        <button type="button" class="btn-dark-light btn-add">
            <i class="ico-plus"></i> 추가
        </button>
    `;
    dynamicAddList('.dynamic_add-list', govPartSelectHtml);
    
    const govPartSelectHtml2 = `
        <select name="" id="" style="width: 408px;"  title="선택하세요">
            <option value="선택함1">선택함1</option>
            <option value="선택함2">선택함2</option>
            <option value="선택함3">선택함3</option>
        </select>
        <div class="yiyang-info">
            <span class="total">사무</span>
            <span class="dv-bar ml-5"></span>  
            <span class="total ml-5">1,2,6</span>                                             
        </div>
        <button type="button" class="btn-dark-light btn-delete">
            <i class="ico-minus"></i> 삭제
        </button>                                                  
        <button type="button" class="btn-dark-light btn-add">
            <i class="ico-plus"></i> 추가
        </button>
    `;
    dynamicAddList('.dynamic_add-list7', govPartSelectHtml2);

    const yiYangPart = `
            <select name="" id="" style="width: 188px;" title="선택하세요">
                <option value="선택함1">선택함1</option>
                <option value="선택함2">선택함2</option>
                <option value="선택함3">선택함3</option>
            </select>
            →
            <select name="" id="" style="width: 188px;">
                <option value="선택함1">선택함1</option>
                <option value="선택함2">선택함2</option>
                <option value="선택함3">선택함3</option>
            </select>
            <div class="bar">&nbsp;</div>
            <label class="input_type check mr-0">
                <input type="checkbox" checked name="q01">
                <span class="txt"></span>
            </label>
            <div class="view on" style="width:280px;">
                <span class="input_cont">
                <input type="text" style="padding-left: 10px;" placeholder="내용 추가 (30자 이내)">
                </span>
            </div>               
            <button type="button" class="btn-dark-light btn-delete">
                <i class="ico-minus"></i> 삭제
            </button>      
            <button type="button" class="btn-dark-light btn-add">
                <i class="ico-plus"></i> 추가
            </button>                                                                              
    `;
    dynamicAddList('.dynamic_add-list2', yiYangPart);


    const yiyangDirection = `
                            <div class="form-element__wrap" >                                  
                                <div class="input-multi">
                                    <span class="form-element__inner input-type" style="width: 188px;">
                                        <input type="text" value="소관부처" class="input-type1-font14" maxlength="50" placeholder="내용을 입력하세요."  title="내용을 입력하세요.">
                                    </span>
                                    →
                                    <span class="form-element__inner input-type" style="width: 188px;">
                                        <input type="text" value="소관부처" class="input-type1-font14" maxlength="50" placeholder="내용을 입력하세요."  title="내용을 입력하세요.">
                                    </span> 
                                </div>
                            </div>  
                            <div class="yiyang-info">
                                <span class="total">사무</span>
                                <span class="dv-bar"></span>  
                                <span class="total">1,2,6</span>                                             
                            </div>
                            <button type="button" class="btn-dark-light btn-delete">
                                <i class="ico-minus"></i> 삭제
                            </button>     
    `;


    dynamicAddList('.yiyang-direction-list', yiyangDirection);
   
    // document.querySelector('.btn-tooltip') && document.querySelector('.btn-tooltip').addEventListener('click', () => {
    //     document.querySelector('.btn-tooltip').nextElementSibling.classList.toggle('is-active');
    // })

    document.querySelector('.btn-tooltip') &&
    document.querySelector('.btn-tooltip').addEventListener('click', () => {
        document.querySelector('.btn-tooltip').nextElementSibling.classList.toggle('is-active');
    });

    // .icon-x 클릭 시 .tooltip-layer 닫기 기능 추가
    document.querySelector('.icon-x') &&
    document.querySelector('.icon-x').addEventListener('click', () => {
        document.querySelector('.icon-x').closest('.tooltip-layer').classList.remove('is-active');
    });
   
    const checkboxListFn = (container) => {
        const checkContainer = document.querySelector(container);
        if (!checkContainer) {            
            return;
        }
    
        const allCheck = checkContainer.querySelector('.all-check input[type="checkbox"]');
        const checkList = checkContainer.querySelectorAll('td .check-item input[type="checkbox"]');
    
        if (!allCheck || !checkList.length) {            
            return;
        }
    
        allCheck.addEventListener('change', () => {
            const isChecked = allCheck.checked;
            checkList.forEach(checkListItem => {
                checkListItem.checked = isChecked;
            });
        });
    
        checkList.forEach(checkListItem => {
            checkListItem.addEventListener('change', () => {
                const checkedLists = checkContainer.querySelectorAll('td .check-item input[type="checkbox"]:checked');
                const checkListLength = checkList.length;
                const checkedLength = checkedLists.length;
    
                allCheck.checked = (checkListLength === checkedLength);
                allCheck.indeterminate = (checkedLength > 0 && checkedLength < checkListLength);                
            });
        });
    };
    

    checkboxListFn('.law-list')
    checkboxListFn('.law-list2')
    checkboxListFn('.iyangsamu-table')
    
    const checkedLists = () => {
        const checkItems = document.querySelectorAll('.dynamic_add-list2 .input-wrap input[type="checkbox"]');     
        checkItems.forEach(item => {
            if(!item.checked) {
                item.closest('li').querySelector('.btn-add').classList.add('disabled');
                item.closest('li').querySelector('.btn-delete').classList.add('disabled');
            } 
        });
                
        checkItems.forEach(item => {
            item.addEventListener('change', (e) => {          
                if(item.checked) {
                    item.parentElement.nextElementSibling.querySelector('input[type="text"]').disabled = false;
                    item.closest('li').querySelector('.btn-add').classList.remove('disabled');
                    item.closest('li').querySelector('.btn-delete').classList.remove('disabled');                      
                } else {
                    item.parentElement.nextElementSibling.querySelector('input[type="text"]').disabled = true;
                    item.closest('li').querySelector('.btn-add').classList.add('disabled');
                    item.closest('li').querySelector('.btn-delete').classList.add('disabled');
                }                    
            })                  
        });
    }
    checkedLists();
    
});