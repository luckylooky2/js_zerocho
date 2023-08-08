import React from 'react';
import MarkdownForm from '@src/MarkdownForm';
import Layout from '@src/Layout';

const chapterOneOne = () => {
  const markdown = `# 1.1 함수와 함수의 호출 / 고차함수

  \`\`\`js
  console.log(1);
  let a = 0;
  \`\`\`
  
  `;

  return (
    <Layout>
      <MarkdownForm content={markdown} />
    </Layout>
  );
};

export default chapterOneOne;
