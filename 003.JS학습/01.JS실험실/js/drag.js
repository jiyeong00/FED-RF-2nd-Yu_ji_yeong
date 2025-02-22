/// 05 드래그기본 JS

// 나의 함수 불러오기
import mFn from "./my_function.js";

// [ 함수의 추상화 순서]

// 1. 기존 하나만 구현한 저수준의 함수를 하나의 함수로 감싸서 호출시 실행하도록 만든다.

// 2. 작용대상을 추상화함수에 보내서 처리한다

/*************************************** 
    [ 드래그 기능 구현을 위한 이벤트 ]
    1. 딸 -> 마우스 포인터 누름 -> mousedown

    2. 각 -> 마우스 포인터 올라옴 -> mouseup

    3. 질질 -> 마우스 움직일때 -> mousemove
    -> 드래그 상태는 "딸"상태에서 "질질"하는것!
    
    mousedown 할때 드래그 상태변수값을 true로 변경
    mouseup 할때 드래그 상태변수값을 false으로 변경
    _______________________________________

    [ 드래그 기능구현 원리 ]

    1. 마우스 포인터 위치에 따른 변화 수치를
    계산하여 요소의 top,left 위치값으로 반영한다!

    2. 프로세스
    (1) mousedown 이벤트에서는 시작위치값 저장
    -> 모바일 이벤트 : touchstart
    (2) mousemove 이벤트에서는 움직인위치와 시작위치 차이저장
    -> 모바일 이벤트 : touchmove
    (3) mousemove에서 차이값을 타겟요소의 left,top값에 반영
    (4) mouseup 이벤트에서는 다음 이동을 위한 마지막위치 저장
    -> 모바일 이벤트 : touchend
    (5) mousemove 이벤트에서 마지막위치로 부터의 이동을 계산함


***************************************/

/**************************************************************** 
 [ 드래그 다중적용 호출 함수 만들기 ]
 함수명 : setDrag
 기능 : 드래그 적용 요소함수 호출하기
 ****************************************************************/
function setDrag(clsName) {
  // ele - 드래그 대상요소 클래스 이름 받는 변수
  console.log(clsName);
  //   1. 받은 클래스이름으로 요소를 수집한다
  let ele = mFn.qsa("." + clsName);

  //   2. 드래그함수 호출한다
  // HTMl컬렉션이므로 forEach메서드로 호출
  //   forEach((요서,순번,전체)=>{})
  ele.forEach((x) => goDrag(x));
  // z는 전체 요소집합 컬렉션임(z-index초기화로 필요함!)-안함!
} /////////// setDrag 함수 ////////////////

// z-index 공통관리 변수(전역변수)
let zNum = 0;

/**************************************************************** 
 [ 드래그 다중적용 함수 만들기 ]
 함수명 : goDrag
 기능 : 다중 드래그 기능 적용
 ****************************************************************/
