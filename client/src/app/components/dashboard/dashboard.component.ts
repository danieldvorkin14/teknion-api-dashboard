import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ApiConnection } from '../../models/api_connection';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  rows: Array<ApiConnection>;
  api_connection: ApiConnection = new ApiConnection();
  columns = ['name', 'url'];

  constructor(public apiService: ApiService , public router: Router, public acRoute: ActivatedRoute) {}

  ngOnInit(){
    this.apiService.get("api_connections").subscribe((data: ApiConnection[]) => { 
      this.rows = data; 
    });
  }

  onSubmit(form: NgForm){
    this.apiService.post("api_connections", this.api_connection).subscribe((data: ApiConnection) => { 
      this.rows.push(data); 
    });
    
    form.reset();
  }

  delete(id){
    this.apiService.delete("/api_connections/" + id).subscribe((r)=>{
      this.rows = this.rows.filter((p, i) => {
        return Number(id) !== p.id
      }, this.rows);
    });
  }

  get_status_label(response){
    return response.status;
  }

  get_reason(response){
    return response.phrase;
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

  truncate(value: string, limit: number = 40, trail: String = '…'): string {
    let result = value || '';
  
    if (value) {
      if (value.length > Math.abs(limit)) {
        if (limit > 0) {
          result = value.slice(0, limit) + trail;
        } else {
          result = value.slice(0, 40) + trail;
        }
      }
    }
    
    return result;
  }
}
