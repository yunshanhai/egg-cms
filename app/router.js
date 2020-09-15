module.exports = app => {
    require('./router/api')(app);

    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.get('/news', controller.news.list);

    // 测试
    router.get('/learn/redis', controller.learn.redis);
};