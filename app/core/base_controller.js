const { Controller } = require('egg');
class BaseController extends Controller {
  get user() {
    return this.ctx.session.user;
  }

  success(data, headers) {
    this.ctx.body = {
      success: true,
      data,
    };
    if (headers && typeof headers === 'object') {
      this.ctx.set(headers)
    }
  }

  response(data, message, code = 0, headers = {}) {
    let responseBody = {
      message: '',
      timestamp: 0,
      result: data,
      code: 200
    }

    if (message !== undefined && message !== null) {
      responseBody.message = message
    }
    if (code !== undefined && code !== 0) {
      responseBody.code = code
      this.ctx.status = code
    }
    if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
      this.ctx.set(headers)
    }
    responseBody.timestamp = new Date().getTime()

    this.ctx.body = responseBody
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}
module.exports = BaseController;