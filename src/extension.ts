import * as vscode from 'vscode';
import * as sqlFormatter from 'sql-formatter';

export function activate(context: vscode.ExtensionContext) {
  
	let disposable = vscode.commands.registerCommand('yasqlf.formatSQL', () => {
	  const editor = vscode.window.activeTextEditor;
	  if (editor) {
		const {document, selection} = editor;
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

function formatSQL(code: string): string {
	console.log("formateandiiiiiinnnnnnnn");
	return sqlFormatter.format(code);
  }

export function deactivate() {}
