// 보그코리아 회원가입 페이지 JS - member.js //

$(function () { /////// jQB ///////////////////

    /* 
        [ 입력폼의 유효성 검사 ]
        - 검사원리: 
        입력창에 클릭 또는 탭하여 입력가능상태(커서깜박)를
        포커스 상태라고 함. 이벤트로는 focus 이벤트임!
        이 포커스 상태에서 다른 부분을 클릭(탭)되면 포커스가
        풀리게 된다. 이 상태를 블러(blur)상태라고 함!
        이렇게 이벤트가 블러로 발생할때 유효성 검사를 시행함!
        - 이벤트 대상선정: 입력요소중 input type이 
                            text, password
        input[type=text],input[type=password]
        (유의사항: type=text 인 요소 중에서 아이디가 email2
            인요소는 검사에서 제외함!+모바일검색 input요소 제외추가!)
        제외하기 위한 선택자: input[type=text][id!=email2][class!=search]
        -> (!=) 선택연산자는 제이쿼리전용임!

        - 제이쿼리 사용 메서드 : blur() 메서드
    
    */
    $("input[type=text][id!=email2][class!=search],input[type=password]")
        .blur(function () {
            // console.log("블러써?");

            // 1. 블러가 발생한 아이디 알아오기
            let cid = $(this).attr("id");

            console.log("아이디:" + cid);

            // 2. 입력된 값 알아오기 : val() 메서드
            let cv; // 현재읽어온 값 (current value)

            ///////////////////////////////////////
            // 모든공백제거 함수! : val은 값 전달변수

            // let groSpace = function(val){};
            // let groSpace = (val) => {};
            let groSpace = val => {
                return val.replace(/\s/g, "");
                // 정규식 -> /\s/g
                // 정규식은 슬래쉬 사이에 쓴다!
                // \s 역슬래쉬s는 스페이스를 뜻함
                // g는 모두 찾으라는 뜻
            }; //////// groSpace함수 /////////

            // trim() 메서드 : 앞뒤공백제거 + 공백만 있어도 제거

            if (cid === "mnm") // 이름일 경우 앞뒤공백만제거
                cv = $(this).val().trim();
            else // 그밖의 경우는 모든공백제거
                cv = groSpace($(this).val());


            // 제거된 공백 입력창에 반영하기!
            $(this).val(cv);

            console.log("현재값:" + cv);

            // 3. 빈값일 경우 "필수입력" 메시지 출력
            if (cv === "") {
                $(this).siblings(".msg").text("필수입력!")
                .removeClass("on");// 글자색 복원!
                // siblings(필터) -> 선택요소 이외의 형제들 중 특정요소

                // 통과여부 false
                pass = false;

            } /////////// if문: 빈값일때 ////////////

            // 4. 아이디일때 검사하기 ///////////////////
            else if (cid === "mid") {

                // 유효성 검사결과
                let res = vReg(cv, cid);
                console.log("검사결과:" + res);

                // 결과가 false일 경우 메시지 띄우기
                if (!res) { // !(NOT연산자)로 결과 반대로!

                    $(this).siblings(".msg")
                        .text("영문자로 시작하는 6~20글자 영문자/숫자")
                        .removeClass("on"); // 글자색 변경 제거

                    // 통과여부 false
                    pass = false;

                } /////// if문 : 결과가 false일때 ////
                else {

                    $(this).siblings(".msg")
                        .text("훌륭한 아이디네요~!")
                        .addClass("on"); // 글자색변경 class

                } /////// else문 : 결과가 true일때 ////


            } /////////// else if문 : 아이디일때 /////////

            // 5. 비밀번호일때 검사하기 ///////////////////
            else if (cid === "mpw") {

                // 유효성 검사결과
                let res = vReg(cv, cid);
                console.log("검사결과:" + res);

                // 결과가 false일 경우 메시지 띄우기
                if (!res) { // !(NOT연산자)로 결과반대로

                    $(this).siblings(".msg")
                        .text("특수문자,문자,숫자포함 형태의 5~15자리");

                    // 통과여부 false
                    pass = false;

                } ///// if문 : 결과가 false일때 ////
                else { // 통과시 내용비우기 : empty()

                    $(this).siblings(".msg").empty();

                } ///// else문 : 결과가 true일때 /////


            } /////////// else if문 : 비밀번호일때 ////////

            // 6. 비밀번호확인 검사하기 ///////////////////
            else if (cid === "mpw2") {

                /// 비밀번호입력값과 비밀번호확인값이 불일치하면 메시지출력
                if (cv !== $("#mpw").val()) {

                    $(this).siblings(".msg")
                        .text("비밀번호가 일치하지 않습니다!");

                    // 통과여부 false
                    pass = false;

                } /////// if문 : 결과가 같지 않으면 true ///
                else { // 통과시 내용비우기 : empty()

                    $(this).siblings(".msg").empty();

                } ///// else문 : 결과가 false일때 /////

            } /////////// else if문 : 비밀번호확인일때 /////

            // 7. 이메일 입력창일 경우 이메일 검사하기 //////
            else if (cid === "email1") {

                // 이메일 주소 만들기
                let comp = eml1.val() + "@" +
                    (seleml.val() === "free" ? eml2.val() : seleml.val());
                // 이메일 뒷주소
                // 비?집:놀이동산;
                // 선택박스 value값이 "free" 이면 직접입력(eml2)값을
                // 아니면 선택박스의 선택값을 넣어준다!
                console.log("결과:" + comp);

                // 이메일 검사처리함수 호출!
                resEml(comp);

            } /////////// else if문 : 이메일 항목일때 ///////

            // 8. 별도의 검사가 필요없는 경우 빈값 메시지 지우기 ///
            else {
                $(this).siblings(".msg").empty();
            } //////////// else문 : 빈값이 아닐때 ///////////


        }); //////////////////// blur 함수 /////////////////////
    ////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////
    ///////////// 이메일 검사 결과처리함수 //////////////////
    ///////////////////////////////////////////////////////
    let resEml = comp => { // comp - 완성된 이메일주소
        // console.log("결과처리함수:"+comp);

        // 1. 이메일 정규식 검사하기!
        let res = vReg(comp, "eml");
        console.log("이멜검사결과:" + res);

        // 2. 이메일 검사결과 메시지 출력하기!
        if (res) { /// 통과시 //////////////////

            eml1.siblings(".msg")
                .text("적합한 이메일 형식입니다!")
                .addClass("on"); //글자색 변경 class

        } /////// if문 : 결과가 true일때 /////
        else { /// 불통과시 ////////////////////

            eml1.siblings(".msg")
                .text("맞지않는 이메일 형식입니다")
                .removeClass("on"); //글자색 복원

            // 통과여부 false
            pass = false;

        } ////// else문 : 결과가 false일때 //////

    }; ///////////// resEml함수 //////////////////////////
    //////////////////////////////////////////////////////



    ///////////////////////////////////////////////////////
    //////////// 키보드 입력시 이메일 체크하기 //////////////
    ///////////////////////////////////////////////////////
    // 키보드 관련 이벤트 종류: keypress, keyup, keydown
    // 1. keypress : 키가 눌려졌을때
    // 2. keyup : 키가 눌렸다가 올라올때
    // 3. keydown : 키가 눌려져 내려갈때
    // 과연 글자가 입력되는 순간은 어떤 키보드 이벤트를 써야할까?
    // -> keyup이벤트가 바로 입력된 글자가 전달됨!

    // 이메일 앞주소
    let eml1 = $("#email1");
    // 이메일 뒷주소
    let eml2 = $("#email2");
    // 이메일 선택박스
    let seleml = $("#seleml");

    // 이벤트 대상: #email1, #email2 ////////
    $("#email1, #email2").on("keyup", function () {

        // 1. 현재 이벤트 대상 아이디 읽어오기
        let cid = $(this).attr("id");
        console.log("현재아이디:" + cid);

        // 2. 현재 입력된 값 읽어오기
        let cv = $(this).val();
        console.log("입력값:" + cv);

        // 3. 이메일 뒷주소 셋팅하기
        let backeml =
            cid === "email1" ? seleml.val() : eml2.val();
        // 조건연산자로 선택박스값 또는 직접입력값을 할당한다!
        // 비?집:놀이동산;

        // 4. 선택박스의 선택값이 "free"(직접입력)이면 이메일 뒷주소변경
        if (seleml.val() === "free") backeml = eml2.val();

        // 5. 이메일 전체주소 조합하기!
        let comp = eml1.val() + "@" + backeml;
        console.log("이멜주소:" + comp);

        // 6. 이메일 검사 결과함수 호출!
        resEml(comp);


    }); ////////////// keyup ///////////////////
    ////////////////////////////////////////////


    ///////////////////////////////////////////////
    ///////// 선택박스 변경시 이메일 검사하기 ///////
    ///////////////////////////////////////////////
    // 검사시점: 선택박스 변경할때
    // 이벤트: change
    // 이벤트 대상: #seleml -> seleml변수
    seleml.change(function () {

        // 1. 선택박스 변경된 값 읽어오기
        let cv = $(this).val();
        console.log("선택값:"+cv);

        // 2. 선택옵션별 분기문
        if(cv === "init"){ // "선택해주세요" 선택시

            // 메시지 출력
            eml1.siblings(".msg")
            .text("이메일 옵션 선택필수!")
            .removeClass("on");// 글자색 복원

            // 직접입력창 숨기기
            eml2.fadeOut(300);

        } ///// if문 : init일때 /////
        else if(cv === "free"){ // free일때

            // 1.직접입력창 보이기(fadeIn)
            //   + 값초기화(val) + 포커스주기(focus)
            eml2.fadeIn(300).val("").focus();

            // 2. 이메일 주소 만들기
            let comp = eml1.val() + "@" + eml2.val();

            // 3. 이메일 검사처리함수 호출
            resEml(comp);

        } ///// else if문 : free일때 /////
        else { // 기타 이메일 선택시

            // 1. 직접입력창 숨기기
            eml2.fadeOut(300);

            // 2. 이메일 전체주소 조합하기!
            let comp = eml1.val() + "@" + cv;

            // 3. 이메일 검사 결과처리함수 호출!
            resEml(comp);

        } ///// else문 : 기타 이메일 선택시 /////



    }); ////////////// change 함수 ////////////////
    //////////////////////////////////////////////


    /////////////////////////////////////////////////////////
    ////////// 가입하기(submit) 버튼 클릭시 처리하기 //////////
    /////////////////////////////////////////////////////////
    // 전체검사의 원리:
    // 전역변수 pass를 설정하여 true를 할당하고
    // 검사 중간에 불통과 사유발생시 false로 변경!
    // 유효성검사 통과 여부를 판단한다!
    // 검사방법: 기존의 이벤트함수인 blur 이벤트를 강제발생시킨다!
    // 이벤트 발생메서드: trigger(이벤트명)
    // //////////////////////////////////////////
    let pass; // 검사용변수
    $("#btnj").click(function(e){ // 서브밋버튼 클릭시

        // 1. 서브밋 기능막기
        e.preventDefault();

        // 2. pass 통과여부 변수에 true할당!(처음시작)
        pass = true;

        // 3. 입력창 blur이벤트 발생시키기(전체검사)
        // 대상: input[type=text][id!=email2],input[type=password]
        // 이벤트발생 메서드: trigger(이벤트명) -> blue이벤트 발생!
        $("input[type=text][id!=email2][class!=search],input[type=password]")
        .trigger("blur");

        console.log("통과여부:"+pass);

        // 4. 검사결과에 따라 메시지 보이기 및 처리 ////
        if(pass) { /// 통과시!

            // 메시지 띄우기
            alert("회원가입을 축하드립니다! 짝짝짝!");
            // 원래는 post방식으로 DB에 회원정보 입력후
            // 입력완료시에 위의 메시지를 띄워준다!

            // 로그인페이지로 이동하기
            location.replace("login.html");
            // location.href = "login.html";
            /* 
                location.href 는 뒤로 가기시 history가 살아있어서
                보안상 위험하다! 따라서 현재 페이지에
                그대로 덮어쓰기로 위치 이동을 하는 방법을 쓴다!
                location.replace(이동주소)
                -> 현재 페이지 history가 덮어써져서 사라진다!
                (전페이지 돌아가기 안됨!!!)
            */

        } /////////////// if ///////////////
        else { // 불통과시!

            alert("입력을 수정하세요!");

        } //////////////// else ///////////

    }); //////////////// click //////////////////////
    ////////////////////////////////////////////////





}); ///////////////// jQB ///////////////////


