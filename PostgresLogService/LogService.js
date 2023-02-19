

const  dbPool  = require('./db');
const { ILog } = require('./ILog');

var   Log      = new ILog();


async function Insert( _ILog )   {
    
    const insertSql = 'INSERT INTO  Tbl_Log (Log_UserID,Log_Action,Log_Controller,Log_DateTime,Log_Message) VALUES ($1,$2,$3,$4,$5)'
    const res = await dbPool.query(insertSql, [_ILog.LogUserID, _ILog.LogAction, _ILog.LogController,_ILog.LogDateTime,_ILog.LogMessage])
    if (res.rowCount > 0){
        return true;
    }
    return false;
}

async function  GetByWhere ( LogUserID  )  {

    const  selectSql = 'SELECT * FROM  Tbl_Log   WHERE  Log_UserID=$1'
    const res = await dbPool.query(selectSql,  [LogUserID]);
    if (res.rows.length >0){
        Log = res.rows;
        return Log;
    }
    return null;
}


module.exports = {
    Insert,
    GetByWhere,
}