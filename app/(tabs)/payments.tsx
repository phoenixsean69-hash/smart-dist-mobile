import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../../components/Card';
import { Header } from '../../components/Header';
import { Screen } from '../../components/Screen';
import { colors } from '../../constants/theme';
import { useResident } from '../../lib/resident-context';
export default function Payments(){const {payments}=useResident();return <View style={styles.root}><Header title="Payment History"/><Screen>{payments.map(p=><Card key={p.$id} style={{marginBottom:10}}><View style={styles.row}><View><Text style={styles.ref}>{p.paymentReference}</Text><Text style={styles.note}>{p.notes}</Text></View><View style={styles.right}><Text style={styles.method}>{p.paymentMethod}</Text><Text style={styles.amount}>${p.amount.toFixed(2)}</Text></View></View><Text style={styles.date}>{new Date(p.paymentDate).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}</Text></Card>)}</Screen></View>}
const styles=StyleSheet.create({root:{flex:1,backgroundColor:colors.background},row:{flexDirection:'row',justifyContent:'space-between'},ref:{fontSize:12,fontWeight:'900',color:colors.text},note:{fontSize:10,color:colors.text,marginTop:5},right:{alignItems:'flex-end'},method:{fontSize:10,color:colors.text},amount:{fontSize:12,color:colors.green,fontWeight:'900',marginTop:5},date:{fontSize:9,color:colors.muted,textAlign:'right',marginTop:7}});
