const shop_repository = require("../dao/shop.repository");

module.exports = {
    create_shop
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

