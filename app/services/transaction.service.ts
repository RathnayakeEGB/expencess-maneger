const transaction_repository = require("../dao/transaction.repository");
const account_repository = require("../dao/account.repository");


module.exports ={
    create_new_account
}

async function create_new_account(trans_obj){

    try {

      let accountId =  trans_obj.accountId;
      let amount =  trans_obj.amount;
      let userId  =trans_obj.userId;

     let obj= await transaction_repository.create_new_transaction(trans_obj);
     let account = await account_repository.account_find_by_id_for_user(accountId,userId);
     
     if (trans_obj.transactionType=='E'){
        let final_value_of_account =Number (account.accountBalance) -Number( amount);
        account.accountBalance =final_value_of_account;
     }else if("I"){
        let final_value_of_account =Number (account.accountBalance) +Number( amount);
        account.accountBalance =final_value_of_account;
     }else {
         console.log('Error Transaction type.............');
         return null;
     }

     await account_repository.update_account(account);
     return obj;
        
    } catch (error) {
        console.log(error);
        return null ;
    }
}