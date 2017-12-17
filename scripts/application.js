$(function() {

  //HOST = "http://studygolang.com"

  // get subjects
  $.getJSON("explore.json", function(data) {
    var items = [];
    var subjects = data.active_team_subjects;
    subjects = subjects.concat(data.active_person_subjects)

    $.each(subjects, function(i, s) {
      items.push('<li><a href="' + s.url + '?ref=chrome">' + s.name + '</a></li>');
    });

    $("#hots").html($("<ul/>", {
      "class": "list-unstyled",
      html: items.join("")
    }));
  });

  // get subjects
  getDaily = function() {
    $.getJSON("daily.json", function(data) {
      var items = [];

      $.each(data.posts, function(i, post) {
        //如果封面图为空，则以用户头像代替
        var cover_url = post.subject.image;
        if (!cover_url) {
          cover_url = post.user.avatar;
        }

        post = '\
          <div class="post">\
            <div class="content" data-url="' + post.url + '?ref=chrome">\
              <h3 class="title">\
                <a target="_blank" rel="external" href="' + post.original_url + '?ref=chrome">' + post.title + '</a>\
              </h3>\
              <div class="meta">\
                ' + post.original_site_name + '\
                <span><i class="fa fa-comment-o"></i> ' + post.comment_count + '</span>\
                <span><i class="fa fa-thumbs-o-up"></i> ' + post.like_count + '</span>\
              </div>\
            </div>\
            <div class="user-info">\
              <div class="user-avatar">\
                <a target="_blank" href="' + post.subject.url + '?ref=chrome">\
                  <img width="32" src="' + cover_url + '">\
                </a>\
              </div>\
            </div>\
            <div class="subject-name">\
              <a target="_blank" href="' + post.subject.url + '?ref=chrome">' + post.subject.name + '</a>\
            </div>\
          </div>';
        items.push(post)
      });

      $("#daily").html($("<div/>", {
        "class": "posts",
        html: items.join("")
      }));
    });
  }

  getDaily()

  $('body').on('click', '#title', function(e) {
    e.stopPropagation()
    getDaily()
  })


  $('body').on('click', '.post .content', function(e) {
    url = $(this).data('url')
    if (url) {
      window.location.href = url
    }
  })

  $('body').on('click', '.post .content .title a', function(e) {
    e.stopPropagation()
  })


  $('body').on('click', '.navbar-toggle', function(e) {
    e.stopPropagation()
    $('#sidebar-wrap').animate({
      left: 0,
    });
  })

  $('body').on('click', '.close-sidebar', function(e) {
    e.stopPropagation()
    $('#sidebar-wrap').animate({
      left: "-100%",
    });
  })

})