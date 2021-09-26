package main.java.Game;

import main.java.Data.Model.MoveModel;
import main.java.Data.Model.PlayerModel;
import main.java.Exception.ExceptionGameAlreadyExist;
import main.java.Exception.ExceptionUserAlreadyConnected;
import main.java.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class GameController {
    @Autowired
    private GameService gameService;

    @PostMapping("/game/vote")
    public void voteMove(@RequestBody MoveModel moveModel) throws InterruptedException {
        gameService.vote(moveModel);
    }

    @PostMapping("/game/create")
    public String createGame() throws ExceptionGameAlreadyExist {
        return gameService.create();
    }
}