/*////////////////////////////////////////////////////////
    함수명: vReg
    기능: 값에 맞는 형식을 검사하여 리턴함
    (주의: 정규식을 따옴표로 싸지말아라!-싸면문자가됨!)
*/ ////////////////////////////////////////////////////////
function vReg(val, cid) {
    // val - 검사할값, cid - 처리구분아이디
    // //console.log("검사:"+val+"/"+cid);

    // 정규식 변수
    let reg;

    // 검사할 아이디에 따라 정규식을 변경함
    switch (cid) {
        case "mid": // 아이디
            reg = /^[a-z]{1}[a-z0-9]{5,19}$/g;
            // 영문자로 시작하는 6~20글자 영문자/숫자
            // /^[a-z]{1} 첫글자는 영문자로 체크!
            // [a-z0-9]{5,19} 첫글자 다음 문자는 영문 또는 숫자로
            // 최소 5글자에서 최대 19글자를 유효범위로 체크!
            // 첫글자 한글자를 더하면 최소 6글자에서 최대 20글자체크!
            break;
        case "mpw": // 비밀번호
            reg = /^.*(?=^.{5,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
            // 특수문자,문자,숫자포함 형태의 5~15자리
            // (?=^.{5,15}$) 시작부터 끝까지 전체 5~15자릿수 체크!
            // (?=.*\d) 숫자 사용체크!
            // (?=.*[a-zA-Z]) 영문자 대문자 또는 소문자 사용체크!
            // (?=.*[!@#$%^&+=]) 특수문자 사용체크!
            break;
        case "eml": // 이메일
            reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
            // 이메일 형식에 맞는지 검사하는 정규식
            break;
    } //////////// switch case문 //////////////////

    // //console.log("정규식:"+reg);

    // 정규식 검사를 위한 JS메서드 
    // -> 정규식.test(검사할값) : 결과 true/false
    return reg.test(val); //호출한 곳으로 검사결과리턴!

} //////////// vReg 함수 //////////////////////////////////
///////////////////////////////////////////////////////////