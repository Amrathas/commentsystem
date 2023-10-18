import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent   {
 public myForm: FormGroup;
 @Input() public commentToEdit: any = {};
  @Input() public parentComment: any = {};
  @Input() public action: string = 'new';

  @Output() submit = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      name: new FormControl(),
      message: new FormControl(),
    });
  }
  ngOninit() {
    
    // Update the timestamp every minute (you can adjust the interval as needed)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['commentToEdit'] && changes['commentToEdit'].currentValue) {
      this.myForm = this.formBuilder.group({
        name: [
          { value: this.commentToEdit?.name || '', disabled: this.action === 'Edit' },
          Validators.required,
        ],
        message: [this.commentToEdit?.message || '', Validators.required],
      });
    }
    if (changes['parentComment'] && changes['parentComment'].currentValue) {
      this.completeForm();
    }
  }

  public onSubmit() {
    const currentDate = new Date();
    const currentDateTime = currentDate.toLocaleString();
    const formValue = {
      name: this.myForm.value.name,
      message: this.myForm.value.message,
      time: currentDateTime,
    };
    const commentObject = {
      commentDetails: formValue,
      action: this.action,
    };
    console.log(this.myForm.value, 'i');
    this.submit.emit(commentObject);
    this.completeForm();
  }

  completeForm() {
    // calling this method will reset the form
    this.myForm.get('name')?.enable();
    this.myForm.reset();
  }
}