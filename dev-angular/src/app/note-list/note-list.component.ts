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
  alert = "";
  max_id = 0;

  constructor(private http: HttpClient) {
    this.fetchStorage();
  }


  fetchStorage():void {

    this.http.get('/notes',{observe: 'body', responseType: 'json'}).subscribe((res)=>{
      var dbNotes = Object.values(res);

      dbNotes.forEach(note => {
        if(note._id >= this.max_id) {
          this.max_id = note._id + 1;
        }
        this.notes.push(note);
      });
      this.sortNotes();
    });

    /*
    var n: Note = {
      title: "test",
      text: "test",
      tag: Tag.None,
      last_modified: new Date()
    };
    this.notes.push(n);
    */

  }

  add(new_note: Note):void {
    this.notes.push(new_note);
    this.sortNotes();
    
    this.http.post('/notes',new_note,{observe: 'response', responseType: 'text'}).subscribe((res)=>{
      if(res.status == 200) {
        this.alert = "Note added"
        console.log("Note added: "+new_note.title);
      } else {
        this.alert = "Error: Note not added"
        console.log("Error: Note not added => status "+res.status.toString());
      }
      
      setTimeout(()=>{
        this.alert = "";
      },2500);
    });
  }

  delete(to_delete: Note):void {
    if(this.lock_btns) return;
    this.notes.forEach( (note, i) => {
      if(note == to_delete) this.notes.splice(i,1);
      return;
    });
    
    this.http.delete('/notes/'+to_delete.title,{observe: 'response', responseType: 'text'}).subscribe((res)=>{
      if(res.status == 200) {
        this.alert = "Note deleted"
        console.log("Note deleted: "+to_delete.title);
      } else {
        this.alert = "Error: Note not deleted"
        console.log("Error: Note not deleted => status "+res.status.toString());
      }
      
      setTimeout(()=>{
        this.alert = "";
      },2500);
    });
  }

  onEdit(event: any) {
    this.http.put('/notes',{old: event.old, new: event.new },{observe: 'response', responseType: 'text'}).subscribe((res)=>{
      if(res.status == 200) {
        this.alert = "Note modified"
        console.log("Note modified: "+event.old.title);
      } else {
        this.alert = "Error: Note not modified"
        console.log("Error: Note not modified => status "+res.status.toString());
      }
      
      setTimeout(()=>{
        this.alert = "";
      },2500);
    });
  }

  onAddBtn():void {
    var ul = document.getElementById("note_list") as HTMLUListElement;
    ul.style.filter = "blur(3px)";

    var form = document.getElementById("form_comp") as HTMLElement;
    form.style.display = "initial";

    var bg = document.getElementById("close_background") as HTMLElement;
    bg.style.display = "initial";

    this.toggleLock();
  }

  onNoteView(title: string):void {
    if(this.lock_btns) return;
    var ul = document.getElementById("note_list") as HTMLElement;
    ul.style.filter = "blur(3px)";

    var id = "info_" + title;
    var div = document.getElementById(id) as HTMLElement;
    div.style.display = "initial";

    var bg = document.getElementById("close_background") as HTMLElement;
    bg.style.display = "initial";

    this.toggleLock();
  }

  onNoteViewClose(title: string) {
    var ul = document.getElementById("note_list") as HTMLElement;
    ul.style.filter = "none";

    var id = "info_" + title;
    var div = document.getElementById(id) as HTMLElement;
    div.style.display = "none";

    var bg = document.getElementById("close_background") as HTMLElement;
    bg.style.display = "none";

    this.toggleLock();
  }

  onAddedNote(new_note: Note):void {
    this.add(new_note);
    var ul = document.getElementById("note_list") as HTMLUListElement;
    ul.style.filter = "none";

    var form = document.getElementById("form_comp") as HTMLElement;
    form.style.display = "none";

    var bg = document.getElementById("close_background") as HTMLElement;
    bg.style.display = "none";
    this.toggleLock();
  }

  onCancelAdd():void {
    var ul = document.getElementById("note_list") as HTMLUListElement;
    ul.style.filter = "none";

    var form = document.getElementById("form_comp") as HTMLElement;
    form.style.display = "none";

    var bg = document.getElementById("close_background") as HTMLElement;
    bg.style.display = "none";
    this.toggleLock();
  }

  closeFromBG() {
    var ul = document.getElementById("note_list") as HTMLUListElement;
    ul.style.filter = "none";

    var form = document.getElementById("form_comp") as HTMLElement;
    form.style.display = "none";

    var bg = document.getElementById("close_background") as HTMLElement;
    bg.style.display = "none";

    for(let note of this.notes) {
      var id = "info_" + note.title;
      var div = document.getElementById(id) as HTMLElement;
      div.style.display = "none";
    }
    
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
