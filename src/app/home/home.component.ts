import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { equalSegments } from '@angular/router/src/url_tree';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
users:any[];
newUser={
  id: '',
  username:'',
  address:'',
  contact:'',
  email:''
};
showNewUserModal:boolean=false;
showEditUserModal:boolean=false;
selectedUser={
  id:'',
  username:'',
  address:'',
  contact:'',
  email:''
};

editInvalidEmail: boolean=false;
editInvalidContact: boolean=false;
newInvalidEmail: boolean=false;
newInvalidContact: boolean=false;
  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }
  getUsers(){
    this._userService.getUsers()
      .subscribe(resp=>{
       this.users = resp;
        console.log(resp);
      }, err=>{
        console.log(err);
      })
  }
  modalClick(){
    this.showNewUserModal==true?this.showNewUserModal=false:this.showNewUserModal=true;
  
  console.log('clicked');
  }
  addUser(){
    if(!this.validateEmail(this.newUser.email)&&!this.validateContact(this.newUser.contact)){
      console.log('1');
       this.newInvalidEmail=true;
       this.newInvalidContact=true;
    }else if(!this.validateContact(this.newUser.contact)){
      console.log('2');
      this.newInvalidContact=true;
      this.newInvalidEmail=false;
    }else if(!this.validateEmail(this.newUser.email)){
      console.log('3');
    this.newInvalidEmail=true;
    this.newInvalidContact=false;
  }
      else{
      this.newInvalidEmail=false;
      this.newInvalidContact=false;
      this._userService.addUser(this.newUser)
      .subscribe(resp=>{
      // this.users = resp;
        console.log(resp);
        this.getUsers();
        this.modalClick();
      }, err=>{
        console.log(err);
      })
    }
  
  }
  editClick(user){

    if(user){
      this.selectedUser.id = user._id;
      this.selectedUser.username = user.username;
      this.selectedUser.address = user.address;
      this.selectedUser.contact = user.contact;
      this.selectedUser.email = user.email;

    }
    
    this.getUsers();
    this.showEditUserModal==true?this.showEditUserModal=false:this.showEditUserModal=true;
  
}
  onSaveChanges(){
    if(!this.validateEmail(this.selectedUser.email)&&!this.validateContact(this.selectedUser.contact)){
      console.log('1');
       this.editInvalidEmail=true;
       this.editInvalidContact=true;
    }else if(!this.validateContact(this.selectedUser.contact)){
      console.log('2');
      this.editInvalidContact=true;
      this.editInvalidEmail=false;
    }else if(!this.validateEmail(this.selectedUser.email)){
      console.log('3');
    this.editInvalidEmail=true;
    this.editInvalidContact=false;
  }
      else{
      this.editInvalidEmail=false;
      this.editInvalidContact=false;
      
    this._userService.editUser(this.selectedUser)
      .subscribe(resp=>{
      // this.users = resp;
        console.log(resp);
        this.getUsers();
        this.editClick(null);
      }, err=>{
        console.log(err);
      })
    }
  }
  onDelete(id){
    this._userService.deleteUser(id)
      .subscribe(resp=>{
      // this.users = resp;
        console.log(resp);
        this.getUsers();
              }, err=>{
        console.log(err);
      })
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  validateContact(contact) {
    var re = /(^[0-9-]*$)/;
    return re.test(contact);
  }

}
