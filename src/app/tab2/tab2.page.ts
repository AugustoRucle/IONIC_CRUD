import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NotesService } from '../services/notes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  notes: any = null;
  status: boolean = false;

  constructor(
    public notesService: NotesService, 
    public alertController: AlertController,
    private router: Router  
  ) { }

  ngOnInit() {}

  ionViewDidEnter(){
    this.getAllNotes();
  }

  getAllNotes(){
    this.notesService.getAll()
    .then(response => {
      this.notes = response;
    })
    .catch( error => {
      console.error( error );
    });
  }

  async createNote() {
    const alert = await this.alertController.create({
      header: 'Create new note',
      inputs: [
        {
          name: 'note_name',
          type: 'text',
          placeholder: 'Nombre'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.notesService.createList(data.note_name)
            .then(response => {
              this.getAllNotes();
            })
            .catch( error => {
              console.error( error );
            })
          }
        }
      ]
    });
    await alert.present();
  }

  async Options(id){
    const alert = await this.alertController.create({
      header: 'Opciones' + id,
      buttons: [
        {
          text: 'Eliminar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            this.notesService.deleteList(id);
            this.getAllNotes();
          }
        }, {
          text: 'Actualizar',
          handler: () => {
            this.router.navigateByUrl('/menu/tabs/tab1/'+id);
          }
        }
      ]
    });
    await alert.present();   
  }

  updateStatus(id, status){
    if(status == 1){
      this.notesService.updateNote_update(id, 1)
    }else{
      this.notesService.updateNote_update(id, 0)
    }
  }

}
