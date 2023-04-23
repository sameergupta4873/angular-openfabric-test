import { Component, Input } from "@angular/core";

@Component({
  selector: "navbar",
  template: `
  <nav class="navbar navbar-dark bg-dark justify-content-between">
    <a class="navbar-brand mx-5 my-2" routerLink='/'>Open Fabric</a>
    <ul class="nav navbar-dark">
      <li class="nav-item navbar-dark">
        <a class="nav-link text-white" routerLink='/admin'>Admin Panel</a>
      </li>
      <!-- <li class="nav-item">
        <a class="nav-link text-white" routerLink='/signin'>Sign In</a>
      </li> -->
    </ul>
</nav>
`
})
export class NavbarComponent { }
