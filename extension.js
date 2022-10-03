// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const server = require("./server.js");

process.on("uncaughtException", (err) => {
  vscode.window.showErrorMessage(`Remote Builder error: ${err}`);
});

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "remotebuilder" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('remotebuilder.startServer', function () {
		// The code you place here will be executed every time your command is executed

		var port = vscode.workspace.getConfiguration().get("remotebuilder.port");
		// Display a message box to the user
		vscode.window.showInformationMessage("Remote Builder: starting server");
		server.startServer(port);
	});

	var port = vscode.workspace.getConfiguration().get("remotebuilder.port");
	server.startServer(port);

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
