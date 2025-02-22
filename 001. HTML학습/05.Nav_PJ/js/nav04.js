///nav04 JS

// 네비게이션 유형4 JS - nav04.js
// 세로네비 서브별 드롭다운 세로형

const myFn = {
  // 요소선택함수 ////////
  qs: (x) => document.querySelector(x),
  qsEl: (el, x) => el.querySelector(x),
  qsa: (x) => document.querySelectorAll(x),
  qsaEl: (el, x) => el.querySelectorAll(x),

  // 이벤트셋팅함수
  addEvt: (ele, evt, fn) => ele.addEventListener(evt, fn),
}; /////// domFn 객체 /////////////

// 1. 구현요구사항:
// 상위 메뉴 클릭시 하위 메뉴 나타나기
// 영역을 벗어날때 하위메뉴 닫기

// 2. 대상선정
// 이벤트 대상: .gnb>ul>li
const gnbList = myFn.qsa(".gnb>ul>li");
// 변경 대상: .smenu -> 클릭된 이벤트 대상 하위요소
const smenu = myFn.qs(".smenu");

console.log("대상 :", gnbList, smenu);

//   3. 이벤트 설정하기
gnbList.forEach((ele) => {
  // 클릭시 메뉴 열기
  myFn.addEvt(ele, "click", showMenu);
  // 마우스 떠날때 메뉴 닫기
  myFn.addEvt(ele, "mouseleave", hideMenu);
}); ////foreach////

// 4. 함수 만들기
// 4-1. 서브메뉴 보이기 함수
function showMenu() {
  // 1. 허위의 서브메뉴 가져오기 : 서브메뉴없으면null
  let smenu = myFn.qsEl(this, ".smenu");
  // html 컬렉션 수집시 요소가 없으면 null처리함!
  // null도 데이터형, if문에서 false처리됨
  // null = 빈값
  // 호출확인
  console.log("호출확인", smenu);

  // 2. 조건분기하기 : 서브가 있는 경우 높이값 만들기
  // 높이값은 하위의 ol요소의 높이값을 읽어와서 .smenu의 height값으로 넣어준다.

  if (smenu) {
    // .smenu가 null이 아닌 경우만 들어옴
    // 2. 서브메뉴 ol요소 높이값 읽어오기
    let hval = myFn.qsEl(smenu, "ol").clientHeight;
    // clientHeight는 요소의 높이값
    console.log("높이값", hval);

    // 3. 높이값 적용하기
    // 대상 : smenu
    smenu.style.height = (smenu.clientHeight === 0 ? hval : 0) + "px";
    // smnu의 높이값이 0이냐? 맞으면 hval적용 / 아니면 0값 적용

} ///if : smenu가 있는 경우 ///

//  -> 서브메뉴가 없는 상위 li가 클릭돼도 모두 닫기 처리!
// 4. 기타 다른 서브메뉴가 열렸다면 모두 닫아준다.
// gnb 상위 li를 모둔 순회한다
gnbList.forEach(ele=>{//ele - 각 li요소
    // isSameNode()메서드 : 순회중 같은 노드(요소)인지 판별해주는 기능을 가짐(같으면 true)
    // -> 여기서 this키워드는 함수를 호출한 li다
    let isSame = ele.isSameNode(this);
    console.log('서브닫기 체크',ele,isSame);

    // 2.같은 요소가 아닌 경우만 하위 smenu를 가져옴
    if(!isSame){///!(NOT연산자)로 flase일때 true로 변경
        let smenu = myFn.qsEl(ele,'.smenu');
        if (smenu) { //사브메뉴가 있는 경우
            if(smenu.clientHeight!=0){ //서브메뉴 높이값이 0이 아닌 경우
                console.log("0만들어");
              smenu.style.height='0px';
            }
        }// smenu IF문
    }// !isSame IF문
});///forEach///
} //////////////showMenu함수/////////////////////

// 4-2. 서브메뉴 숨기기 함수
function hideMenu() {
  // 1. 허위의 서브메뉴 가져오기 : 서브메뉴없으면null
  let smenu = myFn.qsEl(this, ".smenu");

  console.log("메뉴 숨기기");
  
  //   2. 분기하기
  if (smenu) {
    if(smenu.clientHeight!=0){
        console.log("0만들어");
      smenu.style.height='0px';
    }
  } ///if///

} /////////////hideMenu////////////////////
