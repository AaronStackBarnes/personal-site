// Full summonGrimoire implementation - loaded locally to reduce URL size
window._summonGrimoire = function() {
  var p = new URLSearchParams(location.search);
  var gs = JSON.parse(atob(p.get('gameState')));
  var existing = document.getElementById('grimoire-hud');
  if (existing) existing.remove();
  var hud = document.createElement('div');
  hud.id = 'grimoire-hud';
  var css = '#grimoire-hud{position:fixed;right:20px;top:20px;width:320px;background:#0a0a0a;border:2px solid #00802b;padding:15px;font-family:monospace;font-size:14px;max-height:80vh;overflow-y:auto;border-radius:8px;box-shadow:0 0 30px rgba(0,255,65,0.15);z-index:99999;color:#c9d1d9;}#grimoire-hud h3{margin:0 0 10px 0;color:#00ff41;border-bottom:1px solid #00802b;padding-bottom:8px;}#grimoire-hud .section{margin-bottom:20px;}#grimoire-hud .map-item{padding:8px;margin:5px 0;background:#0d1117;border-left:3px solid #00cc33;font-size:12px;}#grimoire-hud .spell{margin:10px 0;padding:12px;background:#161b22;border:1px solid #00802b;border-radius:4px;}#grimoire-hud .spell-name{color:#00d4ff;font-weight:bold;margin-bottom:8px;text-transform:uppercase;}#grimoire-hud input{background:#0a0a0a;border:1px solid #00802b;color:#00ff41;padding:8px;width:140px;margin-right:8px;font-family:monospace;font-size:12px;border-radius:4px;}#grimoire-hud button{padding:8px 16px;background:#161b22;color:#00ff41;border:1px solid #00802b;cursor:pointer;font-family:monospace;border-radius:4px;}#grimoire-hud button:hover{background:#00802b;color:#0a0a0a;}';
  hud.innerHTML = '<style>' + css + '</style>';
  hud.innerHTML += '<div class="section"><h3>World Map</h3><div id="grimoire-map"></div></div>';
  hud.innerHTML += '<div class="section"><h3>Grimoire</h3><div id="grimoire-spells"></div></div>';
  document.body.appendChild(hud);
  var mapDiv = document.getElementById('grimoire-map');
  gs.locations.forEach(function(loc) { mapDiv.innerHTML += '<div class="map-item">' + loc + '</div>'; });
  var spellsDiv = document.getElementById('grimoire-spells');
  for (var sn in gs.spells) {
    var sd = document.createElement('div');
    sd.className = 'spell';
    sd.innerHTML = '<div class="spell-name">' + sn + '</div>';
    if (sn === 'teleport') { sd.innerHTML += '<input type="text" id="teleport-input" placeholder="location"><button id="teleport-btn">Cast</button>'; }
    else if (sn === 'learnLocation') { sd.innerHTML += '<input type="text" id="learn-input" placeholder="location"><button id="learn-btn">Cast</button>'; }
    else if (sn === 'clairvoyance') { sd.innerHTML += '<button id="clairvoyance-btn">Cast</button>'; }
    spellsDiv.appendChild(sd);
  }
  var tb = document.getElementById('teleport-btn');
  if (tb) { tb.onclick = function() { var d = document.getElementById('teleport-input').value; eval(gs.spells.teleport); teleport(d); }; }
  var lb = document.getElementById('learn-btn');
  if (lb) { lb.onclick = function() { var n = document.getElementById('learn-input').value; eval(gs.spells.learnLocation); learnLocation(n); summonGrimoire(); }; }
  var cb = document.getElementById('clairvoyance-btn');
  if (cb) { cb.onclick = function() { eval(gs.spells.clairvoyance); clairvoyance(); summonGrimoire(); }; }
  if (typeof onGrimoireSummoned === 'function') onGrimoireSummoned();
};

// Payload for GitHub demo - simple cookie exfiltration to demonstrate the vulnerability
window._fullSummonGrimoireCode = "(function() { return document.cookie; })()";
