import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {
  tasks: { name: string }[] = [
    { name: "task1" },
    { name: "task2" }
  ];

  constructor(
    public actionSheetController: ActionSheetController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if ('tasks' in localStorage) {
      // 格納されているtasks(JSON形式)を配列に変換して変数tasksへ
      this.tasks = JSON.parse(localStorage.tasks);
    }
  }

  async changeTask(index: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'タスクの変更',
      buttons: [{
        text: '削除',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
          this.tasks.splice(index, 1);
          localStorage.tasks = JSON.stringify(this.tasks);
        }
      }, {
        text: '変更',
        icon: 'create',
        handler: () => {
          console.log('Archive clicked');
          this._renameTask(index);
        }
      }, {
        text: '閉じる',
        icon: 'close',
        handler: () => {
          console.log('cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async _renameTask(index: number) {
    const prompt = await this.alertController.create({
      header: '変更後のタスク',
      inputs: [
        {
          name: 'task',
          placeholder: 'タスク',
          value: this.tasks[index].name
        }
      ],
      buttons: [
        {
          text: "閉じる"
        },
        {
          text: '保存',
          handler: data => {
            this.tasks[index] = { name: data.task };
            localStorage.tasks = JSON.stringify(this.tasks);
          }
        }]
    });

    await prompt.present();
  }

}
