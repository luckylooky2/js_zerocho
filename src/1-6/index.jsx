import React from 'react';
import MarkdownForm from '@src/MarkdownForm';
import Layout from '@src/Layout';

const chapterOneSix = () => {
  const markdown = `# 1.6 this는 호출 때 결정된다고!!!

  \`\`\`js
  // 기본적으로 this는 window 객체를 가리킴
  console.log(this); // Window { 0 : global, ... }

  function a() {
    // js strict 모드에서는 this가 undefined
    'use strict';
    console.log(this); // undefined
  }
  \`\`\`
- 다른 언어와 this가 다른 부분이 많음
  - 물론, 비슷한 부분도 많음
- 기본적으로 this는 window 객체를 가리킴
  - js : 브라우저에서는 default로 window 전역 객체를 가리킴
  - node : 노드에서는 default로 global 전역 객체를 가리킴
  - globalThis : 두 개로 나뉘었던 부분이 나중에 통합되었음
- this 바인딩
  \`\`\`js
    const obj = {
      name: 'chanhyle',
      sayName() {
        console.log(this.name);
      }
    }

    obj.sayName(); // chanhyle
    window.name; // ''

    const sayNameCopy = obj.sayName;
    sayNameCopy(); // ''
  \`\`\`
  - why 두 개가 다른 결과가 나오는가? 
    - 렉시컬 스코프처럼 선언된 위치와 관계있는 것이 아니라 _**this 바인딩은 함수가 호출될 때 결정되기 때문!!**_
    - 그래서 함수가 호출될 때 this를 바꿔주는 동작을 했는지 안 했는지를 살펴보면 됨!
      - 함수를 호출하는 위치가 아니라 함수를 호출하는 방식에 따라 this가 달라짐
      - 즉, 호출 스택을 그릴 때 this가 정해지는 것!
    - this를 스코프만으로 판단할 수 없음
      - 이 상황에서 this가 무엇인가는 '모른다'가 답이어야 함
      - why? this는 함수가 호출이 될 때, 동적으로 결정되기 때문에
      - 코드에 함수 호출에 관한 정보가 있다면, 그때서야 판단할 수 있음
    - 함수가 호출이 될 때 ...
      - obj.sayName() : **1) 함수 앞에 객체가 붙으면?** this가 _**해당 객체**_ 에 바인딩
      - sayName() : 특별히 정해진 것이 없다? this가 _**window**_ 에 바인딩
  \`\`\`js
    function Human(name) {
      this.name = name;
    } 

    new Human('chanhyle'); // Human {name: 'chanhyle'}
  \`\`\`
  - 생성자 함수 내
    - **2) new 키워드를 사용하여 생성한 객체일 때?** this가 _**해당 객체**_ 에 바인딩
  \`\`\`js
    function sayName() {
      console.log(this.name);
    } 

    sayName(); //  ''
    sayName.bind({ name : 'chanhyle' })(); // chanhyle
    sayName.apply({ name : 'chanhyle' }); // chanhyle
    sayName.call({ name : 'chanhyle' }); // chanhyle
  \`\`\`
  - **3) \`bind\`, \`apply\`, \`call\` 메서드** : this를 _**매개변수 객체**_ 로 바인딩(대체)
    - 이 때만! this가 변경됨 => 이후에도 적용되는 것이 아님
    - \`bind\`
      - 매개변수에 있는 객체를 this로 대체
      - \`apply\`와 다르게 함수를 return => 따로 함수 호출이 필요
    - \`apply\`
      - 매개변수에 있는 객체를 this로 대체
      - \`bind\`와 다르게 함수 호출을 내부에서 해 줌
    - \`call\`
  \`\`\`js
    const obj = {
      name: 'chanhyle',
      sayName() {
        // obj.sayName()으로 호출되었기 때문에, this는 obj를 참조
        console.log(this.name);
        const inner = () => {
          // 화살표 함수이기 때문에 this는 외부 실행 컨텍스트 sayName()의 this(obj)를 참조
          console.log(this.name);
        }
        // this를 바인딩하는 처리(객체 바인딩, new, bind/apply/call)을 하지 않았지만
        // inner가 화살표 함수이기 때문에 this가 obj를 참조
        inner();
      }
    }

    obj.sayName();
    // chanhyle
    // chanhyle

    const sayNameCopy = obj.sayName;
    // this를 바인딩하는 처리가 없기 때문에 window를 참조
    sayNameCopy(); // ''
    \`\`\`
    \`\`\`js
    const obj2 = {
      name: 'chanhyle',
      sayName() {
        console.log(this.name);
        function inner() {
          console.log(this.name);
        }
        inner();
      }
    }
  
    obj2.sayName();
    // chanhyle
    // ''
  \`\`\`
  - **4) 화살표 함수** : _**부모 this**_ 를 자신의 this로 바인딩(대체)
    - window를 가져오는 것도 아니고, 자신만의 this를 가지지 않음
    - 대신에 주변 함수나 스코프(외부 실행 컨텍스트)의 this를 그대로 사용
    - 참조하려는 부모의 this 또한, 함수의 위치가 아니라 **부모 함수가 어떻게 호출되었는지**에 따라서 this가 바뀜
      \`\`\`js
      const obj3 = {
        name: 'chanhyle',
        sayName() {
          console.log(this.name);
          const inner = () => {
            // 부모 함수가 아무런 this binding 처리 없이 호출되었기 때문에(sayNameCopy())
            // 부모의 this는 window를 참조하고, inner()의 this 또한 window를 참조
            console.log(this.name);
          }
          inner();
        }
      }
    
      const sayNameCopy = obj3.sayName;
      sayNameCopy();
      // ''
      // ''
      \`\`\`
  `;

  return (
    <Layout>
      <MarkdownForm content={markdown} />
    </Layout>
  );
};

export default chapterOneSix;
