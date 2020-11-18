import { Injectable } from '@angular/core';

// Variables contenu dans le token
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }
  // Permet de se déconnecté (vide le token contenu dans les cookies du navigateur de l'utilisateur)
  signOut(): void {
    window.sessionStorage.clear();
  }
  // Enregistre un token dans les cookies
  public saveToken(token: string): void {
    // Supprime l'ancien token
    window.sessionStorage.removeItem(TOKEN_KEY);
    // Ajoute le nouveau
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  // Récupère le token des cookies
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY)!;
  }
  // Sauvegarde l'utilisateur dans le token
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  // Récupère l'utilisateur contenu dans le token
  public getUser(): any {
    const userJson = sessionStorage.getItem(USER_KEY)
    return userJson !== null ? JSON.parse(userJson) : null;
  }
}
