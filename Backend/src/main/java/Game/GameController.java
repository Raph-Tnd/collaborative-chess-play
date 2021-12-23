package main.java.Game;

import main.java.Common.Configuration;
import main.java.Data.Model.MoveModel;
import main.java.Data.Model.PlayerModel;
import main.java.Exception.*;
import main.java.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class GameController {

    final String prefixe = "/game";

    @Autowired
    private GameService gameService;



    @PostMapping(prefixe + "/create")
    public String createGame() throws ExceptionGameAlreadyExist {
        return gameService.create();
    }

    @DeleteMapping(prefixe + "/delete/{id}")
    public void delete(@PathVariable String id) throws ExceptionGameDoesNotExist {
        gameService.delete(id);
    }

}
