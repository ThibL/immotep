import { Component } from "@angular/core";
import * as firebase from "firebase";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "immotep";

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyBjZfZYf_hhxj_IwiiR-zSPM9ViEN3IHnI",
      authDomain: "immotep-74480.firebaseapp.com",
      databaseURL: "https://immotep-74480.firebaseio.com",
      projectId: "immotep-74480",
      storageBucket: "immotep-74480.appspot.com",
      messagingSenderId: "442445410714",
      appId: "1:442445410714:web:8787284fa30578047b0a23",
      measurementId: "G-WTKX00HKWY"
    };
    firebase.initializeApp(firebaseConfig);
  }
}
