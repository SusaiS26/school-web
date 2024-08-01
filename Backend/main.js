import mysql from "mysql2";

const mySQLCon = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '262618',
    database: 'arockiya_db'
}).promise()
console.log("Sanci");

export async function getapi() {
    const [getresul] = await mySQLCon.query("select * from  contact_tb")
    return getresul;
}

export async function postinsert(firstName,lastname,phonenumber,email_id) {
    const [postin] = await mySQLCon.query(`insert into contact_tb(firstName,lastname,phonenumber,email_id)
        values(?,?,?,?)`, [firstName,lastname,phonenumber,email_id]);
        return postin;
}
// export async function postinset(studentname, fathername, photo, studentdop, classsection) {
//     const [insvalue] = await mySQLCon.query(`insert into endrolment (studentname,fathername,photo,studentdop,classsection) 
//     values( ?, ?, ?, STR_TO_DATE(?, "%Y-%m-%d"),?)`,
//         [studentname, fathername, photo, studentdop, classsection]
//     );
//     return insvalue;
// }
