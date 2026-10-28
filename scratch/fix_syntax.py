app_path = r'c:\Users\KABIN OSGB\Desktop\Antigravity\Projeler\AI_Teknik_Servis_Yonetimi\app.js'

with open(app_path, 'r', encoding='utf-8') as f:
    text = f.read()

lines = text.split('\n')
new_lines = []
skip = False
for idx, line in enumerate(lines):
    if "combined.includes('baskı') || combined.includes('fotokopi') || combined.includes('pos'))" in line and idx + 1 < len(lines) and "else if (combined.includes('printer')" in lines[idx+1]:
        # skip line 4546 to 4549
        continue
    if "else if (combined.includes('printer') || combined.includes('yazıcı') || combined.includes('yazici')" in line:
        line = line.replace("else if", "if")
    new_lines.append(line)

new_text = '\n'.join(new_lines)
with open(app_path, 'w', encoding='utf-8') as f:
    f.write(new_text)

print("Cleaned up duplicated line.")

