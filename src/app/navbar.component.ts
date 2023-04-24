import { Component, Input } from "@angular/core";

@Component({
  selector: "navbar",
  template: `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid" style="">
    <a class="navbar-brand" href="/">OPEN FABRIC</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="true" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="navbar-collapse collapse !show" id="navbarColor02" style="">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link" href="/admin">Admin Panel</a>
        </li>
      </ul>
    </div>
</div>
</nav>
`
})
export class NavbarComponent { }
