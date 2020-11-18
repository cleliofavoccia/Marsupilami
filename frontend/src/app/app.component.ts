import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Indique si un utilisateur est déjà authentifié
  isLoggedIn = false;
  // Login de l'utilisateur connecté
  login!: string;

  constructor(private tokenStorageService: TokenStorageService) { }
  // A l'initialisation
  ngOnInit(): void {
    // Recherche si il n'y a pas déjà un token
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    // Si l'utilisateur est connecté
    if (this.isLoggedIn) {
      // Récupère l'utilisateur du token
      const user = this.tokenStorageService.getUser();
      // Et met à jour le login pour la barre de navigation
      this.login = user.login;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
