import { Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TrackModule } from './track/track_module';
import { FileModule } from './file/file.module';
import * as path from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
    MongooseModule.forRoot('mongodb+srv://Umid:Umidu@cluster0.6grwq.mongodb.net/music-service-app?retryWrites=true&w=majority'),
    TrackModule,
    FileModule
  ]
})

export class AppModlue{}