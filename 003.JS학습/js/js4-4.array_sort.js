// JS4-4.배열정렬 및 검색 JS

// 나의 함수 불러오기
import mFn from "./my_function.js";

// console.log(mFn);

/****************************************************** 
    [ JS 배열의 정렬 ]
    -> 용어의 정의: 정렬이란?
    : 배열의 값을 기준으로 순서를 다시 정하는것!
    배열의 정렬은 sort() 메서드 사용!
    sort() 메서드를 사용하여 배열의값을 오른차순,내림차순으로
    정렬할 수 있음!

    [ sort() 메서드의 특징 ]
    1. 기본정렬 :  오름차순(1,2,3,.../a,b,c,...)
        -> 기본 내림차순 메서드 -> reverse()
    2. 원리 : 배열값을 문자열로 캐스팅(형변환)한후
            변환된 문자열을 비교하여 순서를 결정함
    (참고: undefined 값일 경우 배열 맨뒤에 배치함)
    -> 주의: 숫자를 비교해도 문자열로 비교하기 때문에
    "25"와 "100" 중 큰 숫자는 100이지만 25를 더 큰
    데이터로 인식한다! 
    -> sort() 메서드 비교함수로 처리!

    [ sort() 메서드 비교함수 ]
    -> sort() 메서드 내부에 2개의 전달값을 가지는 함수를 쓰면
    sort메서드 자체에서 값을 비교하여 배열값의 순서를 바꾼다!
    -> 숫자일 경우 빼기 연산을 함!

    숫자데이터배열.sort(function(a,b){return a-b;}) => 오름차순
    숫자데이터배열.sort((a,b)=>a-b) => 오름차순

    숫자데이터배열.sort(function(a,b){return b-a;}) => 내림차순
    숫자데이터배열.sort((a,b)=>b-a) => 내림차순

    -> a는 앞 데이터, b는 뒷 데이터

    [-> 기준정렬 : 오름차순]
    배열변수.sort() -> 기본정렬

    [-> 기준정렬 : 내림차순]
    배열변수.reverse() -> 기본정렬

    ++++++++++++++++++++++++++++++++++++++++++++++

    ->>> 숫자형, 문자형에 무관하게 하나로 처리하기!!!
     [ sort() 메서드만 사용하여 정렬잡기 ]

    ((비교함수사용))
    배열변수.sort(function(x,y){
        if(x>y) return 1;
        if(x<y) return -1;
        return 0;
    })
    
    -> 단순화하기(삼항연산자사용!)

    배열변수.sort(function(x,y){
        return x == y ? 0 : x > y ? 1 : -1;
    })

    -> 더 줄이기! (화살표함수 사용!)

    배열변수.sort((x,y)=> x == y ? 0 : x > y ? 1 : -1)


    -> 리턴값의 의미(오름차순)
    1) if(x>y) return 1; -> x가 y뒤에 옴 (리턴값 양수)
    2) if(x<y) return -1; -> x가 y앞에 옴 (리턴값 음수)
    3) return 0; -> x,y 정렬을 유지 (리턴값 0)

    -> 내림차순은 양수/음수만 반대로 써주면 된다!

    [ 정렬시 데이터 유의사항 ]

    1. 문자형일 경우 대소문자가 섞여있으면 대문자나 소문자중
    하나로 통일하여 비교해야함(toUpperCase()/toLowerCase())

    예)
        배열변수.sort((x,y)=>{
            let a = x.toUpperCase(),
                b = y.toUpperCase();
            
            return a == b ? 0 : a > b ? 1 : -1;
        })

    2. 날짜정렬도 숫자와 동일함
    (날짜데이터 자체가 숫자형으로 되어있음)

    3. 특정언어의 특수문자일 경우 
    localeCompare() 메서드로 문자열 비교를 한다!

    예) 특수문자 x변수를 y변수와 변환후 비교 
        x.localeCompare(y)

*************************************************************

      [ 배열의 검색 : find() / filter() / indexOf() ]

      1. find() 메서드
      (1) 검색후 첫번째 일치값 하나만을 리턴
      (2) 결과가 없으면 undefined 리턴(if문에서 false처리!)
      (3) 콜백함수구성 : function(val,idx,obj){}
          1) val : 처리중 배열의 값
          2) idx : 처리중 배열의 순번
          3) obj : 처리중 배열전체
      (4) 리턴데이터 : 배열의 값 하나(값의 데이터형)
      (5) 활용케이스 : 아이디검사 결과 리턴
      (6) 코드예 :
          변수 = 배열.find(v=>{
              if(v[속성명].indexOf(검색어)!==-1) return true;
          })
          -> 배열을 자동순회하여 if문에 해당되는 데이터가 있으면
          return true 하여 할당된 변수에 저장하고 문장이 바로 끝난다!


      2. filter() 메서드
      (1) 검색후 모든 일치값을 리턴
      (2) 결과가 없으면 빈배열 리턴([]->배열.length 값이 0)
      (3) 콜백함수구성 : function(val,idx,obj){}
          1) val : 처리중 배열의 값
          2) idx : 처리중 배열의 순번
          3) obj : 처리중 배열전체
      (4) 리턴데이터 : 배열형데이터(하나여도 배열값으로 넘어옴!)
      (5) 활용케이스 : 검색리스트 결과 리턴
      (6) 코드예 :
          변수 = 배열.filter(v=>{
              if(v[속성명].indexOf(검색어)!==-1) return true;
          })
          -> 배열을 자동순회하여 if문에 해당되는 데이터가 있으면
          return true 하여 다른값이 계속 나올때까지 배열로 값을
          할당변수에 저장한다!(배열을 전체순회함!)

      3. LIKE 검색방법 : 값의 일부만 넣어도 검색되는 방법
      -> indexOf(값) 을 사용함!
      결과값으로 문자열의 위치순번을 리턴하는데
      만약 없으면 -1을 리턴하므로 이것을 이용하여 
      조건문에 -1이 아닌경우가 검색결과가 있는 경우가 됨!
      예) 
      if(문자열.indexOf(검색문자열)!==-1){결과리턴}

*************************************************

      [ 객체를 배열로 변환하여 리스트 만들기 : 정렬시 필수! ]

      1. 대상: 배열이 아닌 객체형식으로 되어 있는 데이터를
              리스트로 만들고 이를 배열정렬 메서드를 사용코자할때
      
      2. 변경방법:
          (1) 객체의 속성(키)만 배열로 만들어준다!
          Object 객체는 객체를 위한 인터페이스 제공 객체임!
          -> Object.keys(객체) : 객체의 키로 배열만들기!
          -> Object.values(객체) : 객체의 값으로 배열만들기!

          : 하는일 - 객체의 속성을 모아 배열로 만들어준다!
          -> 키배열을 만드는 이유는?
          ->>> 키배열 === 값배열 왜????
          -> 객체는 키를 통해 값을 부를 수 있기 때문이다!

          (2) 변경확인 
              변경전 : {속성1:값1,속성2:값2}
              결과:
              키배열 - Object.keys(객체)
              변경후 : [속성1,속성2]

              값배열 - Object.values(객체)
              변경후 : [값1,값2]

          (3) 객체의 키를 값으로 하는 배열로 정렬을 변경할 수 있다
          -> Object.keys(객체).sort()

          (4) 객체의 값을 값으로 하는 배열로 정렬을 변경할 수 있다
          -> Object.values(객체).sort()

          (5) 객체값으로 구성되는 배열일 경우 아래와 같이 변환한다
          -> 객체를 변환후 map으로 값을 다시 담아준다!

          객체변수 = 객체

          [ 한번에 값배열로 변환 : 오브젝트.키쓰.맵! ]
          새변수 = Object.keys(객체변수).map(v=>객체변수[v])
          새변수 = Object.values(객체변수).map(v=>객체변수[v])

          ((유의사항: 키배열과 값배열 중 무엇을 써야하나?))
          -> 키가 의미가 있는 경우 키를 기준으로 사용하여 값도 활용하며
          키의 의미가 단순 분류라면 값을 그대로 배열로 변환하여 사용한다!

      3. 새로구성한 객체 변환 배열로 기존 배열 메서드를 사용하여
          정렬, 검색 후 정렬 등을 수행한다!!


******************************************************/

