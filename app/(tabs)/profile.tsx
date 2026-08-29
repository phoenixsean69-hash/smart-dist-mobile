import { ActivityIndicator, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useResident } from '../../lib/resident-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { account } from '../../lib/appwrite';
import { LANGUAGES, localeTag, useLanguage } from '../../lib/i18n';

export default function Profile() {
  const { resident, loading } = useResident() as any;
  const { locale, setLanguage, t } = useLanguage();
  const [languageOpen, setLanguageOpen] = useState(false);
  const router = useRouter();
  const handleLogout = async () => { try { await account.deleteSession('current'); } catch {} finally { router.replace('/login' as any); } };
  if (loading) return <View style={{ flex:1,backgroundColor:'#fff',alignItems:'center',justifyContent:'center' }}><ActivityIndicator color="#1769FF" /></View>;
  const initials=(resident?.fullName||'T M').split(' ').map((n:string)=>n[0]).join('').slice(0,2).toUpperCase();
  const activeLanguage=LANGUAGES.find(x=>x.code===locale)!;
  const rows=[
    {label:t('fullName'),value:resident?.fullName||'Tapiwa Moyo'}, {label:t('email'),value:resident?.email||'tapiwa@test.com'},
    {label:t('phone'),value:resident?.phone||'+263 77 123 4567'}, {label:t('standNumber'),value:resident?.standNumber||'1234'},
    {label:t('accountCreated'),value:resident?.$createdAt?new Date(resident.$createdAt).toLocaleDateString(localeTag(locale)):'2026-01-15'},
  ];
  const actions=[{key:'contactCouncil',icon:'chatbubble-outline'},{key:'downloadStatement',icon:'document-text-outline'},{key:'privacySecurity',icon:'lock-closed-outline'}] as const;
  return <View style={{flex:1,backgroundColor:'#F6F8FF'}}>
    <View style={{backgroundColor:'#062B6F',paddingTop:60,paddingBottom:24,paddingHorizontal:20,alignItems:'center',borderBottomLeftRadius:24,borderBottomRightRadius:24}}>
      <View style={{width:72,height:72,borderRadius:22,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',marginBottom:12}}><Text style={{fontSize:24,fontWeight:'900',color:'#062B6F'}}>{initials}</Text></View>
      <Text style={{color:'#fff',fontSize:18,fontWeight:'900'}}>{resident?.fullName||'Tapiwa Moyo'}</Text><Text style={{color:'rgba(255,255,255,0.7)',fontSize:12,marginTop:4}}>{resident?.email||'tapiwa@test.com'}</Text>
      <View style={{marginTop:12,backgroundColor:'rgba(255,255,255,0.12)',paddingHorizontal:12,paddingVertical:6,borderRadius:10}}><Text style={{color:'#fff',fontSize:10,fontWeight:'700',letterSpacing:1,textTransform:'uppercase'}}>{t('stand')} {resident?.standNumber||'----'} • {t('verified')}</Text></View>
    </View>
    <ScrollView contentContainerStyle={{padding:16,paddingBottom:100}} showsVerticalScrollIndicator={false}>
      <View style={{backgroundColor:'#fff',borderRadius:18,padding:16,borderWidth:1,borderColor:'#E2E8F0'}}><Text style={{fontSize:11,fontWeight:'800',color:'#0F172A',letterSpacing:.5,marginBottom:14,textTransform:'uppercase'}}>{t('personalInformation')}</Text>{rows.map((row,i)=><View key={row.label}><View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:12,gap:16}}><Text style={{fontSize:12,color:'#64748B'}}>{row.label}</Text><Text style={{fontSize:12,fontWeight:'700',color:'#0F172A',maxWidth:190,textAlign:'right'}}>{row.value}</Text></View>{i<rows.length-1&&<View style={{height:1,backgroundColor:'#F1F5F9'}}/>}</View>)}</View>
      <View style={{backgroundColor:'#fff',borderRadius:18,padding:16,marginTop:16,borderWidth:1,borderColor:'#E2E8F0'}}><Text style={{fontSize:11,fontWeight:'800',color:'#0F172A',letterSpacing:.5,marginBottom:8,textTransform:'uppercase'}}>{t('settings')}</Text>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel={t('chooseLanguage')} onPress={()=>setLanguageOpen(true)} style={{flexDirection:'row',alignItems:'center',paddingVertical:13}}><Ionicons name="language-outline" size={20} color="#1769FF"/><Text style={{flex:1,fontSize:13,color:'#0F172A',fontWeight:'700',marginLeft:12}}>{t('language')}</Text><Text style={{fontSize:12,color:'#64748B',marginRight:8}}>{activeLanguage.nativeLabel}</Text><Ionicons name="chevron-forward" size={16} color="#94A3B8"/></TouchableOpacity>
      </View>
      <View style={{backgroundColor:'#fff',borderRadius:18,padding:16,marginTop:16,borderWidth:1,borderColor:'#E2E8F0'}}><Text style={{fontSize:11,fontWeight:'800',color:'#0F172A',letterSpacing:.5,marginBottom:8,textTransform:'uppercase'}}>{t('support')}</Text>{actions.map((a,i)=><View key={a.key}><TouchableOpacity style={{flexDirection:'row',alignItems:'center',paddingVertical:12}}><Ionicons name={a.icon} size={19} color="#64748B"/><Text style={{flex:1,fontSize:13,color:'#0F172A',fontWeight:'600',marginLeft:12}}>{t(a.key)}</Text><Ionicons name="chevron-forward" size={16} color="#94A3B8"/></TouchableOpacity>{i<actions.length-1&&<View style={{height:1,backgroundColor:'#F1F5F9'}}/>}</View>)}</View>
      <TouchableOpacity onPress={handleLogout} style={{backgroundColor:'#fee2e2',borderRadius:16,paddingVertical:14,alignItems:'center',marginTop:24,borderWidth:1,borderColor:'#fecaca'}}><Text style={{color:'#dc2626',fontWeight:'800',fontSize:14}}>{t('signOut')}</Text></TouchableOpacity>
      <View style={{alignItems:'center',marginTop:20}}><Text style={{fontSize:10,color:'#94A3B8',fontWeight:'600',letterSpacing:1}}>SMARTPAY RESIDENT • v1.0.0</Text><Text style={{fontSize:10,color:'#CBD5E1',marginTop:4}}>{t('secureEncrypted')}</Text></View>
    </ScrollView>
    <Modal visible={languageOpen} transparent animationType="fade" onRequestClose={()=>setLanguageOpen(false)}><TouchableOpacity activeOpacity={1} onPress={()=>setLanguageOpen(false)} style={{flex:1,backgroundColor:'rgba(15,23,42,.5)',justifyContent:'flex-end'}}><View style={{backgroundColor:'#fff',borderTopLeftRadius:24,borderTopRightRadius:24,padding:20,paddingBottom:36}} onStartShouldSetResponder={()=>true}><Text style={{fontSize:18,fontWeight:'900',color:'#0F172A',marginBottom:12}}>{t('chooseLanguage')}</Text>{LANGUAGES.map(l=><TouchableOpacity key={l.code} onPress={async()=>{await setLanguage(l.code);setLanguageOpen(false)}} style={{flexDirection:'row',alignItems:'center',paddingVertical:15,borderBottomWidth:1,borderBottomColor:'#E2E8F0'}}><View style={{flex:1}}><Text style={{fontSize:15,fontWeight:'800',color:'#0F172A'}}>{l.nativeLabel}</Text><Text style={{fontSize:12,color:'#64748B',marginTop:2}}>{l.label}</Text></View>{locale===l.code&&<Ionicons name="checkmark-circle" size={22} color="#1769FF"/>}</TouchableOpacity>)}</View></TouchableOpacity></Modal>
  </View>;
}
