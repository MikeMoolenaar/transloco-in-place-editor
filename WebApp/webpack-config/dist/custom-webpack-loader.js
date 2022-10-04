define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const insertAt = (str, pos, value) => {
        return str.substring(0, pos) + value + str.substring(pos);
    };
    const loader = (content) => {
        const index = content.indexOf('{{ t(');
        if (index) {
            console.log('Bingo!');
            content = insertAt(content, index - 1, ' data-transloco-key="hey!"');
        }
        console.log(content);
        return content;
    };
    exports.default = loader;
});
