import React from 'react';
import MarkdownForm from '@src/MarkdownForm';
import Layout from '@src/Layout';

const chapterOneThree = () => {
  const markdown = `# 1.3 호출 스택 분석

  \`\`\`js
  const x = 'x';

  function c() {
    const y = 'y';
    console.log('c');
  }

  function a() {
    const x = 'x';

    function b() {
      const z = 'z';
      console.log('b');

      debugger; // 호출 스택 및 스코프 체인을 확인할 수 있음

      c();
    }
    b();
  }

  a(); // a, b, c
  c(); // c
  
  \`\`\`

  call stack : 함수 호출을 관리하는 것은 스택(LIFO)이라는 자료 구조
  - 특정 함수가 호출되었으면, 해당 함수가 끝날 때까지 특정 함수 아래 있는 코드를 실행하지 못함
  - 물론 함수 내에서 다른 함수를 중첩하여 호출할 수는 있지만, 해당 함수도 
  - 함수가 끝나는 시점은 함수 body의 마지막 코드를 실행하는 시점
  - call stack을 확인하는 방법
    \`\`\`js
      debugger;
    \`\`\`

    1. call stack은 (anonymous) 함수를 호출하는 것부터 시작함 : 일종의 main 함수
    2. 모든 선언은 건너뛰고, 가장 첫 함수 호출을 찾고 해당 함수를 call stack에 push
    3. 함수 내에서 다른 함수를 중복 호출하는 경우, 다른 함수들을 함수 호출에 push
    4. 호출한 함수가 끝났다면, 함수를 스택에서 pop하고 해당 함수를 호출했던 곳으로 되돌아감(가상의 화살표를 따라)
    5. 가장 처음 호출한 함수가 끝날 때까지 2 ~ 4를 반복
    6. (anonymous) 함수를 call stack에서 pop


  cf> event queue : 

  `;

  return (
    <Layout>
      <MarkdownForm content={markdown} />
    </Layout>
  );
};

export default chapterOneThree;
