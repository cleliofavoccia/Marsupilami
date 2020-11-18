import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { MarsupilamiService } from '../services/marsupilami.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Liste de tous les marsupios
  marsupios: any;
  // Utilisateur courant (loggé)
  currentUser: any;
  // Utilisateur sélectionné dans la liste de tous les marsupios
  currentMarsupilami = null;
  // Index de parcours de la liste des marsupios
  currentIndex = -1;
  // Message pour informer utilisateur
  message = '';

  // On a besoin du service de token et celui du Marsupilami
  constructor(private marsupilamiService: MarsupilamiService, private token: TokenStorageService) { }
  // A l'initialisation
  ngOnInit(): void {
    // On récupère la liste de tous les Marsupios
    this.retrieveMarsupios();
    // On récupère l'utilisateur connecté (si il existe)
    this.getUserLogged(this.token.getUser().id);
  }

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

  retrieveMarsupios(): void {
    // Récupère tous les marsupios
    this.marsupilamiService.getAll()
        .subscribe(
          data => {
          // Dans le cas où un utilisateur est connecté
            if (this.token.getUser() !== null) {
              // On récupère de cette liste tous ceux qui n'ont pas le même id que l'utilisateur connecté
              this.marsupios = data.filter((marsu) => marsu._id != this.token.getUser().id);
            } else {
              // Dans le cas contraire on récupère tous les Marsupios confondus
              this.marsupios = data
            }
            console.log(data);
          },
          error => {
            console.log(error);
          });
  }
  // Permet de mettre à jour les variables concernant le Marsupilami selectionné dans la liste des Marsupios
  setActiveMarsupilami(marsupilami, index): void {
    this.message = ''
    this.currentMarsupilami = marsupilami;
    this.currentIndex = index;
  }

  // Ajoute le marsupilami selectionné à la liste d'ami de l'utilisateur connecté
  addToFriend():void {
    this.marsupilamiService.addFriend(this.currentUser.id, this.currentMarsupilami)
      .subscribe (
        data => {
          console.log(data);
          this.message = 'Friend added !';
        },
        error => {
          this.message = 'Friend added failed !';
          console.log(error);
        });
  }
}
