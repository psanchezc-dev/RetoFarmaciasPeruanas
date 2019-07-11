import { Component } from "@angular/core";
import Swal from "sweetalert2";
import { Usuario } from "./usuario";
import { UsuarioService } from "./usuario.service";
import { ActivatedRoute } from "@angular/router";
import { LoginService } from "../login/login.service";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html"
})
export class UsuarioComponent {
  public title: string;

  usuarios: Usuario[];
  paginador: any;

  constructor(
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get("page");
      if (!page) {
        page = 0;
      }
      this.usuarioService.getUsuarios(page).subscribe(response => {
        this.usuarios = response.content as Usuario[];
        this.paginador = response;
      });
    });
  }

  deleteUsuario(usuario: Usuario): void {
    Swal.fire({
      title: "Esta seguro que desea eliminar al usuario?",
      text: "Esto no puede revertirse!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminar!",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.value) {
        this.usuarioService
          .deleteUsuario(usuario.id_usuario)
          .subscribe(reponse => {
            this.usuarios = this.usuarios.filter(usu => usu !== usuario);
            Swal.fire({
              title: "Eliminado!",
              text: `El usuario ${
                usuario.cod_usuario
              } se elimino correctamente`,
              type: "success",
              heightAuto: false
            });
          });
      }
    });
  }
}
