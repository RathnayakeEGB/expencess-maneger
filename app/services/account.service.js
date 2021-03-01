const accountRepository = require("../dao/account.repository");

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
           return{
                status:400,
                display:'Account Already Created.',
                data:null
           }
       }

        return await  accountRepository.create_new_bank_account(object_account);
        
    } catch (error) {
        console.log(error);
        return null ;
    }
}

async function get_all_accounts(userId){

    try {

        return await  accountRepository.get_all_accounts(userId);
        
    } catch (error) {
        console.log(error);
        return null ;
    }
}


async function account_find_by_id_for_user(id,userId){

    try {

        return await  accountRepository.account_find_by_id_for_user(id,userId);
        
    } catch (error) {
        console.log(error);
        return null ;
    }
}


async function account_find_by_name(userId,accountName){

    try {

        return await  accountRepository.account_find_by_name_for_user(userId,accountName);
        
    } catch (error) {
        console.log(error);
        return null ;
    }
}