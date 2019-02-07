import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-features-list',
  templateUrl: './features-list.page.html',
  styleUrls: ['./features-list.page.scss'],
})
export class FeaturesListPage implements OnInit {

  public id: string

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
  }
  
  goBack(){
    this.router.navigateByUrl('/menu/tabs/tab1/'+this.id);
  }

}
