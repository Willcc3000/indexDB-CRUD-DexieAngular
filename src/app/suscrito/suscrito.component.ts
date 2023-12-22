import { Component, Input, OnInit, VERSION } from '@angular/core';
// import { CabeceraComponent } from '../cabecera/cabecera.component';
import { liveQuery } from 'dexie';
import { db } from '../shared/db';
import { Suscrito } from '../shared/suscritos.model';
import { Suscritosdata } from './suscritosdata';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { randomInt } from 'crypto';

@Component({
  selector: 'app-suscrito',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './suscrito.component.html',
  styleUrl: './suscrito.component.css',
})
export class SuscritoComponent implements OnInit {
  // @Input() form: FormGroup | undefined;
  btnNuevoModificar = 1;
  id = new FormControl('');
  nombreCompleto = new FormControl('');
  correo = new FormControl('');

  updateName(id: any, nom: any, corr: any) {
    this.btnNuevoModificar = 2;
    console.log(this.btnNuevoModificar);

    console.log(id);
    console.log(nom);
    console.log(corr);

    this.id.setValue(id);
    this.nombreCompleto.setValue(nom);
    this.correo.setValue(corr);
  }

  miForm: FormGroup | undefined;

  checkoutForm;

  listaSuscritos = liveQuery(() => db.suscritos.toArray());
  // listaSuscritos = liveQuery(() => this.listTodoSuscritos());
  suscritos: Suscrito[] = [];

  // model = new Suscritosdata(randomInt(10), 'correonuevo', 'Carla Vañez');

  constructor(private formBuilder: FormBuilder) {
    this.btnNuevoModificar = 1;
    console.log(this.btnNuevoModificar);
    this.checkoutForm = this.formBuilder.group({
      name: '',
      address: '',
    });
    // this.listaSuscritos.subscribe(
    //   (suscrito) => {
    //     this.suscritos = suscrito;
    //     console.log(suscrito);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
    this.listTodoSuscritos();
  }

  ngOnInit() {
    // this.items = this.cartService.getItems();
  }

  async addNewDato() {
    this.btnNuevoModificar = 1;
    console.log(this.btnNuevoModificar);

    await db.suscritos.add({
      nombreCompleto: this.nombreCompleto.value,
      correo: this.correo.value,
    });
    this.listTodoSuscritos();
  }

  async updateDato() {
    this.btnNuevoModificar = 1;
    console.log(this.btnNuevoModificar);

    db.suscritos
      .update(Number(this.id.value), {
        nombreCompleto: this.nombreCompleto.value,
        correo: this.correo.value,
      })
      .then(function (updated) {
        if (updated) console.log('Datos modificados correctamente');
        else console.log('Registro no encontrado');
      });

    this.listTodoSuscritos();
  }

  async deleteDato(id: any) {
    this.btnNuevoModificar = 1;
    console.log(this.btnNuevoModificar);

    db.suscritos.delete(Number(id));
    console.log('Registro ELIMINADO');
    this.listTodoSuscritos();
  }

  async listTodoSuscritos() {
    // console.log(db.suscritos.toArray());
    db.suscritos
      .toArray()
      .then((data) => {
        this.suscritos = data;
      })
      .catch((error) => {
        console.error('Error al acceder a los datos:', error);
      });
  }
  itemName = 'My new item';
}
