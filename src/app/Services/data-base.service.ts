import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {
  database: SQLiteObject = null;
  
  constructor() { }

  setDatabase(db: SQLiteObject){
    if(this.database === null){
      this.database = db;
    }
  }

  createTable(){
    let tableList = "CREATE TABLE IF NOT EXISTS list(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), date DATE, status INTEGER)";
    let tableListItem =  "CREATE TABLE IF NOT EXISTS list_items(id INTEGER PRIMARY KEY AUTOINCREMENT, list_id INTEGER, name VARCHAR(100), description TEXT, price FLOAT, image TEXT, FOREIGN KEY(list_id) REFERENCES list(id) ON UPDATE CASCADE)";
    
    /*  Delete ALL  */
    this.deleteItems()
    this.deleteLists()

    this.database.executeSql(tableList, []);
    return this.database.executeSql(tableListItem, []);
  }
  
  createList(name:string){
    let query = "INSERT INTO list(name, date, status) VALUES(?, date('now', 'localtime'), '0')";
    return this.database.executeSql(query,[name]);
  }

  createItems(item:any, photo: string, list_id: number){
    let query = "INSERT INTO list_items(list_id, name, description, price, image) VALUES (?, ?, ?, ?, ?)";
    return this.database.executeSql(query,[list_id, item.name, item.description, item.price, photo]).then(d =>{
      Promise.resolve(d)
    }).catch(e=>{
      Promise.reject(e)
    })
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

  getAllItems(list_id:number){
    let query = "SELECT * FROM list_items WHERE list_id = ?";
    return this.database.executeSql(query, [list_id]).then(items => {
      let lists = [];
      for (let index = 0; index < items.rows.length; index++) {
        lists.push(items.rows.item(index));
      }
      return Promise.resolve(lists);
    }).catch(e => {
      Promise.reject(e);
    });
  }
  
  selectNote(id:number){
    let sql = 'SELECT * FROM list WHERE id=?';
    return this.database.executeSql(sql, [id]).then(items => {
      return Promise.resolve(items.rows.item(0));
    }).catch(e => {
      Promise.reject(e);
    });
  }

  deleteItems(){
    let sql = 'DROP FROM list_items';
    this.database.executeSql(sql, []);
  }

  deleteLists(){
    let sql = 'DROP FROM list';
    this.database.executeSql(sql, []);   
  }

  deletItem(id){
    let sql = 'DELETE FROM list WHERE id=?';
    try{
      this.database.executeSql(sql, [id]);
      sql = 'DELETE FROM list_items WHERE list_id=?';
      Promise.resolve(this.database.executeSql(sql, [id]));
    }catch(e){
      Promise.reject(e)
    }
  }

  updateNote(list: any, id){
    let sql = 'UPDATE list SET name=?, status=? WHERE id=?';
    return this.database.executeSql(sql, [list.name, list.status, id]);
  }


  updateNote_status(status, id){
    let sql = 'UPDATE list SET status=? WHERE id=?';
    return this.database.executeSql(sql, [status, id]);
  }

  updateNote_name(name, id){
    let sql = 'UPDATE list SET name=? WHERE id=?';
    return this.database.executeSql(sql, [name, id]);
  }

  empty(){
    let sql = 'SELECT count(*) FROM list';
    return this.database.executeSql(sql, []);
  }  
}
