import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenstorageService } from 'src/app/services/tokenstorage.service';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Roles } from 'src/app/models/roles';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  form!:FormGroup ;
  isLogedIn=false;
  isLoginFailed=false;
  errorMessage='';
  roles:Roles[]=[];
  submitted:boolean = false ;
  constructor(private authservice : AuthService , 
              private tokenservice : TokenstorageService ,
              private fb:FormBuilder,
              private router:Router,
            ){}
  ngOnInit(): void {
    if(this.tokenservice.getToken()!= null){
      this.isLogedIn = true;
      this.roles = this.tokenservice.getUser().role;
    }

    this.form = this.fb.group({
      username: ['' , Validators.required] ,
      password: ['' , [Validators.required , Validators.minLength(8)]] ,

    })
  }


  get username ()
  {
    return this.form.get('username')
  }
  get password()
  {
    return this.form.get('password')
  }
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
  
    this.authservice.login(this.form.value).subscribe(
      data => {
        this.tokenservice.saveToken(data.token);
        this.tokenservice.saveUser(JSON.stringify(data));
        
        this.submitted = false;
        this.isLoginFailed = false;
        this.isLogedIn = true;
  
        this.roles = this.tokenservice.getUser().role;
        this.router.navigate(['/admin/dashboard']); 
      },
      error => {
        this.isLoginFailed = true;
        this.isLogedIn = false;
  
        if (error.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Compte Désactivé',
            text: 'Votre compte est désactivé. Merci de contacter l’administrateur.',
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur de Connexion',
            text: 'Une erreur est survenue. Veuillez vérifier vos informations et réessayer.',
            confirmButtonText: 'OK'
          });
        }
      }
    );
  }
}
