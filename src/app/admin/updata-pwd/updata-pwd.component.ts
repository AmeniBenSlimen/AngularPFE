import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updata-pwd',
  templateUrl: './updata-pwd.component.html',
  styleUrls: ['./updata-pwd.component.css']
})
export class UpdataPwdComponent implements OnInit {
  passwordForm: FormGroup;
  isUpdateSuccess = false;
  isUpdateError = false;
  errorMessage: string = '';  

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordsMatchValidator });
  }

  ngOnInit(): void {}

  // Validation personnalisée pour vérifier si les mots de passe correspondent
  passwordsMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (newPassword !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      this.isUpdateSuccess = true;
      this.isUpdateError = false;
      this.showAlert('Succès', 'Le mot de passe a été mis à jour avec succès', 'success');
    } else {
      this.isUpdateError = true;
      this.errorMessage = 'Veuillez remplir tous les champs correctement';
    }
  }

  showAlert(title: string, text: string, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'OK'
    });
  }
}
  