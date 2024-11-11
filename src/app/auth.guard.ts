import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import Swal from 'sweetalert2';
import { TokenstorageService } from './services/tokenstorage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenStorage = inject(TokenstorageService);
  const router = inject(Router);

  // Liste des URLs réservées aux administrateurs
  const adminUrls = [
    '/admin/add-role', '/admin/users', '/admin/permission/:id', '/admin/consulter-privilege',
    '/admin/updateRole/:id', '/admin/list-role-user/:id', '/admin/list-users', '/admin/update-user/:id',
    '/admin/list-modules', '/admin/update-module/:cdModul', '/admin/add-module', '/admin/add-menu',
    '/admin/list-menu', '/admin/update-menu/:cdMenu', '/admin/list-privilege',
    '/admin/privileges/:roleId', '/admin/add-privilege', '/admin/update-privilege/:id','/admin/roles',
    '/admin/habilitation-et-role','/admin/models',
    '/admin/Modele/add-modele',
    '/admin/Modele/list-modele',
    '/admin/Modele/corbeille-modele',
    '/admin/Modele/update-modele/:id',
    '/admin/Variable/add-variable/:modeleId', 
    '/admin/Score/add-score/:variableId',
    '/admin/Variable/list-variable', 
    '/admin/Variable/ConsulterScoresVariable/:id', 
    '/admin/Modele/questionnaire', 
    '/admin/Modele/variables/:id','/admin/dashboard'
  ];

  const managerUrls = [
    '/admin/list-client','/admin/dashboard', '/admin/detail-client/:id', '/admin/upload-csv', '/admin/module-retail',
    '/admin/update-client/:id', '/admin/Situation/upload-csv', '/admin/Situation/consulterSituation',
    '/admin/Situation/details-situation/:id','Retail/Notation/noter-client',
    '/admin/Retail/ListClient',
    '/admin/Retail/Notation/consulter-notation/:id',
    '/admin/Retail/Notation/consulter-notation',
    '/admin/Retail/Notation/Notation/noter-client/:id',
    '/admin/Retail/Notation/modifier-notation',
    '/admin/updateNotation/:id',
    '/admin/Retail/Notation/list-clients',
    '/admin/Retail/Notation/list-clients-notation',
    '/admin/Retail/Notation/getNotationInProgress/:id',
    '/admin/Retail/Notation/DetailsNotation/:id',
  ];

  const username = tokenStorage.getUsername();
  let roles = tokenStorage.getRoless();

  console.log('Username:', username);
  console.log('Roles from Tokenstorage:', roles);

  if (roles && !Array.isArray(roles)) {
    roles = [roles]; // Si roles est une chaîne unique, le transformer en tableau
  }

  if (username) {
    // Vérifier si l'utilisateur a le rôle 'ROLE_ADMIN'
    if (Array.isArray(roles) && roles.includes('ROLE_ADMIN')) {
      console.log('Admin access granted');

      // Empêcher l'accès aux URLs réservées aux managers pour les admins
      if (managerUrls.includes(state.url)) {
        Swal.fire({
          icon: 'error',
          title: 'Accès refusé',
          text: 'Seul un manager peut accéder à cette page.'
        });
        return false;  // Bloque l'accès si l'admin tente d'accéder à une URL de manager
      }
      return true;  // L'accès est accordé aux admins pour les autres URLs
    }

    // Vérifier si l'utilisateur a le rôle 'ROLE_MANAGER'
    if (Array.isArray(roles) && roles.includes('ROLE_MANAGER')) {
      console.log('Manager access granted');
      
      // Empêcher l'accès aux URLs réservées aux administrateurs pour les managers
      if (adminUrls.includes(state.url)) {
        Swal.fire({
          icon: 'error',
          title: 'Accès refusé',
          text: 'Seul un administrateur peut accéder à cette page.'
        });
        return false;  // Bloque l'accès si le manager tente d'accéder à une URL d'admin
      }
      return true;  // L'accès est accordé aux managers pour leurs URLs
    }

    // Si l'utilisateur n'a pas le rôle requis pour l'URL, afficher un message générique
    Swal.fire({
      icon: 'error',
      title: 'Accès refusé',
      text: 'Vous devez avoir les droits nécessaires pour accéder à cette page.'
    });
    return false;
  } else {
    // Redirection vers la page de connexion si l'utilisateur n'est pas connecté
    Swal.fire({
      icon: 'error',
      title: 'Accès refusé',
      text: 'Vous devez être connecté pour accéder à cette page.'
    });
    router.navigate(['/login']);
    return false;
  }
};

