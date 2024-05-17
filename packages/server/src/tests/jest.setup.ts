// import { afterAll, beforeAll } from '@jest/globals';

// import { pool } from '../infrastructure/data';


// beforeAll(async () => {
//     try {
//         console.log('Setup test environment...');
//     } catch (error) {
//         console.error('Error during beforeAll in setup:');
//         console.error(error);
//     }
// })

// // Une fonction qui sera executée après tout les tests réalisées, et on va en profiter pour nettoyer notre environnement: à savoir notre schéma
// // test de notre db
// afterAll(async () => {
//     try {
//         //await db.execute(sql`DROP SCHEMA IF EXISTS test CASCADE`);
//         await pool.end();
//     } catch (error) {
//         console.error('Error during afterAll:', error);
//     }
// });