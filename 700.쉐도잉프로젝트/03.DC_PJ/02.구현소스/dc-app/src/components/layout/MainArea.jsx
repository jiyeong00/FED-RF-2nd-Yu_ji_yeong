// 메인영역 컴포넌트

import { Outlet } from "react-router-dom";
// outlet컴포넌트는 리엑트라우터에서 컴포넌트를 변경하여 출력하는 자리를 잡아주는 역할

export default function MainArea() {
    return (
        <main className="cont">
            <Outlet/>
        </main>
      );
  }///////////////MainArea//////////////
  