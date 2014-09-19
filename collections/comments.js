//最新动态、活动预告、志愿者分享、图片新闻的图片、加入团队页面的评论及回复
//加入团队页面的评论postId设为'volunteer'

//直接评论：对文章的评论，而非对某个评论的回复。
/*
  comments:
    _id: ObjectID,
    postId: postId/activityId/shareId/  //所属最新动态/活动预告/分享/
    commentId: commentId,       //所属评论，如果是直接评论，这里为null
    replyTo: userId,          //回复的用户, 如果是直接评论，这里为null
    createdAt: Date,
    createdBy: userId,
    content: string,          //1-200字
    asking: true/false,         //是否提问点点公益, 只有直接评论可以为true
    top: true/false           //是否置顶
*/