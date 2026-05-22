// Mini Game Hub - 游戏详情页逻辑

(function () {
  // 解析URL参数
  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  var gameId = getParam("id");

  // 找到当前游戏
  var game = null;
  for (var i = 0; i < GAMES.length; i++) {
    if (GAMES[i].id === gameId) {
      game = GAMES[i];
      break;
    }
  }

  // 游戏不存在
  if (!game) {
    document.getElementById("game-container").innerHTML =
      '<div class="empty-state" style="min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center">' +
      '<h2>Game Not Found</h2>' +
      '<p style="margin:16px 0">The game you are looking for does not exist or has been removed.</p>' +
      '<a href="/" class="btn-back">Back to Home</a>' +
      "</div>";
    document.title = "Game Not Found - Mini Game Hub";
    return;
  }

  // 更新页面
  document.title = game.title + " - Play Free Online | Mini Game Hub";
  document.querySelector('meta[name="description"]').setAttribute("content", game.description);
  document.querySelector('meta[property="og:title"]').setAttribute("content", game.title + " - Mini Game Hub");
  document.querySelector('meta[property="og:description"]').setAttribute("content", game.description);
  document.querySelector('meta[property="og:image"]').setAttribute("content", game.thumbnail);
  document.querySelector('meta[property="og:url"]').setAttribute("content", window.location.href);

  // 标题
  document.getElementById("game-title").textContent = game.title;

  // 面包屑
  document.getElementById("breadcrumb").innerHTML =
    '<a href="/">Home</a> / <a href="/?category=' +
    game.category +
    '">' +
    game.category.charAt(0).toUpperCase() +
    game.category.slice(1) +
    "</a> / <span>" +
    game.title +
    "</span>";

  // iframe
  document.getElementById("game-iframe").src = game.embedUrl;

  // 描述
  document.getElementById("game-description").textContent = game.description;

  // 操作说明
  document.getElementById("game-controls").textContent = game.controls;

  // 标签
  var tagsHtml = game.tags
    .map(function (t) {
      return '<a href="/?search=' + t + '" class="tag-link">#' + t + "</a>";
    })
    .join("");
  document.getElementById("game-tags").innerHTML = tagsHtml;

  // 分类
  document.getElementById("game-category").textContent = game.category;

  // 相关游戏（同分类，排除当前）
  var related = [];
  for (var j = 0; j < GAMES.length; j++) {
    if (GAMES[j].category === game.category && GAMES[j].id !== game.id) {
      related.push(GAMES[j]);
    }
  }
  if (related.length > 4) related = related.slice(0, 4);

  document.getElementById("related-games").innerHTML = related
    .map(function (g) {
      var bg = THUMB_COLORS[g.category] || THUMB_COLORS.puzzle;
      return (
        '<a href="game.html?id=' +
        g.id +
        '" class="game-card">' +
        '  <div class="game-thumb" style="background:' + bg + '">' +
        '    <span class="game-thumb-icon">' +
        g.title.charAt(0) +
        "</span>" +
        "  </div>" +
        '  <div class="game-info">' +
        '    <h3 class="game-title">' +
        g.title +
        "</h3>" +
        "  </div>" +
        "</a>"
      );
    })
    .join("");

  // 全屏按钮
  document.getElementById("btn-fullscreen").addEventListener("click", function () {
    var iframe = document.getElementById("game-iframe");
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    }
  });
})();
