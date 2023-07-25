"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const sqlFormatter = require("sql-formatter");
function activate(context) {
    let disposable = vscode.commands.registerCommand("yasqlf.formatSQL", () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;
            const code = document.getText(selection);
            const formattedCode = formatSQL(code);
            editor.edit((editBuilder) => {
                editBuilder.replace(selection, formattedCode);
            });
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function formatSQL(code) {
    return sqlFormatter.format(code, {
        tabWidth: 3,
        useTabs: false,
        keywordCase: "upper",
        indentStyle: "standard",
        logicalOperatorNewline: "after",
        tabulateAlias: true,
        commaPosition: "after",
        linesBetweenQueries: 1,
        expressionWidth: 100,
        denseOperators: true,
        newlineBeforeSemicolon: false,
    });
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map