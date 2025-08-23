import { Routes } from '@angular/router';
import { MenuComponent } from './modules/menu/menu.component';
import { CatalogoConacComponent } from './modules/catalogo-conac/catalogo-conac.component';

export const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: '',
        component: CatalogoConacComponent
      }
    ]
  }
];
