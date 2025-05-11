import PocketBase from 'pocketbase';

const POCKETBASE_URL = 'http://localhost:8090'; // Zamijenite URL s vašim PocketBase serverom.

export const pocketbase = new PocketBase(POCKETBASE_URL);
