//로그인 페이지 유효성 검사 JS

export default function validateLogin(changeMenu) {
  console.log("로그인 검사");

  /**************************************** 
        로그인 페이지 유효성 검사
    ****************************************/
  // 검사대상 : #mid, #mpw
  const mid = $("#mid");
  const mpw = $("#mpw");

  // 유효성 검사 기준 : 전송시 아이디,비번 모두 있어야함!

  // 이벤트 대상: #sbtn
  // 이벤트 종류: click
  $("#sbtn").click(function (e) {
    // 기본이동 서브밋 막기!
    e.preventDefault();

    // 공백데이터 처리 함수
    const groSpace = (x) => x.replace(/\s/g, "");

    // 유효성 검사
    if (groSpace(mid.val()) == "" || groSpace(mpw.val()) == "") {
      alert("아이디,비밀번호를 모두 입력해야합니다!");
      // 초기화! + 아이디에 포커스
      mid.val("").focus();
      mpw.val("");
    } ////////// if : 불통과시 ////////
    else {
      // DB조회후 결과는 아래과 같이 나누어짐
      // 1. 아이디가 없음
      // -> '존재하지 않는 아이디입니다'
      // 2. 아이디가 있으나 비밀번호 틀림
      // -> '비밀번호가 일치하지 않습니다'
      // 3. 로그인 성공 : 첫페이지로 이동(로그인표시)
      // -> '로그인에 성공하였습니다!'
      alert("로그인에 성공하였습니다!");
    //   리액트 상태관리 변수 업데이트로 페이지 이동
    changeMenu("home");
    } /////// else : 통과시 ////////
  }); ///////// click ///////////
} //////////validateLogin
