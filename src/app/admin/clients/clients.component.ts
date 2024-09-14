import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AddClientDialogComponent} from "./add-client-dialog/add-client-dialog.component";
import {ClientService} from "../../services/client.service";
import {Client} from "../../models/Client";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ToastrService} from "ngx-toastr";
import {RouterLink} from "@angular/router";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NgForOf,
    FormsModule,
    MatPaginator,
    RouterLink
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  pageSize = 10;
  currentPage = 0;
  totalClients =0;
  searchQuery = '';
  constructor(public dialog: MatDialog,
              private toastr: ToastrService,
              private clientService: ClientService
              ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(pageIndex: number = 0, pageSize: number = this.pageSize){
    this.clientService.getClients(pageIndex, pageSize).subscribe(response=>{
      this.clients = response.content;
      this.filteredClients = response.content
      this.totalClients = response.totalElements
    })
  }
  openAddClientDialog(): void {
    const dialogRef = this.dialog.open(AddClientDialogComponent,{
        data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.addClient(result).subscribe(newClient=>{
          this.clients.push(newClient);
          this.toastr.success('Client added successfully!', 'Success');
        }, error => {
          // Show error toast message
          this.toastr.error(error.error.message, 'Error');
        })
      }
    });
  }


  editClient(client: Client): void {
    const dialogRef = this.dialog.open(AddClientDialogComponent,{
      data: client
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.editClient(result).subscribe(updatedClient=>{
          const index = this.clients.findIndex(c=>c.id === updatedClient.id)
          if(index !== -1){
            this.clients[index] = updatedClient
            this.toastr.success('Client updated successfully!', 'Success');
          }
        }, error => {
          // Show error toast message
          this.toastr.error(error.error.message, 'Error');
        })
      }
    });
  }

  deleteClient(client: Client): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this client?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.deleteClient(client).subscribe(() => {
          this.clients = this.clients.filter(i => i.id !== client.id);
          this.filteredClients = this.filteredClients.filter(i => i.id !== client.id);
          this.toastr.success('Client deleted successfully!', 'Success');
        }, error => {
          this.toastr.error(error.error.message, 'Error');
        });
      }
    });
  }


  searchClient(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredClients = this.clients;
    } else {
      this.filteredClients = this.clients.filter(client =>
        client.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        client.phone.includes(this.searchQuery)
      );
    }
  }
  onPageChange(event: PageEvent){
    this.currentPage = event.pageIndex
    this.pageSize = event.pageSize
    this.loadClients(this.currentPage, this.pageSize)
  }
}
