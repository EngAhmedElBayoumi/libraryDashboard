import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  constructor(public employeeService: EmployeeService,    private authService: AuthService    ,public router:Router){}
  date=Date.now();
  date2=this.date.toString();
  emp:Employee=new Employee(0,"","","","","",this.date2,0,"");
  save(){
    this.employeeService.addEmployee(this.emp).subscribe(data =>{
      console.log(data);
      this.emp=data;
      this.router.navigateByUrl("/Employees");
    });
  }
  emps: Employee[]=[];
  deleteEmployee(id:number){
    if(confirm('Are you sure you want to delete this employee?')){
      this.employeeService.deleteEmployeeByID(id).subscribe(data=>{
        this.router.navigateByUrl("/Employees");
        console.log(data);
      });
    }
  }
  ngOnInit(){

    // Check if admin or BAdmin to view employee data
    const userRole = this.authService.getRole();
    if (userRole === 'Admin') {
    this.employeeService.getAllEmployees().subscribe(data=>{
      this.emps = data;
    });
  } else {
    // User is not authorized, redirect to login page
    console.error('User is not authorized to view employee data.');
    window.location.href = '/login';
  }

}
} 
