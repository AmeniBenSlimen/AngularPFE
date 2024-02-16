import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenstorageService } from 'src/app/services/tokenstorage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!:FormGroup ;
  isLogedIn=false;
  isLoginFailed=false;
  errorMessage='';
  roles:string[]=[];
  submitted:boolean = false ;

  constructor(private authservice : AuthService , 
    private tokenservice : TokenstorageService ,
    private fb:FormBuilder,
    private router:Router){}
    ngOnInit(): void {
      if(this.tokenservice.getToken()!= null){
        this.isLogedIn = true;
        this.roles = this.tokenservice.getUser().role;
       // alert('on est connecte'+this.isLogedIn+"role :"+this.roles);
      }
  
      this.form = this.fb.group({
        username: ['' , Validators.required] ,
        fullname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        password: ['' , [Validators.required , Validators.minLength(6)]] ,
        confirmPassword: ['', Validators.required]
      }, {
        validator: this.passwordMatchValidator
  
      });
    }
    passwordMatchValidator(form: FormGroup) {
      const password = form.get('password')?.value;
      const confirmPassword = form.get('confirmPassword')?.value;
    
      const confirmPasswordControl = form.get('confirmPassword');
    
      if (confirmPasswordControl) {
        if (password !== confirmPassword) {
          confirmPasswordControl.setErrors({ mismatch: true });
        } else {
          confirmPasswordControl.setErrors(null);
        }
      }
    }
    
    
    
    get username ()
    {
      return this.form.get('username')
    }
    get password()
    {
      return this.form.get('password')
    }
    get fullname ()
    {
      return this.form.get('fullname')
    }
    onSubmit(){
      this.submitted = true ;
      if(this.form.invalid)
      {
        return ;
      }
      this.authservice.register(this.form.value).subscribe(
  
        data => {
          this.tokenservice.saveToken(data.token)
          this.tokenservice.saveUser(JSON.stringify(data));
          this.submitted = false ;
          this.isLoginFailed = false;
          this.isLogedIn = true;
          this.roles = this.tokenservice.getUser().role;
          this.router.navigate(['/admin/dashboard'])
        },
        error => {
          this.isLoginFailed = true;
          this.isLogedIn = false;
        }
      );
     
    }

}
