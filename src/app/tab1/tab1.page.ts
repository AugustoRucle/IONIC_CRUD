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
      'name': [''],
      'status': [''],
    });
  }

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get("id");
    this.noteService.select(Number(this.id))
    .then(data=>{
      this.note = data;
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

  updateNote(){
    let data = this.noteForm.value
    this.noteService.updateNote(data, this.id)
      .then(data=>{
        this.status = "Actualizado"
      }).catch(error=>{
        this.status = "Error"
      })
  }

  updateStatus(id, _status){
    if(_status == 1){
      this.status_user= false;
      this.noteForm.get('status').setValue("1");
    }else{
      this.status_user= true;
      this.noteForm.get('status').setValue("0");
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
