const accountRepository = require("../dao/account.repository");
const { ReturnObject } = require('../utils/manage_response');
const responseMessages=require('../utils/manage_response');
module.exports ={
    create_new_account ,
    get_all_accounts,
    account_find_by_id_for_user,
    account_find_by_name
}

async function create_new_account(object_account){

    try {

       let count = await accountRepository. is_already_created_account(object_account.userId,object_account.accountName);
    
       if(count>0){
           return   new ReturnObject(400,'OK',{'description':'Account already created'},count);

       }

         let data =await  accountRepository.create_new_bank_account(object_account);
         return new ReturnObject(200,'OK',{'description':'Account successfully created'},data);
        
    } catch (error) {
        console.log(error);
        return  await responseMessages.internalServerError('Error.') ;
    }
}

async function get_all_accounts(userId){

    try {
        let data =await accountRepository.get_all_accounts(userId);
        return await responseMessages.finding_response_success('success',data);
    } catch (error) {
        console.log(error);
        return await responseMessages.internalServerError('Error.') ;
    }
}


async function account_find_by_id_for_user(id,userId){

    try {

        let data = await  accountRepository.account_find_by_id_for_user(id,userId);
        return responseMessages.finding_response_success('success',data);

    } catch (error) {
        console.log(error);
        return  await responseMessages.internalServerError('Error.') ;
    }
}


async function account_find_by_name(userId,accountName){

    try {

        let data = await  accountRepository.account_find_by_name_for_user(userId,accountName);
        return await responseMessages.finding_response_success('success',data);

    } catch (error) {
        console.log(error);
        return  await responseMessages.internalServerError('Error.') ;
    }
}