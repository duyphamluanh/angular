export interface Task {
  id ? : string;
  title: string;
  description: string;
  date? : firebase.default.firestore.Timestamp;
}
