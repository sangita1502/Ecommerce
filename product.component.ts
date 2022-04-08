import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiServiceService } from 'src/app/services/api-service.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  available_sizes = new Array("S","M","L","XL","XXL");
  available_colors=new Array("red","pink","green","yellow","black");

  id:string | null = "0";
  product:any;
  data:any;
  name: string = "";
  description: string = "";
  sizes: Array<string> = [];
  colors: Array<string> = [];
  mrp: string = "";
  price: string = "";
  instock: string = "";
  status: string = "";
  sku: string = "";
  imagecode: string = "";

  constructor(private api: ApiServiceService, private cookie: CookieServiceService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    if(this.id == null)
      this.id = "0";
    if (this.id != "0") {
      this.api.post("product/get", { data: { id: this.id } }).subscribe((data: any) => {
        this.data = data.data;
       console.log(this.data);
       this.id = data.data._id;
       this.name = data.data.name;
       this.description = data.data.description;
       this.sizes = data.data.sizes;
       this.colors = data.data.colors;
       this.mrp = data.data.mrp;
       this.price = data.data.price;
       this.instock = data.data.instock;
       this.status = data.data.status;
       this.sku = data.data.sku;
      this.imagecode = "";
        this.bind();
      });
    }
    this.bind();

  }

  bind() {
    this.product = new FormGroup({
      id: new FormControl(this.id == "0" ? "" : this.id),
      name: new FormControl(this.name, Validators.compose([Validators.required])),
      description: new FormControl(this.description, Validators.compose([Validators.required])),
      mrp: new FormControl(this.mrp, Validators.compose([Validators.required])),
      price: new FormControl(this.price, Validators.compose([Validators.required])),
      instock: new FormControl("Yes", Validators.compose([Validators.required])),
      status: new FormControl("Open"),
      sku: new FormControl(this.sku)
    });
    let sizes = document.getElementsByName("sizes");
    for(let i = 0; i < sizes.length; i++)
    {
      if(this.sizes.indexOf((<HTMLInputElement>sizes[i]).value) != -1)
        (<HTMLInputElement>sizes[i]).checked = true;
    }
    let colors = document.getElementsByName("colors");
    for(let i = 0; i < colors.length; i++)
    {
      if(this.colors.indexOf((<HTMLInputElement>colors[i]).value) != -1)
        (<HTMLInputElement>colors[i]).checked = true;
    }

  }

  submit(product: any) {
    product["sizes"] = this.sizes;
    product["colors"] = this.colors;
    product["imagecode"] = this.imagecode;
    let data = { data: product };
    this.api.post("product/save", data).subscribe((data: any) => {
      alert("data added");
      this.router.navigate(["admin/products"]);
    });
  }

  sizeChanged()
  {
    let sizes = document.getElementsByName("sizes");
    this.sizes = new Array();
    for(let i = 0; i < sizes.length; i++)
    {
      if((<HTMLInputElement>sizes[i]).checked)
        this.sizes.push((<HTMLInputElement>sizes[i]).value);
    }
    console.log(this.sizes);
  }

  colorChanged()
  {
    let colors = document.getElementsByName("colors");
    this.colors = new Array();
    for(let i = 0; i < colors.length; i++)
    {
      if((<HTMLInputElement>colors[i]).checked)
        this.colors.push((<HTMLInputElement>colors[i]).value);
    }
    console.log(this.colors);
  }

  handleUpload(event: any){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>{
      if(reader.result != null)
        this.imagecode = reader.result.toString();
        console.log(this.imagecode);
    }

  }

}