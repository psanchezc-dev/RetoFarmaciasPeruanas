import { Component } from "@angular/core";
import Swal from "sweetalert2";
import { LoginService } from "../login/login.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent {
  public title: string;

  constructor(public loginService: LoginService) {}

  salirSistema(): void {
    this.loginService.logout();
    Swal.fire({
      title: "Éxito",
      text: "Usted salio del sistema",
      type: "success",
      heightAuto: false,
      showConfirmButton: false,
      timer: 2000
    }).then(function(confimacion) {
      if (confimacion) {
        window.location.href = "/login";
      }
    });
  }
}
