package main.java.Game;

import main.java.Data.Model.MoveModel;
import main.java.Data.Model.PlayerModel;
import main.java.Exception.*;
import main.java.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class GameController {

    final String prefixe = "/game";

    @Autowired
    private GameService gameService;

    @PostMapping(prefixe + "/vote")
    public void voteMove(@RequestBody MoveModel moveModel) throws InterruptedException, ExceptionUserAlreadyPlayed, ExceptionNotPlayerTurn {
        gameService.vote(moveModel);
    }

    @PostMapping(prefixe + "/create")
    public String createGame() throws ExceptionGameAlreadyExist {
        return gameService.create();
    }

    @DeleteMapping(prefixe + "/delete/{id}")
    public void delete(@PathVariable String id) throws ExceptionGameDoesNotExist {
        gameService.delete(id);
    }

    @GetMapping(prefixe + "/getChosenMove/{id}")
    public MoveModel sendMove(@PathVariable String id) throws ExceptionGameDoesNotExist {
        return gameService.getChosenMove(id);
    }
}
