import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data:any = "";
  message= "";

  constructor(private api:ApiServiceService , private cookie:CookieServiceService) { }

  ngOnInit(): void {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.data = new FormGroup({
      email :new FormControl("",Validators.compose([Validators.required])),
      password :new FormControl("",Validators.compose([Validators.required]))

    })
  }
  submit(data:any){

    let mydata = {data:data};
     console.log(mydata);
     this.api.post("admin/login",mydata).subscribe((result:any)=>{
       console.log(result);
       if(result.data.status == "success"){
         this.cookie.set("usertype", "admin");
         this.cookie.set("name", result.data.admin.name);
         this.cookie.set("id", result.data.admin._id);
         //this.router.navigate(["./admin/dashboard"]);          
         window.location.href = "./admin/dashboard";
       }
       else{
         this.message = '<div class="alert alert-danger" role="alert">Email or password is wrong.</div>';
       }
     })
  }
}