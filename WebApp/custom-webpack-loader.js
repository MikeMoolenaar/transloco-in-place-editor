String.prototype.insertAt = function (pos, str) {
  return this.substring(0, pos) + str + this.substring(pos);
};

module.exports = function (content) {
  const index = content.indexOf('{{ t(')
  if (index) {
    console.log('Bingo!');
    content = content.insertAt(index-1, ' data-transloco-key="hey!"');
  }
  console.log(content);
  return content;
}
