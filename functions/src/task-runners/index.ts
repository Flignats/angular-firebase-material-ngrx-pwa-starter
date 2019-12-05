import * as admin from 'firebase-admin';
import * as buildingsFunctions from '../buildings';
import * as buildFunctions from '../build';

const firestoreInstance = admin.firestore();

export async function onTaskRunnerTriggered(context: any) {
    const serverTimestamp = admin.firestore.Timestamp.now();

    // Query all documents ready to perform
    const query = firestoreInstance
        .collection('userTasks')
        .where('performAt', '<=', serverTimestamp)
        .where('status', '==', 'scheduled');

    const tasks = await query.get();

    // Jobs to execute concurrently.
    const jobs: Promise<any>[] = [];

    // Loop over documents and push job.
    tasks.forEach(snapshot => {
        const { worker, options } = snapshot.data();

        const job = workers[worker](options)

            // Update doc with status on success or error
            .then(() => snapshot.ref.update({ status: 'complete' }))
            .catch(err => snapshot.ref.update({ status: err }));

        jobs.push(job);
    });

    // Execute all jobs concurrently
    return await Promise.all(jobs);
}

// Optional interface, all worker functions should return Promise.
interface Workers {
    [key: string]: (options: any) => Promise<any>;
}

// Business logic for named tasks. Function name should match worker field on task document.
const workers: Workers = {
    helloWorld: () => firestoreInstance.collection('logs').add({ hello: 'world' }),
    onCompleteBuild: (data) => buildFunctions.onCompleteBuild(data),
    onSetBuildingsTriggered: (context) => buildingsFunctions.onSetBuildingsTriggered(undefined, context)
};
