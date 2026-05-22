// Mini Game Hub - 游戏数据库
// embedUrl 来源: play.gamepix.com (已验证可嵌入, 无 X-Frame-Options 限制)
// 要添加新游戏: 在 https://play.gamepix.com/{slug}/embed?sid=mini-game-hub 验证 slug 是否有效

// 每个分类的缩略图渐变色
var THUMB_COLORS = {
  puzzle:    "linear-gradient(135deg, #667eea, #764ba2)",
  action:    "linear-gradient(135deg, #f093fb, #f5576c)",
  arcade:    "linear-gradient(135deg, #4facfe, #00f2fe)",
  strategy:  "linear-gradient(135deg, #43e97b, #38f9d7)",
  sports:    "linear-gradient(135deg, #fa709a, #fee140)",
  girls:     "linear-gradient(135deg, #f77062, #fe5196)",
  board:     "linear-gradient(135deg, #a18cd1, #fbc2eb)",
};

var GAMES = [
  // ===== Puzzle 益智类 (6款) =====
  {
    id: "bubble-shooter",
    title: "Bubble Shooter",
    category: "puzzle",
    thumbnail: "",
    embedUrl: "https://play.gamepix.com/bubble-shooter/embed?sid=mini-game-hub",
    description: "Match three or more bubbles of the same color to clear the board. Classic bubble shooting puzzle game with hundreds of challenging levels that will keep you entertained for hours.",
    controls: "Mouse to aim and click to shoot",
    tags: ["bubble", "match3", "classic", "colorful"],
  },
  {
    id: "2048",
    title: "2048",
    category: "puzzle",
    thumbnail: "",
    embedUrl: "https://play.gamepix.com/2048/embed?sid=mini-game-hub",
    description: "Swipe to merge tiles with the same numbers and reach the 2048 tile. This addictive number puzzle has taken the world by storm. Easy to learn, impossible to master.",
    controls: "Arrow keys or swipe on touch screen",
    tags: ["number", "merge", "brain", "addictive"],
  },
  {
    id: "solitaire",
    title: "Solitaire Classic",
    category: "puzzle",
    thumbnail: "",
    embedUrl: "https://play.gamepix.com/solitaire/embed?sid=mini-game-hub",
    description: "The classic Klondike Solitaire card game loved by millions. Stack cards in descending order with alternating colors to clear the board and win.",
    controls: "Mouse click and drag cards",
    tags: ["cards", "klondike", "classic", "relaxing"],
  },
  {
    id: "mahjong",
    title: "Mahjong Solitaire",
    category: "puzzle",
    thumbnail: "",
    embedUrl: "https://play.gamepix.com/mahjong/embed?sid=mini-game-hub",
    description: "Match pairs of identical mahjong tiles to clear the board. A beautiful and relaxing tile-matching puzzle game with hundreds of unique layouts to solve.",
    controls: "Mouse click to select matching tile pairs",
    tags: ["mahjong", "tiles", "matching", "zen"],
  },
  {
    id: "sudoku",
    title: "Sudoku Master",
    category: "puzzle",
    thumbnail: "",
    embedUrl: "https://play.gamepix.com/sudoku/embed?sid=mini-game-hub",
    description: "Fill the 9x9 grid so every row, column, and 3x3 box contains digits 1-9. Multiple difficulty levels from easy beginner puzzles to expert brain teasers.",
    controls: "Mouse click to select cell, keyboard to enter number",
    tags: ["number", "brain", "logic", "japanese"],
  },
  {
    id: "block-puzzle",
    title: "Block Puzzle",
    category: "puzzle",
    thumbnail: "",
    embedUrl: "https://play.gamepix.com/block-puzzle/embed?sid=mini-game-hub",
    description: "Drag and drop colorful blocks onto the grid. Fill complete rows or columns to clear them and earn points. Simple, satisfying, and endlessly replayable.",
    controls: "Mouse drag and drop blocks",
    tags: ["block", "tetris", "grid", "brain"],
  },

  // ===== Arcade 街机类 (5款) =====
  {
    id: "snake",
    title: "Classic Snake",
    category: "arcade",
    thumbnail: "",
    embedUrl: "https://play.gamepix.com/snake/embed?sid=mini-game-hub",
    description: "Guide the snake to eat food and grow longer without hitting walls or yourself. The timeless arcade classic that started it all. How long can you survive?",
    controls: "Arrow keys to change direction",
    tags: ["snake", "classic", "retro", "endless"],
  },
  {
    id: "tetris",
    title: "Tetris",
    category: "arcade",
    thumbnail: "",
    embedUrl: "https://play.gamepix.com/tetris/embed?sid=mini-game-hub",
    description: "The legendary block-stacking puzzle game. Rotate and drop falling blocks to complete horizontal lines. Speed increases as you level up. A true classic.",
    controls: "Arrow keys: Left/Right=move, Down=drop, Up=rotate",
    tags: ["tetris", "blocks", "classic", "retro"],
  },
  {
    id: "flappy-bird",
    title: "Flappy Bird",
    category: "arcade",
    thumbnail: "",
    embedUrl: "https://play.gamepix.com/flappy-bird/embed?sid=mini-game-hub",
    description: "Tap to flap your wings and fly between green pipes. The legendary one-tap game that took the world by storm. Simple controls, brutal difficulty, insanely addictive.",
    controls: "Space bar or mouse click to flap",
    tags: ["flappy", "one-tap", "classic", "difficult"],
  },
  {
    id: "pacman",
    title: "Pacman",
    category: "arcade",
    thumbnail: "",
    embedUrl: "https://play.gamepix.com/pacman/embed?sid=mini-game-hub",
    description: "Navigate the maze, eat all the dots, and avoid the ghosts. The most iconic arcade game of all time, now playable right in your browser. Collect power pellets to fight back.",
    controls: "Arrow keys to move Pacman",
    tags: ["pacman", "maze", "retro", "ghosts"],
  },
  {
    id: "fruit-ninja",
    title: "Fruit Ninja",
    category: "arcade",
    thumbnail: "",
    embedUrl: "https://play.gamepix.com/fruit-ninja/embed?sid=mini-game-hub",
    description: "Slice flying fruit with your blade while avoiding bombs. Test your reflexes in this fast-paced fruit-slashing arcade game. Chain combos for bonus points.",
    controls: "Mouse drag to slice fruit",
    tags: ["fruit", "slice", "reflex", "sword"],
  },

  // ===== Action 动作类 (3款) =====
  {
    id: "subway-surfer",
    title: "Subway Surfer",
    category: "action",
    thumbnail: "",
    embedUrl: "https://play.gamepix.com/subway-surfer/embed?sid=mini-game-hub",
    description: "Run through subway tracks at top speed. Dodge oncoming trains, jump over barriers, and collect coins in this thrilling endless runner with colorful HD graphics.",
    controls: "Arrow keys: Up=jump, Down=slide, Left/Right=switch lanes",
    tags: ["runner", "endless", "subway", "arcade"],
  },
  {
    id: "temple-run",
    title: "Temple Run",
    category: "action",
    thumbnail: "",
    embedUrl: "https://play.gamepix.com/temple-run/embed?sid=mini-game-hub",
    description: "Escape from the temple with a cursed idol. Run, jump, slide and turn through dangerous cliffs and ancient ruins. The original endless runner sensation.",
    controls: "Arrow keys: Up=jump, Down=slide, Left/Right=turn",
    tags: ["runner", "endless", "temple", "adventure"],
  },
  {
    id: "stickman",
    title: "Stickman Fighter",
    category: "action",
    thumbnail: "",
    embedUrl: "https://play.gamepix.com/stickman/embed?sid=mini-game-hub",
    description: "Battle waves of enemy stickmen with devastating combos and special moves. A fast-paced stickman fighting game with ragdoll physics and epic boss battles.",
    controls: "Arrow keys to move, A/S/D keys to attack",
    tags: ["fighting", "stickman", "combat", "brawler"],
  },

  // ===== Strategy 策略类 (2款) =====
  {
    id: "tower-defense",
    title: "Tower Defense",
    category: "strategy",
    thumbnail: "",
    embedUrl: "https://play.gamepix.com/tower-defense/embed?sid=mini-game-hub",
    description: "Build and upgrade defensive towers to stop waves of invading enemies. Plan your strategy carefully, position towers wisely, and use special abilities to defend your kingdom.",
    controls: "Mouse click to place and upgrade towers",
    tags: ["tower-defense", "strategy", "defense", "war"],
  },
  {
    id: "chess",
    title: "Chess Master",
    category: "strategy",
    thumbnail: "",
    embedUrl: "https://play.gamepix.com/chess/embed?sid=mini-game-hub",
    description: "Play chess against a challenging AI opponent. Choose from multiple difficulty levels, from beginner to grandmaster. The ultimate strategy board game, now in your browser.",
    controls: "Mouse click to select and move pieces",
    tags: ["chess", "board", "strategy", "classic"],
  },

  // ===== Sports 体育类 (2款) =====
  {
    id: "basketball",
    title: "Basketball Stars",
    category: "sports",
    thumbnail: "",
    embedUrl: "https://play.gamepix.com/basketball/embed?sid=mini-game-hub",
    description: "Shoot hoops and score big in fast-paced basketball action. Dribble past defenders, nail three-pointers, and pull off spectacular dunks in competitive one-on-one matches.",
    controls: "Arrow keys to move, Space to shoot",
    tags: ["basketball", "sports", "competitive", "shooting"],
  },
  {
    id: "soccer",
    title: "Soccer Stars",
    category: "sports",
    thumbnail: "",
    embedUrl: "https://play.gamepix.com/soccer/embed?sid=mini-game-hub",
    description: "Score amazing goals in this fast-paced soccer game. Dribble around opponents, aim your shots perfectly, and become the champion of the pitch.",
    controls: "Arrow keys to move, Space to kick",
    tags: ["soccer", "football", "sports", "goals"],
  },

  // ===== Girls 女生向 (2款) =====
  {
    id: "dress-up",
    title: "Dress Up Star",
    category: "girls",
    thumbnail: "",
    embedUrl: "https://play.gamepix.com/dress-up/embed?sid=mini-game-hub",
    description: "Design stunning outfits and create the perfect look. Mix and match hundreds of clothing items, accessories, and hairstyles. Unleash your inner fashion designer.",
    controls: "Mouse click to select and drag clothing items",
    tags: ["fashion", "dress-up", "makeover", "style"],
  },
  {
    id: "cooking",
    title: "Cooking Fever",
    category: "girls",
    thumbnail: "",
    embedUrl: "https://play.gamepix.com/cooking/embed?sid=mini-game-hub",
    description: "Cook delicious dishes and serve hungry customers before time runs out. Master recipes, upgrade your kitchen, and build your own restaurant empire.",
    controls: "Mouse click to cook and serve",
    tags: ["cooking", "food", "time-management", "restaurant"],
  },

  // ===== Board 棋牌类 (1款) =====
  {
    id: "memory",
    title: "Memory Match",
    category: "board",
    thumbnail: "",
    embedUrl: "https://play.gamepix.com/memory/embed?sid=mini-game-hub",
    description: "Flip cards and find matching pairs in this classic memory game. Test and improve your concentration with increasingly challenging levels. Fun for all ages.",
    controls: "Mouse click to flip cards",
    tags: ["memory", "matching", "cards", "brain"],
  },
];

// 分类配置
var CATEGORIES = [
  { name: "All Games", slug: "all", icon: "🎮" },
  { name: "Puzzle", slug: "puzzle", icon: "🧩" },
  { name: "Arcade", slug: "arcade", icon: "🕹️" },
  { name: "Action", slug: "action", icon: "⚡" },
  { name: "Strategy", slug: "strategy", icon: "🏰" },
  { name: "Sports", slug: "sports", icon: "⚽" },
  { name: "Girls", slug: "girls", icon: "💖" },
  { name: "Board", slug: "board", icon: "🎲" },
];

// 热门标签
var POPULAR_TAGS = [
  "classic",
  "puzzle",
  "runner",
  "brain",
  "retro",
  "cards",
  "endless",
  "fashion",
];
