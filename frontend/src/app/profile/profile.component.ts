import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { MarsupilamiService } from '../services/marsupilami.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // Liste de tous les amis de l'utilisateur connecté
  marsupios: any;
  // Utilisateur connecté
  currentUser: any;
  // Message d'informations à afficher à l'utilisateur
  message = '';
  // Message d'informations à afficher à l'utilisateur concernant les mises à jours de ses amis
  messageFriend = '';
  // Ami selectionné dans la liste des marsupios
  currentMarsupilami = null;
  // Indicateur de l'état de la demande
  isSuccessful = false;
  // Index de parcours de la liste des marsupios
  currentIndex = -1;

  constructor(private token: TokenStorageService,  private marsupilamiService: MarsupilamiService) { }

  // A l'initialisation
  ngOnInit(): void {
    // On récupère l'utilisateur connecté
    this.getUserLogged(this.token.getUser().id);
    // Et tous ses amis
    this.retrieveAllFriends();
  }
  // Permet de mettre à jour les variables de sélection d'un ami
  setActiveMarsupilami(marsupilami, index): void {
      this.currentMarsupilami = marsupilami;
      this.currentIndex = index;
  }
  // Retourne la liste de tous les amis de l'utilisateur connecté
  retrieveAllFriends(): void {
    this.marsupilamiService.getAllFriends(this.token.getUser().id)
        .subscribe(
          data => {
            this.marsupios = data.friends;
            console.log(data);
          },
          error => {
            console.log(error);
        });
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
  // Permet de mettre à jour les informations de l'utilisateur connecté
  updateInformations(): void {
    this.marsupilamiService.update(this.currentUser.id, this.currentUser).subscribe(
       response => {
         console.log(response);
         this.isSuccessful = true;
         this.message = 'Your informations was updated successfully!';
       },
       error => {
         this.message = 'Your informations update failed!';
         console.log(error);
       }
    );
  }
  // Permet de supprimer un ami de liste d'amis de l'utilisateur connecté
  removeFromFriend():void {
    this.marsupilamiService.removeFriend(this.currentUser.id, this.currentMarsupilami)
      .subscribe (
        data => {
          console.log(data);
          this.messageFriend = 'Friend deleted !';
        },
        error => {
          this.messageFriend = 'Friend deleted failed !';
          console.log(error);
        });
    // Après avoir supprimé un ami, on met à jour sa liste d'amis
    this.retrieveAllFriends();
  }

}
