// 쇼핑몰 배너 js //
// 로드구역 ////////
window.addEventListener("load",() => {

    console.log("로딩완료!");

    /***************************************************************************** 
        [슬라이드 이동 기능정의]
        1.이벤트 종류 : 클릭
        2.이벤트 대상 : 이동버튼(.abtn)
        3.변경 대상 : 슬라이드 박스(#slide)
        4.기능흐름 : 
        (1) 오른쪽버튼 클릭시 다음슬라이드가 나타나도록 슬라이드박스의 left값을
        -100% 단위의 배수로 이동시킨다!
        -> 이동시 한계값은 마지막 슬라이드 이동배수인 4, 즉 -400%임
        (2) 왼쪽버튼 클릭시 이전슬라이드가 나타나도록 left값은 -100% 단위의
        배수중 이전 배수가 되도록 변경함
        -> 이동시 한계값은 첫번째 슬라이드의 위치값은 0을 기준한다
        (3) 처음이전과 끝 다음 슬라이드는 처음과 마지막 한계값에서 연결하여
        구현한다.(처음은 마지막으로 마지막은 처음으로 돌아가게 함)
        5.추가기능 : 슬라이드 위치표시 블릿
        -블릿대상 : .indic
        -변경내용 : 슬라이드 순번과 같은 순번의 li에 클래스 "on"주기
        (나머지 빼기-초기화)
    *****************************************************************************/

        // 이벤트 대상 : .abtn
        let abtn = document.querySelectorAll(".abtn");
        // 변경 대상 : #slide
        let slide = document.querySelector("#slide")
        // 추가 대상 : .indic li
        let indic = document.querySelectorAll(".indic li");

        // 오른쪽버튼 클릭시
        abtn[1].onclick = ()=>goSlide(1); 
        ////// click ////////////////////////////////////

        // 왼쪽버튼 클릭시
        abtn[0].onclick = ()=>goSlide(0); 
        ////// click ////////////////////////////////////

        // 슬라이드 번호 전역변수
        let snum = 0;
        // 슬라이드 개수 구해오기
        const scnt = document.querySelectorAll('#slide li').length;

        /*************************************************** 
            함수명 : goSlide
            기능 : 슬라이드를 다음/이전 슬라이드로 
                    이동시킨다!
        ***************************************************/
       const goSlide = dir => { 
            // dir - 전달변수(1-오른쪽,0-왼쪽)
            // console.log("이동함수!",dir);

            // 1.분기하기
            // (1) 오른쪽버튼
            if(dir){ /// dir이 1이면(1===true)
                // 슬라이드 번호를 1씩증가
                snum++;
                // 한계수에서 첫번째번호로!
                if(snum===4) snum=0;
            } //////// if ///////////////////////////
            // (2) 왼쪽버튼
            else{
                // 슬라이드 번호 1씩감소
                snum--;
                // 한계수에서 마지막번호로!
                if(snum===-1) snum=scnt-1;
                // 마지막 슬라이드번호는 (슬라이드개수-1)
            } //// else ///////////////

            // console.log("슬번호:",snum);

            // 2.이동하기 : 슬라이드의 left값을 변경함
            slide.style.left = (-100*snum)+"%";
            slide.style.transition = "left .4s ease-in-out";

            // 3.블릿표시 변경하기
            // (1) 초기화
            for(let x of indic) x.classList.remove("on");
            // (2) 적용하기 : 해당순번의 li에 class "on"넣기
            indic[snum].classList.add("on");

            // a요소 기본이동막!
            return false;


       }; ///////goSlide 함수 //////////////////////////////
       /////////////////////////////////////////////////////



});/////////// load ////////////////////////////////////////