import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // Variable contenant les éléments du formulaire d'inscription
  form: any = {};
  // Indicateur de l'état de la demande
  isSuccessful = false;
  // Indicateur de l'état de la demande
  isSignUpFailed = false;
   // Message d'erreur informatif pour l'utilisateur
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  // A la validation du formulaire on enregistre l'utilisateur
  onSubmit(): void {

    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = 'Password ou login incorrect'
        this.isSignUpFailed = true;
      }
    );
  }

}
