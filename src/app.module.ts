import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameController } from './game/game.controller';
import { GameService } from './game/game.service';
import { GameModule } from './game/game.module';

//Manualmente:
// Importar Mongo
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [ 
    GameModule, 
    MongooseModule.forRoot('mongodb://localhost/data01', 
    {
      useNewUrlParser: true
    })
  ],
  controllers: [AppController, GameController],
  providers: [AppService, GameService],
})
export class AppModule {}




