import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Login } from "./login";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  private _login: Login;
  private _token: string;

  constructor(private http: HttpClient) {}

  public get login(): Login {
    if (this._login != null) {
      return this._login;
    } else if (this._login == null && sessionStorage.getItem("login") != null) {
      this._login = JSON.parse(sessionStorage.getItem("login")) as Login;
      return this._login;
    }
    return new Login();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem("token") != null) {
      this._token = sessionStorage.getItem("token");
      return this._token;
    }
    return null;
  }

  accesoConcedido(login: Login): Observable<any> {
    const urlEndPoint = "http://localhost:8082/oauth/token";
    const credenciales = btoa("angularapp" + ":" + "12345");
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + credenciales
    });
    let params = new URLSearchParams();
    params.set("grant_type", "password");
    params.set("username", login.username);
    params.set("password", login.password);
    console.log(params.toString());
    return this.http.post(urlEndPoint, params.toString(), {
      headers: httpHeaders
    });
  }

  guardarUsuario(accessToken: string): void {
    let objetoPayload = this.obtenerDatosToken(accessToken);
    this._login = new Login();
    this._login.username = objetoPayload.user_name;
    this._login.roles = objetoPayload.authorities;
    sessionStorage.setItem("login", JSON.stringify(this._login));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem("token", accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  hasRole(role: string): boolean {
    if (this.login.roles.includes(role)) {
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._login = null;
    sessionStorage.clear();
  }
}
