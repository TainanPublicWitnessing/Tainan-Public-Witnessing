# develop note

## file structures

app/
  _elements/  (reusable components)
    dialogs/
  _managers/  (classes for component composition, manage reusable rules)
  _pages/  (unique and stable components, show in router-outlet)
    example/
      example.component.ts
      example.component.html
      example.component.css
      example.service.ts  (optional)
      child_component/  (including unique and stable dialog)
  _services/  (data module services, read data from server)
  _structures/  (classes for data structures)

## authority

### routing

add canActivate:[AuthorityService] in the path that should check authority

example:

  app-routing.module.ts

    const routes: Routes = [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      { path: "new_user", component: NewUserComponent, canActivate:[AuthorityService] },
      { path: "api", component: ApiComponent, canActivate:[AuthorityService] }
    ];

### html element

inject AuthorityService into component's constructure

use *ngIf="authorityService.checkAuthority(action_name)" to check authority

example:

  example.component.ts

    constructure(
      private authorityService: AuthorityService
    ){}
  
  example.component.html

    <div *ngIf="authorityService.checkAuthority('example_manager_see_me')">
      only manager can see me
    </div>

# TainanPublicWitnessing

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
