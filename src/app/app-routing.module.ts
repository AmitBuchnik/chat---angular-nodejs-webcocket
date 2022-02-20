import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PictureDiscussionComponent } from './picture-discussion/picture-discussion.component';
import { PictureListComponent } from './picture-list/picture-list.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'picture-list'
  },
  {
    path: 'picture-list',
    component: PictureListComponent
  },
  {
    path: 'picture-discussion/:id',
    component: PictureDiscussionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
