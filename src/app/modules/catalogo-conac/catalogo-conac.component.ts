import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// NG ZORRO modules
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';

import { CatalogoConac } from '../../models/catalogo-conac.service';
import { CatalogoConacService } from '../../services/catalogo-conac.service';

@Component({
  selector: 'app-catalogo-conac',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzSelectModule,
    NzInputModule
  ],
  templateUrl: './catalogo-conac.component.html',
  styleUrls: ['./catalogo-conac.component.scss']
})
export class CatalogoConacComponent implements OnInit {

  catalogoConacOrdenado: CatalogoConac[] = [];
  catalogoConac: CatalogoConac[] = [];
  ejercicioSeleccionado = '2025';
  ejerciciosDisponibles = ['2025', '2024', '2023'];

  // Filtros
  filtroCuenta = '';
  filtroDescripcion = '';
  filtroNaturaleza = '';
  filtroEstructura = '';
  filtroEstadoFinanciero = '';
  filtroPosicionFinanciera = '';
  filtroFechaAlta = '';
  filtroInicioVigencia = '';
  filtroFinVigencia = '';

  // Ordenamientos
  ordenCuenta: 'ascend' | 'descend' | null = null;
  ordenDescripcion: 'ascend' | 'descend' | null = null;
  ordenNaturaleza: 'ascend' | 'descend' | null = null;
  ordenEstructura: 'ascend' | 'descend' | null = null;
  ordenEstadoFinanciero: 'ascend' | 'descend' | null = null;
  ordenPosicionFinanciera: 'ascend' | 'descend' | null = null;
  ordenFechaAlta: 'ascend' | 'descend' | null = null;
  ordenInicioVigencia: 'ascend' | 'descend' | null = null;
  ordenFinVigencia: 'ascend' | 'descend' | null = null;

  constructor(private catalogoService: CatalogoConacService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.catalogoService.getCatalogo().subscribe(data => {
      this.catalogoConac = data;
    });
  }

  agregarNuevo(): void {
    console.log('Abrir formulario de alta');
  }

  cargaMasiva(): void {
    console.log('Abrir carga masiva');
  }

  editar(item: CatalogoConac): void {
    console.log('Editar:', item);
  }

  trackByIndex(index: number): number {
    return index;
  }

  get catalogoConacFiltrado(): CatalogoConac[] {
    return this.catalogoConac.filter(item =>
      (item.cuenta ?? '').toString().includes(this.filtroCuenta) &&
      (item.descripcion ?? '').toLowerCase().includes(this.filtroDescripcion.toLowerCase()) &&
      (item.naturaleza ?? '').toLowerCase().includes(this.filtroNaturaleza.toLowerCase()) &&
      (item.estructura ?? '').toLowerCase().includes(this.filtroEstructura.toLowerCase()) &&
      (item.estadoFinanciero ?? '').toLowerCase().includes(this.filtroEstadoFinanciero.toLowerCase()) &&
      (item.posicionFinanciera ?? '').toLowerCase().includes(this.filtroPosicionFinanciera.toLowerCase()) &&
      (item.fechaAlta ? item.fechaAlta.toISOString().split('T')[0] : '').includes(this.filtroFechaAlta) &&
      (item.inicioVigencia ? item.inicioVigencia.toISOString().split('T')[0] : '').includes(this.filtroInicioVigencia) &&
      (item.finVigencia ? item.finVigencia.toISOString().split('T')[0] : '').includes(this.filtroFinVigencia)
    );
  }

  onSort(campo: keyof CatalogoConac, orden: 'ascend' | 'descend' | null): void {
    if (orden !== 'ascend' && orden !== 'descend') {
      this.catalogoConacOrdenado = [];
      return;
    }

    this.catalogoConacOrdenado = [...this.catalogoConacFiltrado].sort((a, b) => {
      const valA = (a[campo] ?? '').toString().toLowerCase();
      const valB = (b[campo] ?? '').toString().toLowerCase();
      return orden === 'ascend' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
  }

  limpiarOrden(): void {
    this.catalogoConacOrdenado = [];
    this.ordenCuenta = null;
    this.ordenDescripcion = null;
    this.ordenNaturaleza = null;
    this.ordenEstructura = null;
    this.ordenEstadoFinanciero = null;
    this.ordenPosicionFinanciera = null;
    this.ordenFechaAlta = null;
    this.ordenInicioVigencia = null;
    this.ordenFinVigencia = null;
  }

  ordenarManual(campo: string, orden: 'ascend' | 'descend'): void {
    // Reinicia todas las variables de orden
    this.ordenCuenta = null;
    this.ordenDescripcion = null;
    this.ordenNaturaleza = null;
    this.ordenEstructura = null;
    this.ordenEstadoFinanciero = null;
    this.ordenPosicionFinanciera = null;
    this.ordenFechaAlta = null;
    this.ordenInicioVigencia = null;
    this.ordenFinVigencia = null;

    const propiedadOrden = `orden${this.capitalize(campo)}` as keyof CatalogoConacComponent;
    (this as any)[propiedadOrden] = orden;

    this.onSort(campo as keyof CatalogoConac, orden);
  }

  capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