// 숫자값 배열
const arrNumber = [4, 5, 8, 10, 2, 1, 9, 3, 7, 6];

// 예를 위한 숫자값 배열
const arrNumber2 = [380, 1000, 245, 2278];

// 문자값 배열
const arrString = ["파", "타", "하", "가", "바", "사", "다", "라", "차"];

// sort()는 기본 문자로 처리하므로 숫자는 내부함수로 빼기 연산처리함!
// // console.log('숫자배열:',arrNumber2);
// // console.log('숫자배열 오름차순정렬sort():',
// arrNumber2.sort());
// // console.log('숫자배열 오름차순정렬sort((a,b)=>a-b):',
// arrNumber2.sort((a,b)=>a-b));
// // console.log('숫자배열 내림차순정렬sort((a,b)=>b-a):',
// arrNumber2.sort((a,b)=>b-a));

// // console.log('문자배열:',arrString);
// // console.log('문자배열 오름차순 sort():',
// arrString.sort());
// // console.log('문자배열 내림차순 reverse():',
// arrString.reverse());

///////////////////////////////////
// 배열 데이터 화면 출력하기 ////////

// 1.  숫자로만 된 배열의 화면 뿌리기
// map() 메서드로 배열값을 태그로 감싸서 출력하기!

// (1) 출력대상: .showNum
const showNum = mFn.qs(".showNum");

