
class ReturnObject{

     constructor(statusCode,status,result,data){
        this.statusCode =statusCode;
        this.status =status;
        this.result =result;
        this.data =data;
    }
    
}

async function internalServerError(message){

    return new ReturnObject(500,'Internal Server error',{description:message},null)
}

async function finding_response_success(message,data){
    return new ReturnObject(200,'OK',{description:message},data);
}

module.exports = {
    ReturnObject,
    internalServerError,
    finding_response_success
};