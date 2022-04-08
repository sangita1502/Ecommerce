import { Component, OnInit } from '@angular/core';
import { CookieServiceService } from '../services/cookie-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  adminloggedin = false;

  constructor(private cookie: CookieServiceService) { }

  ngOnInit(): void {
    if(this.cookie.getcookie("usertype") == "admin")
    {
      this.adminloggedin = true;
    }
  }

  logout(){
    this.cookie.delete("usertype");
    this.cookie.delete("name");
    this.cookie.delete("id");
    window.location.href = "../";
  }

}