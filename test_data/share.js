exports.insert = function(db, callback){
  db.collection('share', function(err, share){
    if (err){
      throw new Error('获取share失败！');
    }

    share.insert([
      {
        date: '2014/09/19',
        author: 'who',
        path: '/images/share/cute_cat.jpg',
        headline: 'cute_cat', 
        contents: "It's a lucky cat"
      },

      {
        date: '2014/09/19',
        author: 'who',
        path: '/images/share/cute_cat2.jpg',
        headline: 'cute_cat2', 
        contents: "It's a lucky cat222"
      },

      {
        date: '2014/09/19',
        author: 'who',
        path: '/images/share/cute_dog.jpg',
        headline: 'cute_dog', 
        contents: 'nothingnothingnothingnothingnothinothingnothingnothingnothinothingnothingnothingnothingnothing'
      },

      {
        date: '2014/09/19',
        author: 'who',
        path: '/images/share/cute_dog2.jpg',
        headline: 'cute_dog2', 
        contents: 'nothingnothingnothingnothinothingnothingnothingnothinothingnothingnothingnothi'
      },

      {
        date: '2014/09/19',
        author: 'who',
        path: '/images/share/cute_rabbit.jpg',
        headline: 'cute_rabbit', 
        contents: 'nothingnothingnonothingnothingnothingnothinothingnothingnothingnothinothingnothingnothingnothithingnothingnothingnothing'
      },

      {
        date: '2014/09/19',
        author: 'who',
        path: '/images/share/cute_rabbit2.jpg',
        headline: 'cute_rabbit2', 
        contents: 'nothingnothingnotnothingnothingnothingnothihingnothingnothingnothing'
      },

      {
        date: '2014/09/19',
        author: 'who',
        path: '/images/share/cute_what.jpg',
        headline: 'cute_what', 
        contents: 'nothingnothingnothingnothingnothingnothingnothinothingnothingnothingnothinothingnothingnothingnothinothingnothingnothing'
      },

      {
        date: '2014/09/19',
        author: 'who',
        path: '/images/share/cute_wolf.jpg',
        headline: 'cute_wolf', 
        contents: 'nothingnothinothingnothingnothingnothinothingnothingnothingnothingnothingnothingnothingnothing'
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