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

	let panel = vscode.window.createWebviewPanel(
			'viewType', // viewType
			"笑话大全", // 视图标题
	vscode.ViewColumn.One, // 显示在编辑器的哪个部位
	{
		enableScripts: true, // 启用JS，默认禁用
		retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
	}
	);

	let created = true;

	

	let showcontent = vscode.commands.registerCommand('joke.click', (hasdId,content)=>{
		if(!created){
			panel = vscode.window.createWebviewPanel(
						'viewType', // viewType
						"笑话大全", // 视图标题
				vscode.ViewColumn.One, // 显示在编辑器的哪个部位
				{
					enableScripts: true, // 启用JS，默认禁用
					retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
				}
				);
				panel.onDidDispose(()=>{
					created = false;
				},null,context.subscriptions)
			 created = true;
		}
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

	panel.onDidDispose(()=>{
		created = false;
	},null,context.subscriptions)

	

	context.subscriptions.push(showcontent);

	let prev = vscode.commands.registerCommand('joke.prev',()=>{

	});

	context.subscriptions.push(prev);
}

// this method is called when your extension is deactivated
export function deactivate() {}
