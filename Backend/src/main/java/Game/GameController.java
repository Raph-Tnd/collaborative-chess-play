package main.java.Game;

import main.java.Data.Model.MoveModel;
import main.java.Data.Model.PlayerModel;
import main.java.Exception.ExceptionGameAlreadyExist;
import main.java.Exception.ExceptionGameDoesNotExist;
import main.java.Exception.ExceptionUserAlreadyConnected;
import main.java.Exception.ExceptionUserAlreadyPlayed;
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
    public void voteMove(@RequestBody MoveModel moveModel) throws InterruptedException, ExceptionUserAlreadyPlayed {
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
    public MoveModel sendMode(@PathVariable String id) throws ExceptionGameDoesNotExist {
        return gameService.getChosenMove(id);
    }
}
