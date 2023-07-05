1. import css file

- webpack에서 .css => .js 변환하기 위해 필요
- `css-loader`, `style-loader`
  - 두 개 모두 필요
  - https://yamoo9.gitbook.io/webpack/webpack/webpack-loaders/css-loader
  - `npm i` => `webpack.config.json`에 추가

2. react-markdown

- markdown preview library
- https://github.com/remarkjs/react-markdown#types
- `npm install react-markdown`

- ```
  import ReactMarkdown from 'react-markdown'

  const
  const markdown = `# Hello, *world*!`;

  ReactDom.render(
    <ReactMarkdown children={markdown} />,
    document.body
  )
  ```

- react-syntax-highlighter : markdown preview 스타일 설정
- https://parkjeongwoong.github.io/articles/Develop/3
- okaidia : 주로 보던 code block style
- ```
  import React from 'react';
  import ReactMarkdown from 'react-markdown';
  import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
  import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';

  const MarkdownForm = ({ content }) => {
  	return (
  		<ReactMarkdown
  			children={content}
  			components={{
  				code({ node, inline, className, children, ...props }) {
  					const match = /language-(\w+)/.exec(className || '');
  					return !inline && match ? (
  						<SyntaxHighlighter
  							{...props}
  							children={String(children).replace(/\n$/, '')}
  							style={okaidia}
  							language={match[1]}
  							PreTag="div"
  						/>
  					) : (
  						<code {...props} className={className}>
  							{children}
  						</code>
  					);
  				},
  			}}
  		/>
  	);
  };

  export default MarkdownForm;
  ```
