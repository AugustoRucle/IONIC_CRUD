import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataBaseService } from '../services/data-base.service';
import { AlertController } from '@ionic/angular';
import {FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../Pages/modal/modal.page'

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
    private dataBaseService: DataBaseService,
    public alertController: AlertController,
    private formBuilder: FormBuilder,
    public modalController: ModalController,
  ){
    this.noteForm = this.formBuilder.group({
      'name': ['']
    });
  }

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get("id");
    this.dataBaseService.selectNote(Number(this.id))
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
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps:{
        'note_id': this.id
      }
    });
    return await modal.present();
  }

  updateName(){
    let data = this.noteForm.value.name
    this.dataBaseService.updateNote_name(data, this.id)
      .then(data=>{
        this.status = "Actualizado"
      }).catch(error=>{
        this.status = "Error"
      })
  }

  updateStatus(_status){
    this.status_user = (_status == 1)? false: true 
    if(_status == 1){
      this.dataBaseService.updateNote_status(0, this.id)
    }else{
      this.dataBaseService.updateNote_status(1, this.id)
    }
  }
  
  getAllItems(){
    this.dataBaseService.getAllItems(Number(this.id))
    .then(response => {
      this.items = response;
    })
    .catch( error => {
      console.error( error );
    });
  }

}