function goDrag(ele) {
  // ele - 호출시 보내준 대상을 받는 변수
  // -> 하나씩 전달된 드래그 요소
  //   coll - 드래그 요소 전체컬렉션을 받는 변수
  // -> 마우스 다우니 z-index 대상 1로 만들때 다른요소는 0 변경 시 사용

  console.log(ele);

  // 드래그 적용대상 및 이벤트 설정하기///
  // 1.대상선정 : .dtg2 ->> 변경 ) 보내준 대상 HTML컬렉션
  //   const dtg = mFn.qs(".dtg2");
  const dtg = ele;

    // 드래그할 대상의 CSS 기본값을 셋팅한다!
  // 필수 셋팅요소는 position:relative / top:0 / left:0
  dtg.style.position = "relative";
  dtg.style.top = "0";
  dtg.style.left = "0";


  // 2. 변수만들기///
  // (1) 드래그 상태변수 만들기
  let dragSts = false;
  // false 는 드래그 아님, true는 드래그 상태
  // (2) 첫번째 위치 포인트 : first x, first y
  let firstX, firstY;
  // (3) 마지막위치 포인트 : last x, last y
  let lastX = 0,
    lastY = 0;
  // -> 중첩된 최종위치가 처음에는 계산되지 않았으므로 출발위치인 0값으로 초기값 넣어줌
  // 초기값을 안넣으면 최초에 값을 더할때 에러가 발생한다.

  // (4) 움직일때 위치 포인드 : move x, move y
  let moveX, moveY;
  // (5) 위치이동 차이 계산 결과변수 : result x, result y
  let resultX, resultY;

  /////////////////////////////////////////////////////////////////////////////////////
  // 3. 함수만들기///
  // 할당형 함수를 만들경우 이벤트 설정보다 위에서 만들어준다!
  // (1) 드래그 상태 true로 변경하는 함수
  const dTrue = () => (dragSts = true);
  // (2) 드래그 상태 false로 변경하는 함수
  const dFalse = () => (dragSts = false);
  // (3) 드래그 상태시 처리함수
  const dMove = (e) => {
    if (dragSts) {
      // console.log('드래그 중');

    // 1. 드래그 상태에서 움질일대 포인터 위치값
      // - 브라우저용 포인터 위치는 pageX, pageY를 사용!
      // - 모바일용 터치 스크린 터치위치는 
      // touches[0].screenX, touches[0].screenY
      // -> 두가지를 모두 사용하는 방법은 OR문 할당법을 쓴다!
      // -> 변수 = 할당문1 || 할당문2
      // ->>> 두 할당문중 값이 유효한(true)값이 할당됨!
      // DT용 코드와 Mobile코드를 동시에 셋팅할 수 있다!
      moveX = e.pageX || e.touches[0].screenX;
      moveY = e.pageY || e.touches[0].screenY;
      // console.log(e.touches[0]);
      // moveX = e.pageX;
      // moveY = e.pageY;

      // 2.움직일 위치 결과값 :
      // 움직일때 위치 포인트 - 첫번쨰 위치 포인트
      // moveX-firstX
      // moveY-firstY
      resultX = moveX - firstX;
      resultY = moveY - firstY;
      // -> 순수하게 움직인 거리를 계산함
      // 움직인위치 - 첫번째 위치 순으로 빼준이유
      // ->> top, left위치이동 양수 음수차를 고려한 순서

      // 3. 이동차를 구한 resultX, resultY값을 대상 위치값 적용
      // 대상 : 드래그 요소 dtg
      dtg.style.left = resultX + lastX + "px";
      dtg.style.top = resultY + lastY + "px";
      //처음엔 lastX, lastY값이 0으로 들어오고 2번째부터는 mouseup이벤트 발생부터 저장된 최종이동 위치값이 더해진다.

      // 값확인
      console.log(`moveX : ${moveX},moveY : ${moveY}`);
      console.log(`resultX : ${resultX},resultY : ${resultY}`);
    } ////if문//////////

    // 드레그 중일때만 주먹손, 드레그 아닐때 편손
    dtg.style.cursor = dragSts ? "grabbing" : "grab";
  }; //////////dMove///////////////

  // (4) 첫번째 위치포인트 세팅함수 : firstX,firstY 값세팅
  const firstPoint = (e) => {
        // DT용값과 Mobile값을 동시에 OR문으로 할당함!
    firstX = e.pageX || e.touches[0].screenX;
    firstY = e.pageY || e.touches[0].screenY;
        // firstX = e.pageX;
    // firstY = e.pageY;
    console.log("첫포인트:", firstX, "|", firstY);
  }; ////////firstPoint////////////

  // (5) 마지막 위치포인트 세팅함수 : lastX,lastY 값세팅
  // -> 이동 후 결과위치를 저장하여 다음 드래그 이동 시 그 결과를 중첩하여 반영하기위해
  const lastPoint = (e) => {
    // 이동결과 계산된 최종값을 기존값에 더함
    lastX += resultX;
    lastY += resultY;
    console.log("끝포인트:", lastX, "|", lastY);
  }; ////////lastPoint////////////

  ///////////////////////////////////////////////////////
  // 4.드래그 이벤트 설정하기///
  // (1) 마우스 다운 이벤트 함수연결하기
  mFn.addEvt(dtg, "mousedown", (e) => {
    // 드래그 상태값 변환
    dTrue();
    // 첫번째 위치포인트 세팅
    firstPoint(e);
    // 단독할당되지 않고 내부함수호출로 연결되어있으므로 이벤트(e) 전달을 토스해주어야 한다.

    dtg.style.cursor = "grabbing";

    // z-index 전역변수(zNum) 숫자를 1씩 높이기
    dtg.style.zIndex = ++zNum;

    console.log("마우스 다운,", dragSts);
  }); ////////////////mousedown////////////

  // (2) 마우스 업 이벤트 함수 연결하기
  mFn.addEvt(dtg, "mouseup", (e) => {
    dFalse();
    // 마지막 위치포인트 세팅
    lastPoint(e);

    dtg.style.cursor = "grab";

    console.log("마우스 업", dragSts);
  }); ////////////////mouseup////////////

  // (3) 마우스 무브이벤트 함수 연결하기
  mFn.addEvt(dtg, "mousemove", dMove);
  /////////////////mousemove////////////

  // (4) 마우스가 대상을 벗어나면 드래그상태값 false 처리하기
  mFn.addEvt(dtg, "mouseleave", () => {
    dFalse();
    // 과도한 드래그로 갑자기 아웃되면 lastX,lastY값이 세팅되지 못함
    // 이것을 기존요소의 위치값으로 보정함
    // 단 style위치값 코드는 px단위가 있으르모 parseInt처리함
    lastX=parseInt(dtg.style.left);
    lastY=parseInt(dtg.style.top);
    
    console.log("드래그 종료", dragSts);
  }); /////////////mouseleave////////////


  //////////// 모바일 이벤트 처리 구역 //////////

  // (1) 터치스타트 이벤트 함수연결하기
  mFn.addEvt(dtg, "touchstart", (e) => {
    // 드래그 상태값 true로 변경!
    dTrue();
    // 첫번째 위치포인트 셋팅!
    firstPoint(e);
    // 단독할당되지 않고 내부 함수호출로 연결되어있으므로
    // 이벤트 전달을 토스해줘야 한다!(전달변수 e)

    // z-index 전역변수(zNum) 숫자를 1씩 높이기
    dtg.style.zIndex = ++zNum;

    console.log("터치스타트!", dragSts);
  }); ///////// touchstart //////////

  // (2) 터치엔드 이벤트 함수연결하기
  mFn.addEvt(dtg, "touchend", () => {
    // 드래그 상태값 false로 변경!
    dFalse();
    // 마지막 위치포인트 셋팅!
    lastPoint();

    console.log("터치엔드!", dragSts);
  }); ///////// touchend //////////

  // (3) 터치무브 이벤트 함수연결하기
  mFn.addEvt(dtg, "touchmove", dMove);
  //////////// touchmove /////////////

} /////////////// goDrag 함수 ///////////////
/////////////////////////////////////////////


export default setDrag;
