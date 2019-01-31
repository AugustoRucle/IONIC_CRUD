import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  name = "NotesService";
  status: string;
  database: SQLiteObject = null;

  /* Querys */
  TableList: string = "CREATE TABLE IF NOT EXISTS list(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), date DATE, status INTEGER)";
  TableListItem: string =  "CREATE TABLE IF NOT EXISTS list_items(id INTEGER PRIMARY KEY AUTOINCREMENT, list_id INTEGER, name VARCHAR(100), description TEXT, price FLOAT, image TEXT, FOREIGN KEY(list_id) REFERENCES list(id) ON UPDATE CASCADE)";
  
  constructor() { }

  setDatabase(db: SQLiteObject){
    if(this.database === null){
      this.status = "Successfull";
      this.database = db;
    }
  }

  createTable(){
    //this.deleteLists()
    //this.deleteItems()
    this.database.executeSql(this.TableList, []);
    return this.database.executeSql(this.TableListItem, []);
  }

  createList(name:string){
    let query = "INSERT INTO list(name, date, status) VALUES(?, date('now', 'localtime'), '0')";
    return this.database.executeSql(query,[name]);
  }

  createItems(item:any, list_id: number){
    let query = "INSERT INTO list_items(list_id, name, description, price) VALUES (?, ?, ?, ?)";
    return this.database.executeSql(query,[list_id, item.name, item.description, item.price]);
  }

  getAll(){
    let query = "SELECT * FROM list";
    return this.database.executeSql(query, []).then(items => {
      let lists = [];
      for (let index = 0; index < items.rows.length; index++) {
        lists.push(items.rows.item(index));
      }
      return Promise.resolve(lists);
    }).catch(e => {
      Promise.reject(e);
    });
  }

  getAllItems(id:number){
    let query = "SELECT * FROM list_items WHERE list_id=?";
    return this.database.executeSql(query, [id]).then(items => {
      let elements = [];
      for (let index = 0; index < items.rows.length; index++) {
        elements.push(items.rows.item(index));
      }
      return Promise.resolve(elements);
    }).catch(e => {
      Promise.reject(e);
    });
  }

  deleteLists(){
    let sql = 'DELETE FROM list';
    this.database.executeSql(sql, []);
  }

  deleteItems(){
    let sql = 'DELETE FROM list_items';
    this.database.executeSql(sql, []);
  }

  deleteList(id){
    let sql = 'DELETE FROM list WHERE id=?';
    try{
      this.database.executeSql(sql, [id]);
      sql = 'DELETE FROM list_items WHERE list_id=?';
      Promise.resolve(this.database.executeSql(sql, [id]));
    }catch(e){
      Promise.reject(e)
    }

  }

  select(id:number){
    let sql = 'SELECT * FROM list WHERE id=?';
    return Promise.resolve(this.database.executeSql(sql, [id]));
  }

  updateNote(list: any, id){
    let sql = 'UPDATE list SET name=?, status=? WHERE id=?';
    return this.database.executeSql(sql, [list.name, list.status, id]);
  }

  updateNote_update(status, id){
    let sql = 'UPDATE list SET status=? WHERE id=?';
    return this.database.executeSql(sql, [status, id]);
  }

  empty(){
    let sql = 'SELECT count(*) FROM list';
    return this.database.executeSql(sql, []);
  }

}
