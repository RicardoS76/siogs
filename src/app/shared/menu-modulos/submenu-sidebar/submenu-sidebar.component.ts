import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Modulo, CategoriaModulo, SubOpcion } from '../../../services/modulos-menu.service';
import { RutaNavegacion } from '../../../models/ruta-navegacion.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-submenu-sidebar',
  standalone: true,
  imports: [CommonModule, NzIconModule, RouterModule],
  templateUrl: './submenu-sidebar.component.html',
  styleUrls: ['./submenu-sidebar.component.scss']
})
export class SubmenuSidebarComponent {
  @Input() modulo: Modulo | null = null;
  @Output() cerrar = new EventEmitter<void>();
  @Output() breadcrumbGenerado = new EventEmitter<RutaNavegacion[]>();
  // 👉 Referencia al contenedor real del DOM del submenú

  categoriaExpandida: CategoriaModulo | null = null;
  subcategoriaExpandida: string | null = null;

  constructor(private router: Router) {}
  toggleCategoria(categoria: CategoriaModulo): void {
    if (this.categoriaExpandida === categoria) {
      this.categoriaExpandida = null;
      this.subcategoriaExpandida = null;
    } else {
      this.categoriaExpandida = categoria;
      this.subcategoriaExpandida = null;
    }
  }

  toggleSubcategoria(nombre: string): void {
    this.subcategoriaExpandida = this.subcategoriaExpandida === nombre ? null : nombre;
  }

  tieneSubSubopciones(sub: SubOpcion): boolean {
    return !!sub.subopcionesInternas?.length;
  }

  cerrarSubmenu(): void {
    this.cerrar.emit();
  }

navegar(
  modulo: Modulo,
  categoria: CategoriaModulo,
  subopcion: SubOpcion,
  subinterna?: SubOpcion
): void {
const breadcrumb: RutaNavegacion[] = [
  { nombre: modulo.titulo },
  { nombre: categoria.nombre },
  { nombre: subopcion.nombre }
];

if (subinterna) {
  breadcrumb.push({ nombre: subinterna.nombre, actual: true });
} else {
  breadcrumb[breadcrumb.length - 1] = {
    ...breadcrumb[breadcrumb.length - 1],
    actual: true
  };
}

this.breadcrumbGenerado.emit(breadcrumb);


  const destino = subinterna?.ruta || subopcion.ruta;
  if (destino) {
    this.router.navigateByUrl(destino);
    this.cerrar.emit(); // opcional: cerrar panel tras navegar
  }
}


}
