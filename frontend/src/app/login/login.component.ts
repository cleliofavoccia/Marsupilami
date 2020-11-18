import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Variable contenant les éléments du formulaire de login
  form: any = {};
  // Indique si l'utilisateur est connecté
  isLoggedIn = false;
  // Indique si l'authentification à échouer
  isLoginFailed = false;
  // Message d'erreur informatif pour l'utilisateur
  errorMessage = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  // A l'initialisation
  ngOnInit(): void {
    // On vérifie si un token est déjà existant
    if (this.tokenStorage.getToken()) {
      // Dans ce cas on est déjà logué, on ne proposera plus la page pour le faire
      this.isLoggedIn = true;
    }
  }
  // A la validation du formulaire
  onSubmit(): void {
    // On authentifie l'utilisateur
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        // On met à jour les variables d'indication de l'état de connexion
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        // On recharge la page
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
  // Permet le rechargement de la page
  reloadPage(): void {
    window.location.reload();
  }

}
