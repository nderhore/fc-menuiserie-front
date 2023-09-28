import {Component, OnInit} from '@angular/core';
import {MenuiserieService} from "../../service/menuiserie/menuiserie.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  public message: string = "Bonjour";

  constructor(private menuiserieService : MenuiserieService) {

  }

  ngOnInit() {
    this.menuiserieService.getMenuiserie().subscribe(reponse => {
      console.log(reponse);
    })
  }

}
