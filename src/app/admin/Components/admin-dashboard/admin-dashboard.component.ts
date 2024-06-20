import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  products: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.products = [];
    this.adminService.getAllProducts().subscribe( res => {
      res.forEach((element:any) => {
        element.processedImg = 'data:image/png;base64,' + element.byteImg;
        this.products.push(element);
      });
    })
  }
}
