import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
})
export class CommentListComponent implements OnInit {
  public comments: string[] = [];
  public timestamp = new Date();
  public isReply = false;

  @Input() commentList: any = [];
  @Output() edit = new EventEmitter<any>();
  @Output() reply = new EventEmitter<any>();

  ngOnInit() {
    // Retrieve comments from local storage on component initialization
    const storedComments = localStorage.getItem('commentList');
    if (storedComments) {
      this.commentList = JSON.parse(storedComments);
    }
    // Update the timestamp every minute (you can adjust the interval as needed)
    setInterval(() => {
      this.timestamp = new Date();
    }, 60000);
  }

  public replyComment(parentComment: any) {
    this.isReply = true;
    this.reply.emit(parentComment);
  }
  public editComment(comment: any, reply?: any) {
    this.edit.emit(comment);
  }

  public getComment(event: any, parent: any) {
    console.log(event, 'reply');
  }
}
