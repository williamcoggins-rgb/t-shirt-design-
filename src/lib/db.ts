import { GeneratedDesign } from "@/types";

const DB_NAME = "tshirt-studio";
const DB_VERSION = 1;
const DESIGNS_STORE = "designs";
const IMAGES_STORE = "images";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(DESIGNS_STORE)) {
        const store = db.createObjectStore(DESIGNS_STORE, { keyPath: "id" });
        store.createIndex("createdAt", "createdAt", { unique: false });
        store.createIndex("category", "category", { unique: false });
      }
      if (!db.objectStoreNames.contains(IMAGES_STORE)) {
        db.createObjectStore(IMAGES_STORE, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveDesignToDB(
  design: GeneratedDesign,
  imageBase64: string
): Promise<void> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction([DESIGNS_STORE, IMAGES_STORE], "readwrite");
    tx.objectStore(DESIGNS_STORE).put(design);
    tx.objectStore(IMAGES_STORE).put({ id: design.id, data: imageBase64 });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getAllDesigns(): Promise<GeneratedDesign[]> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(DESIGNS_STORE, "readonly");
    const request = tx.objectStore(DESIGNS_STORE).index("createdAt").getAll();
    request.onsuccess = () => {
      const designs = request.result as GeneratedDesign[];
      // Return newest first
      resolve(designs.reverse());
    };
    request.onerror = () => reject(request.error);
  });
}

export async function getDesignImage(id: string): Promise<string | null> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(IMAGES_STORE, "readonly");
    const request = tx.objectStore(IMAGES_STORE).get(id);
    request.onsuccess = () => {
      resolve(request.result?.data || null);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function updateDesignInDB(
  id: string,
  updates: Partial<GeneratedDesign>,
  newImageBase64?: string
): Promise<GeneratedDesign | null> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const readTx = db.transaction(DESIGNS_STORE, "readonly");
    const getReq = readTx.objectStore(DESIGNS_STORE).get(id);

    getReq.onsuccess = () => {
      const existing = getReq.result as GeneratedDesign | undefined;
      if (!existing) {
        resolve(null);
        return;
      }

      const updated = { ...existing, ...updates };
      const stores = newImageBase64
        ? [DESIGNS_STORE, IMAGES_STORE]
        : [DESIGNS_STORE];
      const writeTx = db.transaction(stores, "readwrite");
      writeTx.objectStore(DESIGNS_STORE).put(updated);
      if (newImageBase64) {
        writeTx.objectStore(IMAGES_STORE).put({ id, data: newImageBase64 });
      }
      writeTx.oncomplete = () => resolve(updated);
      writeTx.onerror = () => reject(writeTx.error);
    };
    getReq.onerror = () => reject(getReq.error);
  });
}

export async function deleteDesignFromDB(id: string): Promise<void> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction([DESIGNS_STORE, IMAGES_STORE], "readwrite");
    tx.objectStore(DESIGNS_STORE).delete(id);
    tx.objectStore(IMAGES_STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
