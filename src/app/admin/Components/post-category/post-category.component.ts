import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.css']
})
export class PostCategoryComponent implements OnInit {

  categoryForm!: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ){}

  ngOnInit(): void {
    this.categoryForm = this.formbuilder.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required, Validators.maxLength(255)]]
    })
  }

  addCategory() {
    if(this.categoryForm.valid) {
      this.adminService.addCategory(this.categoryForm.value).subscribe((res) =>{
        if(res.id !=null) {
          this.snackBar.open('Category Added Successfully', 'Close', {
            duration: 3000
          });
          this.router.navigateByUrl('admin/dashboard');
        } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
            panelClass: 'error-snackbar'
          })
        }
      })
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }
}
