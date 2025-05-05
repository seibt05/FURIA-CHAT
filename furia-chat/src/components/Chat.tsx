import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import "../styles/App.css";

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (text.trim() === "") return;
    await addDoc(collection(db, "messages"), {
      text,
      createdAt: serverTimestamp(),
    });
    setText("");
  };

  const deleteAllMessages = async () => {
    const q = query(collection(db, "messages"));
    const snapshot = await getDocs(q);
    const deletions = snapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletions);
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">Zona da FURIA</h1>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className="chat-bubble">
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input-container">
        <input
          className="chat-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite sua mensagem"
        />
        <button className="chat-button" onClick={sendMessage}>
          Enviar
        </button>
      </div>
      <button className="chat-button danger" onClick={deleteAllMessages}>
  🗑️ Apagar tudo
</button>
    </div>
  );
}
