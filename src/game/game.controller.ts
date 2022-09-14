import { Controller, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, Delete, Query, Put } from '@nestjs/common';

import { GameService } from "./game.service";

import { CreateGameDTO } from "./dto/game.dto";

@Controller('game')
export class GameController {

    constructor(private gameService: GameService) { }

    // Add game:
    @Post('/')
    async createGame(@Res() res, @Body() createGameDTO: CreateGameDTO) {
        const game = await this.gameService.createGame(createGameDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Juego creado amigos :)',
            game
        });
    }

    // Get games: 
    @Get('/')
    async getGames(@Res() res) {
        const games = await this.gameService.getGames();
        return res.status(HttpStatus.OK).json(games);
    }

    // GET single game:
    @Get('/:GameID')
    async getGame(@Res() res, @Param('GameID') GameID) {
        const game = await this.gameService.getGame(GameID);
        if (!game) throw new NotFoundException('ups, ese juego no existe, saludos :)');
        return res.status(HttpStatus.OK).json(game);
    }

    // Delete game:
    @Delete('/')
    async deleteGame(@Res() res, @Query('GameID') GameID) {
        const gameDeleted = await this.gameService.deleteGame(GameID);
        if (!gameDeleted) throw new NotFoundException('Ups, estás tratando de borrar un juego no existente :)');
        return res.status(HttpStatus.OK).json({
            message: 'Juego borrado de forma altamente exitosa :)',
            gameDeleted
        });
    }

    // Update game: 
    @Put('/')
    async updateGame(@Res() res, @Body() createGameDTO: CreateGameDTO, @Query('GameID') GameID) {
        const updatedGame = await this.gameService.updateGame(GameID, createGameDTO);
        if (!updatedGame) throw new NotFoundException('El juego no existe bro, jaja saludos :)');
        return res.status(HttpStatus.OK).json({
            message: 'Producto actualizado de forma triple existosa, viva la vida :)',
            updatedGame
        });
    }

}
