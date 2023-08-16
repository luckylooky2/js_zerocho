import React from 'react';
import MarkdownForm from '@src/MarkdownForm';
import Layout from '@src/Layout';

const chapterOneFive = () => {
  const markdown = `# 1.4 호이스팅

  \`\`\`js
  var x = 'x1';

  function c() {
    var y = 'y';
    console.log('c');

  }

  function a() {
    console.log(x); // 호이스팅
    var x = 'x2';

    function b() {
      var z = 'z';
      console.log('b');

      c();
    }

    b();
  }

  a(); // undefined, b, c
  c(); // c
  
  \`\`\`
  hoisting
  - 변수의 생애 주기(선언 => 초기화 => 할당)
    \`\`\`js
        ----- 실행 컨텍스트 '생성 단계' -----
    1. 변수 선언 단계 : 변수를 실행 컨텍스트의 변수 객체에 등록하는 단계
    2. 변수 초기화 단계 : 메모리에 올리는 단계, undefined로 초기화됨
        ----- 실행 컨텍스트 '실행 단계' -----      
    3. 변수 할당 단계 : 초기화된 undefined에 값을 할당하는 단계

    // 실행 컨텍스트의 '생성 단계'와 '실행 단계'가 나누어져 있기 때문에 호이스팅이 발생
    // 즉, 변수가 실행되기 이전에 변수가 이미 생성되었기 때문
    \`\`\`
  - 호이스팅은 코드가 정말 위로 끌어올려지는 것이 아니라
    - 실행 컨텍스트 생성 단계에서 이미 변수가 생성되는 것이 변수 선언 이전에 사용할 수 있기 떄문에 끌어올려지는 것처럼 보이는 것
  - 보통 var 키워드는 호이스팅이 발생하고 const, let 키워드는 호이스팅이 발생하지 않는다고 말하는데... 사실인가?
    - 둘 다 똑같이 실행 컨텍스트 '생성 단계'에서 메모리에 올라가 있음
    - 하지만 var은 변수 선언 이전에 값에 접근할 수 있는 반면 const, let은 불가능
      \`\`\`js
        console.log(x); // undefined
        var x = 1;

        console.log(y); // Uncaught ReferenceError: Cannot access 'y' before initialization
        const y = 2;
      \`\`\`  
    - const, let이 별도로 변수 선언되기 이전의 구역을 TDZ(Temporal Dead Zone, 일시적 사각지대)로 설정하기 때문
      - 출처 : https://ingg.dev/hoisting/
  - 호이스팅의 부작용 방지
    1. 부작용이 생길만한 상황을 만들지 않음
        - 변수 선언을 함수 최상단에 위치
        - 변수 선언을 하기 전에 접근을 하지 않음
        - 굳이, 위와 같은 사항을 지키지 않아서 코드를 어렵게 만들 필요가 없음,,,
    2. eslint 적용
        - hosting code 사용하지 않는 rule을 적용
  `;

  return (
    <Layout>
      <MarkdownForm content={markdown} />
    </Layout>
  );
};

export default chapterOneFive;
