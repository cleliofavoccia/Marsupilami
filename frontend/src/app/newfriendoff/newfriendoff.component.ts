import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthService } from '../services/auth.service';
import { MarsupilamiService } from '../services/marsupilami.service';

@Component({
  selector: 'app-newfriendoff',
  templateUrl: './newfriendoff.component.html',
  styleUrls: ['./newfriendoff.component.css']
})
export class NewfriendoffComponent implements OnInit {
  // Utilisateur loggé
  currentUser: any;
  // Variable contenant les éléments du formulaire d'inscription
  form: any = {};
  // Indicateur de l'état de la demande
  isSuccessful = false;
  // Indicateur de l'état de la demande
  isSignUpFailed = false;
   // Message d'erreur informatif pour l'utilisateur
  message = '';
  // Utilisateur nouvellement créer
  currentNewUser : any;
  // Marsupilami nouvellement créer
  newMarsupilami : any;

  constructor(private authService: AuthService, private token: TokenStorageService,
  private marsupilamiService: MarsupilamiService) { }

  ngOnInit(): void {
    // On récupère l'utilisateur connecté (si il existe)
    this.getUserLogged(this.token.getUser().id);

  }
  // Récupère les informations de l'utilisateur connecté
  getUserLogged(id): void {
        this.marsupilamiService.get(id)
          .subscribe(
            data => {
              this.currentUser = data;
              this.currentUser.id = id;
              console.log(data);
            },
            error => {
              console.log(error);
            });
      }

  // A la validation du formulaire on enregistre l'utilisateur
  onSubmit(): void {

    this.authService.register(this.form).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.marsupilamiService.getByLogin(this.form.login)
            .subscribe(
              dataByLogin => {
                this.marsupilamiService.addFriend(this.currentUser.id, dataByLogin[0])
                  .subscribe (
                    dataAddFriend => {
                      this.message = 'Friend added !';
                    },
                    error => {
                      this.message = 'Friend added failed !';
                      console.log(error);
                    });
              },
              error => {
                console.log(error);
              });
      },
      err => {
        this.message = 'Password ou login incorrect'
        this.isSignUpFailed = true;
      });
  }
}
