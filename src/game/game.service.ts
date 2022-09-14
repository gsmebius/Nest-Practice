import { Injectable } from '@nestjs/common';

import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { Game } from "./interface/game.interface";
import { CreateGameDTO } from "./dto/game.dto";

@Injectable()
export class GameService {

    constructor(@InjectModel('Game') private readonly GameModel: Model<Game>) { }

    // Get all games
    async getGames(): Promise<Game[]> {
        const games = await this.GameModel.find();
        return games;
    }

    // Get a single game
    async getGame(GameID: string): Promise<Game> {
        const game = await this.GameModel.findById(GameID);
        return game;
    }

    // Post a single game
    async createGame(createGameDTO: CreateGameDTO): Promise<Game> {
        const newGame = new this.GameModel(createGameDTO);
        return newGame.save();
    }

    // Delete game
    async deleteGame(GameID: string): Promise<Game> {
        const deletedGame = await this.GameModel.findOneAndDelete({ _id: GameID});
        return deletedGame;
    }

    // Put a single game
    async updateGame(GameID: string, createGameDTO: CreateGameDTO): Promise<Game> {
        const updatedGame = await this.GameModel.findByIdAndUpdate(GameID, createGameDTO, { new: true });
        return updatedGame;
    }

}
