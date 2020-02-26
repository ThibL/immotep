import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PropertiesService } from "src/app/services/properties.service";
import { Subscription } from "rxjs";
import * as $ from "jquery";
import { Property } from "src/app/interfaces/property";

@Component({
  selector: "app-admin-properties",
  templateUrl: "./admin-properties.component.html",
  styleUrls: ["./admin-properties.component.css"]
})
export class AdminPropertiesComponent implements OnInit {
  propertiesForm: FormGroup;
  propertiesSubscription: Subscription;
  properties: Property[] = [];

  indexToRemove;
  indexToUpdate;

  editMode = false;

  photoUploading = false;
  photoUploaded = false;
  photoUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private propertiesService: PropertiesService
  ) {}

  ngOnInit() {
    this.initPropertiesForm();
    this.propertiesService.propertiesSubject.subscribe((data: Property[]) => {
      this.properties = data;
    });
    this.propertiesService.getProperties();
    this.propertiesService.emitProperties();
  }

  initPropertiesForm() {
    this.propertiesForm = this.formBuilder.group({
      title: ["", Validators.required],
      category: ["", Validators.required],
      surface: ["", Validators.required],
      rooms: ["", Validators.required],
      description: "",
      price: ["", Validators.required],
      sold: ""
    });
  }

  onSubmitPropertiesForm() {
    const newProperty: Property = this.propertiesForm.value;
    newProperty.sold = this.propertiesForm.get("sold").value
      ? this.propertiesForm.get("sold").value
      : false;
    newProperty.photo = this.photoUrl ? this.photoUrl : "";
    if (this.editMode) {
      this.propertiesService.updateProperty(newProperty, this.indexToUpdate);
    } else {
      newProperty.sold = false;
      this.propertiesService.createProperty(newProperty);
    }
    $("#propertiesFormModal").modal("hide");
  }

  resetForm() {
    this.editMode = false;
    this.propertiesForm.reset();
    this.photoUrl = "";
  }

  onDeleteProperty(index) {
    $("#deletePropertyModal").modal("show");
    index = this.indexToRemove;
    console.log(this.properties[index]);
  }

  onDeleteConfirmProperty() {
    /* if (
      this.properties[this.indexToRemove].photo &&
      this.properties[this.indexToRemove].photo !== ""
    ) {
      this.propertiesService.removeFile(
        this.properties[this.indexToRemove].photo
      );
    } */

    this.propertiesService.deleteProperty(this.indexToRemove);
    $("#deletePropertyModal").modal("hide");
  }

  onEditProperty(property: Property) {
    this.editMode = true;
    $("#propertiesFormModal").modal("show");
    this.propertiesForm.get("title").setValue(property.title);
    this.propertiesForm.get("category").setValue(property.category);
    this.propertiesForm.get("surface").setValue(property.surface);
    this.propertiesForm.get("description").setValue(property.description);
    this.propertiesForm.get("rooms").setValue(property.rooms);
    this.propertiesForm.get("price").setValue(property.price);
    this.propertiesForm.get("sold").setValue(property.sold);
    this.photoUrl = property.photo ? property.photo : "";
    const index = this.properties.findIndex(propertyElement => {
      if (propertyElement == property) {
        return true;
      }
    });
    this.indexToUpdate = index;
  }

  onUploadFile(event) {
    this.photoUploading = true;
    this.propertiesService
      .uploadFile(event.target.files[0])
      .then((url: string) => {
        if (this.photoUrl && this.photoUrl !== "") {
          this.propertiesService.removeFile(this.photoUrl);
        }
        this.photoUrl = url;
        this.photoUploading = false;
        this.photoUploaded = true;
        setTimeout(() => {
          this.photoUploaded = true;
        }, 5000);
      });
  }
}
