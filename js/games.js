// Mini Game Hub - 游戏数据库
// 每款游戏的数据格式：
// {
//   id: string,          // 唯一标识
//   title: string,        // 游戏名称
//   category: string,     // 分类: puzzle/action/arcade/strategy/sports/girls/board
//   thumbnail: string,    // 缩略图URL (建议 300x200)
//   embedUrl: string,     // iframe嵌入URL
//   description: string,  // 简短描述 (英文, 150字以内)
//   controls: string,     // 操作方式
//   tags: string[]        // 标签
// }

const GAMES = [
  // ===== Puzzle 益智类 =====
  {
    id: "bubble-shooter",
    title: "Bubble Shooter",
    category: "puzzle",
    thumbnail: "https://img.gamesgx.com/upload/game/202310/653d1e4b3e31f.jpg",
    embedUrl: "https://games.gamepix.com/play/39009?sid=mini-game-hub",
    description: "Match three or more bubbles of the same color to clear the board. Classic bubble shooting puzzle game with hundreds of levels.",
    controls: "Mouse to aim and shoot",
    tags: ["bubble", "match3", "classic", "colorful"],
  },
  {
    id: "merge-fruit",
    title: "Merge Fruit",
    category: "puzzle",
    thumbnail: "https://img.gamesgx.com/upload/game/202305/645a2c8e9e5a1.jpg",
    embedUrl: "https://games.gamepix.com/play/40673?sid=mini-game-hub",
    description: "Drop and merge identical fruits to create bigger ones. Suika-style merging puzzle that's easy to learn but hard to master.",
    controls: "Mouse click to drop fruit",
    tags: ["merge", "suika", "watermelon", "drop"],
  },
  {
    id: "2048",
    title: "2048",
    category: "puzzle",
    thumbnail: "https://img.gamesgx.com/upload/game/202202/6203a1d8e5e0b.jpg",
    embedUrl: "https://games.gamepix.com/play/40299?sid=mini-game-hub",
    description: "Swipe to merge tiles with the same numbers. Reach the 2048 tile in this addictive number puzzle that never gets old.",
    controls: "Arrow keys or swipe",
    tags: ["number", "merge", "brain", "addictive"],
  },
  {
    id: "solitaire-classic",
    title: "Solitaire Classic",
    category: "puzzle",
    thumbnail: "https://img.gamesgx.com/upload/game/202208/62f1a1d8e5e0c.jpg",
    embedUrl: "https://games.gamepix.com/play/26860?sid=mini-game-hub",
    description: "The classic Klondike Solitaire card game. Stack cards in descending order and alternate colors to clear the board.",
    controls: "Mouse drag and drop cards",
    tags: ["cards", "klondike", "classic", "relaxing"],
  },
  {
    id: "block-puzzle",
    title: "Block Puzzle",
    category: "puzzle",
    thumbnail: "https://img.gamesgx.com/upload/game/202111/61a1d8e5e0b3a.jpg",
    embedUrl: "https://games.gamepix.com/play/38900?sid=mini-game-hub",
    description: "Drag and drop blocks onto the grid. Fill complete rows or columns to clear them. Simple yet satisfying block puzzle.",
    controls: "Mouse drag and drop",
    tags: ["block", "tetris", "grid", "brain"],
  },
  {
    id: "mahjong-solitaire",
    title: "Mahjong Solitaire",
    category: "puzzle",
    thumbnail: "https://img.gamesgx.com/upload/game/202209/631a1d8e5e0d4.jpg",
    embedUrl: "https://games.gamepix.com/play/35500?sid=mini-game-hub",
    description: "Match pairs of identical mahjong tiles to remove them from the board. Beautiful tile-matching puzzle with hundreds of layouts.",
    controls: "Mouse click to select tiles",
    tags: ["mahjong", "tiles", "matching", "zen"],
  },

  // ===== Action 动作类 =====
  {
    id: "subway-runner",
    title: "Subway Runner",
    category: "action",
    thumbnail: "https://img.gamesgx.com/upload/game/202204/625a1d8e5e0e6.jpg",
    embedUrl: "https://games.gamepix.com/play/38882?sid=mini-game-hub",
    description: "Run through subway tracks, dodge trains, and collect coins. Fast-paced endless runner with colorful graphics and power-ups.",
    controls: "Arrow keys: Up=jump, Down=slide, Left/Right=switch lanes",
    tags: ["runner", "endless", "subway", "arcade"],
  },
  {
    id: "stickman-fight",
    title: "Stickman Fighter",
    category: "action",
    thumbnail: "https://img.gamesgx.com/upload/game/202211/637a1d8e5e0f7.jpg",
    embedUrl: "https://games.gamepix.com/play/38000?sid=mini-game-hub",
    description: "Battle waves of stickman enemies with epic combos. Fast-paced fighting game with simple controls and satisfying action.",
    controls: "Arrow keys to move, A/S/D to attack",
    tags: ["fighting", "stickman", "combat", "brawler"],
  },

  // ===== Arcade 街机类 =====
  {
    id: "snake-io",
    title: "Snake.io",
    category: "arcade",
    thumbnail: "https://img.gamesgx.com/upload/game/202201/61e1a1d8e5e09.jpg",
    embedUrl: "https://games.gamepix.com/play/39500?sid=mini-game-hub",
    description: "Eat glowing orbs to grow bigger and outmaneuver other snakes. Classic snake game meets multiplayer arena in this addictive .io game.",
    controls: "Mouse to steer, left click to boost",
    tags: ["snake", "io", "multiplayer", "arena"],
  },
  {
    id: "flappy-bird",
    title: "Flappy Bird",
    category: "arcade",
    thumbnail: "https://img.gamesgx.com/upload/game/202103/604a1d8e5e0a8.jpg",
    embedUrl: "https://games.gamepix.com/play/40200?sid=mini-game-hub",
    description: "Tap to flap your wings and fly between pipes. The legendary one-tap game that took the world by storm. How far can you go?",
    controls: "Space bar or mouse click to flap",
    tags: ["flappy", "one-tap", "classic", "difficult"],
  },
  {
    id: "color-switch",
    title: "Color Switch",
    category: "arcade",
    thumbnail: "https://img.gamesgx.com/upload/game/202306/648a1d8e5e10b.jpg",
    embedUrl: "https://games.gamepix.com/play/40800?sid=mini-game-hub",
    description: "Tap to bounce through color-matching obstacles. Only pass through shapes that match your color. Fast reflexes required.",
    controls: "Space bar or tap to bounce",
    tags: ["color", "reflex", "one-tap", "challenging"],
  },

  // ===== Strategy 策略/模拟 =====
  {
    id: "idle-factory",
    title: "Idle Factory Tycoon",
    category: "strategy",
    thumbnail: "https://img.gamesgx.com/upload/game/202308/64d1a1d8e5e11c.jpg",
    embedUrl: "https://games.gamepix.com/play/41000?sid=mini-game-hub",
    description: "Build and manage your own factory empire. Upgrade machines, hire workers, and watch your profits grow in this satisfying idle game.",
    controls: "Mouse click to interact",
    tags: ["idle", "tycoon", "factory", "management"],
  },
  {
    id: "tower-defense",
    title: "Tower Defense Kingdom",
    category: "strategy",
    thumbnail: "https://img.gamesgx.com/upload/game/202210/634a1d8e5e12d.jpg",
    embedUrl: "https://games.gamepix.com/play/38200?sid=mini-game-hub",
    description: "Place towers strategically to defend your kingdom from waves of enemies. Upgrade your defenses and use special abilities.",
    controls: "Mouse click to place and upgrade towers",
    tags: ["tower-defense", "strategy", "defense", "war"],
  },

  // ===== Sports 体育类 =====
  {
    id: "basketball-stars",
    title: "Basketball Stars",
    category: "sports",
    thumbnail: "https://img.gamesgx.com/upload/game/202207/62d1a1d8e5e13e.jpg",
    embedUrl: "https://games.gamepix.com/play/38973?sid=mini-game-hub",
    description: "Shoot hoops in this fast-paced basketball game. Dribble, shoot three-pointers, and dunk your way to victory in one-on-one matches.",
    controls: "Arrow keys to move, Space to shoot",
    tags: ["basketball", "sports", "competitive", "shooting"],
  },
  {
    id: "soccer-dribble",
    title: "Soccer Dribble",
    category: "sports",
    thumbnail: "https://img.gamesgx.com/upload/game/202212/638a1d8e5e14f.jpg",
    embedUrl: "https://games.gamepix.com/play/39100?sid=mini-game-hub",
    description: "Dribble past defenders and score amazing goals. Simple one-touch soccer game with satisfying physics and challenging levels.",
    controls: "Mouse to aim and set power, click to shoot",
    tags: ["soccer", "football", "sports", "goals"],
  },

  // ===== Girls 女生向 =====
  {
    id: "dress-up-star",
    title: "Dress Up Star",
    category: "girls",
    thumbnail: "https://img.gamesgx.com/upload/game/202307/64b1a1d8e5e15d.jpg",
    embedUrl: "https://games.gamepix.com/play/40700?sid=mini-game-hub",
    description: "Create stunning outfits for fashion shows. Mix and match hundreds of clothing items, accessories, and hairstyles for the perfect look.",
    controls: "Mouse click to select and drag items",
    tags: ["fashion", "dress-up", "makeover", "style"],
  },
  {
    id: "cake-maker",
    title: "Cake Maker",
    category: "girls",
    thumbnail: "https://img.gamesgx.com/upload/game/202309/650a1d8e5e16e.jpg",
    embedUrl: "https://games.gamepix.com/play/41200?sid=mini-game-hub",
    description: "Bake and decorate delicious cakes from scratch. Mix ingredients, bake to perfection, and decorate with frosting and toppings.",
    controls: "Mouse click and drag to interact",
    tags: ["cooking", "baking", "food", "creative"],
  },

  // ===== Board 棋牌类 =====
  {
    id: "chess-master",
    title: "Chess Master",
    category: "board",
    thumbnail: "https://img.gamesgx.com/upload/game/202203/622a1d8e5e17f.jpg",
    embedUrl: "https://games.gamepix.com/play/40100?sid=mini-game-hub",
    description: "Play chess against AI opponents of varying difficulty. Perfect for beginners learning the game or experienced players looking for a challenge.",
    controls: "Mouse click to select and move pieces",
    tags: ["chess", "board", "strategy", "classic"],
  },

  // ===== Merge 合并类 =====
  {
    id: "merge-monsters",
    title: "Merge Monsters",
    category: "puzzle",
    thumbnail: "https://img.gamesgx.com/upload/game/202304/643a1d8e5e18g.jpg",
    embedUrl: "https://games.gamepix.com/play/40500?sid=mini-game-hub",
    description: "Merge identical monsters to evolve them into powerful new creatures. Collect, merge, and battle in this addictive monster evolution game.",
    controls: "Mouse drag to merge monsters",
    tags: ["merge", "monster", "evolution", "collecting"],
  },
];

// 分类配置：名称、图标、slug
const CATEGORIES = [
  { name: "All Games", slug: "all", icon: "🎮" },
  { name: "Puzzle", slug: "puzzle", icon: "🧩" },
  { name: "Action", slug: "action", icon: "⚡" },
  { name: "Arcade", slug: "arcade", icon: "🕹️" },
  { name: "Strategy", slug: "strategy", icon: "🏰" },
  { name: "Sports", slug: "sports", icon: "⚽" },
  { name: "Girls", slug: "girls", icon: "💖" },
  { name: "Board", slug: "board", icon: "🎲" },
];

// 热门标签
const POPULAR_TAGS = [
  "merge",
  "puzzle",
  "classic",
  "runner",
  "io",
  "idle",
  "cards",
  "fashion",
];
