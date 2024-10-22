import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  userForm: FormGroup;
  userId: number | undefined;
  isUpdateSuccess: boolean = false;
  isUpdateError: boolean = false;
  currentUser: User | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      fullname: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
   
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      console.log('Current user updated:', user);
    });
  
      this.userId = this.authService.getCurrentUserId(); 
    if (this.userId) {
      this.loadUserData(this.userId);
    }
  }

  loadUserData(userId: number): void {
    this.userService.getUserById(userId).subscribe(
      (user: User) => {
        console.log('User data retrieved:', user);
        this.userForm.patchValue({
          username: user.username,
          email: user.email,
          fullname: user.fullname,
          phone: user.phone,
        });
      },
      (error) => {
        console.error('Error loading user data', error);
      }
    );
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const id = this.userId ?? 0;
      const updatedUser = {
        ...this.userForm.value,
        id: id
      };
  
      this.userService.updateUserProfile(id, updatedUser).subscribe(
        response => {
          console.log('Profil mis à jour avec succès', response);
          this.authService.updateCurrentUser(response); 
  
          Swal.fire({
            title: 'Succès',
            text: 'Votre profil a été mis à jour avec succès !',
            icon: 'success',
            confirmButtonText: 'OK'
          });
  
          this.router.navigate(['/home']); 
        },
        error => {
          console.error('Erreur lors de la mise à jour du profil:', error);
          Swal.fire({
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la mise à jour du profil.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Erreur',
        text: 'Veuillez remplir tous les champs requis.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }
} 