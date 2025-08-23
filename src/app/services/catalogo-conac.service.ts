// src/app/services/catalogo-conac.service.ts
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { CatalogoConac } from '../models/catalogo-conac.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogoConacService {
private catalogo: CatalogoConac[] = [
  {
    id: 1,
    cuenta: '1000',
    descripcion: 'Ingresos fiscales',
    naturaleza: 'Ingreso',
    estructura: 'Estructura 1',
    estadoFinanciero: 'Activo',
    posicionFinanciera: 'Corto Plazo',
    fechaAlta: new Date('2025-01-09'),
    inicioVigencia: new Date('2024-12-31'),
    finVigencia: new Date('2025-12-30'),
    estatus: 'VIGENTE'
  },
  {
    id: 2,
    cuenta: '1100',
    descripcion: 'Impuestos locales',
    naturaleza: 'Ingreso',
    estructura: 'Estructura 2',
    estadoFinanciero: 'Pasivo',
    posicionFinanciera: 'Largo Plazo',
    fechaAlta: new Date('2025-02-15'),
    inicioVigencia: new Date('2025-01-01'),
    finVigencia: new Date('2025-12-31'),
    estatus: 'NO VIGENTE'
  },
  {
    id: 3,
    cuenta: '1200',
    descripcion: 'Ingresos por derechos',
    naturaleza: 'Ingreso',
    estructura: 'Estructura 3',
    estadoFinanciero: 'Activo',
    posicionFinanciera: 'Corto Plazo',
    fechaAlta: new Date('2025-03-01'),
    inicioVigencia: new Date('2025-03-01'),
    finVigencia: new Date('2025-11-30'),
    estatus: 'VIGENTE'
  },
  {
    id: 4,
    cuenta: '1300',
    descripcion: 'Multas administrativas',
    naturaleza: 'Ingreso',
    estructura: 'Estructura 4',
    estadoFinanciero: 'Pasivo',
    posicionFinanciera: 'Largo Plazo',
    fechaAlta: new Date('2025-03-10'),
    inicioVigencia: new Date('2025-03-15'),
    finVigencia: new Date('2025-12-01'),
    estatus: 'NO VIGENTE'
  },
  {
    id: 5,
    cuenta: '1400',
    descripcion: 'Recargos por mora',
    naturaleza: 'Ingreso',
    estructura: 'Estructura 5',
    estadoFinanciero: 'Activo',
    posicionFinanciera: 'Corto Plazo',
    fechaAlta: new Date('2025-04-01'),
    inicioVigencia: new Date('2025-04-10'),
    finVigencia: new Date('2025-12-31'),
    estatus: 'VIGENTE'
  }
];

  constructor() {}

  getCatalogo(): Observable<CatalogoConac[]> {
    return of(this.catalogo);
  }

  agregarRegistro(registro: CatalogoConac): Observable<void> {
    registro.id = this.catalogo.length + 1;
    this.catalogo.push(registro);
    return of();
  }

  actualizarRegistro(registro: CatalogoConac): Observable<void> {
    const index = this.catalogo.findIndex(c => c.id === registro.id);
    if (index !== -1) {
      this.catalogo[index] = registro;
    }
    return of();
  }

  eliminarRegistro(id: number): Observable<void> {
    this.catalogo = this.catalogo.filter(c => c.id !== id);
    return of();
  }
}
