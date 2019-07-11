import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { Login } from "./login";
import { LoginService } from "./login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-logins",
  templateUrl: "./logins.component.html"
})
export class LoginsComponent implements OnInit {
  public login: Login;

  constructor(private loginService: LoginService, private router: Router) {
    this.login = new Login();
  }

  ngOnInit() {
    if (this.loginService.isAuthenticated()) {
      Swal.fire({
        title: "Login",
        text: `${
          this.loginService.login.username
        } ya tienes una sesión iniciada`,
        type: "info",
        heightAuto: false,
        showConfirmButton: false,
        timer: 1000
      });
      this.router.navigate(["/ingreso"]);
    }
  }

  accesoConcedido(): void {
    console.log(this.login);
    if (this.login.username == null || this.login.password == null) {
      Swal.fire({
        title: "Error en Inicio de Sesión",
        text: "Username o password estan vacíos!",
        type: "error",
        heightAuto: false,
        showConfirmButton: false,
        timer: 1000
      });
    }
    this.loginService.accesoConcedido(this.login).subscribe(
      response => {
        console.log(response);
        this.loginService.guardarUsuario(response.access_token);
        this.loginService.guardarToken(response.access_token);

        let usuario = this.loginService.login;

        this.router.navigate(["/ingreso"]);
        Swal.fire({
          title: "Éxito",
          text: `Bienvenido al sistema ${usuario.username}`,
          type: "success",
          heightAuto: false,
          showConfirmButton: false,
          timer: 2000
        });
      },
      err => {
        if (err.status == 400) {
          Swal.fire({
            title: "Error",
            text: "Usuario o clave incorrecta",
            type: "error",
            heightAuto: false,
            showConfirmButton: false,
            timer: 1000
          });
        }
      }
    );
  }
}
