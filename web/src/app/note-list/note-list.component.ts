import { Component } from '@angular/core';
import { Note, Tag } from 'src/app/note';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent {
  notes: Note[] = [];
  lock_btns = false;

  constructor(private http: HttpClient) {
    this.fetchStorage();
  }


  fetchStorage():void {
    if("notes" in localStorage) {
        let notes_obj = JSON.parse(localStorage['notes']);
        for(let note of notes_obj) {
            this.notes.push(note);
        }
        this.sortNotes();
    }

    this.http.get('/find',{observe: 'body', responseType:'json'}).subscribe((res)=>{
      console.log(Object.values(res));
      Object.values(res).forEach(el => {
        this.notes.push(el);
      });
    });
    
  }

  add(new_note: Note):void {
    this.notes.push(new_note);
    this.sortNotes();
    localStorage['notes'] = JSON.stringify(this.notes);
  }

  delete(to_delete: Note):void {
    if(this.lock_btns) return;
    this.notes.forEach( (note, i) => {
      if(note == to_delete) this.notes.splice(i,1);
      return;
    });
    localStorage['notes'] = JSON.stringify(this.notes);
  }

  onAddBtn():void {
    var ul = document.getElementById("note_list") as HTMLUListElement;
    ul.style.filter = "blur(3px)";

    var form = document.getElementById("form_comp") as HTMLElement;
    form.style.display = "initial";

    this.toggleLock();
  }

  onNoteView(title: string):void {
    if(this.lock_btns) return;
    var ul = document.getElementById("note_list") as HTMLElement;
    ul.style.filter = "blur(3px)";

    var id = "info_" + title;
    var div = document.getElementById(id) as HTMLElement;
    div.style.display = "initial";

    this.toggleLock();
  }

  onNoteViewClose(title: string) {
    var ul = document.getElementById("note_list") as HTMLElement;
    ul.style.filter = "none";

    var id = "info_" + title;
    var div = document.getElementById(id) as HTMLElement;
    div.style.display = "none";

    this.toggleLock();
  }

  onAddedNote(new_note: Note):void {
    console.log(new_note);
    this.add(new_note);
    var ul = document.getElementById("note_list") as HTMLUListElement;
    ul.style.filter = "none";

    var form = document.getElementById("form_comp") as HTMLElement;
    form.style.display = "none";
    this.toggleLock();
  }

  onCancelAdd():void {
    var ul = document.getElementById("note_list") as HTMLUListElement;
    ul.style.filter = "none";

    var form = document.getElementById("form_comp") as HTMLElement;
    form.style.display = "none";
    this.toggleLock();
  }

  toggleLock() {
    if(this.lock_btns) {
      this.lock_btns = false;
    } else {
      this.lock_btns = true;
    }
  }

  sortNotes() {
    this.notes.sort((a,b)=>{
      if(a.tag == Tag.Important) return -1;
      if(b.tag == Tag.Important) return 1;
      else return -1;
    });
  }
}
