import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CataloguePageComponent } from "./pages/catalogue/catalogue.page.component";
import { LandingPageComponent } from "./pages/landing/landing.page.component";
import { TrainerPage } from "./pages/trainer/trainer.page";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/landing'
    },
    {
        path: 'landing',
        component: LandingPageComponent
    },
    {
        path: 'trainer',
        component: TrainerPage
    },
    {
        path: 'catalogue',
        component: CataloguePageComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}