import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from '../services/notes.service';
import { AlertController } from '@ionic/angular';
import {FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  id: string;
  status_user: boolean = false;
  note: any;
  noteForm : FormGroup;
  items: any;
  status: string;

  constructor(
    private route: ActivatedRoute,
    private noteService: NotesService,
    public alertController: AlertController,
    private formBuilder: FormBuilder,
  ){
    this.noteForm = this.formBuilder.group({
      'name': ['']
    });
  }

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get("id");
    this.noteService.selectNote(Number(this.id))
    .then(data=>{
      this.note = data;
      this.status_user = (this.note.status == 1)? true: false;
    }).catch(error=>{
      this.note = null;
    });
  }

  ionViewDidEnter(){
    this.getAllItems()
  }

  async createElement(){
    const alert = await this.alertController.create({
      header: 'Crear nuevo elemento',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre'
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'Descripcion'
        },
        {
          name: 'price',
          type: 'number',
          placeholder: 'Costo'
        },
      ],
      buttons: [
        {
          text: 'Imagen',
          cssClass: 'dark',
          handler: () => {
            console.log('Imagen');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'dark',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
        , {
          text: 'Crear',
          handler: (data) => {
            this.noteService.createItems(data, Number(this.id))
            .then(response => {
              this.status = "Todo bien";
              this.getAllItems()
            })
            .catch( error => {
              this.status = "Algo salio mal";
            })
          }
        }
      ]
    });
    await alert.present();
  }

  updateName(){
    let data = this.noteForm.value.name
    this.noteService.updateNote_name(data, this.id)
      .then(data=>{
        this.status = "Actualizado"
      }).catch(error=>{
        this.status = "Error"
      })
  }

  updateStatus(_status){
    this.status_user = (_status == 1)? false: true 
    if(_status == 1){
      this.noteService.updateNote_status(0, this.id)
    }else{
      this.noteService.updateNote_status(1, this.id)
    }
  }
  
  getAllItems(){
    this.noteService.getAllItems(Number(this.id))
    .then(response => {
      this.items = response;
    })
    .catch( error => {
      console.error( error );
    });
  }

}
