// Webhook response received from The Next Leg
// {
//   "createdAt": "2023-04-04T13:07:01.927Z",
//   "buttons": [
//       "U1",
//       "U2",
//       "U3",
//       "U4",
//       "🔄",
//       "V1",
//       "V2",
//       "V3",
//       "V4"
//   ],
//   "imageUrl": "your-image-url",
//   "buttonMessageId": "OtfxNzfMIKBPVE1aP4u4",
//   "originatingMessageId": "your-message-id",
//   "content": "your-original-prompt",
//   "ref": "",
//   "responseAt": "2023-04-04T13:06:01.927Z"
// }
import { db } from '@/firebase';
import { addDoc, deleteDoc, setDoc, collection, doc } from 'firebase/firestore';

export default async function handler(req: any, res: any) {
  const { imageUrl, buttonMessageId, buttons, content, ref, originatingMessageId } = req.body as any;
  await deleteDoc(doc(db, 'queue', originatingMessageId))

  imageUrl ? await addDoc(collection(db, 'imgs'), {
    imgUrl: imageUrl,
    createdAt: new Date(), // serverTimestamp() -> Not all clients will have the same time
    buttonMessageId,
    buttons,
    content,
    ref,
  }) :
    await setDoc(doc(db, "errorMsg", "error"), {
      error: content,
    });

  const docRef = doc(db, "users", ref);
  const colRef = collection(docRef, "imgs");
  ref.length > 0 && addDoc(colRef, {
    imgUrl: imageUrl,
    createdAt: new Date(), // serverTimestamp() -> Not all clients will have the same time
    buttonMessageId,
    buttons,
    content,
    ref,
  });
  res.status(200).json({ name: 'John Doe' });
}
