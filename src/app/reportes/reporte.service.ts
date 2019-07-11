import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Reporte } from "./reporte";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginService } from "../login/login.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class ReporteService {
  private urlEndPoint: string = "http://localhost:8082/api/reportes";
  private httpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private router: Router
  ) {}

  getReporte(): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(this.urlEndPoint, {
      headers: this.addAuthorizationHeader()
    });
  }

  registrarIngreso(reporte: Reporte): Observable<Reporte> {
    return this.http
      .post<Reporte>(this.urlEndPoint, reporte, {
        headers: this.addAuthorizationHeader()
      })
      .pipe(
        catchError(e => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          console.error(e.error.error);
          Swal.fire({
            title: "Error al crear cliente",
            text: e.error.error,
            type: "error",
            heightAuto: false,
            showConfirmButton: false,
            timer: 2000
          });
          return throwError(e);
        })
      );
  }

  private addAuthorizationHeader() {
    let token = this.loginService.token;
    if (token != null) {
      return this.httpHeaders.append("Authorization", "Bearer " + token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e): boolean {
    if (e.status == 401) {
      this.router.navigate(["/login"]);
      return true;
    }
    if (e.status == 403) {
      Swal.fire({
        title: "Acceso Denegado",
        text: `${
          this.loginService.login.username
        } no tiene acceso al recurso solicitado`,
        type: "warning",
        heightAuto: false,
        showConfirmButton: false,
        timer: 2000
      });
      this.router.navigate(["/ingreso"]);
      return true;
    }
    return false;
  }
}
