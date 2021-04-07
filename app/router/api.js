module.exports = app => {
    const { router, controller } = app;

    // app.router.namespace(prefix, ...middlewares);
    const api = app.router.namespace('/api');

    api.post('/auth/login', controller.api.auth.login);
    api.post('/auth/logout', controller.api.auth.logout);
    api.post('/auth/register', controller.api.auth.register);

    api.get('/user/info', controller.api.user.info);

    // /************* api **************/
    // // 用户相关
    // api.get('/user/info', controller.user.info);
    // api.post('/login', controller.user.login);
    // api.post('/regist', app.controller.user.regist);
    // api.get('/user/check', controller.user.check);

    // // 图形验证码
    // api.get('/captcha/create', controller.captcha.create);
    // api.post('/captcha/verify', controller.captcha.verify);

    // api.resources('/admin/group', controller.group)
    // /************* api-end **************/
}