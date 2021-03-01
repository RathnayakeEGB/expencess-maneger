

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