// (2) map() 메서드 없이 배열값을 이미지태그로
// 변환하여 코드 만들기 함수
const returnTag = (x) => {
  // x 는 배열 전달변수
  // 1.태그 저장용 변수
  let hcode = "";
  // 2.배열만큼 순회하여 태그 만들기
  x.forEach((v) => {
    // // console.log('나야나!',v);
    hcode += `
        <img 
        src="./images/num/num_0${v}.png" 
        alt="숫자${v}이미지">
        `;
  }); ///// forEach ///////

  // 3.코드리턴하기
  return hcode;
}; ////// returnTag 함수 //////////

// (3) 배열 숫자 데이터 만큼 이미지로 변환하여 화면출력
const showImgNum = (arrObj) => {
  // arrObj 전달된 배열
  showNum.innerHTML = arrObj
    .map(
      (v) => `
    <img 
    src="./images/num/num_0${v}.png" 
    alt="숫자${v}이미지">
    `
    )
    .join("");
}; //////// showImgNum 함수 //////////

/*********************************************** 
/////////// [ map() 메서드의 특징 ] /////////////
map((배열값,순번,전체배열)=>{})
1. 메서드를 사용한 자리에 결과가 배열로 리턴됨
2. 원본배열은 그대로 보존됨!
3. 리턴 키워드나 변수, 함수 등 처리방법 불필요
4. 이를 변수에 할당하면 새로운 배열이 생성됨!
5. 문자열로 찍어주려면 변수메서드 join()사용!
-> join('') 빈문자열 결합을 사용하면 배열값이
깨끗하게 문자열 덩어리로 그대로 출력된다!!!
->>> 배열.map().join('') -> 배열 맵쪼잉~!
-> join()을 안쓰면 배열의 기본값이 콤마로 연결되어
할당되는데 콤마를 없애려면 반드시 join()을 써야함! 
***********************************************/
// console.log("원본 배열:", arrNumber2);

// console.log(
//   "원본 배열로 태그작성:",
//   arrNumber2.map((v) => `<숫자>${v}</숫자>`)
// );

