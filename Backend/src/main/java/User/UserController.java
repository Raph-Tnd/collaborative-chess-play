package main.java.User;

import main.java.Data.Entity.PlayerId;
import main.java.Data.Model.MoveModel;
import main.java.Data.Model.PlayerModel;
import main.java.Exception.ExceptionGameDoesNotExist;
import main.java.Exception.ExceptionUserAlreadyConnected;
import main.java.Exception.ExceptionUserDoesNotExist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Ajoute l'utilisateur passé en paramètre à la partie en cours
     * @param playerModel Le nom et l'équipe du joueur qui rejoint la partie
     */
    @PostMapping("/user/connect")
    public void connectPlayer(@RequestBody PlayerModel playerModel) throws ExceptionUserAlreadyConnected, ExceptionGameDoesNotExist {
        this.userService.addPlayer(playerModel);
    }

    @DeleteMapping("/user/delete/{gameId}")
    public void deleteUser(@RequestBody String name, @PathVariable String idGame) throws ExceptionUserDoesNotExist {
        this.userService.deletePlayer(name, idGame);
    }

    /**
     * Récupère la liste complète des utilisateurs connectés
     * @return La liste des joueurs connectés ainsi que leur équipe respective
     */
    @GetMapping("/user/players/{id}")
    public @ResponseBody
    List<PlayerModel> getAllPlayers(@PathVariable String id) {
        return this.userService.getAllPlayer(id);
    }
}
