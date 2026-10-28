const s = 'FİYAT';
console.log('Original:', s);
console.log('toLowerCase():', s.toLowerCase());
console.log('includes "fiyat":', s.toLowerCase().includes('fiyat'));
console.log('chars of s.toLowerCase():', Array.from(s.toLowerCase()).map(c => c.charCodeAt(0).toString(16)));
console.log('chars of "fiyat":', Array.from('fiyat').map(c => c.charCodeAt(0).toString(16)));

const b = 'BİRİM FİYAT';
console.log('b.toLowerCase():', b.toLowerCase());
console.log('b includes "birim fiyat":', b.toLowerCase().includes('birim fiyat'));

const d = 'DÖVİZ';
console.log('d.toLowerCase():', d.toLowerCase());
console.log('d includes "döviz":', d.toLowerCase().includes('döviz'));
