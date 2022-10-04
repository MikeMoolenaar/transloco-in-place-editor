const insertAt = (str: string, pos: number, value: string) => {
  return str.substring(0, pos) + value + str.substring(pos);
}

const regex = />\s*{{\s*t\('([\w.]+)'\).*}}/i;
const loader = (content: string) => {
  let match;
  while ((match = regex.exec(content)) !== null) {
    if (match.index === regex.lastIndex)
      regex.lastIndex++;

    const key = match.groups?.[0];
    if (!key) continue;

    content = insertAt(content, match.index, ` data-transloco-key="${key}"`)
  }
  console.log(content);

  return content;
}

export default loader;
