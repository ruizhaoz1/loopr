import request from '../../common/request'
import validator from '../validator'
import Response from '../../common/response'
import code from "../../common/code"

/**
 * @description Get the given currency price of tokens
 * @param  host
 * @param currency USD/CNY
 * @returns {Promise.<*>}
 */
export function getPriceQuote(host, {currency}) {
  try {
     validator.validate({value: currency, type: 'CURRENCY'})
  } catch (e) {
    return Promise.resolve(new Response(code.PARAM_INVALID.code, code.PARAM_INVALID.msg))
  }
  const body = {};
  body.method = 'loopring_getPriceQuote';
  body.params = [{currency}];
  return request(host, {
    method: 'post',
    body,
  })
}

/**
 * @description Get relay supported all market pairs
 * @param host
 * @returns {Promise}
 */
export function getSupportedMarket(host) {
  const body = {};
  body.method = 'loopring_getSupportedMarket';
  body.params = [];
  return request(host, {
    method: 'post',
    body,
  })
}

/**
 * @description Get all supported tokens of relay
 * @param host
 * @returns {Promise}
 */
export function getSupportedTokens(host) {
  const body = {};
  body.method = 'loopring_getSupportedTokens';
  body.params = [];
  return request(host, {
    method: 'post',
    body,
  })
}
/**
 * @description Get depth and accuracy by token pair
 * @param host
 * @param filter
 * @returns {Promise.<*>}
 */
export function getDepth(host, filter) {
  try {
     validator.validate({value: filter.delegateAddress, type: 'ADDRESS'});
     validator.validate({value: filter.market, type: 'STRING'});
     validator.validate({value: filter.length, type: 'OPTION_NUMBER'})
  } catch (e) {
    return Promise.resolve(new Response(code.PARAM_INVALID.code, code.PARAM_INVALID.msg))
  }
  const body = {};
  body.method = 'loopring_getDepth';
  body.params = [filter];
  return request(host, {
    method: 'post',
    body,
  })
}

/**
 * @description Get loopring 24hr merged tickers info from loopring relay.
 * @param host
 * @returns {Promise}
 */
export function getTicker(host) {
  const body = {};
  body.method = 'loopring_getTicker';
  body.params = [];
  return request(host, {
    method: 'post',
    body,
  })
}

/**
 * @description  Get all market 24hr merged tickers info from loopring relay.
 * @param host
 * @param market
 */
export function getTickers(host,{market}) {
  const body = {};
  body.method = 'loopring_getTickers';
  body.params = [{market}];
  return request(host, {
    method: 'post',
    body,
  })
}

/**
 * @description Get trend info per market.
 * @param host
 * @param market
 * @param interval - examples:1Hr, 2Hr, 4Hr, 1Day, 1Week.
 * @returns {Promise.<*>}
 */
export function getTrend(host, {market, interval}) {
  try {
     validator.validate({value: market, type: 'STRING'});
     validator.validate({value: interval, type: 'INTERVAL'});
  } catch (e) {
    return Promise.resolve(new Response(code.PARAM_INVALID.code, code.PARAM_INVALID.msg))
  }
  const body = {};
  body.method = 'loopring_getTrend';
  body.params = [{market, interval}];
  return request(host, {
    method: 'post',
    body,
  })
}
