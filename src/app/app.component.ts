import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public myData: any;
  public title = 'comment-system';

  public comments: string[] = [];
  public timestamp = new Date();

  public commentList: any[] = [
    {
      id: 1,
      name: 'Amratha',
      message: 'Hi this is my first comment',
      time: this.timestamp.toLocaleString(),
      replies: []
    },
    {
      id: 2,
      name: 'Shreya',
      message: 'Hello, Its Shreya',
      time: this.timestamp.toLocaleString(),
      replies: [
        {
          name: 'Amratha',
          message: 'Hi Shreya!!',
          time: this.timestamp.toLocaleString(),
        },
      ],
    },
  ];

  public commentToEdit: any;
  public parentComment: any;
  public action = 'new';

  constructor() {}

  ngOnInit() {
    // Update the timestamp every minute (you can adjust the interval as needed)

  }

  public getComment(event: any) {
    if (event.action === 'Edit') {
      this.commentToEdit.message = event.commentDetails.message;
      this.commentToEdit.time = event.commentDetails.time;
    } else if (event.action === 'reply') {
      this.parentComment?.replies.push(event.commentDetails);
    } else {
      event.commentDetails.isTrusted = false;
      event.commentDetails.replies = [];
      this.commentList.push(event.commentDetails);
    }
    console.log(this.commentList, 'commentList');
  }

  public editComment(event: any, action: string) {
    this.commentToEdit = event;
    this.action = action;
    console.log(event, 'app comp edit');
  }

  public replyComment(parentComment: any, action: string) {
    this.parentComment = parentComment;
    this.action = action;
    console.log(parentComment, 'app comp reply');
  }
}
