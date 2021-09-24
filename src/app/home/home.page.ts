import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  title: string = "register your task";
  tasks: { name: string }[] = [
    { name: "task1" },
    { name: "task2" }
  ];
  task: string;
  constructor() {}

  ionViewWillEnter(){
    if ('tasks' in localStorage) {
      // 格納されているtasks(JSON形式)を配列に変換して変数tasksへ
      this.tasks = JSON.parse(localStorage.tasks);
    }
  }

  addTask(){
    this.tasks.push({
      name: this.task
    });
    // tasks配列をJSONに変換してWeb Storageに格納
    localStorage.tasks = JSON.stringify(this.tasks);
    this.task = '';
  }

  ngOnInit() {
  }

}
