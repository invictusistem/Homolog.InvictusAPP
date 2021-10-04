// import { Component, Inject, Input, OnInit } from "@angular/core";
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { CepReturn } from "src/app/_shared/models/cepreturn.model";
// import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
// import { Router } from "@angular/router";
// import { environment } from "src/environments/environment";
// import { Cursos } from "src/app/_shared/models/perfil.model";
// import { Colaborador } from "src/app/_shared/models/colaborador.model";
// //import { TemplateTasks } from 'src/app/shared/models/templateTasks.model';

// export class ProfResponse{
//     constructor(
//     public id?: number,
//     public nome?: string,
//     public disciplina?: string,
//     public checked?: boolean
//     ){}

// }

// @Component({
//     selector: 'addprofmodal',
//     templateUrl: './addprof.component.html',
//     styleUrls: ['./addprof.component.scss']
// })


// export class AddProfComponent implements OnInit {
//     checked = false;
//     indeterminate = false;
//     labelPosition: 'before' | 'after' = 'after';
//     disabled = false;
//     // pageSize: number = 5;
//     // genericTasks: GenericTask[] = new Array<GenericTask>();
//     // length: number;
//     // pageEvent: PageEvent;
//     item = { value: 0 }
//     cursos = Cursos;
//     profResp: ProfResponse[] = new Array<ProfResponse>();
//     //baseUrl = environment.baseUrl;
//     //public cepReturn: CepReturn = new CepReturn();
//     public cursoForm: FormGroup;
//     baseUrl = environment.baseUrl;
//     profes: Colaborador[];//["Joao", "jose", "Mario"]
//     //public bairro: string = null;
//     //@Input() disabled = true;
//     //public unidades: string[] = new Array("Campo Grande II", "Jacarepaguá");
//     formArray = new FormArray([])

    
//     constructor(
//         //private service: AdmService,
//         private router: Router,
//         private _fb: FormBuilder,

//         private http: HttpClient,
//         public dialogRef: MatDialogRef<AddProfComponent>,
//         @Inject(MAT_DIALOG_DATA) public data: any
//     ) {

//         this.cursoForm = _fb.group({
//             // templateName: ['', [Validators.required, Validators.minLength(5)]],
//             // newCat: [,[Validators.required, Validators.minLength(3)]],
//             // newFunc: [, [Validators.required, Validators.minLength(3)]]
//             curso: ['', [Validators.required]],
//             prevInicio: ['', [Validators.required]],
//             numAlunos: ['', [Validators.required]],
//             valor: ['', [Validators.required]],
//            // profs: new FormArray([])

//         })
//     }

//     ngOnInit() {
//        // console.log(this.data['listProfs']);
//        console.log(this.profResp)
//         this.getProfsList(1, 5);
//     }

//     professores: Colaborador[];

//     getProfsList(itemsPerPage: number, currentPage: number) {

//         this.http.get(`${this.baseUrl}/colaboradores/professores/?unidade=Campo Grande&itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`)
//             .subscribe(
//                 (result) => {
//                     console.log(result)

//                     //this.profResp = result['data']
//                     //this.professores = result['data']
//                     result['data'].forEach(element => {
//                         this.profResp.push(new ProfResponse(element.id,
//                             element.nome, null,false))
//                     });
//                     console.log(this.profResp)

//                 },
//                 (error) => { console.log(error) },
//                 () => { }
//             )
//     }
//     // unidade
//     addProf(prof: Colaborador) {
//         console.log(prof)
//         this.profes.push(prof)
//         //console.log(this.data['listProfs'])
//     }


//     getFirst() {
//         // return this.formArray.get(0);
//     }
//     clear() {
//         this.formArray.clear();
//     }
//     replace() {
//         this.formArray.setControl(0, new FormControl(''));
//     }
//     addSkill() {
//         const group = new FormGroup({
//             level: new FormControl(''),
//             name: new FormControl('')
//         });

//         this.formArray.push(group);
//         //this.formArray.push(new FormControl(''));
//     }

//     removeSkill(index: number) {
//         this.formArray.removeAt(index);
//     }

//     prepend() {
//         this.formArray.insert(0, new FormControl(''));
//     }

//     createItemFormGroup() {
//         return this._fb.group({
//             nome: ['', [Validators.required]],
//             materia: ['', [Validators.required]]
//         });
//     }

//     addItem() {
//         this.formArray.push(this.createItemFormGroup());
//     }



//     transfer = { amount: 0 }

//     validateOnlyNumbers(evt) {
//         var theEvent = evt || window.event;
//         var key = theEvent.keyCode || theEvent.which;
//         key = String.fromCharCode(key);
//         var regex = /[0-9]|\./;
//         if (!regex.test(key)) {
//             theEvent.returnValue = false;
//             if (theEvent.preventDefault) theEvent.preventDefault();
//         }
//     }
//     dobMaxDate = new Date();

//     //     ngOnChanges() {
//     //         logradouro
//     // cidade
//     // uf
//     // bairro

//     //     }

//     save(form: any) {
//         //const novoColaborador = JSON.stringify(form.value);
//         console.log(form)

//         //this.redi(["./adm/colaboradores"]);
//         this.http.post(`${this.baseUrl}/colaboradores`, form, {
//             //this.http.post("http://api.invictustemp.com.thor.hostazul.com.br/api/identity/login", credentials, {

//             headers: new HttpHeaders({
//                 "Content-Type": "application/json",
//                 "Authorization": "Bear "
//             })
//         }).subscribe(response => {

//             console.log(response)


//             // this.dialogRef.close();
//         }, err => { },
//             () => { });
//     }

//     onSubmit(form: FormGroup) {
//         console.log(form.value)
//         console.log(form.valid)
        
//         if (form.valid) {
//             console.log('form valid')
//             const novoColaborador = JSON.stringify(form.value);
//             //this.save(novoColaborador)

//         }
//     }





// }