module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.get('/news', controller.news.list);

    // 测试
    router.get('/learn/redis', controller.learn.redis);

    const api = app.router.namespace('/api');
    /************* api **************/
    // 用户相关
    api.get('/user/info', controller.user.info);
    api.get('/user/regist', app.controller.user.regist)

    // 图形验证码
    api.get('/captcha/create', controller.captcha.create);
    api.post('/captcha/verify', controller.captcha.verify);
    /************* api-end **************/
};