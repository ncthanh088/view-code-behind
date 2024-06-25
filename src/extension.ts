import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

  let viewCodeDisposable = vscode.commands.registerCommand('extension.viewCode', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const document = editor.document;
    const xamlPath = document.uri.fsPath;
    const codeBehindPath = xamlPath.replace('.xaml', '.xaml.cs');

    try {
      const codeDocument = await vscode.workspace.openTextDocument(codeBehindPath);
      await vscode.window.showTextDocument(codeDocument);
    } catch (error) {
    // vscode.window.showErrorMessage(`Cannot find the code-behind file for ${xamlPath}`);
    }
  });

  let viewMarkupDisposable = vscode.commands.registerCommand('extension.viewMarkup', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const document = editor.document;
    const codeBehindPath = document.uri.fsPath;
    const xamlPath = codeBehindPath.replace('.xaml.cs', '.xaml');

    try {
      const xamlDocument = await vscode.workspace.openTextDocument(xamlPath);
      await vscode.window.showTextDocument(xamlDocument);
    } catch (error) {
      // vscode.window.showErrorMessage(`Cannot find the XAML file for ${codeBehindPath}`);
    }
  });

  context.subscriptions.push(viewCodeDisposable, viewMarkupDisposable);
}

export function deactivate() {}
