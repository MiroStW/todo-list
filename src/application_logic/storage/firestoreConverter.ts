import {
  DocumentReference,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { ProjectData, TodoData } from "types";

interface LocalDocumentData<D> {
  ref: DocumentReference<D>;
  data: D;
}

const createFirestoreConverter = <T>(): FirestoreDataConverter<
  LocalDocumentData<T>
> => {
  return {
    toFirestore: (localData: LocalDocumentData<T>) => {
      return localData.data;
    },
    fromFirestore: (
      snapshot: QueryDocumentSnapshot<T>
    ): LocalDocumentData<T> => {
      // const data = snapshot.data(options);
      return {
        ref: snapshot.ref,
        data: snapshot.data(),
      };
    },
  };
};

const projectConverter = createFirestoreConverter<ProjectData>();
const todoConverter = createFirestoreConverter<TodoData>();

export { projectConverter, todoConverter };
