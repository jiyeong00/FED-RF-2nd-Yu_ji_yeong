// JS 페이지간 데이터 전달하기 : 메인페이지 JS - main.js
// 내 함수 가져오기
import mFn from "./my_function.js";

/********************************************************* 
[ 웹 페이지간 데이터 전달방식 ]
- 원래 html의 기본특성은 "비연결성"이다.
즉, 한번 요청된 페이지는 스스로 업데이트 되지 않는다!
페이지 간 데이터를 전달하는 방식이 요구되어짐.

1. Get 방식 : url뒤에 ?(물음표) 뒤에 (키=값) 쌍으로
데이터를 전달하는 방식(이 방식은 페이지셋팅에 적합하다!)

2. Post 방식 : 페이지 내부에 form태그로 감싸서
데이터를 입력받고 페이지에 숨겨서 다른 페이지로
전송하는 방식
(포스트방식은 편지처럼 봉투안에 숨겨져서 보내지는 것과 유사!)
-> 회원가입, 로그인 등 민감한 데이터를 전송할때 적합하다!

(참고로 Get방식은 3000byte 까지 데이터 전송이 가능하며
Post방식은 데이터 크기에 제한이 없다!)

[ Get방식으로 다른 페이지에 data전달하기 ]
1. url뒤에 데이터를 (키=값) 쌍으로 전달
2. 형식: url?키=값&키=값&...
3. ?(물음표)는 Get방식으로 데이터를 넘긴다는 시그널한 
    url에는 단 하나의 물음표만 허용됨!!!!
4. &(엔퍼센드)는 키=값 쌍단위를 구분해주는 구분자
*********************************************************/
// 서브 샵페이지를 호출하기 위한 GNB링크 셋팅하기!
// 호출시 Get02.html?키=값 형태로 호출함!
// 1. 대상선정 : #gnb a
const gnb = mFn.qsa("#gnb a");

// 2. 이벤트 설정
gnb.forEach((ele) => mFn.addEvt(ele, "click", goSub));

// 3. 함수만들기
function goSub() {
  // 1. 샵명 글자읽기
  let atxt = this.innerText;
  console.log("샵명", atxt);

  // 2. 서브 페이지로 이동하기
  // location.href = 페이지URL
  // 현재 브라우저창에서 URL이동함!
  location.href = "Get02.html?shop=" + encodeURIComponent(atxt);
} ///////// goSub 함수 ////////////

/********************************************************* 
    [ url로 보낼때 한글깨짐 방지하기! ]

    2byte문자(한글,일본어,한자,아랍어 등)를
    url로 보내면 규칙성 없이 깨져서 전달된다!
    따라서 규칙성 있게 변환하여 보내고
    받는 페이지에서 그 규칙을 풀어서 복원한다!

    1) 보낼때: encodeURIComponent(값)
    - 2byte문자를 변환하여 보냄

    2) 받을때: decodeURIComponent(값)
    - 2byte문자를 변환하여 받음(복원)

    -> 참고로 encodeURIComponent변환은 암호화가 아니다!
    변환하는 규칙이 있고 잘 보면 읽을 수 있다!

    엔코딩 표준에 따라 모든문자는 16진수 2 디짓
    (%xx)이나 4 디짓(%uxxxx) 데이터로 전환된다.
     예를 들어 빈칸(' ')은 %20, 세미콜론(;)은 %3B, 
    '한글'은 %uD55C%uAE00'이 된다.

    -> 참고) encodeURI(), decodeURI() -> 전체 URL처리시 사용!
    -> 주의) 최신브라우저에서 encodeURIComponent()를 안해도
    자동 인코딩처리를 해주는데 모든 브라우저 지원이 아닌것을 고려해서
    encodeURIComponent()처리를 해주는 것이 정석이다!

*********************************************************/
