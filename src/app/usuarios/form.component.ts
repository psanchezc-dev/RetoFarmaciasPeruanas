import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { Usuario } from "./usuario";
import { UsuarioService } from "./usuario.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html"
})
export class FormComponent implements OnInit {
  private usuario: Usuario = new Usuario();

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargarUsuario();
  }

  crearUsuario(): void {
    this.usuarioService.postUsuarios(this.usuario).subscribe(response => {
      this.router.navigate(["/usuarios"]);
      Swal.fire({
        title: "Éxito",
        text: `Usuario ${this.usuario.cod_usuario} creado correctamente`,
        type: "success",
        heightAuto: false
      });
    });
  }

  cargarUsuario(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params["id"];
      if (id) {
        this.usuarioService
          .getUsuario(id)
          .subscribe(usuario => (this.usuario = usuario));
      }
    });
  }

  updateUsuario(): void {
    this.usuarioService.updateUsuario(this.usuario).subscribe(usuario => {
      this.router.navigate(["/usuarios"]);
      Swal.fire({
        title: "Éxito",
        text: `Usuario ${this.usuario.cod_usuario} actualizado correctamente`,
        type: "success",
        heightAuto: false
      });
    });
  }
}
