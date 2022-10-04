const insertAt = (str: string, pos: number, value: string) => {
  return str.substring(0, pos) + value + str.substring(pos);
}

const regex = />\s*{{\s*t\('([\w.]+)'\).*}}/gi
const loader = (content: string) => {
  let match;
  while ((match = regex.exec(content)) !== null) {
    if (match.index === regex.lastIndex)
      regex.lastIndex++;

    const key = match[1];
    if (!key) throw new Error("Did not match group for match: " + match);

    const insertValue = ` data-transloco-key="${key}"`;
    content = insertAt(content, match.index, insertValue);
    regex.lastIndex += insertValue.length;
  }
  console.log('');
  console.log(content);
  console.log('');

  return content;
}

export = loader;
