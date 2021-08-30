import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from './schemas/track.schema';
import { Comment, CommentSchema } from './schemas/comments.schema';
import { TrackController } from './track_controller';
import { TrackService } from './track_service';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
    MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}])
  ],
  controllers: [TrackController],
  providers: [TrackService, FileService]
})

export class TrackModule{}
