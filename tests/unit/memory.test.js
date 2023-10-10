const {
    writeFragment,
    readFragment,
    writeFragmentData,
    readFragmentData,
} = require('../../src/model/data');
//const MemoryDB = require('../../src/model/data/memory/memory-db');
//const data = new MemoryDB();
//const metadata = new MemoryDB();

describe('In-Memory Database Tests', () => {
    const ownerId = 'user123';
    const fragmentId = 'fragment456';
    const fragment = {
        ownerId,
        id: fragmentId,
        // ...other fragment properties
    };
    const dataBuffer = Buffer.from('Fragment Data');

    

    it('should write and read a fragment', async () => {
        await writeFragment(fragment);
        const retrievedFragment = await readFragment(ownerId, fragmentId);
        expect(retrievedFragment).toEqual(fragment);
    });

    it('should return undefined when reading a non-existent fragment', async () => {
        const nonExistentFragment = await readFragment(ownerId, 'nonExistentId');
        expect(nonExistentFragment).toBeUndefined();
    });

    it('should write and read fragment data', async () => {
        await writeFragmentData(ownerId, fragmentId, dataBuffer);
        const retrievedData = await readFragmentData(ownerId, fragmentId);
        expect(retrievedData).toEqual(dataBuffer);
    });

    it('should return undefined when reading non-existent fragment data', async () => {
        const nonExistentData = await readFragmentData(ownerId, 'nonExistentId');
        expect(nonExistentData).toBeUndefined();
    });
});
