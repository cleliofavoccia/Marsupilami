import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// URL de base de la partie du serveur de gestion des marsupios
const baseUrl = 'http://localhost:8080/api/marsupios';
// URL de base de la partie du serveur de gestion des amis du marsupios
const baseUrlForFriends = baseUrl + '/friends'

@Injectable({
  providedIn: 'root'
})
export class MarsupilamiService {

  constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
      return this.http.get(baseUrl);
    }

    get(id: any): Observable<any> {
      return this.http.get(`${baseUrl}/${id}`);
    }

    getByLogin(login: any): Observable<any> {
       return this.http.get(`${baseUrl}/login/${login}`);
    }

    update(id: any, data: any): Observable<any> {
      return this.http.put(`${baseUrl}/${id}`, data);
    }

    removeFriend(id: any, data: any): Observable<any> {
      return this.http.put(`${baseUrlForFriends}/delete/${id}`, data);
    }

    addFriend(id: any, data: any): Observable<any> {
        return this.http.put(`${baseUrlForFriends}/add/${id}`, data);
    }

    getAllFriends(id: any): Observable<any> {
        return this.http.get(`${baseUrlForFriends}/all/${id}`);
    }
}
