import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface SubOpcion {
  nombre: string;
  ruta?: string;
  subopcionesInternas?: SubOpcion[];
}

export interface CategoriaModulo {
  nombre: string;
  subopciones?: SubOpcion[];
}

export interface Modulo {
  id: number;
  titulo: string;
  icono: string;
  categorias?: CategoriaModulo[];
}

@Injectable({ providedIn: 'root' })
export class ModulosMenuService {
  obtenerModulos(): Observable<Modulo[]> {
    return of([
      {
        id: 1,
        titulo: 'ADMINISTRADOR CONTABLE DE INGRESOS',
        icono: 'menu',
        categorias: [
          {
            nombre: 'CLASIFICADOR Y CATÁLOGOS',
            subopciones: [
              { nombre: 'CLASIFICADOR POR RUBRO DE INGRESOS' },
              {
                nombre: 'CATÁLOGOS CONTABLES',
                subopcionesInternas: [
                  { nombre: 'Catálogo CONAC' },
                  { nombre: 'Catálogo agrupador' },
                  { nombre: 'Catálogo de cuentas' }
                ]
              }
            ]
          },
          { nombre: 'CONFIGURACIÓN DE INGRESOS' },
          { nombre: 'PERÍODOS CONTABLES' },
          { nombre: 'PÓLIZAS CONTABLES' }
        ]
      },
      { id: 2, titulo: 'CONFIGURACIONES TÉCNICAS', icono: 'menu' },
      { id: 3, titulo: 'ADMINISTRACIÓN DE PADRONES', icono: 'menu' },
      { id: 4, titulo: 'INTEGRACIÓN CON SERVICIOS WEB', icono: 'menu' },
      { id: 5, titulo: 'PORTAL WEB', icono: 'menu' },
      { id: 6, titulo: 'MÓDULO DE CONCILIACIÓN BANCARIA MANUAL Y AUTOMÁTICA', icono: 'menu' },
      { id: 7, titulo: 'CONSULTAS', icono: 'menu' },
      { id: 8, titulo: 'FACTURA ELECTRÓNICA', icono: 'menu' },
      { id: 9, titulo: 'SOAPA', icono: 'menu' },
      { id: 10, titulo: 'FEDERALES COORDINADOS', icono: 'menu' },
      { id: 11, titulo: 'REPORTES', icono: 'menu' },
      { id: 12, titulo: 'REPORTES CONTABLES', icono: 'menu' },
      { id: 13, titulo: 'GENERADOR DE FOLIO', icono: 'menu' },
      { id: 14, titulo: 'CATÁLOGOS PARA OBLIGACIONES', icono: 'menu' },
      {
        id: 15,
        titulo: 'ADMINISTRACIÓN',
        icono: 'skin', // o 'menu', como prefieras
        categorias: [
          {
            nombre: 'APARIENCIA',
            subopciones: [
              { nombre: 'Administración de temas', ruta: '/administracion-temas' }
            ]
          }
        ]
      }
    ]);
  }
}
