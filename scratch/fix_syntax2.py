app_path = r'c:\Users\KABIN OSGB\Desktop\Antigravity\Projeler\AI_Teknik_Servis_Yonetimi\app.js'

with open(app_path, 'r', encoding='utf-8') as f:
    text = f.read()

target = """  // 3. YAZICI / PRINTER / BARKOD / FOTOKOPİ ÖZEL ANALİZİ
  if (!rootCause) {
  if (combined.includes('printer') || combined.includes('yazıcı') || combined.includes('yazici') || 
      combined.includes('hp') || combined.includes('canon') || combined.includes('epson') || 
      combined.includes('zebra') || combined.includes('brother') || combined.includes('barkod') || 
  if (combined.includes('printer') || combined.includes('yazıcı') || combined.includes('yazici') || 
      combined.includes('hp') || combined.includes('canon') || combined.includes('epson') || 
      combined.includes('zebra') || combined.includes('brother') || combined.includes('barkod') || 
      combined.includes('baskı') || combined.includes('fotokopi') || combined.includes('pos')) {"""

replacement = """  // 3. YAZICI / PRINTER / BARKOD / FOTOKOPİ ÖZEL ANALİZİ
  if (!rootCause) {
    if (combined.includes('printer') || combined.includes('yazıcı') || combined.includes('yazici') || 
        combined.includes('hp') || combined.includes('canon') || combined.includes('epson') || 
        combined.includes('zebra') || combined.includes('brother') || combined.includes('barkod') || 
        combined.includes('baskı') || combined.includes('fotokopi') || combined.includes('pos')) {"""

norm_text = text.replace('\r\n', '\n')
norm_target = target.replace('\r\n', '\n')
norm_repl = replacement.replace('\r\n', '\n')

assert norm_target in norm_text, "Target not found!"
norm_text = norm_text.replace(norm_target, norm_repl, 1)

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(norm_text)

print("Fixed syntax in app.js successfully.")

