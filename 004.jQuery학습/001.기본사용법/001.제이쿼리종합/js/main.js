// 제이쿼리 기본 JS - main.js 

////////////// 제이쿼리 로드구역 ////////////////
$(function(){

    /// 1. 대상선정 변수할당 /////////////////

    // 대상1 : 버튼 - .btns button
    let btns = $(".btns button");

    // 대상2 : 미니언즈 - .mi
    let mi = $(".mi");

    // 대상3 : 빌딩 - .building li
    let bd = $(".building li");

    // 대상4 : 메시지 - .msg
    let msg = $(".msg");


    /// 2. 초기화 셋팅 /////////////////////////

    // 2-1. 모든 버튼 숨기고 첫번째만 보이게하기
    btns.hide().first().show();
    // 버튼들을 .숨겨() .첫번째()는 .보여()
    // 주어는 하나! 뒤에 메서드 체인!




}); ////////// jQB ///////////////////////////
//////////////////////////////////////////////