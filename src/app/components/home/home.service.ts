import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class homeService {
  private apiUrl = 'http://localhost:3000/api/enviar-whatsapp';

  constructor(private http: HttpClient) {}

  enviarParaWhatsApp(dados: any) {
    return this.http.post(this.apiUrl, dados, { responseType: 'text' });
  }
}