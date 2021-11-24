// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {ApiService} from './service';
import { JokeDataProvider } from './jokeDataProvider';
import * as path from 'path';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "joke" is now active!');
	
	const service = new ApiService();

    vscode.window.registerTreeDataProvider('view.joke',new JokeDataProvider(service));

	const panel = vscode.window.createWebviewPanel(
			'viewType', // viewType
			"笑话大全", // 视图标题
	vscode.ViewColumn.One, // 显示在编辑器的哪个部位
	{
		// enableScripts: true, // 启用JS，默认禁用
		// retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
	}
	);

	const stylecss = vscode.Uri.file(
		path.join(context.extensionPath, 'resources', 'style.css')
	);


	let showcontent = vscode.commands.registerCommand('joke.click', (hasdId,content)=>{
		panel.webview.html = `<html>
			<head>笑话大全</head>
			<style>
			body{
				background-color: antiquewhite;
				color: royalblue;
				font-size: 20px;
			}
			</style>
			<body>
         <div>
		 	<p>${content}</p> 
		  </div>
        </body></html>`;
	});

	context.subscriptions.push(showcontent);

	let prev = vscode.commands.registerCommand('joke.prev',()=>{

	});

	context.subscriptions.push(prev);
}

// this method is called when your extension is deactivated
export function deactivate() {}
