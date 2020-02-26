import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import * as firebase from "firebase";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  now: number;
  isLoggedIn = false;

  constructor(private authenticationService: AuthenticationService) {
    setInterval(() => {
      this.now = Date.now();
    });
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(userSession => {
      if (userSession) {
        this.isLoggedIn = true;
      } else {
        console.log("Déconnecté!");
        this.isLoggedIn = false;
      }
    });
  }

  onSignout() {
    this.authenticationService.signOutUser();
  }
}
