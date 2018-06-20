import { Injectable } from '@angular/core';
import { Http, Response ,Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  APIUrl: string ='http://localhost:3000/api';
  constructor(private _http: Http) { }
  
  getUsers(){
    return this._http.get(this.APIUrl+'/users')
    .map((response: Response )=> response.json());
  }
addUser(userdata){
  return this._http.post(this.APIUrl+'/user',userdata)
  .map((response: Response )=> response.json());
}
editUser(userdata){
  return this._http.put(this.APIUrl+'/user',userdata)
  .map((response: Response )=> response.json());
}
deleteUser(id){
  return this._http.delete(this.APIUrl+'/user/'+id)
  .map((response: Response )=> response.json());
}

}
