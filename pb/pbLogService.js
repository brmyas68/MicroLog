'use strict';
const grpc = require('@grpc/grpc-js');
//const { ILog } = require('../PostgresLogService/ILog');
const   LogService   = require('../PostgresLogService/LogService');
 
  function Insert(call, callback) {
      
      var LogInsert =  call.request.Log;
       LogService.Insert(LogInsert).then((state) =>{
            if(state){
                callback(null,
                    {
                        LogState : state ,
                        Status:{
                            StatusCode    : 0, //pbLogService.StatusCode.Status200  ,
                            StatusMessage : 0, //pbLogService.StatusMessage.SUCCESS,
                        }
                });
            }else {
                callback(null,
                    {
                        LogState : state ,
                        Status:{
                            StatusCode    : 1,// pbLogService.StatusCode.Status400  ,
                            StatusMessage : 1,//pbLogService.StatusMessage.FAILED,
                        }
                });
            }
      });
      //.catch((e)=>{   callback('error', e); });

  }
  
  function GetByWhere(call, callback) {
   // let LogGet= new ILog();
    
    _LogUserID = call.request.LogUserID;
     
       LogService.GetByWhere(_LogUserID).then((Logs) =>{
            if(Logs != null){
                Logs.forEach(function(_Log) {
                    call.write({
                        Log: _Log,
                        Status:{
                            StatusCode    : 0,//StatusCode.Status200  ,
                            StatusMessage : 0,//StatusMessage.SUCCESS,
                        },
                    });
                });
                call.end();
                
            }else {
                callback(null,
                    {
                        Log : null ,
                        Status:{
                            StatusCode    : 1,//StatusCode.Status400  ,
                            StatusMessage : 1,//StatusMessage.FAILED,
                        }
                });
                call.end();
            }
      });
      //.catch((e)=>{   callback('error');   call.end();});
  }


  module.exports={
    Insert,
    GetByWhere,
  }
