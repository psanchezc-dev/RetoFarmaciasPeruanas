import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginsComponent } from "./login/logins.component";
import { UsuarioComponent } from "./usuarios/usuarios.component";
import { FormComponent } from "./usuarios/form.component";
import { ResetpassComponent } from "./usuarios/resetpass.component";
import { ReportesComponent } from "./reportes/reportes.component";
import { IngresoComponent } from "./ingreso/ingreso.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginsComponent },
  { path: "ingreso", component: IngresoComponent },
  { path: "usuarios", component: UsuarioComponent },
  { path: "usuarios/page/:page", component: UsuarioComponent },
  { path: "usuarios/form", component: FormComponent },
  { path: "usuarios/form/:id", component: FormComponent },
  { path: "usuarios/resetPass", component: ResetpassComponent },
  { path: "reportes", component: ReportesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
