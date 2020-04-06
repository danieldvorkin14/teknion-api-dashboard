import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, interval } from "rxjs"
import { ApiService } from '../../services/api.service';
import { ApiConnection } from '../../models/api_connection';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  rows: Array<ApiConnection>;
  header = ["Name", "Description", "URL", "Active"];
  columns = ['name', 'description', 'url', 'active'];
  config = {}
  pingInterval = interval(15000);

  constructor(public apiService: ApiService , public router: Router) {}

  ngOnInit(){
    this.apiService.get("api_connections").subscribe((data: ApiConnection[]) => {
      this.rows = data;
    });
  }

  get_status_label(response){
    return response.status;
  }

  get_status(response){
    if([200, 302, 403].includes(response.status)) {
      var newStatus = 'success';
    } else if(response.status == 404){
      var newStatus = 'danger';
    } else {
      var newStatus = 'warning';
    }
    
    return newStatus;
  }
}
