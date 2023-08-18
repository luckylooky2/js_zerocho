import React from 'react';
import MarkdownForm from '@src/MarkdownForm';
import Layout from '@src/Layout';

const chapterOneSeven = () => {
  const markdown = `# 1.7 this를 분석할 수 없는 케이스

  \`\`\`js
  const app = document.querySelector('#app');

  app.addEventListener('click', function() {
    console.log(this); 
  })

  // <div id='app'></div>
  \`\`\`
  - 앞에서 설명했던 방식대로는 설명이 안 됨
    - **1) obj. 2) new 3) bind, apply, call 4) 화살표 함수**
    - 여기에 해당하지 않는 케이스
  - 그 이유는
    - this는 함수가 호출될 때 결정되고,
    - addEventListener()의 두 번째 매개변수는 callback이기 때문
      - 함수의 선언이지 호출이 아님
      - addEventListener() 내부에서 어떤 방식으로 호출하냐에 따라 this가 달라지기 때문에, 알 수 없음
    \`\`\`js
      // addEventListener()로 this 추측해보기
      const app = {
        addEventListener : function(eventName, callback) {
          // 호출할 때, addEventListener의 this는 app 객체이기 때문에 같음
          callback.call(this); 
          // this를 app 객체로 바인딩(대체)
          callback.call(app);
          // 최소한 이렇게 호출하지는 않았을 것!
          callback();
        }
      }

      // 호출할 때, addEventListener의 this는 app 객체
      app.addEventListener('click', function() {
        console.log(this); 
      })
    \`\`\`
  - 따라서 앞에서 설명했던 방식이 아닌 다른 방식으로 호출되는 this는 외워야 함
    - 해당 함수를 만든 사람만 알음
      - this가 중요하게 쓰인다면, this 바인딩을 해놓았을 것
      - 만든 사람이 문서 작업이나 소스 코드를 공개하지 않았으면, 정말 알 수가 없음
    - 특히, callback 안에서의 this는 소스 코드를 보지 않고서는 알 수가 없음
  - 언제 사용하는가?
    - callback을 인자로 받는 함수를 작성할 때, callback에 대한 this를 바꿔줄 수 있음
    - Q) callback이 화살표 함수로 되어있다면? 바꾸지는 못 함
  \`\`\`js
  const app = document.querySelector('#app');

  // 함수 선언문이 아니라 화살표 함수로 선언
  app.addEventListener('click', () => {
    console.log(this); 
  })

  // Window { 0 : global, ... }
  \`\`\`
  - 화살표 함수 : 외부 실행 컨텍스트(부모 함수)의 this를 따라감
    - 즉, 함수가 호출된 코드가 아니라 함수 선언된 위치를 따라감
    - lexical scope를 따라 this를 결정하기 때문
    - 함수 선언문이 this를 호출될 때 동적으로 결정된다면,
    - _**화살표 함수는 스코프에 this의 값을 고정할 수 있음**_
    - 그래서
      - 화살표 함수에는 bind, call, apply를 사용할 수 없음
      - this를 동적으로 결정하지 않기 때문!
      - 화살표 함수는 무조건 호출만 가능
  - 위 예제에서 화살표 함수는 anonymous 아래 _**'선언'**_ 되어 있기 때문에
    - 외부 실행 컨텍스트는 anonymous
    - addEventListener이 아님에 주의!
  `;

  return (
    <Layout>
      <MarkdownForm content={markdown} />
    </Layout>
  );
};

export default chapterOneSeven;
