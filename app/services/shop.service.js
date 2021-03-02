const shop_repository = require("../dao/shop.repository");

module.exports = {
    create_shop,
    find_all_shops_for_user,
    findById,
    findByName_for_user
};


async function create_shop(shop_object){

    try {

        let count = await shop_repository. is_already_created_shop(shop_object.userId,shop_object.shopName);
    
        if(count>0){
            return{
                 status:400,
                 display:'Shop Already Created.',
                 data:null
            }
        }

        return await  shop_repository.create_shop(shop_object);
        
    } catch (error) {
        console.log(error);
        return null ;
    }
}

async function find_all_shops_for_user(userId){

    try {
        return await  shop_repository.find_all_shops_for_user(userId);
        
    } catch (error) {
        console.log(error);
        return null ;
    }
}

async function findById(userId){

    try {
        return await  shop_repository.find_all_shops_for_user(userId);
        
    } catch (error) {
        console.log(error);
        return null ;
    }
}

async function findByName_for_user(name,userId){

    try {
        return await  shop_repository.shop_findByName_for_user(name,userId);
    } catch (error) {
        console.log(error);
        return null ;
    }
}