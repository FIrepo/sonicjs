import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { ContentTypesService } from "projects/sonic-core/src/lib/services/content-types.service";
import { TextboxQuestion } from "projects/sonic-core/src/lib/models/question-textbox";

@Component({
  selector: "app-content-type-add",
  templateUrl: "./content-type-add.component.html",
  styleUrls: ["./content-type-add.component.css"]
})
export class ContentTypeAddComponent implements OnInit {
  contentType = {
    name: "",
    description: ""
  };

  isDataAvailable = true;
  questions = [
    new TextboxQuestion({
      key: "systemid",
      label: "System Id",
      required: false,
      order: 1
    }),

    new TextboxQuestion({
      key: "name",
      label: "Name",
      required: false,
      order: 2
    }),

    new TextboxQuestion({
      key: "description",
      label: "Description",
      order: 2
    }),
  ];

  constructor(
    private location: Location,
    private contentTypesService: ContentTypesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.contentTypesService.contentTypeCreated.subscribe(data => {
      this.router.navigate(["/content-types", data.id]);
    });
  }

  onSubmitContentTypeAdd(payload) {
    if (payload) {
      console.log("onSubmitContentTypeAdd.payload", payload);
      payload.systemid = payload.systemid; //HACK

      this.contentTypesService.contentTypeSubmitted.next(
        payload
      );
    }
  }


  back() {
    this.location.back();
  }
}