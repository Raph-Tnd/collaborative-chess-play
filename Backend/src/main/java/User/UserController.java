package main.java.User;

import main.java.Data.Model.MoveModel;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @GetMapping("/game/{id}")
    public String movePiece(@PathVariable int id){
        return "Moved piece n°" + id;
    } //todo

    @PostMapping("/game/vote")
    public String voteMove(@RequestBody MoveModel moveModel) {
        return "Voted for move piece n°" + moveModel.pieceId + " to " + moveModel.xCoord + "," + moveModel.yCoord; //todo
    }
}
