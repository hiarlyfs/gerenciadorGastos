import Realm from 'realm'

import CompraSchema from '../schemas/CompraSchema'

export default function getRealm() {
    return Realm.open({
        schema: [CompraSchema],
    })
}