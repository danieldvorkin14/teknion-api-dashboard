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
    return Number(response.status) == response.status ? response.status : +response.status.split(" ")[0];
  }

  get_reason(response){
    return response.phrase;
  }

  get_status(response){
    response.status = this.get_status_label(response);

    if( [100,101,102,103].includes(response.status) ){
      var newStatus = 'info';
    } else if( [200,201,202,203,204,205,206,207,208,226].includes(response.status) ){
      var newStatus = 'success';
    } else if( [300,301,302,303,304,305,306,307,308].includes(response.status) ){
      var newStatus = 'warning';
    } else {
      var newStatus = 'danger';
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
