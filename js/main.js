// Mini Game Hub - 首页逻辑

(function () {
  // URL参数解析
  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  // 获取当前分类
  function getCategory() {
    return getParam("category") || "all";
  }

  // 获取搜索关键词
  function getSearch() {
    return (getParam("search") || "").toLowerCase().trim();
  }

  // 过滤游戏列表
  function filterGames() {
    const cat = getCategory();
    const search = getSearch();
    let games = GAMES;

    if (cat !== "all") {
      games = games.filter(function (g) {
        return g.category === cat;
      });
    }

    if (search) {
      games = games.filter(function (g) {
        return (
          g.title.toLowerCase().includes(search) ||
          g.tags.some(function (t) {
            return t.includes(search);
          }) ||
          g.description.toLowerCase().includes(search)
        );
      });
    }

    return games;
  }

  // 渲染游戏卡片
  function renderGameCard(game) {
    var bg = THUMB_COLORS[game.category] || THUMB_COLORS.puzzle;
    return (
      '<a href="game.html?id=' +
      game.id +
      '" class="game-card">' +
      '  <div class="game-thumb" style="background:' + bg + '">' +
      '    <canvas class="game-thumb-canvas" data-game="' + game.id + '"></canvas>' +
      '    <span class="game-category-tag">' +
      game.category +
      "</span>" +
      "  </div>" +
      '  <div class="game-info">' +
      '    <h3 class="game-title">' +
      game.title +
      "</h3>" +
      '    <p class="game-desc">' +
      game.description.slice(0, 80) +
      "...</p>" +
      "  </div>" +
      "</a>"
    );
  }

  // 渲染分类标签
  function renderCategoryTabs() {
    var current = getCategory();
    return CATEGORIES.map(function (cat) {
      var cls = cat.slug === current ? "cat-tab active" : "cat-tab";
      return (
        '<a href="?category=' +
        cat.slug +
        '" class="' +
        cls +
        '">' +
        cat.icon +
        " " +
        cat.name +
        "</a>"
      );
    }).join("");
  }

  // 渲染热门标签
  function renderPopularTags() {
    return POPULAR_TAGS.map(function (tag) {
      return '<a href="?search=' + tag + '" class="tag-link">#' + tag + "</a>";
    }).join("");
  }

  // 主渲染
  function render() {
    var games = filterGames();
    var category = getCategory();
    var search = getSearch();

    // 更新标题
    var catName = "All Games";
    CATEGORIES.forEach(function (c) {
      if (c.slug === category) catName = c.name;
    });
    if (search) {
      document.title = 'Results for "' + search + '" - Mini Game Hub';
    } else if (category !== "all") {
      document.title = catName + " Games - Mini Game Hub";
    }

    // 渲染分类标签
    document.getElementById("category-tabs").innerHTML = renderCategoryTabs();

    // 渲染游戏列表
    document.getElementById("game-grid").innerHTML = games.length
      ? games.map(renderGameCard).join("")
      : '<div class="empty-state"><p>No games found for "' +
        (search || category) +
        '"</p><a href="/" class="btn-back">Back to Home</a></div>';

    // 绘制缩略图封面
    setTimeout(function() { renderAllThumbnails(); }, 10);

    // 渲染搜索结果提示
    if (search) {
      document.getElementById("search-hint").innerHTML =
        'Showing results for "<strong>' + search + "</strong>" + ' — <a href="?category=' + category + '">clear search</a>';
      document.getElementById("search-hint").style.display = "block";
    } else {
      document.getElementById("search-hint").style.display = "none";
    }

    // 渲染热门标签
    document.getElementById("popular-tags").innerHTML = renderPopularTags();
  }

  // 搜索功能
  document.getElementById("search-input").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      var q = e.target.value.trim();
      var cat = getCategory();
      if (q) {
        window.location.search = "search=" + encodeURIComponent(q) + (cat !== "all" ? "&category=" + cat : "");
      } else {
        window.location.search = cat !== "all" ? "category=" + cat : "";
      }
    }
  });

  // 初始化
  render();
})();
