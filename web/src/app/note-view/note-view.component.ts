import { trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note, Tag } from '../note';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent {
  @Input() note: Note = {} as Note;
  @Output() close = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() update = new EventEmitter();

  disableFlag = true;
  initialNote: Note = {} as Note;
  editClass = "hide";
  viewClass = "show";

  onClose():void {
    this.close.emit();
  }

  onDelete():void {
    this.close.emit();
    this.delete.emit();
  }

  onEdit():void {
    //this.show();

    this.toggleViewEdit();
  }

  onEditCancel():void {
    //this.hide();
    
    this.toggleViewEdit();
    
    var title = document.getElementById("title_"+this.note._id) as HTMLInputElement;
    title.value = this.note.title;

    var text = document.getElementById("text_"+this.note._id) as HTMLTextAreaElement;
    text.value = this.note.text;
  }

  onEditSave():void {
    //this.hide();
    
    this.toggleViewEdit();
    this.initialNote = {
      _id: this.note._id,
      title: this.note.title,
      text: this.note.text,
      tag: this.note.tag,
      last_modified: this.note.last_modified
    };

    var title = document.getElementById("title_"+this.note._id) as HTMLInputElement;
    var text = document.getElementById("text_"+this.note._id) as HTMLTextAreaElement;
    var tag = document.getElementById("cb_"+this.note._id) as HTMLInputElement;
    if(this.isDifferent(title.value,text.value,tag.checked)) {
      this.note.title = title.value;
      this.note.text = text.value;
      this.note.tag = (tag.checked == true) ? Tag.Important : Tag.None;
      this.note.last_modified = new Date();
    }

    this.update.emit({old: this.initialNote, new: this.note});
  }

  isDifferent(title: string, text: string, tag: boolean):boolean {
    if(this.note.title != title) return true;
    if(this.note.text != text) return true;
    var tag_val = (tag == true) ? Tag.Important : Tag.None;
    if(this.note.tag != tag_val) return true;
    return false;
  }

  toggleViewEdit():void {
    if(this.editClass == "hide") {
      this.disableFlag = false;
      this.editClass = "show";
      this.viewClass = "hide";
      if(this.note.tag == Tag.Important) {
        var cb = document.getElementById("cb_"+this.note._id) as HTMLInputElement;
        cb.checked = true;
      }
    } else {
      this.disableFlag = true;
      this.editClass = "hide";
      this.viewClass = "show";
    }
  }

  // Only work using ng serve
  /*
  hide():void {
    this.disableFlag = true;
    document.getElementById("btn_div")!.style.display = "initial";
    document.getElementById("del_btn")!.style.display = "initial";
    document.getElementById("clo_btn")!.style.display = "initial";
    document.getElementById("tag")!.style.display = "initial";

    document.getElementById("btn_div_edit")!.style.display = "none";
    document.getElementById("can_btn")!.style.display = "none";
    document.getElementById("sav_btn")!.style.display = "none";
    document.getElementById("tag_div")!.style.display = "none";
    document.getElementById("label")!.style.display = "none";
    document.getElementById("cb")!.style.display = "none";
  }

  show():void {
    document.getElementById("btn_div")!.style.display = "none";
    document.getElementById("del_btn")!.style.display = "none";
    document.getElementById("clo_btn")!.style.display = "none";
    document.getElementById("tag")!.style.display = "none";

    document.getElementById("btn_div_edit")!.style.display = "initial";
    document.getElementById("can_btn")!.style.display = "initial";
    document.getElementById("sav_btn")!.style.display = "initial";
    document.getElementById("tag_div")!.style.display = "flex";
    document.getElementById("label")!.style.display = "initial";
    document.getElementById("cb")!.style.display = "initial";

    if(this.note.tag == Tag.Important) {
      var cb = document.getElementById("cb") as HTMLInputElement;
      cb.checked = true;
    }
  }
  */
}
