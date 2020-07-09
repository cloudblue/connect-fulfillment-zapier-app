/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */


const _ = require('lodash');
const winston = require('winston');

const getProductIdFromItems = (items) => {
  const itemIds = _.keys(items);
  if (itemIds.length > 0 && itemIds[0].length > 15) {
    return itemIds[0].substr(0, 15);
  }
  return null;
};

const getLogger = () => {
  const transports = [
    new winston.transports.Console(),
  ];
  if (process.env.CONNECT_LOGGER_URL) {
    const url = new URL(process.env.CONNECT_LOGGER_URL);
    transports.push(
      new winston.transports.Http({
        host: url.host,
        port: url.port,
        path: url.path,
        ssl: url.ssl,
      }),
    );
  }
  return winston.createLogger({
    level: 'debug',
    transports,
  });
};

module.exports = {
  getProductIdFromItems,
  getLogger,
};
