import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Game } from '../model/game';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpCLient: HttpClient) { }

  getGames(limit: number, offset: number) : Observable<Game[]> {
    const params = new HttpParams()
    .set('limit', limit)
    .set('offset', offset);

    const headers = new HttpHeaders()
    .set('content-type', 'application.json')
    .set('Access-Control-Allow-Origin', '*')

    return this.httpCLient.get<Game[]>(environment.backend_api_url,
      {params: params, headers: headers});
  }
}
