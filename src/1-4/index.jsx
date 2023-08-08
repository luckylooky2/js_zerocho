import React from 'react';
import MarkdownForm from '@src/MarkdownForm';
import Layout from '@src/Layout';

const chapterOneFour = () => {
  const markdown = `# 1.4 스코프 체인

  \`\`\`js
  const x = 'x1';

  function c() {
    const y = 'y';
    console.log('c');

    // 이전 예제와 다르게 function b가 여기 있다면
    function b() {
      const z = 'z';
      console.log('b');

      c();
    }
  }

  function a() {
    const x = 'x2';
    // Uncaught ReferenceError: b is not defined
    b();
  }

  a(); // a, b, c
  c(); // c
  
  \`\`\`

  scope chain
  - 함수에서 어떤 값에 접근이 가능한가? 접근이 불가능한가?
  - es2015 이전에는 변수의 범위(스코프)가 function이 기준, 이후에는 block이 기준
  - 접근이 가능한지, 불가능한지를 판단하는 기준이 중요함
    - 이 기준을 scope chain이라고 함
    - e.g. 분명히 함수를 선언했는데, 왜 접근이 불가능한가?
    - scope chain을 고려하여 함수를 선언하지 않았기 때문
    - 즉, 함수를 아무데나 선언을 해놓고 그냥 호출한다고 해서 해당 함수로 순간이동할 수 없음
  - call stack은 함수의 호출을 기준으로 하지만, scope chain은 *함수의 선언을 기준*으로 함
    - 함수의 선언을 기준으로 한다는 것의 의미?
      - 변수 또는 함수가 선언 위치에 따라 lexical scope가 결정됨!
      - 반대로, 함수 호출은 lexical scope에 전혀 영향을 미치지 않음
      - 예제에서 function a 내부에서 function b를 호출했다고 해서, lexical scope에 영향이 없음
      - 오히려, function b가 lexical scope chain에 없다면 호출할 수 없음!
    - lexical scope : 어휘적 범위, 한 번 코딩해 놓으면 스코프는 절대 바뀔 수 없음
      - 변수 또는 함수가 선언된 위치를 기준으로 스코프를 설정하는 것
      - C도 마찬가지로 lexical scope를 따름
    - 함수 간의 선언 관계는 절대 바뀌지 않기 때문에, 선언 관계를 미리 생각해 보는 것이 의미가 있음
    - e.g.
      - 최상위 함수 선언
        - function c -> anonymous
        - function a -> anonymous
      - function c 내부 선언
        - function b -> function c -> anonymous
  - 같은 스코프에서는 같은 이름의 식별자를 선언할 수 없음
    \`\`\`js
      const x = 'x';
      // Uncaught SyntaxError: Identifier 'x' has already been declared
      const x = 'x';
      ...
    \`\`\`
  - 다른 스코프에서는 같은 이름의 식별자를 선언할 수 있음
    \`\`\`js
      const x = 'x';

      function a() {
        // 다른 스코프에 있기 때문에 선언이 가능
        const x = 'x';
        b();
      }
    \`\`\`
  - 변수 및 함수에 접근이 가능한가?는 scope chain을 타고 올라가면서 확인
    \`\`\`js
    const x = 'x1';

    function c() {
      const y = 'y';
      console.log('c');
      // function c -> anonymous
      // function c에는 식별자 x가 존재하지 않기 때문에 anonymous에서 확인
      console.log(x);
    }

    function a() {
      const x = 'x2';

      function b() {
        const z = 'z';
        console.log('b');
        c();
      }

      b();
    }

    a(); // a, b, c
    c(); // c
    \`\`\`
  `;

  return (
    <Layout>
      <MarkdownForm content={markdown} />
    </Layout>
  );
};

export default chapterOneFour;
