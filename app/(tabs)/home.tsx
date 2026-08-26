import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from '../../components/Card';
import { Screen } from '../../components/Screen';
import { StatusPill } from '../../components/StatusPill';
import { colors } from '../../constants/theme';
import { useResident } from '../../lib/resident-context';

const money = (n: number) => `$${n.toFixed(2)}`;
export default function Home() {
  const { resident, account: acct, payments } = useResident();
  const recent = payments[0];
  return <View style={styles.root}>
    <View style={styles.hero}><View><Text style={styles.hello}>Hello, {resident.firstName} 👋</Text><Text style={styles.sub}>{resident.ward} · {resident.propertyNumber}</Text></View><View style={styles.avatar}><Text style={styles.avatarText}>{resident.firstName[0]}{resident.lastName[0]}</Text></View></View>
    <Screen><Card style={styles.balanceCard}>
      <View style={styles.row}><Text style={styles.overline}>CURRENT BALANCE</Text><StatusPill value={acct.status} /></View>
      <Text style={styles.balance}>{money(acct.balance)}</Text><Text style={styles.account}>Account {acct.accountNumber}</Text>
      <View style={styles.divider}/><View style={styles.stats}><Stat label="Outstanding" value={money(acct.balance)} /><Stat label="Arrears" value={money(acct.arrears)} /><Stat label="Credit" value={money(acct.credit)} /></View>
    </Card>
    <Text style={styles.section}>Quick Actions</Text><View style={styles.grid}>
      <Action icon="receipt" label="View Bills" caption="See all bills" onPress={() => router.push('/(tabs)/bills')} />
      <Action icon="cash" label="Make Payment" caption="Pay securely" green onPress={() => router.push('/payments/make')} />
      <Action icon="refresh-circle" label="Payment History" caption="View payments" purple onPress={() => router.push('/(tabs)/payments')} />
      <Action icon="person" label="Your Profile" caption="Update details" orange onPress={() => router.push('/(tabs)/profile')} />
    </View>
    <View style={styles.sectionRow}><Text style={styles.section}>Recent Payments</Text><TouchableOpacity onPress={() => router.push('/(tabs)/payments')}><Text style={styles.see}>See all</Text></TouchableOpacity></View>
    {recent && <Card><View style={styles.row}><View><Text style={styles.paymentRef}>{recent.paymentReference}</Text><Text style={styles.muted}>{recent.notes}</Text></View><View style={styles.right}><Text style={styles.muted}>{recent.paymentMethod}</Text><Text style={styles.paid}>{money(recent.amount)}</Text></View></View></Card>}
    </Screen>
  </View>;
}
function Stat({ label, value }: { label: string; value: string }) { return <View style={{ flex: 1 }}><Text style={styles.statLabel}>{label}</Text><Text style={styles.statValue}>{value}</Text></View>; }
function Action({ icon, label, caption, onPress, green, purple, orange }: any) { const color = green ? colors.green : purple ? colors.purple : orange ? colors.orange : colors.blue; return <TouchableOpacity onPress={onPress} style={styles.action}><View style={[styles.icon, { backgroundColor: color }]}><Ionicons name={icon} size={19} color={colors.white}/></View><View><Text style={styles.actionLabel}>{label}</Text><Text style={styles.actionCaption}>{caption}</Text></View></TouchableOpacity>; }
const styles = StyleSheet.create({ root:{flex:1,backgroundColor:colors.background}, hero:{height:150,backgroundColor:colors.navy,paddingHorizontal:22,paddingTop:48,flexDirection:'row',justifyContent:'space-between'},hello:{color:colors.white,fontSize:22,fontWeight:'800'},sub:{color:colors.white,fontSize:13,fontWeight:'700',marginTop:6,opacity:.9},avatar:{width:46,height:46,borderRadius:23,backgroundColor:colors.blue,alignItems:'center',justifyContent:'center'},avatarText:{color:colors.white,fontWeight:'800'},balanceCard:{marginTop:-42},row:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},overline:{fontSize:11,fontWeight:'800',color:colors.text},balance:{fontSize:34,fontWeight:'900',color:colors.text,marginTop:8},account:{color:colors.text,fontSize:12},divider:{height:1,backgroundColor:colors.border,marginVertical:12},stats:{flexDirection:'row'},statLabel:{fontSize:10,color:colors.muted,marginBottom:5},statValue:{fontSize:13,fontWeight:'800',color:colors.text},section:{fontSize:15,fontWeight:'900',color:colors.text,marginTop:20,marginBottom:10},grid:{flexDirection:'row',flexWrap:'wrap',gap:10},action:{width:'48%',backgroundColor:colors.white,borderWidth:1,borderColor:colors.border,borderRadius:12,padding:11,flexDirection:'row',alignItems:'center',gap:9},icon:{width:30,height:30,borderRadius:8,alignItems:'center',justifyContent:'center'},actionLabel:{fontSize:12,fontWeight:'800',color:colors.text},actionCaption:{fontSize:9,color:colors.muted,marginTop:2},sectionRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},see:{fontSize:11,fontWeight:'800',color:colors.blue},paymentRef:{fontWeight:'800',fontSize:12,color:colors.text},muted:{fontSize:10,color:colors.muted,marginTop:4},right:{alignItems:'flex-end'},paid:{fontSize:13,color:colors.green,fontWeight:'900',marginTop:3}}
);
