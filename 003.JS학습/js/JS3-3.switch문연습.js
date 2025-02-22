//JS3-3.switch문연습 JS

/**************************************************** 
함수명: changeImg
기능: 버튼별 스틸컷 변경
원리: 클릭된 버튼 텍스트를 읽어 구분하여 if문을 작성 후 변경할 이미지 경로를 만들어서 실제 이미지 src에 할당하여 이미지 변경
****************************************************/

function changeImg() {
    //호출된 요소 자신은 this 키워드로 처리한다.
    // 0. this 키워드를 활용하여 전달된 요소의 버튼텍스트 읽어오기 < 구분하기 위해
    var btnTxt = this.innerText;
    //innerText를 이퀄 오른쪽에 쓰면 요소의 문자데이터 읽어옴
    // 반면 왼쪽에 쓰고 오른쪽에 값을 할당하면 값설정이 됨
    
    // 1.함수호출확인
    console.log("changeImg함수 호출됨",btnTxt);

    // 2. 버튼별 src이미지 경로 만들기
    var isrc;
    switch (btnTxt) {
        case "포스터": isrc="./images/ala1.jpg"; break;
        case "장면1": isrc="./images/ala2.jpg"; break;
        case "장면2": isrc="./images/ala3.jpg"; break;
        case "장면3": isrc="./images/ala4.jpg"; break;
    }//switch문

    // 3. 변경대상 : #scene ->scene변수

    /************************************************************  
      [ 클래스를 컨트롤하는 JS classList 객체 ]
        1. 클래스 넣기 :add(클래스명)
          예) document.querySelector('.my').classList.add('on');
        2. 클래스 빼기 :remove(클래스명)
          예) document.querySelector('.my').classList.remove('on');
        3. 클래스 넣고빼기 :toggle(클래스명)
          예) document.querySelector('.my').classList.toggle('on');

        [ 타이밍 내장함수 : setTimeout(함수,시간)]
        - 함수 호출 또는 코드 실행을 일정시간 후 할 수 있는 JS내장함수
        - 사용법
          setTimeout(함수/익명함수코드구역, 시간)
          시간은 1/1000초를 사용한다.(예, 1000을 쓰면 1초임)
          -> 시간에 s단위를 쓰지않음
    ************************************************************/


    // 4. 클래스 off를 넣어서 왼쪽으로 사라지기
    scene.classList.add('off');
  
    // 5. 0.5초후 클래스 off를 지우고 on을 넣어서 들어올 준비
    setTimeout(function(){
      scene.classList.remove('off');
      scene.classList.add('on');    
    }, 500);
  
    // 6. 1초후 이미지변경하고 클래스 on 지우기
    setTimeout(function(){
      // 변경내용 : src속성값 바꾸기
      scene.src = isrc;
      scene.classList.remove('on');
    }, 1000);
    

    // scene.src=isrc;
    
} ///////changeImg함수
// 1. 대상선정
// 1-1. 이벤트 대상 : .btns
var btns = document.querySelectorAll(".btns");
// 1-2. 변경 대상 : #scene
var scene = document.querySelector("#scene");
console.log("대상", btns,scene);

// 2. 이벤트 속성 세팅하기 : 이벤트와 함수 연결
// 이벤트 종류 : click
// 이벤트 속성 : onclick
//함수를 할당할때 소괄호 없는 함수명만 사용하여 할당함.
//소괄호가 있으면 바로 실행되므로 쓰지 않는다!

btns.item(0).onclick = changeImg;
btns.item(1).onclick = changeImg;
btns.item(2).onclick = changeImg;
btns.item(3).onclick = changeImg;
