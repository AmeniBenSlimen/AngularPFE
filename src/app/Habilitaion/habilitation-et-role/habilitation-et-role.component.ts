import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-habilitation-et-role',
  templateUrl: './habilitation-et-role.component.html',
  styleUrls: ['./habilitation-et-role.component.css']
})
export class HabilitationEtRoleComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.printUserRole();
  }
}