import { Routes } from '@angular/router';
import { MenuComponent } from './modules/menu/menu.component';
import { CatalogoConacComponent } from './modules/catalogo-conac/catalogo-conac.component';
import { AdministracionTemasComponent } from './modules/administracion-temas/administracion-temas.component';

export const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      { path: '', redirectTo: 'catalogo-conac', pathMatch: 'full' },
      { path: 'catalogo-conac', component: CatalogoConacComponent },
      { path: 'administracion-temas', component: AdministracionTemasComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
