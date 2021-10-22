// 파일럿 PJ 메인 JS - main.js

$(function(){ ///// jQB ////////////////////////

    /////////////////////////////////
    /// 배너 드래그 기능 구현하기 ////
    /////////////////////////////////
    // 드래그 대상: .slide
    let slide = $(".slide");

    // 드래그 기능주기 -> 제이쿼리UI 기능!
    slide.draggable({
        axis: "x" /// x축고정
    }); ////// draggable ///////

    /* 
        배너 드래그 이동의 기준:
        1. 현재 슬라이드의 left:-100% 값을 기준으로 판단함
        2. 오른쪽에서 들어오는 이동 -> left: -110% 보다 작을때
        3. 왼쪽에서 들어오는 이동 -> left: -90% 보다 클때
        4. 제자리로 돌아가는 이동 -> left가 -110%보다 크고 -90%작을때

        -> 구현상 유의사항: 실제로 이동시엔 px단위로 이동함
        따라서 %를 px로 변환해 줘야한다!
        예시) 가로크기: 1000px -> left: -100% -> left : -1000px
            left: -110% -> left: -(1000*1.1) + "px"
            left: -90% -> left: -(1000*0.9) + "px"
    */

   
    // 윈도우 가로크기 구하는함수
   let awin = () => $(window).width();
    //// awin함수 ////
    // 화살표함수 뒤에 중괄호{} 없이 명령문 하나만 있으면
    // 그게 바로 return 문이다! -> 함수호출한 곳으로 가져감!

    // 윈도우 가로크기
    let win = awin();

    // 화면크기변경(resize)시 윈도우 가로크기 업데이트!
    $(window).resize(()=>{
        win = awin();
        console.log("윈도가로:"+win);
    });/////// resize ///////
    
    console.log("윈도가로:"+win);

    // 현재 슬라이드 위치값 구하기
    // 슬라이드 위치값
    let spos;
    // 대상: .slide
    let slide = $(".slide");
    // 이벤트: drag
    slide.on("drag",function(){
        // 슬라이드 위치값 구하기
        spos = slide.offset().left;
        // offset().left 화면 왼쪽기준선 left위치
        console.log("슬위:"+spos);
    }); ////////// drag ////////////

    ///////////////// 이동구현하기 /////////////////////////
    /// 1. 오른쪽에서 들어오는 이동 -> left: -110% 보다 작을때
    // -110% 구하기 -> win*1.1




}); /////////////// jQB ////////////////////////
