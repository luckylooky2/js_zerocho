import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

const MainRouter = () => {
  const contentList = [
    [
      '함수와 함수의 호출 / 고차함수',
      '',
      '호출 스택 분석',
      '스코프 체인',
      '호이스팅',
      'this는 호출 때 결정된다고!!!',
      'this를 분석할 수 없는 케이스',
    ],
  ];

  return (
    <>
      <h2>
        <a
          href="https://www.youtube.com/watch?v=NS1cIsWlFGI&list=PLcqDmjxt30Rt9wmSlw1u6sBYr-aZmpNB3&index=4"
          target="_blank"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          인간 JS 엔진 되기
        </a>
      </h2>
      {contentList.map((v, i2) => {
        return v.map((v, i1) => {
          return (
            <h3>
              {`${i2 + 1}.${i1 + 1} `}
              <Link to={`/${i2 + 1}-${i1 + 1} `}>{v}</Link>
            </h3>
          );
        });
      })}
    </>
  );
};

export default MainRouter;
