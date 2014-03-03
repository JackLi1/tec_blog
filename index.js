$(function() {

    var githubName = 'imsobear', // github用户名
        repoName = 'MyBlog', // 仓库名
        issueUrl = 'https://api.github.com/repos/' + githubName + '/' + repoName + '/issues';

    // 自定义模板方法，from kissy
    function substitute(str, o, regexp) {
        if (typeof str !== 'string' || !o) {
            return str;
        }

        var SUBSTITUTE_REG = /\\?\{([^{}]+)\}/g,
            EMPTY = '';

        return str.replace(regexp || SUBSTITUTE_REG, function (match, name) {
            if (match.charAt(0) === '\\') {
                return match.slice(1);
            }
            return (o[name] === undefined) ? EMPTY : o[name];
        });
    }

    $.getJSON(issueUrl, function(data) {

        var list = '';

        for (var i = 0, dataLength = data.length; i < dataLength; i++) {
            var tpl = $('#article-tpl').html(),
                issue= {};

            issue.url = data[i].html_url;
            issue.title = data[i].title;
            issue.time = data[i].created_at;

            // get tags
            for (var j = 0, labelLength = data[i].labels.length; j < labelLength; j++) {
                var comma = j === (labelLength - 1)? '': '，';
                issue.tags += data[i].labels[j] + comma;
            }

            list += substitute(tpl, issue);
        }

        console.log(list);

        $('.article-list').html(list);
    });

});
