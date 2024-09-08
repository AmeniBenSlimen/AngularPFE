import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    const email = authService.getCurrentUserEmail(); 

    Swal.fire({
      icon: 'error',
      title: 'Accès refusé',
      text: 'Vous devez être connecté pour accéder à cette page.',
      confirmButtonText: 'OK'
    }).then(() => {
      if (email) {
        authService.incrementFailedAttempts(email).subscribe(
          () => {
            //router.navigate(['/login']);
          },
          (error) => {
            console.error('Erreur lors de l\'incrémentation des tentatives échouées', error);
            //router.navigate(['/login']);
          }
        );
      } else {
        console.error('Email not available for failed attempts tracking');
        //router.navigate(['/login']);
      }
    });

    return false;
  }
};