import { Component, OnInit } from '@angular/core';
import { TwitterSkApiService } from 'src/services/twitter-sk-api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
public email="";
public password="";
  constructor(protected twitterSkApiService: TwitterSkApiService, protected router:Router) {}

  ngOnInit(): void {
  }
login(){
this.twitterSkApiService.login({email:this.email,password:this.password}).subscribe(res=>{
  this.router.navigate(["./dashboard"])
})
}
}
