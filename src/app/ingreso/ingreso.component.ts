import { Component, SimpleChanges } from "@angular/core";
import Swal from "sweetalert2";
import { ReporteService } from "../reportes/reporte.service";
import { Reporte } from "../reportes/reporte";
import { LoginService } from "../login/login.service";

@Component({
  selector: "app-ingreso",
  templateUrl: "./ingreso.component.html"
})
export class IngresoComponent {
  private reporte: Reporte = new Reporte();

  constructor(
    private reporteService: ReporteService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.reporte.cod_usuario = this.loginService.login.username;
  }

  marcarIngreso(): void {
    this.reporteService.registrarIngreso(this.reporte).subscribe(response => {
      Swal.fire({
        title: "Ingreso Registrado",
        text: `Podrá marcar su salida a partir de las ${
          this.reporte.hora_salida_aprox
        }`,
        type: "success",
        heightAuto: false
      });
    });
  }

  marcarSalida(): void {
    Swal.fire({
      title: "Salida Registrada",
      text: "Usted marco su salida a las 16:30:14",
      type: "success",
      heightAuto: false
    }).then(function(confirmacion) {
      if (confirmacion) {
        window.location.href = "/login";
      }
    });
  }

  async marcarSalidaEmergencia(): Promise<void> {
    const { value: email } = await Swal.fire({
      title: "Salida anticipada",
      input: "text",
      inputPlaceholder: "Indique por favor el motivo",
      heightAuto: false
    });

    if (email) {
      Swal.fire({
        title: "Registrado",
        text: "Se enviara una confirmación a su Jefe de área",
        type: "success"
      }).then(function(confirmacion) {
        if (confirmacion) {
          window.location.href = "/login";
        }
      });
    }
  }
}
