'use strict';

(function() {
    window.jsUtil = window.jsUtil || {};

    if (typeof window.jsUtil.KeyBoardShortCut  === 'undefined') {
        window.jsUtil.KeyBoardShortCut = (function() {
            var eventItems = [];
            const keyDownFunc = e => {
                const activeElement = document.activeElement;
                const ignoreElements = ['INPUT', 'TEXTAREA', 'BUTTON'];

                // 特定のタグにフォーカスがある場合、ショートカットを動作させない
                if (ignoreElements.filter(elem =>
                    elem === activeElement.nodeName).length === 1) {
                    return;
                }
                // altキーまたはメタキーが押されている場合、ショートカットを動作させない
                if (e.altKey || e.metaKey) {
                    return;
                }

                const targetKey = e.ctrlKey ? `Ctrl + ${e.key}` : e.key;
                const filtered = eventItems.filter(item => {
                    return item.key === targetKey;
                });
                if (filtered.length === 1) {
                    e.preventDefault();
                    e.stopPropagation();
                    filtered[0].action();
                }
            };

            const regist = function(items = [], beforeFunc, afterFunc) {
                if (typeof beforeFunc !== 'undefined') {
                    beforeFunc();
                }

                document.body.addEventListener('keydown', keyDownFunc);
                eventItems = items;

                if (typeof afterFunc !== 'undefined') {
                    afterFunc();
                }
            };

            const unregist = function(beforeFunc, afterFunc) {
                if (typeof beforeFunc !== 'undefined') {
                    beforeFunc();
                }

                document.body.removeEventListener('keydown', keyDownFunc);
                eventItems = [];

                if (typeof afterFunc !== 'undefined') {
                    afterFunc();
                }
            };

            return {
                regist,
                unregist
            };
        }());
    }
})();
