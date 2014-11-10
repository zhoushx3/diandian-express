exports.insert = function(db, callback){
  db.collection('share', function(err, share){
    if (err){
      throw new Error('获取share失败！');
    }

    share.insert([
      {
        period: "1",
        date: new Date(),
        author: 'who',
        path: '/images/share/cute_cat.jpg',
        headline: 'cute_cat', 
        summary: 'I dont know, think about it yourself, thanks',
        contents: "It's a lucky cat",
      },

      {
        period: "1",
        date: new Date(),
        author: 'who',
        path: '/images/share/cute_cat2.jpg',
        headline: 'cute_cat2', 
        summary: 'I dont know, think about it yourself, thanks',
        contents: "It's a lucky cat222",
      },

      {
        period: '1',
        date: new Date(),
        author: 'who',
        path: '/images/share/cute_dog.jpg',
        headline: 'cute_dog', 
        summary: 'I dont know, think about it yourself, thanks',
        contents: 'nothingnothingnothingnothingnothinothingnothingnothingnothinothingnothingnothingnothingnothing',
      },

      {
        period: '1',
        date: new Date(),
        author: 'who',
        path: '/images/share/cute_dog2.jpg',
        headline: 'cute_dog2', 
        summary: 'I dont know, think about it yourself, thanks',
        contents: 'nothingnothingnothingnothinothingnothingnothingnothinothingnothingnothingnothi',
      },

      {
        period: '1',
        date: new Date(),
        author: 'who',
        path: '/images/share/cute_rabbit.jpg',
        headline: 'cute_rabbit', 
        summary: 'I dont know, think about it yourself, thanks',
        contents: 'nothingnothingnonothingnothingnothingnothinothingnothingnothingnothinothingnothingnothingnothithingnothingnothingnothing',
      },

      {
        period: '2',
        date: new Date(),
        author: 'who',
        path: '/images/share/cute_rabbit2.jpg',
        headline: 'cute_rabbit2', 
        summary: 'I dont know, think about it yourself, thanks',
        contents: 'nothingnothingnotnothingnothingnothingnothihingnothingnothingnothing',
      },

      {
        period: '2',
        date: new Date(),
        author: 'who',
        path: '/images/share/cute_what.jpg',
        headline: 'cute_what', 
        summary: 'I dont know, think about it yourself, thanks',
        contents: 'nothingnothingnothingnothingnothingnothingnothinothingnothingnothingnothinothingnothingnothingnothinothingnothingnothing',
      },

      {
        period: '2',
        date: new Date(),
        author: 'who',
        path: '/images/share/cute_wolf.jpg',
        headline: 'cute_wolf', 
        summary: 'I dont know, think about it yourself, thanks',
        contents: 'nothingnothinothingnothingnothingnothinothingnothingnothingnothingnothingnothingnothingnothing',
      },

      {
        period: '2',
        date: new Date(),
        author: 'who',
        path: '/images/share/cute_rabbit2.jpg',
        headline: 'cute_rabbit2', 
        summary: 'I dont know, think about it yourself, thanks',
        contents: 'nothingnothingnotnothingnothingnothingnothihingnothingnothingnothing',
      },

      {
        period: '2',
        date: new Date(),
        author: 'who',
        path: '/images/share/cute_what.jpg',
        headline: 'cute_what', 
        summary: 'I dont know, think about it yourself, thanks',
        contents: 'nothingnothingnothingnothingnothingnothingnothinothingnothingnothingnothinothingnothingnothingnothinothingnothingnothing',
      }

    ], function(err, result){
      if (err){
        throw new Error('向share插入数据失败！');
      }
      console.log('插入share成功！');
      if (callback){
        callback();
      }
    });
  });
};