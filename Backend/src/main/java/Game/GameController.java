package main.java.Game;

import main.java.Data.Model.PlayerModel;
import main.java.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameController {

    @Autowired
    private UserService userService;

    @PostMapping("/user/connect")
    public void connectPlayer(@RequestBody PlayerModel playerModel) {
        this.userService.addPlayer(playerModel);
    }

    @GetMapping("/user/players")
    public String getAllPlayers() {
        return "Getting all players of the game";
    }
}