// console.log(
//   "원본 배열로 태그작성한 배열을 문자열로 변경하기:",
//   arrNumber2.map((v) => `<숫자>${v}</숫자>`).join("")
// );

// console.log(
//   "원본 배열로 데이터작성:",
//   arrNumber2.map((v, i) => `👓회원번호${i + 1}:${v}포인트`)
// );
// console.log("원본 배열:", arrNumber2);

// const showImgNum = () => {
//     showNum.innerHTML = returnTag(arrNumber);
// }; //////// showImgNum 함수 //////////

// (4) 최초출력호출
showImgNum(arrNumber);

// (5) 정렬 기준에 선택박스 변경 이벤트 발생시
// 정렬 변경하기 (오름차순/내림차순)

// (5-1) 대상: #sel 선택박스
const selBox = mFn.qs("#sel");

// (5-2) 이벤트 연결하기 : 이벤트 종류 - change
mFn.addEvt(selBox, "change", (e) => changeSort(e, arrNumber));

// (5-3) 정렬변경함수 만들기
function changeSort(e, arrObj) {
  // e - 이벤트발생 요소의 전달된 이벤트변수
  // arrObj 배열전달변수 -> 원본배열을 담음(주소복사됨!)
  // 원본배열을 보존키위해 깊은복사를 함!
  // 배열값이 일반배열값이므로 스프레드 연산자사용!
  arrObj = [...arrObj];
  // -> 다시 새로운 배열로 값이 복사됨!!!

  // 1. 선택옵션값 읽어오기
  let optVal = e.currentTarget.value;
  // 추가: 이벤트발생요소(선택박스)의 아이디 읽어오기
  let selId = e.currentTarget.id;
  // console.log("선택값:", optVal, "/아이디:", selId);

  // 2. 정렬변경 분기하기
  // 2-1. 오름차순 : 값 1
  if (optVal == 1) {
    arrObj.sort((a, b) => (a == b ? 0 : a < b ? -1 : 1));
    // ((해석))
    // 앞값 뒷값 같으면 0, 뒷값이 크면 -1, 앞값이 크면 1
    // 즉, 앞값이 크면 자리를 바꿔서 유지하므로 오름차순정렬

    // ((공통 정렬 처리하기))
    // 문자든 숫자든  sort()메서드의 내부적 처리에서
    // 앞뒤 문자가 같으면 0, 뒷문자가 크면 -1,
    // 뒷문자가 작으면 1로 리턴값을 처리하면 된다!
    // -> [숫자 시그널]:
    // 0 아무것도 안함,1 바꿔서 유지,-1 그대로 유지

    // -> [내부적 처리란?]
    // 문자일 경우 '가'>'나' 1 로 처리할 경우
    // '나','가'  로 순서를 바꿔서 처리함(내림차순)
    // 즉, 문자열도 순서대로 글자 알파벳, 가다나라 순
    // 등 특정순서기준이 브라우저에 구현되어 있음!

    // 빼기처리는 문자 등 기타 데이터는 처리불가함!
    // sort() 빼기연산처리 : 앞수-뒷수
    // (양수결과일경우 순서바꾸기함!)
    // arrObj.sort((a,b)=>a-b);
  } ///// if //////
  // 2-2. 내림차순 : 값 2
  else if (optVal == 2) {
    arrObj.sort((a, b) => (a == b ? 0 : a < b ? 1 : -1));
    // ((해석))
    // 앞값 뒷값 같으면 0, 뒷값이 크면 1, 앞값이 크면 -1
    // 즉, 뒷값이 크면 자리를 바꿔서 유지하므로 내림차순정렬

    // 빼기처리는 문자 등 기타 데이터는 처리불가함!
    // sort() 빼기연산처리 : 뒷수-앞수
    // (양수결과일경우 순서바꾸기함!)
    // arrObj.sort((a,b)=>b-a);
  } ///// else if //////

  // ((주의!!!))
  // 원본배열을 정렬후엔 원본배열은 없어진다!!!ㅠ.ㅠ
  // 원본배열을 다른변수에 할당후 다른변수를 정렬후엔
  // 여전히 원본배열은 없어진다!!!ㅠ.ㅠ

  // 3. 정렬변경된 배열 화면에 출력하기
  // 선택박스 아이디에 따라 호출해주는 함수가 다름!
  if (selId == "sel") showImgNum(arrObj);
  else if (selId == "sel2") showSpanText(arrObj);

  // 전달변수에 할당된 배열확인하기
  // console.log("정렬후 할당배열:", arrObj);
  // 원본배열확인하기
  // console.log("정렬후 원본배열:",
  // selId == "sel" ? arrNumber : arrString);
} ////////// changeSort 함수 /////////////

