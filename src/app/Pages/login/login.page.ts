import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public userForm : FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      'email': [''],
      'password': [''],
    });
   }

  ngOnInit() {
  }

  loginForm(){
    console.log(this.userForm.value)
    this.router.navigateByUrl('/menu/tabs/tab2');
  }
}
