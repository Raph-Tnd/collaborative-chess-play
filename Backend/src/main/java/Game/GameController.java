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
public class GameController {
    @Autowired
    private GameService gameService;

    @GetMapping("/game/vote/{id}")
    public List<MoveModel> getVotes(@PathVariable String id) {
        return gameService.getVotes(id);
    }

    @PostMapping("/game/vote")
    public void voteMove(@RequestBody MoveModel moveModel) throws InterruptedException {
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
}
