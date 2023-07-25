import * as vscode from "vscode";
import * as sqlFormatter from "sql-formatter";

export function activate(context: vscode.ExtensionContext) {
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

function formatSQL(code: string): string {
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

export function deactivate() {}
