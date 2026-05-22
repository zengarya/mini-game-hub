// Mini Game Hub - 游戏数据库
// 所有游戏自托管在 /games/ 目录(100%可玩,同源无跨域问题)

var THUMB_COLORS = {
  puzzle:    "linear-gradient(135deg, #667eea, #764ba2)",
  action:    "linear-gradient(135deg, #f093fb, #f5576c)",
  arcade:    "linear-gradient(135deg, #4facfe, #00f2fe)",
  strategy:  "linear-gradient(135deg, #43e97b, #38f9d7)",
  sports:    "linear-gradient(135deg, #fa709a, #fee140)",
  girls:     "linear-gradient(135deg, #f77062, #fe5196)",
  board:     "linear-gradient(135deg, #a18cd1, #fbc2eb)",
  classic:   "linear-gradient(135deg, #ffd93d, #ff6b6b)",
};

var GAMES = [
  // ===== Arcade 街机类 =====
  {
    id: "snake",
    title: "Classic Snake",
    category: "arcade",
    thumbnail: "",
    embedUrl: "games/snake.html",
    description: "Control a growing snake, eat food, avoid walls and your own tail. The timeless arcade classic that started it all. How long can you survive?",
    controls: "Arrow keys to change direction",
    tags: ["snake", "classic", "retro", "endless"],
  },
  {
    id: "flappy-flyer",
    title: "Flappy Flyer",
    category: "arcade",
    thumbnail: "",
    embedUrl: "games/flappy-flyer.html",
    description: "Tap to flap your wings and fly between green pipes in this super addictive one-tap challenge. Simple controls, brutal difficulty, insanely fun.",
    controls: "Space bar or click to flap",
    tags: ["flappy", "one-tap", "flyer", "difficult"],
  },
  {
    id: "block-stack",
    title: "Block Stack",
    category: "arcade",
    thumbnail: "",
    embedUrl: "games/block-stack.html",
    description: "Rotate and drop falling blocks to complete horizontal lines. Speed increases as you level up. The ultimate block stacking challenge.",
    controls: "Arrow keys: move/drop/rotate. R to restart",
    tags: ["blocks", "stack", "classic", "retro"],
  },
  {
    id: "breakout",
    title: "Breakout",
    category: "arcade",
    thumbnail: "",
    embedUrl: "games/breakout.html",
    description: "Bounce the ball to destroy all the colorful bricks. Move your paddle, keep the ball in play, and clear every level in this classic arcade game.",
    controls: "Move mouse to control paddle",
    tags: ["breakout", "bricks", "ball", "arcade"],
  },
  {
    id: "paddle-battle",
    title: "Paddle Battle",
    category: "arcade",
    thumbnail: "",
    embedUrl: "games/paddle-battle.html",
    description: "Battle against the AI opponent in this fast-paced table tennis game. Control your paddle, return the ball, and score to win.",
    controls: "Move mouse to control paddle",
    tags: ["paddle", "classic", "retro", "competitive"],
  },

  // ===== Puzzle 益智类 =====
  {
    id: "2048",
    title: "2048",
    category: "puzzle",
    thumbnail: "",
    embedUrl: "games/2048.html",
    description: "Swipe to merge tiles with the same numbers. Reach the 2048 tile in this addictive number puzzle. Easy to learn, impossible to master.",
    controls: "Arrow keys to slide tiles",
    tags: ["number", "merge", "brain", "addictive"],
  },
  {
    id: "sudoku",
    title: "Sudoku Master",
    category: "puzzle",
    thumbnail: "",
    embedUrl: "games/sudoku.html",
    description: "Fill the 9x9 grid so every row, column, and 3x3 box contains digits 1-9. Click a cell, then click a number to fill. Includes multiple puzzle layouts.",
    controls: "Mouse click to select and enter numbers",
    tags: ["sudoku", "number", "brain", "logic"],
  },
  {
    id: "minesweeper",
    title: "Minesweeper",
    category: "puzzle",
    thumbnail: "",
    embedUrl: "games/minesweeper.html",
    description: "Clear the minefield without detonating a single mine. Use number clues to deduce safe squares. Right-click to flag suspected mines.",
    controls: "Left-click to reveal, right-click to flag",
    tags: ["minesweeper", "logic", "brain", "deduction"],
  },
  {
    id: "memory",
    title: "Memory Match",
    category: "puzzle",
    thumbnail: "",
    embedUrl: "games/memory.html",
    description: "Flip cards and find matching pairs of cute animal emojis. Test and improve your concentration with 8 pairs to match. Fun for all ages.",
    controls: "Mouse click to flip cards",
    tags: ["memory", "matching", "cards", "brain"],
  },
  {
    id: "bubble-pop",
    title: "Bubble Pop",
    category: "puzzle",
    thumbnail: "",
    embedUrl: "games/bubble-pop.html",
    description: "Aim and shoot colorful bubbles to match and pop clusters of the same color. Clear all the bubbles before they reach the bottom.",
    controls: "Move mouse to aim, click to shoot",
    tags: ["bubble", "shooter", "match3", "colorful"],
  },

  // ===== Action 动作类 =====
  {
    id: "whack-a-mole",
    title: "Whack-a-Mole",
    category: "action",
    thumbnail: "",
    embedUrl: "games/whack-a-mole.html",
    description: "Whack those moles as fast as you can! Test your reflexes in this frantic 30-second arcade game. Click moles before they hide. How many can you hit?",
    controls: "Mouse click to whack moles",
    tags: ["whack", "mole", "reflex", "speed"],
  },
];

var CATEGORIES = [
  { name: "All Games", slug: "all", icon: "🎮" },
  { name: "Arcade", slug: "arcade", icon: "🕹️" },
  { name: "Puzzle", slug: "puzzle", icon: "🧩" },
  { name: "Action", slug: "action", icon: "⚡" },
];

var POPULAR_TAGS = [
  "classic",
  "retro",
  "brain",
  "arcade",
  "puzzle",
  "cards",
  "reflex",
  "endless",
];
