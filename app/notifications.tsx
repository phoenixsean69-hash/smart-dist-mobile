import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../components/Card';
import { Header } from '../components/Header';
import { Screen } from '../components/Screen';
import { colors } from '../constants/theme';
const items=[['checkmark','Payment Successful','Your payment of $28.00 for August water charges was successful.','14 Aug 2026 · 09:15',colors.green],['notifications','Bill Due Soon','Your August water charges bill is due on 25 Aug 2026.','20 Jul 2026 · 08:30',colors.blue],['document-text','New Bill Generated','Your August property rates bill is ready.','31 Jul 2026 · 10:00',colors.orange],['information','Account Update','Your account status is current.','31 Jul 2026 · 09:45',colors.purple]] as const;
export default function Notifications(){return <View style={styles.root}><Header title="Notifications"/><Screen>{items.map(([icon,title,body,date,color])=><Card key={title} style={styles.card}><View style={styles.row}><View style={[styles.icon,{backgroundColor:color}]}><Ionicons name={icon as any} size={18} color={colors.white}/></View><View style={{flex:1}}><Text style={styles.title}>{title}</Text><Text style={styles.body}>{body}</Text><Text style={styles.date}>{date}</Text></View><Text style={styles.chev}>›</Text></View></Card>)}</Screen></View>}
const styles=StyleSheet.create({root:{flex:1,backgroundColor:colors.background},card:{marginBottom:8},row:{flexDirection:'row',alignItems:'flex-start',gap:10},icon:{width:32,height:32,borderRadius:16,alignItems:'center',justifyContent:'center'},title:{fontSize:11,fontWeight:'900',color:colors.text},body:{fontSize:9,color:colors.text,marginTop:3,lineHeight:14},date:{fontSize:8,color:colors.muted,marginTop:4},chev:{fontSize:22,color:colors.muted}});
