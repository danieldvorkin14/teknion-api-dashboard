import { Component, OnInit } from '@angular/core';
import { ApiConnection } from '../../models/api_connection';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-connection',
  templateUrl: './edit-connection.component.html',
  styleUrls: ['./edit-connection.component.scss']
})
export class EditConnectionComponent implements OnInit {
  api_connection: ApiConnection = new ApiConnection();

  constructor(public apiService: ApiService, public acRoute: ActivatedRoute, public router: Router) {} 

  ngOnInit(): void {
    this.acRoute.params.subscribe((data: any) => {
      if(data && data.id){
        this.apiService.get('api_connections/' + data.id).subscribe((data: ApiConnection) => {
          this.api_connection = data;
        });
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }

  onSubmit(){
    this.apiService.update("api_connections/" + this.api_connection.id, this.api_connection).subscribe((r) => {
      this.router.navigateByUrl("/");
    });
  }
}
