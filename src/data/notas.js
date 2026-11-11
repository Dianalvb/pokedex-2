import {
    addDoc, collection, getDocs, orderBy, query, serverTimestamp
}from 'firebase/firestore'
import { db } from '../firebase'

function colecionDe(uid){
    return collection(db, 'usuarios', uid, 'notas')
}

export async function guardarNota(uid, texto){
    await addDoc(colecionDe(uid), {
        texto: texto.trim(), 
        creadaEn: serverTimestamp()
    })
}

export async function cargarNotas(uid) {
    const snap = await getDocs(query(colecionDe(uid), orderBy('creadaEn', 'desc')))
    return snap.docs.map((d)=>({id: d.id, ...d.data()}))   
}