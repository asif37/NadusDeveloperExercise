import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Machine } from '../../../models/MachineModel/machineModel';
import { MachineService } from '../../../services/machine/machine.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserManagerService } from '../../../services/sharedservices/user-manager.service';
import { TostService } from '../../../services/sharedservices/tost.service';

@Component({
  selector: 'app-add-machine',
  templateUrl: './add-machine.component.html',
  styleUrls: ['./add-machine.component.scss']
})
export class AddMachineComponent implements OnInit {
  @Output() emitter: EventEmitter<any>;
  machine: Machine;
  imgsrc = "";
  selectedTyeId: string;
  buttonTxt = "";
  formMachine: FormGroup;
  constructor(private _machineservice: MachineService,
    private tost: TostService,
    private userServive: UserManagerService,
    private fromBuilder: FormBuilder) {
    this.emitter = new EventEmitter();

    //
    this.machine = new Machine();
    //this.getTypeList();
    this.buildMachineForm();
  }

  ngOnInit() {
    this.buttonTxt = (this.machine.productId) ? "Update" : "Add";
  }
  closePopUp() {
    this.emitter.emit('close');
  }

  selectEmployee($event) {
    this.selectedTyeId = $event.target.value;
    //console.log(this.selectedTyeId);
  }


  savemachine() 
  {
    if (this.imgsrc!="") {
      this.machine.imageLocation=this.imgsrc;
    }
    this.machine.productTypeId = 0;
    if (this.machine.serialNumber) {
      this.machine.serialNumber = this.machine.serialNumber.trim();
    }

    if (this.machine.productId > 0) {
      this.machine.updatedBy = this.userServive.getCurrentUser().userId;
    } else {
      this.machine.updatedBy = this.userServive.getCurrentUser().userId;
      this.machine.createdBy = this.machine.updatedBy;
    }
    this._machineservice.saveMachine(this.machine)
      .subscribe(
        data => {
          if (data) {
            this.tost.generalhttpSuccess();
            this.closePopUp();
          }
        }, error => { console.log(error); this.tost.generalhttpError(); });
  }



  buildMachineForm() {
    this.formMachine = this.fromBuilder.group(
      {
        productName: ['', [Validators.required]],
        serialNumber: ['', [Validators.required]],
        imageLocation: '',
        // notes: ''

      });
  }

  generateImageAndShow(event: any) {

    if (event) {
      let ImageUploaded = (event.target as HTMLInputElement).files;
      if (ImageUploaded && ImageUploaded.length > 0) {
        let type = ImageUploaded[0].type;
        if (type && type.toLowerCase().includes("image")) {
          let reader = new FileReader();
          reader.readAsDataURL(ImageUploaded[0]);
          reader.onload = (eve) => {
            this.imgsrc = reader.result;
          }
        } else {
          this.tost.info("Please select a valid image file");
        }
      }
    }
  }

  onImageUpload(event: Event) {
    // this.imgSrc = this.imageService.generateDataUrlFromImage(event);
    //this.machine.imageLocation = this.imgSrc;
    if (event) {
      let ImageUploaded = (event.target as HTMLInputElement).files;
      if (ImageUploaded && ImageUploaded.length > 0) {
        let type = ImageUploaded[0].type;
        if (type && type.toLowerCase().includes("image")) {
          let reader = new FileReader();
          reader.readAsDataURL(ImageUploaded[0]);
          reader.onload = (eve) => {
            this.machine.imageLocation = reader.result;
            this.formMachine.controls["serialNumber"].setValue(" ");
          }
        } else {
          this.tost.error("Please select a valid image file");
          return "";
        }
      } else {
        let value = this.formMachine.controls["serialNumber"].value;
        if (value) {
          this.formMachine.controls["serialNumber"].setValue(value.trim());
        }

      }
    }
  }
}


