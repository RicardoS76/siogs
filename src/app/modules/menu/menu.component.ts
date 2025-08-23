import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MenuModulosComponent } from '../../shared/menu-modulos/menu-principal/menu-modulos.component';
import { SubmenuSidebarComponent } from '../../shared/menu-modulos/submenu-sidebar/submenu-sidebar.component';

import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';
import { RutaNavegacion } from '../../models/ruta-navegacion.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzBreadCrumbModule,
    NzDropDownModule,
    NzButtonModule,
    MenuModulosComponent,
    SubmenuSidebarComponent
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
  // Animación del menú principal
  trigger('rollFromLeft', [
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'rotateX(-90deg) scaleY(0.8)',
        transformOrigin: 'top left'
      }),
      animate('500ms ease-out', style({
        opacity: 1,
        transform: 'rotateX(0deg) scaleY(1)'
      }))
    ]),
    transition(':leave', [
      animate('400ms ease-in', style({
        opacity: 0,
        transform: 'rotateX(-90deg) scaleY(0.8)'
      }))
    ])
  ]),

  // Animación del submenú lateral
  trigger('slideSidebar', [
    transition(':enter', [
      style({ transform: 'translateX(-100%)', opacity: 0 }),
      animate('350ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
    ]),
    transition(':leave', [
      animate('300ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
    ])
  ])
]

})
export class MenuComponent implements OnInit {
  private ignorarPrimerClic = false;
  menuAbierto = false;
  submenuActivo = false;
  moduloSeleccionado: any = null;
  breadcrumbRuta: RutaNavegacion[] = [];

  @ViewChild('menuWrapperRef', { static: false }) menuWrapperRef!: ElementRef;

  constructor(private eRef: ElementRef) {}

  ngOnInit(): void {}

@HostListener('document:click', ['$event'])
onClickFuera(event: MouseEvent): void {
  if (this.ignorarPrimerClic) return;

  if (!this.menuAbierto && !this.submenuActivo) return;

  const target = event.target as HTMLElement;
  const wrapper = this.menuWrapperRef?.nativeElement;

  if (!wrapper) return;

  if (!wrapper.contains(target)) {
    this.cerrarTodo();
  }
}

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.cerrarTodo();
  }

mostrarMenuModulos(): void {
  if (this.submenuActivo) {
    this.submenuActivo = false;
    this.menuAbierto = true;
    this.moduloSeleccionado = null;
  } else if (this.menuAbierto) {
    this.cerrarMenuModulos();
  } else {
    this.menuAbierto = true;
    this.submenuActivo = false;
    this.moduloSeleccionado = null;

    // Ignora el primer clic que activó el menú
    this.ignorarPrimerClic = true;
    setTimeout(() => this.ignorarPrimerClic = false, 0);
  }
}

  cerrarMenuModulos(): void {
    this.menuAbierto = false;
    this.submenuActivo = false;
    this.moduloSeleccionado = null;
  }

  mostrarSubmenu(modulo: any): void {
    this.menuAbierto = false;
    this.submenuActivo = true;
    this.moduloSeleccionado = modulo;
  }

  cerrarSubmenu(): void {
    this.submenuActivo = false;
    this.menuAbierto = true;
    this.moduloSeleccionado = null;
  }

  cerrarTodo(): void {
    this.menuAbierto = false;
    this.submenuActivo = false;
    this.moduloSeleccionado = null;
  }

  actualizarBreadcrumb(ruta: RutaNavegacion[]): void {
    this.breadcrumbRuta = ruta;
  }
}
