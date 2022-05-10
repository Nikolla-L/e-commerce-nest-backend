import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

const property = {
    username: 'nikolla',
    password: '12341234',
    hostAddress: 'nikoloza.84pn3.mongodb.net',
    database: 'myFirstDatabase'
}

@Module({
    imports: [MongooseModule.forRoot( `mongodb+srv://${property.username}:${property.password}@${property.hostAddress}/${property.database}?retryWrites=true&w=majority`)]
})
export class DBModule {}