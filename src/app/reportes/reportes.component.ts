import { Component, OnInit } from "@angular/core";
import { Reporte } from "./reporte";
import { ReporteService } from "./reporte.service";

@Component({
  selector: "app-reportes",
  templateUrl: "./reportes.component.html"
})
export class ReportesComponent implements OnInit {
  reportes: Reporte[];

  constructor(private reporteService: ReporteService) {}

  ngOnInit() {
    this.reporteService
      .getReporte()
      .subscribe(reportes => (this.reportes = reportes));
  }
}
