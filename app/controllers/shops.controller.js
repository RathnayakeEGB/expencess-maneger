

const shop_service = require('../services/shop.service');

exports.create =async(req, res, next)=>{
  
    let obj =req.body;
    obj.userId =req.user.id;

    shop_service.create_shop(obj).then(data=>{
        return res.send(data);
    }).catch(err=>{
        console.log('Err___ ',err);
        return res.status(500).send(err_500);
    })

};

exports.findAll =async(req, res, next)=>{
  
     userId =req.user.id;

    shop_service.find_all_shops_for_user(userId).then(data=>{
        return res.send(data);
    }).catch(err=>{
        console.log('Err___ ',err);
        return res.status(500).send(err_500);
    })

};

exports.findById =async(req, res, next)=>{
  
   let userId =req.user.id;
   let  id =req.params.id;
   shop_service.findById_for_user(id,userId).then(data=>{
       return res.send(data);
   }).catch(err=>{
       console.log('Err___ ',err);
       return res.status(500).send(err_500);
   })

};

exports.findByShopName =async(req, res, next)=>{
  
    let userId =req.user.id;
    let  name =req.params.name;
    shop_service.findByName_for_user(name,userId).then(data=>{
        return res.send(data);
    }).catch(err=>{
        console.log('Err___ ',err);
        return res.status(500).send(err_500);
    })
 
 };

