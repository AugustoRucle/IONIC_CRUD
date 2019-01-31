import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'menu', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: '', loadChildren: './Pages/login/login.module#LoginPageModule' }
];

/*
  Tabs:./tabs/tabs.module#TabsPageModule 
*/
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
