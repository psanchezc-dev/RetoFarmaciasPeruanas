import { Component } from "@angular/core";
import Swal from "sweetalert2";

@Component({
  selector: "app-resetpass",
  templateUrl: "./resetpass.component.html"
})
export class ResetpassComponent {
  public title: string;

  constructor() {
    this.title = "Esta es la pagina principal";
  }

  cambioClave(): void {
    Swal.fire({
      title: "Éxito",
      text: "Cambio su clave correctamente, debe reingresar al sistema",
      type: "success",
      heightAuto: false
    }).then(function(confirmacion) {
      if (confirmacion) {
        window.location.href = "/login";
      }
    });
  }
}
