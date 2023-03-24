import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Note, Tag } from 'src/app/note';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent {
  @Output() add = new EventEmitter();
  @Output() cancel = new EventEmitter();
  form: FormGroup;

  constructor() { 
    this.form = new FormGroup({
      title: new FormControl('',[Validators.required, Validators.maxLength(25)]),
      text: new FormControl('',[Validators.required, Validators.maxLength(250)]),
      tag: new FormControl()
    });
  }

  onSubmit(values: any):void {
    var tag_val = (values.tag == true) ? Tag.Important : Tag.None;
    var new_note: Note = {
      title: values.title,
      text: values.text,
      tag: tag_val
    }
    this.form.reset();
    this.add.emit(new_note);
  }

  onCancel():void {
    this.form.reset();
    this.cancel.emit();
  }

}