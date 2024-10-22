import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import Swal from 'sweetalert2';
import { TokenstorageService } from './services/tokenstorage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenStorage = inject(TokenstorageService);
  const router = inject(Router);

  // Check if the user is authenticated
  const username = tokenStorage.getUsername();
  const roles = tokenStorage.getRoles(); 

  console.log('Username:', username);
  console.log('Roles:', roles); // Log roles to see what is being returned

  if (username) {
    if (roles && roles.includes('ROLE_ADMIN')) {
      console.log('Admin access granted');
      return true;
    } else if (roles && roles.includes('ROLE_USER')) {
      Swal.fire({
        icon: 'warning',
        title: 'Accès limité',
        text: 'Votre rôle d\'utilisateur ne permet pas d\'accéder à cette page.'
      });
      return false;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Accès refusé',
        text: 'Vous devez avoir les droits nécessaires pour accéder à cette page.'
      });
      return false; 
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Accès refusé',
      text: 'Vous devez être connecté pour accéder à cette page.'
    });
    // router.navigate(['/login']);  // Uncomment to redirect to login page
    return false;
  }
};
