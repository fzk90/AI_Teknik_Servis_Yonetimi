# -*- coding: utf-8 -*-
path_app = 'app.js'
with open(path_app, 'r', encoding='utf-8') as f:
    code = f.read()

target = """    if (isWorkshopJob) {
      if (isWStaff) {
        distance = 0.0;
        liveLoc = { distanceKm: 0.0, locationLabel: "Merkez Atölye Tezgâhı" };
      } else {
        liveLoc = getStaffLiveLocationAndDistance(s, custAddr);
        distance = liveLoc.distanceKm;
      }"""

replacement = """    if (isWorkshopJob) {
      if (isWStaff) {
        distance = 0.0;
        liveLoc = { distanceKm: 0.0, locationLabel: "Merkez Atölye Tezgâhı" };
      } else {
        liveLoc = getStaffLiveLocationAndDistance(s, "🏢 Merkez Servis Atölyesi / Laboratuvar");
        distance = liveLoc.distanceKm;
      }"""

if target in code:
    code = code.replace(target, replacement, 1)
    with open(path_app, 'w', encoding='utf-8') as f:
        f.write(code)
    print('Updated target routing address for mobile staff on workshop jobs.')
else:
    print('Target not matched!')

