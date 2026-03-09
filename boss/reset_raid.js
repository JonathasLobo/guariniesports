// ============================================================
// RESET COMPLETO DE RAID
// Cole no console do browser (F12 → Console) enquanto estiver
// logado no site. Apaga raidTeam, raidBag, raidStatus,
// raidSorteio, raidUpdatedAt e pokedex do usuário atual.
// ============================================================

const { initializeApp, getApps } = await import("https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js");
const { getFirestore, doc, updateDoc, deleteField } = await import("https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js");
const { getAuth } = await import("https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js");

const app = getApps()[0];
const db  = getFirestore(app);
const auth = getAuth(app);
const uid  = auth.currentUser?.uid;

if (!uid) {
  console.error("❌ Nenhum usuário logado.");
} else {
  await updateDoc(doc(db, "usuarios", uid), {
    raidStatus:    null,
    raidTeam:      [],
    raidBag:       deleteField(),   // remove o campo inteiro da bag
    raidSorteio:   null,
    raidUpdatedAt: null,
    pokedex:       [],              // limpa a Pokédex
  });
  console.log("✅ Raid + Pokédex resetados! Recarregue a página.");
}
