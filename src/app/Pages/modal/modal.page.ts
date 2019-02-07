import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import { DataBaseService } from '../../services/data-base.service';
import { NavParams } from '@ionic/angular';
import {WebView} from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() note_id: number;

  public itemForm : FormGroup;
  public photo: string = "";
  public data: any
  public status: string;

  constructor(
    private formBuilder: FormBuilder,
    private dataBase: DataBaseService,
    private camera: Camera,
    public alertController: AlertController,
    public navParams: NavParams,
    private webview: WebView
  ) { 
    this.itemForm = this.formBuilder.group({
      'name': [''],
      'description': [''],
      'price': ['']
    });
    this.note_id = this.navParams.get('id');
  }

  ngOnInit() {
  }

  options:  CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }

  getImage(){
    this.camera.getPicture(this.options)
      .then( imageData =>{
        this.photo =  this.webview.convertFileSrc(imageData);
      }).catch( error =>{
        this.showAlert("Imagen no seleccionada", "Alert")
      })
  }

  createItem(){
    let _data = this.itemForm.value
      this.data = _data
      this.dataBase.createItems(_data, this.photo, this.note_id)
        .then(data=>{
          this.showAlert("Datos guardados exitosamente", "Message")
        }).catch(e =>{
          this.showAlert("Error al guardar los datos", "Alert")
        })
  }

  async showAlert(message:string, _header:string){
    const alert = await this.alertController.create({
      header: _header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
