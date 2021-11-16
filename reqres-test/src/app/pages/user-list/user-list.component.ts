import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Array<User> = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.listUsers();
  }

  async listUsers(){
    const userList$ = this.userService.list();
    await firstValueFrom(userList$)
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }

  click(id: number){
    this.router.navigate(['/user-details', id]);
  }
}
