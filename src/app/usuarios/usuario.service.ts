import { Injectable } from "@angular/core";
import { formatDate } from "@angular/common";
import { USUARIOS } from "./usuarios.json";
import { Usuario } from "./usuario";
import { Observable, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import Swal from "sweetalert2";
import { LoginService } from "../login/login.service";
import { Login } from "../login/login.js";

@Injectable({
  providedIn: "root"
})
export class UsuarioService {
  private urlEndPoint: string = "http://localhost:8082/api/usuarios";
  private httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService
  ) {}

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

  getUsuarios(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + "/page/" + page, {
      headers: this.addAuthorizationHeader()
    });
  }

  postLogin(login: Login): Observable<Login> {
    return this.http
      .post<Login>(this.urlEndPoint, login, {
        headers: this.addAuthorizationHeader()
      })
      .pipe(
        catchError(e => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          console.error(e.error.error);
          Swal.fire({
            title: "Error al crear usuario",
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

  postUsuarios(usuario: Usuario): Observable<Usuario> {
    return this.http
      .post<Usuario>(this.urlEndPoint, usuario, {
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

  getUsuario(id): Observable<Usuario> {
    return this.http
      .get<Usuario>(`${this.urlEndPoint}/${id}`, {
        headers: this.addAuthorizationHeader()
      })
      .pipe(
        catchError(e => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          this.router.navigate(["/usuarios"]);
          console.error(e.error.mensaje);
          Swal.fire({
            title: "Error al editar usuario",
            text: e.error.mensaje,
            type: "error",
            heightAuto: false,
            showConfirmButton: false,
            timer: 2000
          });
          return throwError(e);
        })
      );
  }

  updateUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http
      .put<Usuario>(`${this.urlEndPoint}/${usuario.id_usuario}`, usuario, {
        headers: this.addAuthorizationHeader()
      })
      .pipe(
        catchError(e => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          console.error(e.error.error);
          Swal.fire({
            title: "Error al actualizar usuario",
            text: e.error.mensaje,
            type: "error",
            heightAuto: false,
            showConfirmButton: false,
            timer: 2000
          });
          return throwError(e);
        })
      );
  }

  deleteUsuario(id: number): Observable<Usuario> {
    return this.http
      .delete<Usuario>(`${this.urlEndPoint}/${id}`, {
        headers: this.addAuthorizationHeader()
      })
      .pipe(
        catchError(e => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          console.error(e.error.error);
          Swal.fire({
            title: "Error al eliminar usuario",
            text: e.error.mensaje,
            type: "error",
            heightAuto: false,
            showConfirmButton: false,
            timer: 2000
          });
          return throwError(e);
        })
      );
  }
}
