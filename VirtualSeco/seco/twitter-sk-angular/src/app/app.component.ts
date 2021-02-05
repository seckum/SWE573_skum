import { Component } from '@angular/core';
import { TwitterSkApiService } from 'src/services/twitter-sk-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'twitter-sk';
  public searchField = '';
  constructor(protected twitterSkApiService: TwitterSkApiService) {}
  public onSearch(){
    if(!this.searchField){
      alert('No key entered');
      return;
    }
    this.twitterSkApiService.addTwitterSearchToDb(this.searchField).subscribe()
  }
}
