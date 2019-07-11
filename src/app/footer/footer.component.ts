import { Component } from "@angular/core";

@Component({
  selector: "app-footer",
  templateUrl: "footer.component.html"
})
export class FooterComponent {
  public title: string;

  constructor() {
    this.title = "Footer";
  }
}
