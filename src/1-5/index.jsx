import React from 'react';
import MarkdownForm from '@src/MarkdownForm';
import Layout from '@src/Layout';

const chapterOneFive = () => {
  const markdown = `# 1.5 호이스팅

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
- 변수의 생애 주기(선언 => 초기화 => 할당)
  \`\`\`js
      ----- 실행 컨텍스트 '생성 단계' -----
  1. 변수 선언 단계 : 변수를 실행 컨텍스트의 변수 객체에 등록하는 단계
  2. 변수 초기화 단계 : 메모리에 올리는 단계, undefined로 초기화됨
      ----- 실행 컨텍스트 '실행 단계' -----      
  3. 변수 할당 단계 : 초기화된 undefined에 값을 할당하는 단계

  // 실행 컨텍스트의 '생성 단계'와 '실행 단계'가 나누어져 있기 때문에 호이스팅이 발생
  // => 코드가 실제로 실행되기 전에, 어떤 변수와 함수가 존재하는지 미리 파악하고 스코프 및 환경을 설정하기 위해
  // 즉, 변수가 실행되기 이전에 변수가 이미 생성되었기 때문
  \`\`\`
- 호이스팅은 코드가 정말 위로 끌어올려지는 것이 아니라
  - 실행 컨텍스트 생성 단계에서 이미 변수가 생성되는 것이 변수 선언 이전에 사용할 수 있기 떄문에 끌어올려지는 것처럼 보이는 것
- Q) 보통 \`var\` 키워드는 호이스팅이 발생하고 \`const, let\` 키워드는 호이스팅이 발생하지 않는다?
  - 둘 다 똑같이 실행 컨텍스트 '생성 단계'에서 변수 객체에 등록되며 스코프 최상위로 끌어올려짐 => 호이스팅이 발생한다고 봄
  - 하지만 \`var\`은 변수 선언 이전에 값에 접근할 수 있는 반면 \`const, let\`은 불가능
    \`\`\`js
      // y의 TDZ 시작
      console.log(x); // undefined
      var x = 1;

      console.log(y); // Uncaught ReferenceError: Cannot access 'y' before initialization
      // y의 TDZ 종료
      const y = 2;
    \`\`\`  
  - 실행 컨텍스트 생성 단계에서 \`var\`은 바로 메모리 공간을 할당하는데 반해, \`const, let\`은 position 값만 정해주고 메모리 공간을 확보하지 않음
    - 메모리에 올라가 있지 않기 때문에 접근하면 \`ReferenceError\`를 발생
    \`\`\`js
    // var
    var->AllocateTo(VariableLocation::PARAMETER, index);
    
    // const
    VariableProxy* proxy =
        DeclareBoundVariable(local_name, VariableMode::kConst, pos);
    proxy->var()->set_initializer_position(position());
    
    // let
    VariableProxy* proxy =
        DeclareBoundVariable(variable_name, VariableMode::kLet, class_token_pos);
    proxy->var()->set_initializer_position(end_pos);
    \`\`\`  
  - 즉, TDZ(Temporal Dead Zone, 시간상 사각지대)로 설정
    - "시간상" 사각지대인 이유는, 사각지대가 코드의 작성 순서(위치)가 아니라 코드의 실행 순서(시간)에 의해 형성되기 때문
    \`\`\`js
    // TDZ가 스코프 맨 위에서부터 시작
    const func = () => console.log(letVar); // OK
  
    // TDZ 안에서 letVar에 접근하면 ReferenceError
  
    let letVar = 3; // letVar의 TDZ 종료
    func(); // TDZ 밖에서 호출함
    \`\`\`

- 요약
  1. 호이스팅은 실행 컨텍스트를 '실행'하기 이전에, 실행 컨텍스트를 '생성'하는 단계가 존재하는 js 특성 때문에 발생하는 현상이다.
  2. 호이스팅은 '생성 단계'에서 스코프 및 변수를 파악하면서 끌어올려지는 효과가 나타난다. => 변수 선언 단계
  3. \`var\`은 실행 컨텍스트 '생성 단계'에서 \`AllocateTo()\`를 통해 직접 메모리를 할당하는 반면 => 변수 초기화 단계를 거침
  4. \`const, let\`은 '생성 단계'에서 \`set_initializer_position()\`을 통해 메모리를 직접 할당하지 않고, 위치만 잡아놓는다. => 변수 초기화 단계를 거치지 않음
  5. 즉, \`const, let\`은 변수 초기화 단계에서 TDZ로 설정한다.
  6. 그렇기 때문에 변수 할당 단계 이전에 접근하려고 하면 \`ReferenceError\`를 발생시킨다.

- 응용
  - function 선언문
    - 실행 컨텍스트 '생성 단계'에서 변수 선언 / 초기화 / 할당 단계가 모두 진행됨
    - 그렇기 때문에, 함수 선언문을 호출 아래서 선언하여도, 정상적으로 호출이 가능
  \`\`\`js
  a(); // aaa

  function a() {
    console.log("aaa");
  };
  
  a(); // aaa
  \`\`\`

  - function 표현식
    - 함수가 변수 b에 저장되는 하나의 값이기 때문에, 변수 할당 단계에 평가되어 값이 할당됨
    - 즉, 가장 첫 줄에서 b에는 \`undefined\`가 할당되어 있고, 변수 할당 단계가 되기 이전에는 함수가 아님
  \`\`\`js
  b(); // Uncaught TypeError: b is not a function

  var b = function () {
    console.log("bbb");
  };
  
  b();
  \`\`\`

- 호이스팅의 부작용 방지
  1. 부작용이 생길만한 상황을 만들지 않음
      - 변수 선언을 함수 최상단에 위치
      - 변수 선언을 하기 전에 접근을 하지 않음
      - 굳이, 위와 같은 사항을 지키지 않아서 코드를 어렵게 만들 필요가 없음,,,
  2. eslint 적용
      - hosting code 사용하지 않는 rule을 적용

- reference
  - [https://ingg.dev/hoisting/](https://ingg.dev/hoisting/)

  `;

  return (
    <Layout>
      <MarkdownForm content={markdown} />
    </Layout>
  );
};

export default chapterOneFive;