//////////////////////////////////////////
// 2. 문자로만 된 배열의 화면 뿌리기 //////
// map() 메서드로 배열값을 태그로 감싸서 출력하기

// (1) 출력대상 : .showNum2
const showText = mFn.qs(".showNum2");

// (2) 배열만큼 태그를 넣고 문자출력하기
const showSpanText = (arrObj) => {
  // arrObj 전달된 배열
  showText.innerHTML = arrObj.map((v) => `<span>${v}</span>`).join("");
}; ///////// showSpanText 함수 /////////

// (3) 텍스트 출력함수 최초호출
showSpanText(arrString);

// (4) 텍스트 정렬 선택박스 변경시 정렬함수 호출하기!
// (4-1) 대상: #sel2
const selBox2 = mFn.qs("#sel2");

// (4-2) 이벤트 연결하기 : 이벤트 종류 - change
// 연결된 함수는 위의 숫자정렬한 정렬함수를 사용한다!
mFn.addEvt(selBox2, "change", (e) => changeSort(e, arrString));

////////////////////////////////////////
// 3. 객체 데이터 배열의 정렬 ///////////
////////////////////////////////////////

// 3-1. 데이터 : 객체데이터 배열
// 데이터구조 :
// (1) 순번 - idx / (2) 제목 - tit / (3) 내용 - cont
const list1 = [
  {
    idx: 8,
    tit: "나는 구누?",
    cont: "공동구매) 슬로건 공구 (계좌와 네이버폼)",
  },
  {
    idx: 4,
    tit: "여기는 어디?",
    cont: "총공 공지] 오늘부터 일 2회, 총공 진행합니다",
  },
  {
    idx: 1,
    tit: "나야나",
    cont: "연합 갈라 서포트 계좌오픈",
  },
  {
    idx: 15,
    tit: "이제 얼마나 남은거니?",
    cont: "음악프로그램에 출연 요청글도 써볼까요?",
  },
]; /////////////// list1 /////////////

// console.log(list1);

// 3-2. 출력대상 : .showList3
const showList3 = mFn.qs(".showList3");

