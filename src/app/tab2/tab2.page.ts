import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataBaseService } from '../services/data-base.service';
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
    public dataBaseService: DataBaseService, 
    public alertController: AlertController,
    private router: Router  
  ) { }

  ngOnInit() {}

  ionViewDidEnter(){
    this.getAllNotes();
  }

  getAllNotes(){
    this.dataBaseService.getAll()
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
            this.dataBaseService.createList(data.note_name)
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
      header: 'Opciones de la nota',
      buttons: [
        {
          text: 'Eliminar',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            this.dataBaseService.deletItem(id);
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
      this.dataBaseService.updateNote_status(0, id)
    }else{
      this.dataBaseService.updateNote_status(1, id)
    }
    this.getAllNotes()
  }

}
