import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Picture } from '../models/picture.interface';

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

  constructor(private httpClient: HttpClient) { }

  getPictures$(): Observable<Picture[]> {
    return this.httpClient.get<Picture[]>(`${environment.SOCKET_ENDPOINT}/api/pictures`);
  }

  searchPictures$(term: string = ""): Observable<Picture[]> {
    const searchTerm = term?.toLocaleLowerCase();
    const search = term ? `?search=${term}` : '';
    return this.httpClient.get<Picture[]>(`${environment.SOCKET_ENDPOINT}/api/pictures${search}`)
    // .pipe(map(data => {
    //   return data.filter(d => d.name?.toLocaleLowerCase().includes(searchTerm)
    //     || d.artistName?.toLocaleLowerCase().includes(searchTerm));
    // }))
  }

  getPictureById$(id: number): Observable<Picture | undefined> {
    return this.httpClient.get<Picture>(`${environment.SOCKET_ENDPOINT}/api/pictures/${id}`)
  }
}
