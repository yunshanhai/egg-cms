module.exports = app => {
    require('./router/api')(app);

    const { router, controller } = app;
    // router.get('/', controller.home.index);
    // router.get('/news', controller.news.list);

    // // 测试
    // router.get('/learn/redis', controller.learn.redis);

    // router.post('/auth/login', controller.auth.login);
    // router.post('/auth/logout', controller.auth.logout);
    // router.post('/auth/register', controller.auth.register);
    
};