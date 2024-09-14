import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {NgClass, NgForOf} from "@angular/common";
import {NavbarComponent} from "../navbar/navbar.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {AddUserDialogComponent} from "./add-user-dialog/add-user-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import {FormsModule} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {RouterLink} from "@angular/router";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    FooterComponent,
    NgForOf,
    NavbarComponent,
    SidebarComponent,
    MatPaginator,
    FormsModule,
    RouterLink,
    NgClass
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users:User[] = [];
  filteredUsers:User[] = [];
  currentPage = 0;
  pageSize = 10;
  totalUsers = 0;
  searchQuery = '';

  constructor(public dialog: MatDialog,
              private toastr: ToastrService,
              private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers(currentPage: number = 0, pageSize: number = this.pageSize) {
    this.userService.getUsers(currentPage,pageSize).subscribe(response=>{
      this.users = response.content
      this.filteredUsers = response.content
      this.totalUsers = response.totalElements
    })
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '40%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.addUser(result).subscribe(newUser=>{
          this.users.push(newUser);
          this.toastr.success('User added successfully!', 'Success');
        }, error => {
          // Show error toast message
          this.toastr.error(error.error.message, 'Error');
        })
      }
    });
  }

  openEditUserDialog(user: any): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '40%',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.editUser(result).subscribe(updatedUser=>{
          const index = this.users.findIndex(u => u.id === user.id);
          if (index !== -1) {
            this.users[index] = result;
          }
        })
      }
    });
  }

  deleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this user?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user).subscribe(() => {
          this.filteredUsers = this.filteredUsers.filter(u => u.id !== user.id);
          this.toastr.success('User deleted successfully!', 'Success');
        }, error => {
          this.toastr.error(error.error.message, 'Error');
        });
      }
    });
  }


  onPageChange(event: PageEvent){
    this.currentPage = event.pageIndex
    this.pageSize = event.pageSize
    this.loadUsers(this.currentPage, this.pageSize)
  }


  searchUser(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(user =>
        user.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(this.searchQuery.toLowerCase())||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  openStatusModal(user: User) {
    if (user.active){
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Confirm deactivate',
          message: 'Are you sure you want to deactivate this user?'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.userService.changeUserStatus(user).subscribe(() => {
            user.active = !user.active
            this.toastr.success('User deactivated successfully!', 'Success');
          }, error => {
            this.toastr.error(error.error.message, 'Error');
          });
        }
      });
    }else {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Confirm activate',
          message: 'Are you sure you want to activate this user?'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.userService.changeUserStatus(user).subscribe(() => {
            user.active = !user.active
            this.toastr.success('User activated successfully!', 'Success');
          }, error => {
            this.toastr.error(error.error.message, 'Error');
          });
        }
      });
    }
  }
}
