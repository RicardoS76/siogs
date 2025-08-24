// src/app/models/catalogo-conac.model.ts
export interface CatalogoConac {
  id: number;
  cuenta: string;
  descripcion: string;
  naturaleza: string;
  estructura: string;
  estadoFinanciero: string;
  posicionFinanciera: string;
  fechaAlta: Date;
  inicioVigencia: Date;
  finVigencia: Date;
  estatus: 'VIGENTE' | 'NO VIGENTE';
}
