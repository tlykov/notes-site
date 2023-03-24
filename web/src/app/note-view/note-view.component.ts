import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../note';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent {
  @Input() note: Note = {} as Note;
  @Output() close = new EventEmitter();
  @Output() delete = new EventEmitter();

  onClose():void {
    this.close.emit();
  }

  onDelete():void {
    this.close.emit();
    this.delete.emit();
  }
}
