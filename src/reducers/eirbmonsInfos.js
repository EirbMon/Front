import { LOAD_EIRBMON_SUCCESS } from '../constants/action-types';

export default function eirbmonsInfos(state, action) {

    switch (action.type) {

        case LOAD_EIRBMON_SUCCESS: {
            let payload = action.payload;
            return Object.assign({}, state, {
                eirbmons: payload,
            });
        }

        // case LOAD_EIRBMON_SUCCESS: {
        //     return state || {
        //         eirbmons: [
        //             { "_id": { "$oid": "5e08e949b9998c72a641e036" }, "idInBlockchain": 6, "__v": 0, "canBeExhangedTo": 0, "canBeSelled": false, "created_date": { "$date": { "$numberLong": "1577642163000" } }, "field": "Elec", "hp": 56, "name": "Salameche", "owner_id": "0xca75864fc65c71a7ba0c2e277612427a25495ae1", "price": 0, "skills_id": [7, 7, 3], "type": "Salameche", "value": 50 },
        //             { "_id": { "$oid": "5e08e949b9998c72a641e036" }, "idInBlockchain": 6, "__v": 0, "canBeExhangedTo": 0, "canBeSelled": false, "created_date": { "$date": { "$numberLong": "1577642163000" } }, "field": "Elec", "hp": 56, "name": "Salameche", "owner_id": "0xca75864fc65c71a7ba0c2e277612427a25495ae1", "price": 0, "skills_id": [7, 7, 3], "type": "Salameche", "value": 50 },
        //             { "_id": { "$oid": "5e08e949b9998c72a641e036" }, "idInBlockchain": 6, "__v": 0, "canBeExhangedTo": 0, "canBeSelled": false, "created_date": { "$date": { "$numberLong": "1577642163000" } }, "field": "Elec", "hp": 56, "name": "Salameche", "owner_id": "0xca75864fc65c71a7ba0c2e277612427a25495ae1", "price": 0, "skills_id": [7, 7, 3], "type": "Salameche", "value": 50 },
        //             { "_id": { "$oid": "5e08e949b9998c72a641e036" }, "idInBlockchain": 6, "__v": 0, "canBeExhangedTo": 0, "canBeSelled": false, "created_date": { "$date": { "$numberLong": "1577642163000" } }, "field": "Elec", "hp": 56, "name": "Salameche", "owner_id": "0xca75864fc65c71a7ba0c2e277612427a25495ae1", "price": 0, "skills_id": [7, 7, 3], "type": "Salameche", "value": 50 },
        //             { "_id": { "$oid": "5e08e949b9998c72a641e036" }, "idInBlockchain": 6, "__v": 0, "canBeExhangedTo": 0, "canBeSelled": false, "created_date": { "$date": { "$numberLong": "1577642163000" } }, "field": "Elec", "hp": 56, "name": "Salameche", "owner_id": "0xca75864fc65c71a7ba0c2e277612427a25495ae1", "price": 0, "skills_id": [7, 7, 3], "type": "Salameche", "value": 50 },
        //             { "_id": { "$oid": "5e08e949b9998c72a641e036" }, "idInBlockchain": 6, "__v": 0, "canBeExhangedTo": 0, "canBeSelled": false, "created_date": { "$date": { "$numberLong": "1577642163000" } }, "field": "Elec", "hp": 56, "name": "Salameche", "owner_id": "0xca75864fc65c71a7ba0c2e277612427a25495ae1", "price": 0, "skills_id": [7, 7, 3], "type": "Salameche", "value": 50 },
        //             { "_id": { "$oid": "5e08e949b9998c72a641e036" }, "idInBlockchain": 6, "__v": 0, "canBeExhangedTo": 0, "canBeSelled": false, "created_date": { "$date": { "$numberLong": "1577642163000" } }, "field": "Elec", "hp": 56, "name": "Salameche", "owner_id": "0xca75864fc65c71a7ba0c2e277612427a25495ae1", "price": 0, "skills_id": [7, 7, 3], "type": "Salameche", "value": 50 },
        //             { "_id": { "$oid": "5e08e949b9998c72a641e036" }, "idInBlockchain": 6, "__v": 0, "canBeExhangedTo": 0, "canBeSelled": false, "created_date": { "$date": { "$numberLong": "1577642163000" } }, "field": "Elec", "hp": 56, "name": "Salameche", "owner_id": "0xca75864fc65c71a7ba0c2e277612427a25495ae1", "price": 0, "skills_id": [7, 7, 3], "type": "Salameche", "value": 50 },
        //             { "_id": { "$oid": "5e08e949b9998c72a641e036" }, "idInBlockchain": 6, "__v": 0, "canBeExhangedTo": 0, "canBeSelled": false, "created_date": { "$date": { "$numberLong": "1577642163000" } }, "field": "Elec", "hp": 56, "name": "Salameche", "owner_id": "0xca75864fc65c71a7ba0c2e277612427a25495ae1", "price": 0, "skills_id": [7, 7, 3], "type": "Salameche", "value": 50 }
        //         ],
        //     }
        // }

        default: {
            // send back default datas for state
            return state || {
                eirbmons: [
                    { "_id": { "$oid": "5e08e949b9998c72a641e036" }, "idInBlockchain": 6, "__v": 0, "canBeExhangedTo": 0, "canBeSelled": false, "created_date": { "$date": { "$numberLong": "1577642163000" } }, "field": "Elec", "hp": 56, "name": "Salameche", "owner_id": "0xca75864fc65c71a7ba0c2e277612427a25495ae1", "price": 0, "skills_id": [7, 7, 3], "type": "Salameche", "value": 50 },
                    { "_id": { "$oid": "5e08e949b9998c72a641e036" }, "idInBlockchain": 6, "__v": 0, "canBeExhangedTo": 0, "canBeSelled": false, "created_date": { "$date": { "$numberLong": "1577642163000" } }, "field": "Elec", "hp": 56, "name": "Salameche", "owner_id": "0xca75864fc65c71a7ba0c2e277612427a25495ae1", "price": 0, "skills_id": [7, 7, 3], "type": "Salameche", "value": 50 },
                    { "_id": { "$oid": "5e08e949b9998c72a641e036" }, "idInBlockchain": 6, "__v": 0, "canBeExhangedTo": 0, "canBeSelled": false, "created_date": { "$date": { "$numberLong": "1577642163000" } }, "field": "Elec", "hp": 56, "name": "Salameche", "owner_id": "0xca75864fc65c71a7ba0c2e277612427a25495ae1", "price": 0, "skills_id": [7, 7, 3], "type": "Salameche", "value": 50 },
                    { "_id": { "$oid": "5e08e949b9998c72a641e036" }, "idInBlockchain": 6, "__v": 0, "canBeExhangedTo": 0, "canBeSelled": false, "created_date": { "$date": { "$numberLong": "1577642163000" } }, "field": "Elec", "hp": 56, "name": "Salameche", "owner_id": "0xca75864fc65c71a7ba0c2e277612427a25495ae1", "price": 0, "skills_id": [7, 7, 3], "type": "Salameche", "value": 50 },
                    { "_id": { "$oid": "5e08e949b9998c72a641e036" }, "idInBlockchain": 6, "__v": 0, "canBeExhangedTo": 0, "canBeSelled": false, "created_date": { "$date": { "$numberLong": "1577642163000" } }, "field": "Elec", "hp": 56, "name": "Salameche", "owner_id": "0xca75864fc65c71a7ba0c2e277612427a25495ae1", "price": 0, "skills_id": [7, 7, 3], "type": "Salameche", "value": 50 },
                    { "_id": { "$oid": "5e08e949b9998c72a641e036" }, "idInBlockchain": 6, "__v": 0, "canBeExhangedTo": 0, "canBeSelled": false, "created_date": { "$date": { "$numberLong": "1577642163000" } }, "field": "Elec", "hp": 56, "name": "Salameche", "owner_id": "0xca75864fc65c71a7ba0c2e277612427a25495ae1", "price": 0, "skills_id": [7, 7, 3], "type": "Salameche", "value": 50 },
                    { "_id": { "$oid": "5e08e949b9998c72a641e036" }, "idInBlockchain": 6, "__v": 0, "canBeExhangedTo": 0, "canBeSelled": false, "created_date": { "$date": { "$numberLong": "1577642163000" } }, "field": "Elec", "hp": 56, "name": "Salameche", "owner_id": "0xca75864fc65c71a7ba0c2e277612427a25495ae1", "price": 0, "skills_id": [7, 7, 3], "type": "Salameche", "value": 50 },
                    { "_id": { "$oid": "5e08e949b9998c72a641e036" }, "idInBlockchain": 6, "__v": 0, "canBeExhangedTo": 0, "canBeSelled": false, "created_date": { "$date": { "$numberLong": "1577642163000" } }, "field": "Elec", "hp": 56, "name": "Salameche", "owner_id": "0xca75864fc65c71a7ba0c2e277612427a25495ae1", "price": 0, "skills_id": [7, 7, 3], "type": "Salameche", "value": 50 },
                    { "_id": { "$oid": "5e08e949b9998c72a641e036" }, "idInBlockchain": 6, "__v": 0, "canBeExhangedTo": 0, "canBeSelled": false, "created_date": { "$date": { "$numberLong": "1577642163000" } }, "field": "Elec", "hp": 56, "name": "Salameche", "owner_id": "0xca75864fc65c71a7ba0c2e277612427a25495ae1", "price": 0, "skills_id": [7, 7, 3], "type": "Salameche", "value": 50 }
                ],
            }
        }
    }

}