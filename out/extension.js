"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const sqlFormatter = require("sql-formatter");
function activate(context) {
    let disposable = vscode.commands.registerCommand('yasqlf.formatSQL', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const { document, selection } = editor;
            const code = document.getText(selection);
            // Formatear el código SQL utilizando la función que creamos
            const formattedCode = formatSQL(code);
            // Reemplazar el texto seleccionado con el código formateado
            editor.edit((editBuilder) => {
                editBuilder.replace(selection, formattedCode);
            });
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function formatSQL(code) {
    console.log("formateandiiiiiinnnnnnnn");
    return sqlFormatter.format(code);
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map