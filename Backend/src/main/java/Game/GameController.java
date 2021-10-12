package main.java.Game;

import main.java.Data.Model.MoveModel;
import main.java.Data.Model.PlayerModel;
import main.java.Exception.ExceptionGameAlreadyExist;
import main.java.Exception.ExceptionGameDoesNotExist;
import main.java.Exception.ExceptionUserAlreadyConnected;
import main.java.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class GameController {
    @Autowired
    private GameService gameService;

    @PostMapping("/game/vote")
    public void voteMove(@RequestBody MoveModel moveModel) throws InterruptedException {
        System.out.println("Team = " + moveModel.team);
        gameService.vote(moveModel);
    }

    @PostMapping("/game/create")
    public String createGame() throws ExceptionGameAlreadyExist {
        return gameService.create();
    }

    @DeleteMapping("/game/delete/{id}")
    public void delete(@PathVariable String id) throws ExceptionGameDoesNotExist {
        gameService.delete(id);
    }

    @GetMapping("/game/getChosenMove/{id}")
    public String sendMode(@PathVariable String id) throws ExceptionGameDoesNotExist {
        return gameService.getChosenMove(id);
    }
}
