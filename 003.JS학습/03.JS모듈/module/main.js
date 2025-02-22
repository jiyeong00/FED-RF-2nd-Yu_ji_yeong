// 모듈연습 메인JS - main.js

// 공통함수 불러오기
import myFn from "./my_function.js";

// {1. 텍스트 데이터 불러오기 방법1 - 보내준 이름 그대로 쓰기 }
// import { mTitle,sTitle,personInfo,mvData } from './text-data.js';

// [2. 텍스트 데이터 불러오기 방법2 - 별칭 사용하기 ]
// ->> 별칭을 지었으면 반드시 별칭으로 사용해야한
// import {
//   mTitle as mTit,
//   sTitle as sTit,
//   personInfo as pInfo,
//   mvData as mDt,
// } from "./text-data.js";

// [3. 한꺼번에 불러오기 - *사용 ]
// ->> import * as 별칭 from '경로';
// ->> 별칭이름으로 한꺼번에 불러온 값을 객체에 담음
// ->> 모듈용 전용객체에 저장하여 객체.변수명으로 사용한다.
//      예) console.log(txtData,txtData.mTitle);
import * as txtData from "./text-data.js";

// 불러온 객체확인
console.log(txtData, txtData.mTitle);

// [ 4. export default로 내보낸 단일 함수 불러오기 ]
// 가져올때는 다른 이름이여도 됨
// import makeMessage from "./msg_format.js";
import makeMsg from "./msg_format.js";

console.log(makeMsg);

/*************************************************** 
    
    [ import 형식 ]
    import 전달변수 from 파일경로;
      (1) import문법을 쓰려면 호출하는 html script요소에 type="module" 속성을 반드시 세팅해야한다.
      (2) 반드시 가져올 모듈JS에서 export를 해줘야함!
      (3) from 뒤에 경로는 반드시 상대경로일 경우 같은 위치일 지라도 ./ 표시를 꼭해야함!(없으면 안나옴!)(/,./,../ 표시필수)
      (4) 모듈구성은 반드시 서버형식으로 열어야 작동한다!
        > (http://...) Live Server로 열기때문에 볼 수 있음!
        -> 로컬파일로 열면 작동안됨!
      (5) 모듈화의 모든 export파일에서도 import는 가능하다.

    [ import의 사용방법 ]
    1. export default인 경우
        - import 변수 from '경로';
        -> 변수는 변경가능
    2. export {}인 경우 <<<중괄호로 내보내는 경우
        - import {보내준 변수명,....} from '경로'

    [ import 시 변수명 변경하기 : 별칭사용하기 ]
    import {전달변수 as 별칭} from 파일경로;
    예) import {mymymy as m} from 파일경로;
    -> 별칭 사용이유:  단순변경요구, 같은이름 변수 피하기

____________________________________________________

    [ 모듈화를 위한 구성 ]
    1. 데이터 처리하기 위한 JS
    -> text-data.js
    2. 구체적인 데이터 구성처리를 위한 JS
    -> msg_format.js
***************************************************/

// DOM선택함수 객체 불러오기

// 요구사항 : 각 출력박스에 불러온 메시지 출력하기
// 1. 대상선정 : 출력박스
// (1) 타이틀 출력박스 : .tpart
const titBox = myFn.qs(".tpart");
// (2) 내용출력박스 : #demo
const contBox = myFn.qs("#demo");
// (3) 영화정보 출력박스 : .mvpart
const mvBox = myFn.qs(".mvpart");

console.log("대상 : ", titBox, contBox, mvBox);

// 2. 변경적용하기
// (1) 타이틀 출력하기 : 큰제목 + 작은 제목
titBox.innerHTML = `
<h2>${txtData.mTitle}</h2>
<h3>${txtData.sTitle}</h3>
`;

// (2) 내용 넣기 : 이름과 나이를 소개하는 메시지 넣기
contBox.innerHTML = makeMsg("공유", 46);
contBox.innerHTML += makeMsg("톰행크스", 60);
contBox.innerHTML += makeMsg("졸리", 49);

// 이름과 나이가 세팅된 personInfo 배열을 순회하여 메시지 함수를 호출해서 메시지를 찍어준다.
// txtData.personInfo.forEach(function(v) {
//   contBox.innerHTML += makeMsg(v[0], v[1]);
// });
// >>짤게 쓴거
// txtData.personInfo.forEach(v=>
//   contBox.innerHTML += makeMsg(v[0], v[1]);
// );

// (3) 영화정보 뿌리기
// ol>li 형식으로 .mvData 박스에 영화정보를 구성함
// 데이터는 txtData.mvData 배열임
mvBox.innerHTML="<h2>♥ 영화위시리스트 ♥</h2>"

txtData.mvData.forEach(v=>{
    mvBox.innerHTML+=`
    <ol>
        <li>★제목 : ${v[0]}</li>
        <li>★장르 : ${v[1]}</li>
        <li>★감독 : ${v[2]}</li>
        <li>★주연 : ${v[3]}</li>
        <li>★한마디 : ${v[4]}</li>
    </ol>
    `;
});

/********************************************************************* 
 * [ 선언된 변수를 export default 하기 ]
   1. 일반적으로 선언과 할당을 한 변수는 아래쪽에서 export default로 그 이름을 써주면 된다.
     > 단, 받는 곳에서 import시 이름은 중요치 않다!
    const aa=[];
    export default aa;

   2. 변수앞에 export default를 쓸 때는 변수선언과 변수명은 쓸 수 없다.
    // 배열인 경우
     export default[];
    //  객체인 경우
     export default{};
    //  함수인 경우
     export default()=>{};

   
 *********************************************************************/


