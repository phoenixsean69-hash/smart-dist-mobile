const fs = require('fs');
const icon = '<MaterialIcons';

// HOME
const h = 'app/(tabs)/home.tsx';
if (fs.existsSync(h)) {
  let s = fs.readFileSync(h, 'utf8');
  if (!s.includes(icon)) s = s.replace("import { View, Text,", "import { MaterialIcons } from '@expo/vector-icons';\nimport { View, Text,");
  s = s.replace('{firstName} 👋', '{firstName}');
  s = s.replace('<Text style={{ fontSize: 18 }}>🧾</Text>', '<MaterialIcons name="receipt-long" size={22} color="#062B6F" />');
  s = s.replace('<Text style={{ fontSize: 18 }}>💳</Text>', '<MaterialIcons name="payment" size={22} color="#FFFFFF" />');
  s = s.replace('<Text style={{ fontSize: 18 }}>📊</Text>', '<MaterialIcons name="history" size={22} color="#1769FF" />');
  s = s.replace('<Text style={{ fontSize: 18 }}>📢</Text>', '<MaterialIcons name="campaign" size={22} color="#FFFFFF" />');
  fs.writeFileSync(h, s, 'utf8');
  console.log('✅ home.tsx done');
}

// BILLS
const b = 'app/(tabs)/bills.tsx';
if (fs.existsSync(b)) {
  let s = fs.readFileSync(b, 'utf8');
  if (!s.includes(icon)) s = s.replace("import { View, Text,", "import { MaterialIcons } from '@expo/vector-icons';\nimport { View, Text,");
  s = s.replace("<Text style={{ fontSize: 18 }}>{bill.type === 'Water' ? '💧' : '🏠'}</Text>", '<MaterialIcons name={bill.type === "Water" ? "water-drop" : "home"} size={22} color={bill.type === "Water" ? "#1769FF" : "#062B6F"} />');
  s = s.replace('<Text style={{ fontSize: 12 }}>✅</Text>', '<MaterialIcons name="check-circle" size={14} color="#16A34A" />');
  s = s.replace('<Text style={{ fontSize: 32 }}>📭</Text>', '<MaterialIcons name="mark-email-read" size={40} color="#94A3B8" />');
  fs.writeFileSync(b, s, 'utf8');
  console.log('✅ bills.tsx done');
}

// PAYMENTS
const p = 'app/(tabs)/payments.tsx';
if (fs.existsSync(p)) {
  let s = fs.readFileSync(p, 'utf8');
  if (!s.includes(icon)) s = s.replace("import { View, Text,", "import { MaterialIcons } from '@expo/vector-icons';\nimport { View, Text,");
  s = s.replace('<Text style={{ fontSize: 16 }}>✓</Text>', '<MaterialIcons name="check-circle" size={20} color="#16A34A" />');
  fs.writeFileSync(p, s, 'utf8');
  console.log('✅ payments.tsx done');
}
