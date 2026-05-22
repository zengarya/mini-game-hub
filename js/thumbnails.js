// Mini Game Hub - Canvas封面图生成器
// 每款游戏专属设计，640x400内部分辨率

var THUMB_W = 640;
var THUMB_H = 400;

// ========== 绘图工具函数 ==========

function rrect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function fillRounded(ctx, x, y, w, h, r, color) {
  rrect(ctx, x, y, w, h, r);
  ctx.fillStyle = color;
  ctx.fill();
}

function strokeRounded(ctx, x, y, w, h, r, color, lw) {
  rrect(ctx, x, y, w, h, r);
  ctx.strokeStyle = color;
  ctx.lineWidth = lw || 2;
  ctx.stroke();
}

function circle(ctx, x, y, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function ring(ctx, x, y, r, color, lw) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = lw || 3;
  ctx.stroke();
}

function drawStar(ctx, cx, cy, outerR, innerR, points, color) {
  ctx.beginPath();
  for (var i = 0; i < points * 2; i++) {
    var r = i % 2 === 0 ? outerR : innerR;
    var angle = (i * Math.PI) / points - Math.PI / 2;
    var x = cx + Math.cos(angle) * r;
    var y = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function shadow(ctx, color, blur, ox, oy) {
  ctx.shadowColor = color;
  ctx.shadowBlur = blur;
  ctx.shadowOffsetX = ox || 0;
  ctx.shadowOffsetY = oy || 0;
}

function noShadow(ctx) {
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}

function text(ctx, str, x, y, size, color, align, weight) {
  ctx.font = (weight || "bold") + " " + size + "px -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif";
  ctx.fillStyle = color;
  ctx.textAlign = align || "center";
  ctx.textBaseline = "middle";
  ctx.fillText(str, x, y);
}

function glowText(ctx, str, x, y, size, color, glowColor) {
  shadow(ctx, glowColor, size * 0.6, 0, 0);
  text(ctx, str, x, y, size, color);
  noShadow(ctx);
}

// ========== 游戏封面绘制函数 ==========

var THUMBNAIL_DRAW = {

  // --- Snake ---
  snake: function(ctx, w, h) {
    // BG
    var bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, "#0a2a1a"); bg.addColorStop(0.5, "#0d3d1f"); bg.addColorStop(1, "#061a0d");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    // Grid
    ctx.strokeStyle = "rgba(255,255,255,0.04)"; ctx.lineWidth = 1;
    for (var gx = 0; gx < w; gx += 32) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke(); }
    for (var gy = 0; gy < h; gy += 32) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke(); }
    // Snake body - curving path of circles
    var cx = w * 0.45, cy = h * 0.55;
    var segments = [
      {x: cx, y: cy}, {x: cx + 32, y: cy + 8}, {x: cx + 60, y: cy + 24},
      {x: cx + 80, y: cy + 50}, {x: cx + 85, y: cy + 80}, {x: cx + 72, y: cy + 105},
      {x: cx + 45, y: cy + 115}, {x: cx + 15, y: cy + 105}, {x: cx - 10, y: cy + 80},
      {x: cx - 25, y: cy + 45}, {x: cx - 28, y: cy + 12}, {x: cx - 15, y: cy - 18},
      {x: cx + 5, y: cy - 35}, {x: cx + 30, y: cy - 38}, {x: cx + 50, y: cy - 25}
    ];
    for (var i = 0; i < segments.length; i++) {
      var s = segments[i];
      var t = i / (segments.length - 1);
      var sz = 18 + (1 - t) * 8;
      var g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, sz);
      g.addColorStop(0, "#4eff4e"); g.addColorStop(0.5, "#2ecc2e"); g.addColorStop(1, "#1a7a1a");
      ctx.fillStyle = g; ctx.beginPath();
      ctx.arc(s.x, s.y, sz, 0, Math.PI * 2); ctx.fill();
      // highlight
      var hlg = ctx.createRadialGradient(s.x - sz * 0.3, s.y - sz * 0.3, 0, s.x, s.y, sz);
      hlg.addColorStop(0, "rgba(255,255,255,0.5)"); hlg.addColorStop(0.5, "rgba(255,255,255,0.05)"); hlg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = hlg; ctx.fill();
    }
    // Eyes on head
    shadow(ctx, "rgba(0,0,0,0.3)", 3, 0, 0);
    circle(ctx, segments[14].x + 8, segments[14].y - 8, 4, "#fff");
    circle(ctx, segments[14].x + 8, segments[14].y - 18, 4, "#fff");
    circle(ctx, segments[14].x + 10, segments[14].y - 9, 2, "#111");
    circle(ctx, segments[14].x + 10, segments[14].y - 19, 2, "#111");
    noShadow(ctx);
    // Apple
    circle(ctx, cx + 105, cy + 130, 16, "#ff3b3b");
    circle(ctx, cx + 112, cy + 118, 10, "#ff3b3b");
    fillRounded(ctx, cx + 102, cy + 100, 6, 22, 3, "#2ecc2e");
    circle(ctx, cx + 110, cy + 128, 4, "rgba(255,255,255,0.4)");
    // Title
    glowText(ctx, "SNAKE", w * 0.28, h * 0.2, 36, "#4eff4e", "rgba(78,255,78,0.3)");
  },

  // --- Flappy Flyer ---
  "flappy-flyer": function(ctx, w, h) {
    var bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, "#87CEEB"); bg.addColorStop(0.5, "#b8e6ff"); bg.addColorStop(1, "#5ba3d9");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    // Clouds
    var drawCloud = function(cx, cy, s) {
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      circle(ctx, cx, cy, 24 * s, "#fff");
      circle(ctx, cx + 28 * s, cy - 4 * s, 32 * s, "#fff");
      circle(ctx, cx + 52 * s, cy, 22 * s, "#fff");
      circle(ctx, cx + 22 * s, cy - 14 * s, 20 * s, "#fff");
    };
    drawCloud(80, 70, 0.9); drawCloud(360, 50, 0.7); drawCloud(550, 100, 0.8); drawCloud(200, 280, 0.6);
    // Pipes
    var drawPipe = function(x, gapY, gapH) {
      var pw = 56, capH = 28;
      // top pipe
      fillRounded(ctx, x, 0, pw, gapY - capH, 6, "#2ecc2e");
      fillRounded(ctx, x - 6, gapY - capH, pw + 12, capH, 4, "#1a9a1a");
      // bottom pipe
      var bTop = gapY + gapH;
      fillRounded(ctx, x, bTop + capH, pw, h - bTop - capH, 6, "#2ecc2e");
      fillRounded(ctx, x - 6, bTop, pw + 12, capH, 4, "#1a9a1a");
      // highlight
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      ctx.fillRect(x + 6, 0, 10, gapY - capH);
      ctx.fillRect(x + 6, bTop + capH, 10, h - bTop - capH);
    };
    drawPipe(200, 130, 110); drawPipe(470, 160, 90);
    // Bird
    var bx = 330, by = 150;
    shadow(ctx, "rgba(0,0,0,0.25)", 10, 3, 3);
    // body
    circle(ctx, bx, by, 26, "#f9a825");
    circle(ctx, bx, by, 20, "#ffc107");
    // wing
    ctx.beginPath(); ctx.moveTo(bx + 10, by - 8);
    ctx.quadraticCurveTo(bx + 45, by - 35, bx + 55, by - 10);
    ctx.quadraticCurveTo(bx + 30, by + 8, bx + 10, by + 2);
    ctx.fillStyle = "#ff9800"; ctx.fill();
    // beak
    ctx.beginPath(); ctx.moveTo(bx + 22, by - 4);
    ctx.lineTo(bx + 48, by - 2); ctx.lineTo(bx + 22, by + 6);
    ctx.fillStyle = "#ff6d00"; ctx.fill();
    // eye
    noShadow(ctx);
    circle(ctx, bx + 18, by - 10, 7, "#fff");
    circle(ctx, bx + 20, by - 10, 4, "#111");
    // blush
    circle(ctx, bx + 8, by + 6, 6, "rgba(255,150,150,0.35)");
    // Title
    glowText(ctx, "FLAPPY FLYER", w * 0.68, h * 0.82, 26, "#fff", "rgba(255,255,255,0.4)");
  },

  // --- Block Stack ---
  "block-stack": function(ctx, w, h) {
    var bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, "#0a0a1a"); bg.addColorStop(1, "#1a1a3a");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    // Grid
    ctx.strokeStyle = "rgba(255,255,255,0.03)"; ctx.lineWidth = 1;
    for (var gx = 0; gx < w; gx += 36) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke(); }
    for (var gy = 0; gy < h; gy += 36) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke(); }
    // Block size
    var bs = 30;
    var drawBlock = function(cx, cy, color, glow) {
      shadow(ctx, glow, 12, 0, 2);
      fillRounded(ctx, cx, cy, bs, bs, 4, color);
      // highlight edge
      ctx.fillStyle = "rgba(255,255,255,0.2)";
      ctx.fillRect(cx + 3, cy + 3, bs - 6, 4);
      ctx.fillRect(cx + 3, cy + 3, 4, bs - 6);
      noShadow(ctx);
    };
    // Stacked blocks at bottom - various tetromino shapes
    var bx = 130, by = 310;
    // T piece
    drawBlock(bx - bs, by + bs, "#a259ff", "rgba(162,89,255,0.5)");
    drawBlock(bx, by + bs, "#a259ff", "rgba(162,89,255,0.5)");
    drawBlock(bx + bs, by + bs, "#a259ff", "rgba(162,89,255,0.5)");
    drawBlock(bx, by, "#a259ff", "rgba(162,89,255,0.5)");
    // I piece
    var ix = 280, iy = 340;
    drawBlock(ix - bs * 2, iy, "#00e5ff", "rgba(0,229,255,0.5)");
    drawBlock(ix - bs, iy, "#00e5ff", "rgba(0,229,255,0.5)");
    drawBlock(ix, iy, "#00e5ff", "rgba(0,229,255,0.5)");
    drawBlock(ix + bs, iy, "#00e5ff", "rgba(0,229,255,0.5)");
    // L piece
    var lx = 420, ly = 340;
    drawBlock(lx, ly - bs, "#ff6d00", "rgba(255,109,0,0.5)");
    drawBlock(lx, ly, "#ff6d00", "rgba(255,109,0,0.5)");
    drawBlock(lx, ly + bs, "#ff6d00", "rgba(255,109,0,0.5)");
    drawBlock(lx + bs, ly + bs, "#ff6d00", "rgba(255,109,0,0.5)");
    // Falling S piece
    var sx = 350, sy = 150;
    drawBlock(sx, sy, "#76ff03", "rgba(118,255,3,0.5)");
    drawBlock(sx + bs, sy, "#76ff03", "rgba(118,255,3,0.5)");
    drawBlock(sx + bs, sy + bs, "#76ff03", "rgba(118,255,3,0.5)");
    drawBlock(sx + bs * 2, sy + bs, "#76ff03", "rgba(118,255,3,0.5)");
    // Particles around falling piece
    circle(ctx, sx + 20, sy - 12, 3, "rgba(118,255,3,0.4)");
    circle(ctx, sx + bs * 2 + 10, sy + 5, 4, "rgba(118,255,3,0.3)");
    circle(ctx, sx - 8, sy + bs, 2, "rgba(118,255,3,0.5)");
    // Title
    glowText(ctx, "BLOCK STACK", w * 0.55, h * 0.15, 30, "#76ff03", "rgba(118,255,3,0.3)");
  },

  // --- Breakout ---
  breakout: function(ctx, w, h) {
    var bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, "#0d0d2a"); bg.addColorStop(1, "#1a0d2a");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    // Bricks
    var brickColors = ["#ff4757", "#ff6b81", "#ffa502", "#ffbe76", "#2ed573", "#7bed9f", "#1e90ff", "#70a1ff", "#a55eea", "#c39bff"];
    var bw = 58, bh = 22, gap = 6, rows = 4, cols = 8;
    var startX = (w - (cols * (bw + gap))) / 2 + 20;
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var bx2 = startX + c * (bw + gap), by2 = 30 + r * (bh + gap);
        var ci = (r * cols + c) % brickColors.length;
        shadow(ctx, "rgba(0,0,0,0.3)", 4, 0, 1);
        fillRounded(ctx, bx2, by2, bw, bh, 3, brickColors[ci]);
        noShadow(ctx);
        ctx.fillStyle = "rgba(255,255,255,0.15)";
        ctx.fillRect(bx2 + 3, by2 + 2, bw - 6, 4);
      }
    }
    // Ball with trail
    var bx3 = w * 0.6, by3 = 230;
    for (var t = 0; t < 8; t++) {
      var alpha = 1 - t * 0.12;
      circle(ctx, bx3 - t * 8, by3 + t * 5, 12 - t * 0.5, "rgba(255,255,255," + alpha.toFixed(2) + ")");
    }
    shadow(ctx, "rgba(0,0,0,0.4)", 8, 2, 2);
    var ballGrad = ctx.createRadialGradient(bx3 - 3, by3 - 3, 2, bx3, by3, 16);
    ballGrad.addColorStop(0, "#fff"); ballGrad.addColorStop(0.5, "#f0f0f0"); ballGrad.addColorStop(1, "#ccc");
    circle(ctx, bx3, by3, 16, ballGrad);
    noShadow(ctx);
    // Paddle
    shadow(ctx, "rgba(0,0,0,0.3)", 6, 0, 2);
    fillRounded(ctx, w * 0.55 - 60, h - 48, 140, 18, 9, "#ff6348");
    noShadow(ctx);
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.fillRect(w * 0.55 - 55, h - 45, 130, 6);
    // Title
    glowText(ctx, "BREAKOUT", w * 0.25, h * 0.85, 28, "#fff", "rgba(255,255,255,0.35)");
  },

  // --- Paddle Battle ---
  "paddle-battle": function(ctx, w, h) {
    var bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, "#0d1a30"); bg.addColorStop(1, "#1a0d30");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    // Center line (dashed)
    ctx.setLineDash([12, 16]);
    ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(w / 2, 20); ctx.lineTo(w / 2, h - 20); ctx.stroke();
    ctx.setLineDash([]);
    // Center circle
    ring(ctx, w / 2, h / 2, 50, "rgba(255,255,255,0.15)", 2);
    // Left paddle (player)
    shadow(ctx, "rgba(0,0,0,0.3)", 6, 0, 2);
    fillRounded(ctx, 40, h / 2 - 45, 16, 90, 8, "#4facfe");
    noShadow(ctx);
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.fillRect(43, h / 2 - 40, 5, 80);
    // Right paddle (AI)
    shadow(ctx, "rgba(0,0,0,0.3)", 6, 0, 2);
    fillRounded(ctx, w - 56, h / 2 - 45, 16, 90, 8, "#ff6b6b");
    noShadow(ctx);
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.fillRect(w - 53, h / 2 - 40, 5, 80);
    // Ball
    shadow(ctx, "rgba(0,0,0,0.4)", 6, 2, 2);
    var bGrad = ctx.createRadialGradient(w / 2 - 2, h / 2 - 2, 1, w / 2, h / 2, 12);
    bGrad.addColorStop(0, "#fff"); bGrad.addColorStop(0.7, "#e8e8e8"); bGrad.addColorStop(1, "#aaa");
    circle(ctx, w / 2, h / 2, 12, bGrad);
    noShadow(ctx);
    // Speed lines around ball
    var drawSpeedLine = function(x, y, angle) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(angle) * 8, y + Math.sin(angle) * 8);
      ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 1.5;
      ctx.stroke();
    };
    for (var sl = 0; sl < 6; sl++) {
      var a = (sl / 6) * Math.PI * 2;
      drawSpeedLine(w / 2 + Math.cos(a) * 16, h / 2 + Math.sin(a) * 16, a);
    }
    // Title
    glowText(ctx, "PADDLE BATTLE", w / 2, 48, 28, "#fff", "rgba(255,255,255,0.3)");
  },

  // --- Simon Says ---
  "simon-says": function(ctx, w, h) {
    var bg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.7);
    bg.addColorStop(0, "#1a1a3a"); bg.addColorStop(1, "#050510");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    // Outer ring
    ring(ctx, w / 2, h / 2, 150, "#222", 4);
    // Four quadrants
    var drawQuad = function(angle, color, glow) {
      shadow(ctx, glow, 15, 0, 0);
      ctx.beginPath();
      ctx.moveTo(w / 2, h / 2);
      ctx.arc(w / 2, h / 2, 130, angle, angle + Math.PI / 2);
      ctx.closePath();
      ctx.fillStyle = color; ctx.fill();
      noShadow(ctx);
      // highlight inner edge
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 80, angle, angle + Math.PI / 2);
      ctx.fillStyle = "rgba(255,255,255,0.1)"; ctx.fill();
    };
    drawQuad(-Math.PI / 2, "#ff3b3b", "rgba(255,59,59,0.4)");       // red - top-right
    drawQuad(0, "#1e90ff", "rgba(30,144,255,0.2)");                  // blue - bottom-right
    drawQuad(Math.PI / 2, "#ffd93d", "rgba(255,217,61,0.5)");         // yellow - bottom-left
    drawQuad(Math.PI, "#2ed573", "rgba(46,213,115,0.25)");            // green - top-left
    // Center circle
    var cGrad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, 50);
    cGrad.addColorStop(0, "#333"); cGrad.addColorStop(1, "#111");
    circle(ctx, w / 2, h / 2, 50, cGrad);
    ring(ctx, w / 2, h / 2, 50, "#555", 3);
    // Glow effect on one quadrant (active)
    ctx.beginPath();
    ctx.arc(w / 2 + 60, h / 2 - 60, 18, 0, Math.PI * 2);
    var glowGrad = ctx.createRadialGradient(w / 2 + 60, h / 2 - 60, 0, w / 2 + 60, h / 2 - 60, 30);
    glowGrad.addColorStop(0, "rgba(255,255,255,0.6)"); glowGrad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = glowGrad; ctx.fill();
    // Title
    glowText(ctx, "SIMON SAYS", w / 2, h * 0.88, 26, "#fff", "rgba(255,255,255,0.3)");
  },

  // --- 2048 ---
  "2048": function(ctx, w, h) {
    var bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, "#faf8ef"); bg.addColorStop(1, "#ede0c8");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    // Floating tiles
    var drawTile = function(x, y, val, color, bgColor) {
      shadow(ctx, "rgba(0,0,0,0.15)", 8, 0, 3);
      fillRounded(ctx, x, y, 76, 76, 8, bgColor);
      noShadow(ctx);
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.fillRect(x + 4, y + 4, 68, 6);
      var sz = val >= 1024 ? 28 : val >= 512 ? 32 : 36;
      text(ctx, String(val), x + 38, y + 42, sz, color, "center", "bold");
    };
    drawTile(120, 60, 2048, "#f9f6f2", "#edc22e");
    drawTile(220, 60, 1024, "#f9f6f2", "#edc53f");
    drawTile(320, 60, 512, "#f9f6f2", "#edc22e");
    drawTile(170, 160, 256, "#f9f6f2", "#f2b179");
    drawTile(270, 160, 128, "#f9f6f2", "#f59563");
    drawTile(220, 260, 64, "#fff", "#f65e3b");
    drawTile(120, 260, 32, "#fff", "#f67c5f");
    drawTile(320, 260, 16, "#fff", "#f2b179");
    // Decorative particles
    for (var p = 0; p < 15; p++) {
      circle(ctx, 60 + Math.random() * 520, 20 + Math.random() * 340, 2 + Math.random() * 3, "rgba(237,194,46," + (0.2 + Math.random() * 0.3) + ")");
    }
    // Title
    text(ctx, "2048", 440, 120, 52, "#776e65", "center", "800");
    text(ctx, "Join the tiles", 440, 170, 16, "#bbada0", "center", "600");
  },

  // --- Sudoku ---
  sudoku: function(ctx, w, h) {
    var bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, "#f5f0eb"); bg.addColorStop(1, "#e8dcd0");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    // Grid
    var gx2 = 120, gy2 = 50, cs = 42;
    // 3x3 boxes background
    for (var br = 0; br < 3; br++) {
      for (var bc = 0; bc < 3; bc++) {
        fillRounded(ctx, gx2 + bc * cs * 3, gy2 + br * cs * 3, cs * 3 - 1, cs * 3 - 1, 0, "rgba(0,0,0,0.04)");
      }
    }
    // Cells
    ctx.strokeStyle = "#999"; ctx.lineWidth = 1;
    for (var r2 = 0; r2 <= 9; r2++) {
      ctx.lineWidth = r2 % 3 === 0 ? 2.5 : 1;
      ctx.beginPath(); ctx.moveTo(gx2, gy2 + r2 * cs); ctx.lineTo(gx2 + cs * 9, gy2 + r2 * cs); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gx2 + r2 * cs, gy2); ctx.lineTo(gx2 + r2 * cs, gy2 + cs * 9); ctx.stroke();
    }
    // Some filled numbers
    var nums = [
      {c: 0, r: 0, v: "5"}, {c: 2, r: 1, v: "3"}, {c: 5, r: 2, v: "7"},
      {c: 1, r: 4, v: "8"}, {c: 4, r: 4, v: "1"}, {c: 7, r: 5, v: "4"},
      {c: 3, r: 6, v: "6"}, {c: 6, r: 7, v: "2"}, {c: 8, r: 8, v: "9"},
      {c: 2, r: 3, v: "4"}, {c: 5, r: 6, v: "1"}, {c: 7, r: 2, v: "5"},
      {c: 1, r: 7, v: "7"}, {c: 6, r: 3, v: "3"},
    ];
    for (var n = 0; n < nums.length; n++) {
      var nn = nums[n];
      text(ctx, nn.v, gx2 + nn.c * cs + cs / 2, gy2 + nn.r * cs + cs / 2, 20, "#2c3e50", "center", "600");
    }
    // Pencil icon on right
    var px = 520, py = 180;
    ctx.fillStyle = "#f39c12";
    ctx.beginPath(); ctx.moveTo(px - 8, py + 30); ctx.lineTo(px - 8, py - 10);
    ctx.quadraticCurveTo(px - 8, py - 20, px, py - 25);
    ctx.quadraticCurveTo(px + 8, py - 20, px + 8, py - 10);
    ctx.lineTo(px + 8, py + 30); ctx.lineTo(px - 8, py + 30);
    ctx.fill();
    ctx.fillStyle = "#f5cba7"; ctx.fillRect(px - 8, py + 10, 16, 20);
    ctx.fillStyle = "#e74c3c"; ctx.beginPath();
    ctx.moveTo(px, py - 25); ctx.lineTo(px + 5, py - 32); ctx.lineTo(px - 2, py - 28); ctx.lineTo(px - 5, py - 32); ctx.closePath(); ctx.fill();
    // Title
    text(ctx, "SUDOKU", 520, 100, 28, "#2c3e50", "center", "800");
    text(ctx, "MASTER", 520, 132, 18, "#7f8c8d", "center", "600");
  },

  // --- Minesweeper ---
  minesweeper: function(ctx, w, h) {
    var bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, "#bdc3c7"); bg.addColorStop(1, "#95a5a6");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    // Grid of cells
    var cs2 = 38, gx3 = 60, gy3 = 40, cols2 = 7, rows2 = 6;
    for (var r3 = 0; r3 < rows2; r3++) {
      for (var c3 = 0; c3 < cols2; c3++) {
        var cx2 = gx3 + c3 * cs2, cy2 = gy3 + r3 * cs2;
        // Cell face (raised)
        var cGrad = ctx.createLinearGradient(cx2, cy2, cx2, cy2 + cs2 - 2);
        cGrad.addColorStop(0, "#ecf0f1"); cGrad.addColorStop(1, "#d5dbdb");
        shadow(ctx, "rgba(0,0,0,0.2)", 2, 1, 1);
        fillRounded(ctx, cx2 + 1, cy2 + 1, cs2 - 3, cs2 - 3, 2, cGrad);
        noShadow(ctx);
      }
    }
    // Red flag on one cell
    var fx = gx3 + 2 * cs2 + cs2 / 2, fy = gy3 + 1 * cs2 + cs2 / 2;
    ctx.fillStyle = "#e74c3c";
    ctx.beginPath(); ctx.moveTo(fx - 8, fy - 6); ctx.lineTo(fx - 8, fy + 8);
    ctx.lineTo(fx + 2, fy + 2); ctx.lineTo(fx - 2, fy); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = "#111"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(fx - 8, fy - 4); ctx.lineTo(fx - 8, fy + 12); ctx.stroke();
    // Revealed numbers
    text(ctx, "2", gx3 + 4 * cs2 + cs2 / 2, gy3 + 2 * cs2 + cs2 / 2, 20, "#2980b9", "center", "800");
    text(ctx, "1", gx3 + 3 * cs2 + cs2 / 2, gy3 + 3 * cs2 + cs2 / 2, 20, "#27ae60", "center", "800");
    text(ctx, "3", gx3 + 5 * cs2 + cs2 / 2, gy3 + 3 * cs2 + cs2 / 2, 20, "#e74c3c", "center", "800");
    // Mine (revealed)
    var mx = gx3 + 6 * cs2 + cs2 / 2, my = gy3 + 1 * cs2 + cs2 / 2;
    circle(ctx, mx, my, 10, "#333");
    for (var spk = 0; spk < 8; spk++) {
      var a2 = (spk / 8) * Math.PI * 2;
      ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx + Math.cos(a2) * 14, my + Math.sin(a2) * 14);
      ctx.strokeStyle = "#555"; ctx.lineWidth = 1.5; ctx.stroke();
    }
    circle(ctx, mx, my, 4, "#fff");
    // Title
    text(ctx, "MINESWEEPER", 460, 160, 28, "#2c3e50", "center", "800");
    // Decorative bomb icon
    circle(ctx, 500, 250, 30, "#2c3e50");
    var bombGrad = ctx.createRadialGradient(500, 240, 5, 500, 250, 30);
    bombGrad.addColorStop(0, "#555"); bombGrad.addColorStop(1, "#1a1a1a");
    circle(ctx, 500, 250, 30, bombGrad);
    circle(ctx, 500, 242, 8, "#ffd93d");
    ctx.fillStyle = "#e74c3c"; ctx.fillRect(495, 222, 10, 6);
  },

  // --- Memory Match ---
  memory: function(ctx, w, h) {
    var bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, "#667eea"); bg.addColorStop(1, "#764ba2");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    // Sparkle particles
    for (var sp = 0; sp < 40; sp++) {
      var sx3 = Math.random() * w, sy3 = Math.random() * h;
      var sparkleColors = ["#ffd93d", "#fff", "#ff6b6b", "#43e97b", "#4facfe"];
      circle(ctx, sx3, sy3, 1 + Math.random() * 3, sparkleColors[Math.floor(Math.random() * sparkleColors.length)]);
    }
    // Cards
    var drawCard = function(x, y, faceUp, emoji, color) {
      shadow(ctx, "rgba(0,0,0,0.3)", 12, 3, 4);
      fillRounded(ctx, x, y, 90, 120, 12, faceUp ? "#fff" : "#6c5ce7");
      noShadow(ctx);
      if (faceUp) {
        text(ctx, emoji, x + 45, y + 55, 38, color, "center", "normal");
        // small icon corner
        text(ctx, emoji, x + 14, y + 16, 12, color, "left", "normal");
      } else {
        fillRounded(ctx, x + 10, y + 35, 70, 50, 8, "rgba(255,255,255,0.15)");
        text(ctx, "?", x + 45, y + 52, 30, "rgba(255,255,255,0.6)", "center", "bold");
      }
    };
    drawCard(100, 80, true, "🐶", "#ff6b6b");
    drawCard(210, 80, false, "", "");
    drawCard(320, 80, true, "🐱", "#4facfe");
    drawCard(155, 220, false, "", "");
    drawCard(265, 220, true, "🐰", "#43e97b");
    // Title
    glowText(ctx, "MEMORY MATCH", w / 2, h * 0.92, 30, "#fff", "rgba(255,255,255,0.4)");
  },

  // --- Bubble Pop ---
  "bubble-pop": function(ctx, w, h) {
    var bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, "#1a0533"); bg.addColorStop(1, "#2d1b69");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    // Bubbles
    var bubbles = [
      {x: 320, y: 60, r: 30, c: "#ff6b6b"}, {x: 260, y: 110, r: 28, c: "#4facfe"},
      {x: 380, y: 100, r: 26, c: "#43e97b"}, {x: 230, y: 170, r: 30, c: "#ffd93d"},
      {x: 330, y: 160, r: 25, c: "#a55eea"}, {x: 420, y: 165, r: 28, c: "#ff6b6b"},
      {x: 280, y: 230, r: 27, c: "#4facfe"}, {x: 370, y: 220, r: 24, c: "#43e97b"},
      {x: 180, y: 280, r: 26, c: "#ffd93d"}, {x: 310, y: 290, r: 29, c: "#a55eea"},
      {x: 440, y: 280, r: 25, c: "#ff6b6b"},
    ];
    for (var b = 0; b < bubbles.length; b++) {
      var bb = bubbles[b];
      var grad = ctx.createRadialGradient(bb.x - bb.r * 0.3, bb.y - bb.r * 0.3, bb.r * 0.1, bb.x, bb.y, bb.r);
      grad.addColorStop(0, "rgba(255,255,255,0.5)");
      grad.addColorStop(0.4, bb.c);
      grad.addColorStop(1, bb.c + "88");
      shadow(ctx, "rgba(0,0,0,0.3)", 6, 1, 2);
      circle(ctx, bb.x, bb.y, bb.r, grad);
      noShadow(ctx);
      // specular highlight
      circle(ctx, bb.x - bb.r * 0.25, bb.y - bb.r * 0.3, bb.r * 0.25, "rgba(255,255,255,0.5)");
    }
    // Shooter at bottom
    shadow(ctx, "rgba(0,0,0,0.3)", 6, 0, 2);
    fillRounded(ctx, 295, h - 40, 50, 30, 10, "#2a2a4a");
    noShadow(ctx);
    circle(ctx, 320, h - 25, 12, "#ff6348");
    // Title
    glowText(ctx, "BUBBLE POP", w * 0.72, h * 0.55, 26, "#fff", "rgba(255,255,255,0.4)");
  },

  // --- Color Crush ---
  "color-crush": function(ctx, w, h) {
    var bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, "#1a0a2e"); bg.addColorStop(1, "#0a1a2e");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    // Gems / crystals
    var gems = [
      {x: 140, y: 130, c1: "#ff4757", c2: "#ff6b81", r: 55},
      {x: 260, y: 130, c1: "#1e90ff", c2: "#70a1ff", r: 55},
      {x: 380, y: 130, c1: "#2ed573", c2: "#7bed9f", r: 55},
      {x: 500, y: 130, c1: "#ffa502", c2: "#ffbe76", r: 55},
      {x: 200, y: 280, c1: "#a55eea", c2: "#c39bff", r: 50},
      {x: 320, y: 280, c1: "#ff4757", c2: "#ff6b81", r: 50},
      {x: 440, y: 280, c1: "#1e90ff", c2: "#70a1ff", r: 50},
    ];
    for (var g = 0; g < gems.length; g++) {
      var gem = gems[g];
      // Diamond shape using path
      ctx.save();
      ctx.translate(gem.x, gem.y);
      ctx.rotate(Math.PI / 4);
      shadow(ctx, "rgba(0,0,0,0.4)", 10, 2, 2);
      fillRounded(ctx, -gem.r, -gem.r, gem.r * 2, gem.r * 2, 12, gem.c1);
      noShadow(ctx);
      // Facets
      ctx.fillStyle = gem.c2;
      ctx.fillRect(-gem.r * 0.5, -gem.r * 0.5, gem.r, gem.r);
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.fillRect(-gem.r, -gem.r * 0.2, gem.r * 0.6, gem.r * 0.3);
      // Sparkle at center
      circle(ctx, 0, 0, 6, "#fff");
      ctx.restore();
    }
    // Title
    glowText(ctx, "COLOR CRUSH", w / 2, 50, 30, "#fff", "rgba(255,255,255,0.35)");
  },

  // --- Solitaire Lite ---
  "solitaire-lite": function(ctx, w, h) {
    var bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, "#1b5e20"); bg.addColorStop(1, "#0d3b0d");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    // Felt texture dots
    for (var fd = 0; fd < 80; fd++) {
      circle(ctx, Math.random() * w, Math.random() * h, 1 + Math.random(), "rgba(255,255,255," + (0.03 + Math.random() * 0.04) + ")");
    }
    // Cards
    var drawPCard = function(x, y, rank, suit, color) {
      shadow(ctx, "rgba(0,0,0,0.4)", 10, 2, 3);
      fillRounded(ctx, x, y, 90, 126, 10, "#fff");
      noShadow(ctx);
      text(ctx, rank, x + 10, y + 16, 18, color, "left", "bold");
      text(ctx, suit, x + 10, y + 34, 16, color, "left", "normal");
      text(ctx, suit, x + 45, y + 63, 40, color, "center", "normal");
    };
    drawPCard(120, 100, "A", "♥", "#e74c3c");
    drawPCard(200, 100, "K", "♠", "#2c3e50");
    drawPCard(280, 100, "Q", "♦", "#e74c3c");
    drawPCard(160, 240, "J", "♣", "#2c3e50");
    drawPCard(240, 240, "10", "♥", "#e74c3c");
    // Decorative highlight on top card
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.fillRect(124, 104, 82, 4);
    // Title
    glowText(ctx, "SOLITAIRE LITE", 440, 200, 24, "#fff", "rgba(255,255,255,0.25)");
  },

  // --- Number Guess ---
  "number-guess": function(ctx, w, h) {
    var bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, "#1a1a3a"); bg.addColorStop(1, "#0d1a30");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    // Big question mark
    glowText(ctx, "?", w / 2 - 80, h / 2, 160, "#ffd93d", "rgba(255,217,61,0.3)");
    // Numbers floating around
    var floatNums = [1, 7, 23, 42, 56, 78, 99, 100, 13, 64, 37, 88, 50, 5, 91];
    for (var fn = 0; fn < floatNums.length; fn++) {
      var angle3 = (fn / floatNums.length) * Math.PI * 2 - Math.PI / 2;
      var dist = 140 + Math.random() * 20;
      var nx = w / 2 + Math.cos(angle3) * dist;
      var ny = h / 2 + Math.sin(angle3) * dist;
      var alpha2 = 0.3 + Math.random() * 0.4;
      var sz2 = 14 + Math.random() * 10;
      text(ctx, String(floatNums[fn]), nx, ny, sz2, "rgba(255,255,255," + alpha2.toFixed(2) + ")", "center", "400");
    }
    // Decorative arrows up/down
    text(ctx, "▲", w / 2 - 80, h / 2 - 70, 24, "#43e97b", "center", "normal");
    text(ctx, "▼", w / 2 - 80, h / 2 + 70, 24, "#ff6b6b", "center", "normal");
    // Target icon
    ring(ctx, w / 2 + 120, h / 2 - 50, 30, "rgba(255,255,255,0.2)", 3);
    ring(ctx, w / 2 + 120, h / 2 - 50, 20, "rgba(255,255,255,0.2)", 3);
    circle(ctx, w / 2 + 120, h / 2 - 50, 8, "#ff6b6b");
    // Title
    glowText(ctx, "NUMBER GUESS", w * 0.72, 50, 26, "#fff", "rgba(255,255,255,0.3)");
  },

  // --- Whack-a-Mole ---
  "whack-a-mole": function(ctx, w, h) {
    var bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, "#87CEEB"); bg.addColorStop(0.7, "#4CAF50"); bg.addColorStop(1, "#2E7D32");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    // Ground
    fillRounded(ctx, 0, h * 0.65, w, h * 0.35, 0, "#5D4037");
    // Grass line
    ctx.fillStyle = "#388E3C"; ctx.fillRect(0, h * 0.63, w, 8);
    // Holes
    var drawHole = function(x, y) {
      var hGrad = ctx.createRadialGradient(x, y, 5, x, y, 45);
      hGrad.addColorStop(0, "#1a1a1a"); hGrad.addColorStop(0.7, "#3E2723"); hGrad.addColorStop(1, "#5D4037");
      ctx.beginPath(); ctx.ellipse(x, y, 48, 22, 0, 0, Math.PI * 2);
      ctx.fillStyle = hGrad; ctx.fill();
    };
    drawHole(140, h * 0.67); drawHole(320, h * 0.67); drawHole(500, h * 0.67);
    // Mole popping out of middle hole
    var mx2 = 320, my2 = h * 0.62;
    // body
    var mGrad = ctx.createRadialGradient(mx2, my2, 5, mx2, my2, 28);
    mGrad.addColorStop(0, "#8D6E63"); mGrad.addColorStop(1, "#5D4037");
    circle(ctx, mx2, my2 - 10, 28, mGrad);
    // head top
    circle(ctx, mx2, my2 - 30, 18, "#8D6E63");
    // eyes
    circle(ctx, mx2 - 6, my2 - 34, 6, "#fff");
    circle(ctx, mx2 + 6, my2 - 34, 6, "#fff");
    circle(ctx, mx2 - 6, my2 - 34, 3, "#111");
    circle(ctx, mx2 + 6, my2 - 34, 3, "#111");
    // nose
    circle(ctx, mx2, my2 - 28, 5, "#e74c3c");
    // teeth
    ctx.fillStyle = "#fff";
    ctx.fillRect(mx2 - 4, my2 - 22, 4, 5);
    ctx.fillRect(mx2 + 2, my2 - 22, 4, 5);
    // Hammer above
    shadow(ctx, "rgba(0,0,0,0.3)", 6, -2, -4);
    ctx.fillStyle = "#795548"; ctx.fillRect(mx2 - 12, my2 - 60, 24, 20);
    ctx.fillStyle = "#bdc3c7"; ctx.fillRect(mx2 - 22, my2 - 40, 44, 18);
    fillRounded(ctx, mx2 - 24, my2 - 42, 48, 18, 4, "#95a5a6");
    noShadow(ctx);
    // Title
    glowText(ctx, "WHACK-A-MOLE", w / 2, 44, 28, "#fff", "rgba(255,255,255,0.35)");
  },

  // --- Speed Tap ---
  "speed-tap": function(ctx, w, h) {
    var bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, "#0f0c29"); bg.addColorStop(0.5, "#302b63"); bg.addColorStop(1, "#24243e");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    // Concentric rings
    for (var cr = 0; cr < 8; cr++) {
      var rr = 150 - cr * 18;
      var alpha3 = 0.15 - cr * 0.015;
      ring(ctx, w / 2 - 60, h / 2, rr, "rgba(255,255,255," + alpha3.toFixed(3) + ")", 2);
    }
    // Center circle
    var tapGrad = ctx.createRadialGradient(w / 2 - 60, h / 2 - 5, 5, w / 2 - 60, h / 2, 50);
    tapGrad.addColorStop(0, "#ff6b6b"); tapGrad.addColorStop(0.7, "#e74c3c"); tapGrad.addColorStop(1, "#c0392b");
    shadow(ctx, "rgba(0,0,0,0.5)", 15, 0, 3);
    circle(ctx, w / 2 - 60, h / 2, 50, tapGrad);
    noShadow(ctx);
    // Inner highlight
    var innerH = ctx.createRadialGradient(w / 2 - 60, h / 2 - 20, 2, w / 2 - 60, h / 2, 35);
    innerH.addColorStop(0, "rgba(255,255,255,0.4)"); innerH.addColorStop(1, "rgba(255,255,255,0)");
    circle(ctx, w / 2 - 60, h / 2, 35, innerH);
    // Lightning bolt
    ctx.fillStyle = "#ffd93d";
    ctx.beginPath();
    var lbx = w / 2 + 60, lby = h / 2 - 60;
    ctx.moveTo(lbx - 6, lby - 30);
    ctx.lineTo(lbx + 12, lby - 5);
    ctx.lineTo(lbx + 2, lby);
    ctx.lineTo(lbx + 20, lby + 30);
    ctx.lineTo(lbx - 4, lby + 8);
    ctx.lineTo(lbx + 4, lby + 5);
    ctx.lineTo(lbx - 12, lby - 30);
    ctx.closePath();
    ctx.fill();
    // Speed lines
    for (var ssl = 0; ssl < 12; ssl++) {
      var sa = (ssl / 12) * Math.PI * 2;
      var sx5 = w / 2 - 60 + Math.cos(sa) * 70;
      var sy5 = h / 2 + Math.sin(sa) * 70;
      ctx.beginPath();
      ctx.moveTo(sx5, sy5);
      ctx.lineTo(sx5 + Math.cos(sa) * 25, sy5 + Math.sin(sa) * 25);
      ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 2;
      ctx.stroke();
    }
    // Title
    glowText(ctx, "SPEED TAP", w / 2, 50, 32, "#fff", "rgba(255,255,255,0.4)");
  },

  // --- Car Dodge ---
  "car-dodge": function(ctx, w, h) {
    var bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, "#1a1a2e"); bg.addColorStop(1, "#0d0d1a");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    // Road
    ctx.fillStyle = "#2d2d2d"; ctx.fillRect(60, 0, w - 120, h);
    // Road edge lines
    ctx.fillStyle = "#fff"; ctx.fillRect(58, 0, 4, h);
    ctx.fillRect(w - 62, 0, 4, h);
    // Lane dashes
    ctx.setLineDash([20, 24]);
    ctx.strokeStyle = "#ffd93d"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(w / 2, 10); ctx.lineTo(w / 2, h - 10); ctx.stroke();
    ctx.setLineDash([]);
    // Player car (red, center-bottom)
    var carX = w / 2 - 28, carY = h - 120;
    shadow(ctx, "rgba(0,0,0,0.4)", 8, 1, 3);
    fillRounded(ctx, carX, carY, 56, 90, 10, "#ff3b3b");
    // Windshield
    fillRounded(ctx, carX + 8, carY + 10, 40, 24, 6, "#1e90ff");
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.fillRect(carX + 10, carY + 12, 16, 20);
    ctx.fillRect(carX + 30, carY + 12, 16, 20);
    // Wheels
    fillRounded(ctx, carX - 4, carY + 6, 8, 18, 3, "#111");
    fillRounded(ctx, carX + 52, carY + 6, 8, 18, 3, "#111");
    fillRounded(ctx, carX - 4, carY + 66, 8, 18, 3, "#111");
    fillRounded(ctx, carX + 52, carY + 66, 8, 18, 3, "#111");
    // Headlights
    circle(ctx, carX + 14, carY - 2, 5, "#ffd93d");
    circle(ctx, carX + 42, carY - 2, 5, "#ffd93d");
    noShadow(ctx);
    // Oncoming car (blue, smaller, higher)
    var ocX = w / 2 + 30, ocY = 50;
    fillRounded(ctx, ocX, ocY, 40, 68, 8, "#1e90ff");
    fillRounded(ctx, ocX + 6, ocY + 8, 28, 18, 4, "#1a1a2e");
    fillRounded(ctx, ocX - 3, ocY + 4, 6, 14, 3, "#111");
    fillRounded(ctx, ocX + 37, ocY + 4, 6, 14, 3, "#111");
    fillRounded(ctx, ocX - 3, ocY + 50, 6, 14, 3, "#111");
    fillRounded(ctx, ocX + 37, ocY + 50, 6, 14, 3, "#111");
    // Title
    glowText(ctx, "CAR DODGE", w / 2, h * 0.92, 26, "#ff3b3b", "rgba(255,59,59,0.3)");
  },

  // --- Word Guess ---
  "word-guess": function(ctx, w, h) {
    var bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, "#fefefe"); bg.addColorStop(1, "#f0ead6");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    // Notebook lines
    for (var nl = 0; nl < 30; nl++) {
      ctx.strokeStyle = "rgba(173,216,230,0.3)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(30, 30 + nl * 12); ctx.lineTo(w - 30, 30 + nl * 12); ctx.stroke();
    }
    // Red margin line
    ctx.strokeStyle = "rgba(255,182,182,0.5)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(70, 10); ctx.lineTo(70, h - 10); ctx.stroke();
    // Letter tiles
    var letters = ["H", "E", "L", "L", "O"];
    var lx = 140, ly = 140;
    for (var lt = 0; lt < letters.length; lt++) {
      var lcx = lx + lt * 70;
      shadow(ctx, "rgba(0,0,0,0.15)", 6, 0, 2);
      fillRounded(ctx, lcx, ly, 54, 54, 8, "#fff");
      noShadow(ctx);
      text(ctx, letters[lt], lcx + 27, ly + 27, 28, "#2c3e50", "center", "700");
      // Underscore / blank for "L"
      if (lt === 2 || lt === 3) {
        ctx.strokeStyle = "#e74c3c"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(lcx + 12, ly + 42); ctx.lineTo(lcx + 42, ly + 42); ctx.stroke();
      }
    }
    // Pencil
    var pex = 480, pey = 100;
    ctx.fillStyle = "#f39c12";
    ctx.beginPath(); ctx.moveTo(pex - 10, pey + 80); ctx.lineTo(pex - 10, 50);
    ctx.quadraticCurveTo(pex - 10, 32, pex, 20);
    ctx.quadraticCurveTo(pex + 10, 32, pex + 10, 50);
    ctx.lineTo(pex + 10, pey + 80); ctx.lineTo(pex - 10, pey + 80);
    ctx.fill();
    ctx.fillStyle = "#f5cba7"; ctx.fillRect(pex - 10, pey + 30, 20, 50);
    ctx.fillStyle = "#e74c3c";
    ctx.beginPath(); ctx.moveTo(pex, 20); ctx.lineTo(pex + 6, 10); ctx.lineTo(pex - 2, 16); ctx.lineTo(pex - 6, 10); ctx.closePath(); ctx.fill();
    // Dangling letters
    text(ctx, "A", 530, 260, 20, "rgba(0,0,0,0.15)", "center", "400");
    text(ctx, "T", 560, 290, 18, "rgba(0,0,0,0.12)", "center", "400");
    text(ctx, "Z", 500, 300, 16, "rgba(0,0,0,0.1)", "center", "400");
    // Title
    text(ctx, "WORD GUESS", lx + 140, 70, 28, "#2c3e50", "center", "800");
  },

  // --- Connect Four ---
  "connect-four": function(ctx, w, h) {
    var bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, "#1a3a5c"); bg.addColorStop(1, "#0d2030");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    // Board
    var bdX = 80, bdY = 60, cellS = 48, bdCols = 7, bdRows = 5;
    fillRounded(ctx, bdX - 8, bdY - 8, bdCols * cellS + 16, bdRows * cellS + 16, 8, "#1e90ff");
    // Highlight top edge
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.fillRect(bdX - 4, bdY - 4, bdCols * cellS + 8, 6);
    // Grid holes
    for (var cr2 = 0; cr2 < bdCols; cr2++) {
      for (var rr2 = 0; rr2 < bdRows; rr2++) {
        var holeX = bdX + cr2 * cellS + cellS / 2, holeY = bdY + rr2 * cellS + cellS / 2;
        shadow(ctx, "rgba(0,0,0,0.3)", 3, 0, 0);
        circle(ctx, holeX, holeY, cellS / 2 - 3, "rgba(0,0,0,0.6)");
        noShadow(ctx);
      }
    }
    // Discs placed
    var discs = [
      {col: 0, row: 4, color: "#ff3b3b"}, {col: 1, row: 4, color: "#ffd93d"},
      {col: 0, row: 3, color: "#ffd93d"}, {col: 1, row: 3, color: "#ff3b3b"},
      {col: 2, row: 4, color: "#ff3b3b"}, {col: 3, row: 4, color: "#ffd93d"},
      {col: 2, row: 3, color: "#ffd93d"}, {col: 0, row: 2, color: "#ff3b3b"},
      {col: 1, row: 2, color: "#ff3b3b"}, {col: 2, row: 2, color: "#ff3b3b"},
      {col: 3, row: 3, color: "#ff3b3b"},
    ];
    for (var d = 0; d < discs.length; d++) {
      var disc = discs[d];
      var dx = bdX + disc.col * cellS + cellS / 2, dy = bdY + disc.row * cellS + cellS / 2;
      var dGrad = ctx.createRadialGradient(dx - 3, dy - 4, 2, dx, dy, cellS / 2 - 4);
      dGrad.addColorStop(0, "rgba(255,255,255,0.3)");
      dGrad.addColorStop(0.5, disc.color);
      dGrad.addColorStop(1, disc.color + "aa");
      shadow(ctx, "rgba(0,0,0,0.4)", 6, 0, 1);
      circle(ctx, dx, dy, cellS / 2 - 4, dGrad);
      noShadow(ctx);
    }
    // Falling disc
    var fdX = bdX + 5 * cellS + cellS / 2, fdY = bdY - 20;
    var fdGrad = ctx.createRadialGradient(fdX - 3, fdY - 4, 2, fdX, fdY, cellS / 2 - 4);
    fdGrad.addColorStop(0, "rgba(255,255,255,0.3)");
    fdGrad.addColorStop(0.5, "#ff3b3b");
    fdGrad.addColorStop(1, "#ff3b3baa");
    shadow(ctx, "rgba(0,0,0,0.4)", 6, 0, 1);
    circle(ctx, fdX, fdY, cellS / 2 - 4, fdGrad);
    noShadow(ctx);
    // Arrow indicator
    text(ctx, "▼", fdX, bdY - 50, 20, "#ffd93d", "center", "normal");
    // Title
    glowText(ctx, "CONNECT FOUR", bdX + bdCols * cellS + 80, 140, 24, "#fff", "rgba(255,255,255,0.3)");
  }

};

// ========== 主渲染函数 ==========

function renderAllThumbnails() {
  var canvases = document.querySelectorAll('.game-thumb-canvas');
  for (var i = 0; i < canvases.length; i++) {
    var canvas = canvases[i];
    var gameId = canvas.getAttribute('data-game');
    var drawFn = THUMBNAIL_DRAW[gameId];
    if (!drawFn) continue;
    // Set internal resolution
    canvas.width = THUMB_W;
    canvas.height = THUMB_H;
    var ctx = canvas.getContext('2d');
    drawFn(ctx, THUMB_W, THUMB_H);
  }
}
