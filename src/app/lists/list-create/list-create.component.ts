import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ListService} from "../../shared/services/list/list.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ListModel} from "../../shared/services/list/list.model";

@Component({
  selector: 'list-create',
  templateUrl: './list-create.component.html',
  styleUrls: ['./list-create.component.css']
})
export class ListCreateComponent implements OnInit {





  public isCreating:boolean=false;
  public errorMessage:string="";
  constructor(private formBuilder: FormBuilder,private modalService:BsModalService,private spinner: NgxSpinnerService, private listService:ListService,) {



  }

  // @ts-ignore
  modalRef: BsModalRef;

  // @ts-ignore
  createParamsForm: FormGroup;

  ngOnInit(): void {

    this.createParamsForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      type: ['tasklist', Validators.required],

    });

  }




  openModal(template: TemplateRef<any>) {

    this.modalRef = this.modalService.show(template,{backdrop: 'static', keyboard: false});


  }



  onSubmit() {
    this.spinner.show();
    this.errorMessage="";
    this.isCreating=true;



    this.listService.addList(this.createParamsForm.controls['name'].value,this.createParamsForm.controls['description'].value,this.createParamsForm.controls['type'].value).subscribe(data=>
      {
        this.spinner.hide();
        this.isCreating = false;
        this.modalRef.hide();
        this.createParamsForm.reset();


      },
      error=>{
        this.spinner.hide();


        this.isCreating = false;
        this.errorMessage="Failed creating list";      }
    )





  }

}
