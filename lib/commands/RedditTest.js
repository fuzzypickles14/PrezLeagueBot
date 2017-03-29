/**
 * Created by Andrew Toomey on 12/2/2016.
 */
const cfg     = require('../../config.js');
let Clapp = require('../modules/clapp-discord/index');
let redditConnect = null;

const reddit = null;

module.exports = new Clapp.Command({
  name: "GrabRedditPosts",
  desc: "Grabs reddit posts from the provided subreddit starting from the post popular to the nth value passed in.",
  args: [
    {
      name: 'Subreddit',
      desc: 'the subreddit you wish to access',
      type: 'string',
      required: true,
      default: 'Video handler is not defined',

    },
    {
      name: 'Number of posts',
      desc: 'The number of posts to pull',
      type: 'string',
      required: false,
      default: '1',
    }
  ],
  fn: (argv, context) => {
    let sub = context.msg.content.split(' ')[2];
    let numPosts = parseFloat(context.msg.content.split(' ')[3]);
    reddit.getSubreddit(sub).getHot({limit: numPosts}).map(function(post){
      if (post.distinguished != 'moderator') {
        post = post.title + '\n' + post.url
      }else {
        post = null;
      }
      return post;
      }).then(post => {

      let postInfo = '\n';
      for (let i = 0; i < post.length; i++)
      {
        if (post[i] != null) {
          postInfo += post[i] + '\n';
        }
      }
      context.msg.reply(postInfo);
    });

    }
});
