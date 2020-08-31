'use strict';

const
	express = require('express'),
	userService = require('../../services/user');

let router = express.Router();

router.get('/buy_order', userService.addBuyOrder);
router.get('/sell_order', userService.addSellOrder);
router.get('/copy_data_to_redis', userService.storeDataInRedis);
router.get('/get_data_from_redis', userService.getDataFromRedis);

module.exports = router;