// 3-3. 배열 데이터로 코드 만들기 함수
const updateCode = (arrData, exBox) => {
  // arrData - 배열 데이터 / exBox - 출력할 박스

  // 태그 출력하기
  exBox.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>내용</th>
        </tr>
      </thead>
      <tbody>
        ${
          arrData.length == 0
            ? `<tr>
            <td colspan="3">
              검색하신 데이터가 없습니다!
            </td>
          </tr>`
            : arrData
                .map(
                  (v) => `
              <tr>
                <td>${v.idx}</td>
                <td>${v.tit}</td>
                <td>${v.cont}</td>
              </tr>
            `
                )
                .join("")
        }
      </tbody>
    </table>
  `;
}; /////////// updateCode 함수 //////////////

// 3-4. 코드 만들어 출력하는 함수 호출하기
// updateCode(배열데이터,출력박스)
updateCode(list1, showList3);

// 3-5. 정렬변경 이벤트 발생시 실제 정렬 변경하기 ////
// - change 이벤트 대상 선택박스들
// (1) 정렬종류 대상: .sel3
const sel3 = mFn.qs(".sel3");
// (2) 정렬기준 대상: .cta3
const cta3 = mFn.qs(".cta3");

// (3) 정렬종류 대상 선택 변경시
// -> 실제 정렬을 적용하여 리스트를 갱신한다!
// -> 정렬 적용시 정렬기준 대상 선택항목을 가져가야함!
mFn.addEvt(sel3, "change", 
(e) => sortingFn(e, cta3.value, list1, showList3));

// (4) 정렬기준 대상 선택 변경시
// -> 정렬종류 대상 초기화하기("정렬선택"으로 변경!)
mFn.addEvt(cta3, "change", () => {
  // 정렬종류 첫번째 값은 value가 "0"이므로
  // 이것을 value 에 할당하면 선택박스값이 첫번째로 변경된다!
  sel3.value = "0";
}); //////////// change 이벤트 함수 //////////

// 3-6. 정렬함수 만들기 //////////////
function sortingFn(evt, cta, arrData, exBox) {
  // evt - 이벤트 발생요소의 이벤트객체 전달
  // cta - 정렬기준값(객체속성명:키명)
  // arrData - 배열 데이터
  // exBox - 출력 대상박스
  // console.log(evt,arrData,exBox);

  // 전달된 배열값을 변수에 그냥 할당하면 얕은 복사가 되어서
  // 정렬시 원본의 정렬변경을 막을 수 없다!
  // 따라서 깊은복사를 하여 원본과 분리시킨다(값복사를 한다!)
  // 일반적인 값의 배열 깊은 복사는 
  // 새변수 = [...원본배열변수] -> 이렇게 하지만
  // 값이 객체일 경우 이 방식은 효과가 없다!
  // 효과있는 방법은?
  // 새변수 = JSON.parse(JSON.stringify(배열원본변수))
  let xxx = JSON.parse(JSON.stringify(arrData));
  // xxx는 원본과는 분리된 같은 배열값의 새로운 배열이다!

  // 1. 선택값 읽어오기(오름차순:1,내림차순:2)
  let selVal = evt.target.value;
  console.log("선택값:", selVal);

  // 검색기준 선택박스 값 읽어오기
  console.log("정렬기준:", cta);

  // 2. 정렬분기하기 ////////////////
  // 2-1. 오름차순
  if (selVal == 1) {
    xxx.sort((a, b) => (a[cta] == b[cta] ? 0 : a[cta] > b[cta] ? 1 : -1));
  } /// if /////
  // 2-2. 내림차순
  else if (selVal == 2) {
    xxx.sort((a, b) => (a[cta] == b[cta] ? 0 : a[cta] > b[cta] ? -1 : 1));
  } /// else if /////

  console.log("정렬결과:", xxx);

  // 3. 정렬결과 리스트 업데이트하기
  updateCode(xxx, exBox);

  console.log("검색결과변수값:",searchResult);
} ////////////// sortingFn 함수 ////////////////

//////////////////////////////////////////////
////////////// 배열의 검색 !!! ////////////////
//////////////////////////////////////////////

// 4. 객체데이터 검색후 배열의 정렬 ////////////

// 4-1. 출력대상선정: showList4
const showList4 = mFn.qs(".showList4");
// console.log(showList4);

// 4-2. 데이터셋팅 : 객체 데이터 배열
const list2 = [
  {
    idx: 58,
    tit: "당근마켓에 가자",
    cont: "당근마켓이 항상 좋은건 아니야~!!ㅠ.ㅠ",
  },
  {
    idx: 15,
    tit: "당근마켓에 가자",
    cont: "당근마켓이 정말로 싸고 좋다구~!",
  },
  {
    idx: 74,
    tit: "점심에 뭐먹지? 당근이지!",
    cont: "오스틴님 생일 서포트 안내",
  },
  {
    idx: 18,
    tit: "직돌이는 쉬고싶다~!",
    cont: "활동정지에 대한 파생글 무통보 삭제 및 경고",
  },
  {
    idx: 104,
    tit: "올해는 다른 회사로 이직한다!",
    cont: "⚜️갈라콘 서포트에 많은 참여 부탁드립니다!",
  },
]; /////////////// list2 /////////////

// 4-3. 코드 만들어 출력하는 함수 호출하기
// updateCode(배열데이터,출력박스)
updateCode(list2, showList4);

// 4-5. 검색 이벤트 설정하기 /////////
// 4-5-1. 대상선정 :
// (1) 검색기준 선택박스
const searchCta4 = mFn.qs(".search-cta4");
// (2) 검색버튼
const btnSearch = mFn.qs(".sbtn");
// (3) 검색어 입력창
const keyWord = mFn.qs("#stxt");
// (4) 전체버튼
const btnTotal = mFn.qs(".fbtn");
// console.log(searchCta4,btnSearch,keyWord);

// 4-5-2. 이벤트 설정하기 ////
// (1) 검색버튼
mFn.addEvt(btnSearch, "click", searchingFn);
// (2) 전체버튼 클릭시 처음 리스트 보이기
mFn.addEvt(btnTotal, "click", () => {
  // 1. 처음리스트 다시 만들기
  updateCode(list2, showList4);
  // 2. 검색어 지우기
  keyWord.value = "";
  // 3. 검색결과변수 초기화
  searchResult = null;
  // 4. 정렬선택값을 초기화
  sel4.value = "0";
});
// (3) 입력창 키보드입력시 엔터키 구분하여 검색하기
mFn.addEvt(keyWord, "keypress", (e) => {
  // 엔터키는 키코드가 13번임
  if (e.keyCode == 13) {
    searchingFn();
  } ////// if //////
});

// 검색결과 배열값 공유변수
let searchResult;

// 4-6. 검색함수 만들기 ////////////////
function searchingFn() {
  // 1. 검색 기준값 읽어오기
  let cta = searchCta4.value;
  // 2. 검색어 읽어오기
  let kword = keyWord.value;
  // 3. 검색어가 없으면 돌아가!
  if (kword == "") {
    alert("검색어를 입력해주세요!");
    // 입력창에 포인터 들어가기! focus()
    keyWord.focus();
    return;
  }
  console.log(cta, kword);

  // 4. 검색기준으로 검색어를 사용하여 검색하기
  // 검색대상 데이터 배열 : list2
  // 사용 배열메서드 : filter()
  let result = list2.filter((v) => {
    // v는 배열값
    // 만약에 찾는문자가 전체문자열에 있으면 -1이 아님!!!
    // -> 숫자이면 에러남! 왜? indexOf()는 문자열전문!
    // 무조건 문자형으로 변환한다! String(대상)
    if (String(v[cta]).indexOf(kword) != -1) return true;
    // 이 조건에 리턴값을 true로 하면 해당 데이터를
    // 배열로 만들어서 순서대로 변수에 할당한다!
    // 여기서는 result변수가 결과 배열 변수가 된다!
    // console.log(v[cta].indexOf(kword));
  });
  // 전체문자열.indexOf(문자열) -> 해당문자열이 전체문자열에서
  // 몇번째에 있는지 그 순번을 리턴해 주는 메서드다!
  // 만약 없으면 -1값을 리턴한다!!!

  // 결과찍기
  console.log("검색결과:",result);
  console.log("원본데이터:",list2);

  // 5. 결과를 화면에 보여주기 : updateCode 함수호출
  updateCode(result, showList4);

  // 6. 검색결과를 공유변수에 저장하기
  searchResult = result;

  // 7. 검색후엔 항상 정렬선택값을 초기화해준다!
  sel4.value = "0";
} ////////////// searchingFn 함수 ///////////

// 4-7. 정렬변경 이벤트 발생시 실제 정렬 변경하기 ////
// - change 이벤트 대상 선택박스들
// (1) 정렬종류 대상: .sel4
const sel4 = mFn.qs(".sel4");
// (2) 정렬기준 대상: .cta4
const cta4 = mFn.qs(".cta4");

// (3) 정렬종류 대상 선택 변경시
// -> 실제 정렬을 적용하여 리스트를 갱신한다!
// -> 정렬 적용시 정렬기준 대상 선택항목을 가져가야함!
mFn.addEvt(sel4, "change", 
(e) => sortingFn(e, cta4.value, 
  searchResult?searchResult:list2, showList4));
  // searchResult값에 할당되어 true 이면 이 값을 보내고
  // 아니면 원본 list2를 보낸다!

// (4) 정렬기준 대상 선택 변경시
// -> 정렬종류 대상 초기화하기("정렬선택"으로 변경!)
mFn.addEvt(cta4, "change", () => {
  // 정렬종류 첫번째 값은 value가 "0"이므로
  // 이것을 value 에 할당하면 선택박스값이 첫번째로 변경된다!
  sel4.value = "0";
}); //////////// change 이벤트 함수 //////////

///////////////////////////아마 여기서부터 새로운거 나 모르는거임 그냥 복붙

// 5. 객체원본 배열로 변환하기
// (1) 데이터 : 객체데이터
const list3 ={ 
  item1:{
      idx: 45,
      tit: "강남당근마켓에 가자",
      cont: "다니엘 당근마켓이 정말로 싸고 좋다구~!",
  },
  item2:{
      idx: 94,
      tit: "나라점심에 뭐먹지?",
      cont: "강남오스틴님 생일 서포트 안내",
  },
  item3:{
      idx: 22,
      tit: "다니엘 직돌이는 쉬고싶다~!",
      cont: "마동석 활동정지에 대한 파생글 무통보 삭제 및 경고",
  },
  item4:{
      idx: 111,
      tit: "라면 올해는 다른 회사로 이직한다!",
      cont: "나라 갈라콘 서포트에 많은 참여 부탁드립니다!",
  },
}; /////////////// list3 ///////////// 

console.log("list3 원본객체:",list3);
console.log("list3의 키배열:",Object.keys(list3));
console.log("list3의 값배열:",Object.values(list3));

// 5-1. 출력대상선정: showList5
const showList5 = mFn.qs(".showList5");
// console.log(showList5);

// 5-2. 객체데이터를 값배열로 변환하여 변수할당
const arrList3 = Object.values(list3);

// 5-2. 객체데이터를 값배열로 변환하여 
// 리스트생성함수에 보내어 리스트 화면 출력하기
updateCode(arrList3, showList5);

// 5-3. 정렬변경 이벤트 발생시 실제 정렬 변경하기 ////
// - change 이벤트 대상 선택박스들
// (1) 정렬종류 대상: .sel5
const sel5 = mFn.qs(".sel5");
// (2) 정렬기준 대상: .cta5
const cta5 = mFn.qs(".cta5");


// (3) 정렬종류 대상 선택 변경시
// -> 실제 정렬을 적용하여 리스트를 갱신한다!
// -> 정렬 적용시 정렬기준 대상 선택항목을 가져가야함!
mFn.addEvt(sel5, "change", 
(e) => sortingFn(e, cta5.value, arrList3, showList5));
  // list3는 객체이므로 값배열로 변환한 배열을 보낸다!

// (5) 정렬기준 대상 선택 변경시
// -> 정렬종류 대상 초기화하기("정렬선택"으로 변경!)
mFn.addEvt(cta5, "change", () => {
  // 정렬종류 첫번째 값은 value가 "0"이므로
  // 이것을 value 에 할당하면 선택박스값이 첫번째로 변경된다!
  sel5.value = "0";
}); //////////// change 이벤트 함수 //////////
