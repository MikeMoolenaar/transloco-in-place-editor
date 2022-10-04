const insertAt = (str: string, pos: number, value: string) => {
  return str.substring(0, pos) + value + str.substring(pos);
}

const loader = (content: string) => {
  const index = content.indexOf('{{ t(')
  if (index) {
    console.log('Bingo!');
    content = insertAt(content,index-1, ' data-transloco-key="hey!"');
  }
  console.log(content);

  return content;
}

export default loader;
