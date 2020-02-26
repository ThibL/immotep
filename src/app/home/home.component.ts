import { Component, OnInit, OnDestroy } from "@angular/core";
import { PropertiesService } from "../services/properties.service";
import { Subscription } from "rxjs";
import { Property } from "../interfaces/property";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, OnDestroy {
  properties: Property[] = [];
  propertiesSubscription: Subscription;

  constructor(private propertiesService: PropertiesService) {}

  ngOnInit() {
    this.propertiesSubscription = this.propertiesService.propertiesSubject.subscribe(
      (data: any) => {
        this.properties = data;
      }
    );
    this.propertiesService.getProperties();
    this.propertiesService.emitProperties();
  }

  ngOnDestroy() {
    this.propertiesSubscription.unsubscribe();
  }

  getSoldValue(index) {
    if (this.properties[index].sold) {
      return "red";
    } else {
      return "green";
    }
  }
}
