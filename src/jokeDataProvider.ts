import {TreeDataProvider,EventEmitter,Event}  from 'vscode';
import {JokeTreeItem} from './joke';
import { ApiService } from './service';
import {config} from './config';

export class JokeDataProvider implements TreeDataProvider<JokeTreeItem>{
    private _onDidChangeTreeData: EventEmitter<any> = new EventEmitter<any>();

    readonly onDidChangeTreeData: Event<any> = this._onDidChangeTreeData.event;
    private service: ApiService;

    constructor(service: ApiService){
        this.service = service;
    }

    refresh(){
        this._onDidChangeTreeData.fire(undefined);
    }

    getTreeItem(element:JokeTreeItem){
        return element;
    }

    getChildren(element:JokeTreeItem) {
		return this.service.getJokes(config.page, config.appKey);
    }
    
    getParent(element:JokeTreeItem){
        return null;
    }

}