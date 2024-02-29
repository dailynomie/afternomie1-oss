import Database from 'better-sqlite3';
import type {noteLog} from './types.ts';


const db = new Database("./data/an_v2-1.sqli", { verbose: console.log });

export function getLogs(): noteLog[] {
    const sql ="SELECT * FROM LOG ORDER BY ID DESC LIMIT 100"
    const stmnt = db.prepare(sql);
    const rows =stmnt.all();
    return rows as noteLog[]
}

export function getLog(uniqueid=""): noteLog[] {
    const sql ="SELECT * FROM LOG WHERE UNIQUEID = "+"'"+uniqueid+"'"
    const stmnt = db.prepare(sql);
    const rows =stmnt.all();
    return rows as noteLog[]
}


export function addLog(uniqueid="",lastrequest=0,lastreset=0,expiredate=0,expires=true,confirmed=true) {
    const sql = "INSERT INTO LOG (UNIQUEID, LASTREQUEST, LASTRESET, EXPIREDATE, EXPIRES, CONFIRMED) VALUES ( '"+uniqueid+"'" + ", "+ lastrequest + ", " + lastreset + ", " + expiredate + ", " + expires + ", " + confirmed+ ")";
    const stmnt = db.prepare(sql);
    stmnt.run();
}

export function updateLog(query="") {
    const sql = query;
    const stmnt = db.prepare(sql);
    stmnt.run();
}

export async function runQuery(query="") {
    const sql = query;
    const stmnt = db.prepare(sql);
    const rows =stmnt.all();
    return rows as noteLog[]
}

export async function deleteRows(query="") {
    const sql = query;
    const stmnt = db.prepare(sql);
    stmnt.run();
}

