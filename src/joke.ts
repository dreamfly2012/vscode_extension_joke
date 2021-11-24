import { TreeItem, TreeItemCollapsibleState,Uri,ExtensionContext} from 'vscode';
import * as path from 'path';


export interface Joke {
  content: string;
  id: number;
  time: string;
}

export class JokeTreeItem extends TreeItem {
  
  constructor(info:Joke) {
    super('笑话', TreeItemCollapsibleState.None);
    this.label = info.id  + "";
    this.id = String(info.id);
    this.tooltip = '点击查看详情';
    this.iconPath = Uri.file(path.join(__filename,'..', '..' ,'src' ,'resources','Smile.png'));
    this.command = {
      title: '今日笑话',
      command: 'joke.click',
      arguments: [
        info.id,
        info.content
      ],
    };
   
  }
}