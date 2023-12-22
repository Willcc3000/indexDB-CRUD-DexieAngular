import Dexie, { Table } from 'dexie';
import { Suscrito } from './suscritos.model';

export class AppDB extends Dexie {
  suscritos!: Table<Suscrito, number>;

  constructor() {
    super('examenUABtecIntern');
    this.version(3).stores({
      suscritos: '++id, correo, nombreCompleto',
    });
    // this.on('populate', () => this.populate());
  }

  // async populate() {
  //   await db.suscritos.bulkAdd([
  //     {
  //       id: 1,
  //       correo: 'micorreo',
  //       nombreCompleto: 'Sven',
  //     },
  //     {
  //       id: 2,
  //       correo: 'micor',
  //       nombreCompleto: 'Sazy',
  //     },
  //     {
  //       id: 3,
  //       correo: 'micocom',
  //       nombreCompleto: 'Salchis',
  //     },
  //   ]);
  // }
}

export const db = new AppDB();
