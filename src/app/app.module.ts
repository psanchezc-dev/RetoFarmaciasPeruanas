import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import * as ngBootstrap from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";

/* MIS COMPONENTES */

import { LoginsComponent } from "./login/logins.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { UsuarioComponent } from "./usuarios/usuarios.component";
import { FormComponent } from "./usuarios/form.component";
import { ResetpassComponent } from "./usuarios/resetpass.component";
import { ReportesComponent } from "./reportes/reportes.component";
import { IngresoComponent } from "./ingreso/ingreso.component";
import { PaginatorComponent } from "./paginator/paginator.component";

/* SERVICIOS */

import { UsuarioService } from "./usuarios/usuario.service";
import { ReporteService } from "./reportes/reporte.service";
import { LoginService } from "./login/login.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginsComponent,
    HeaderComponent,
    UsuarioComponent,
    FooterComponent,
    FormComponent,
    ResetpassComponent,
    ReportesComponent,
    IngresoComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ngBootstrap.NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UsuarioService, ReporteService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule {}
