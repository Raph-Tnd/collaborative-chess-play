package main.java.WebSocket;

import com.fasterxml.jackson.databind.util.JSONPObject;
import main.java.Data.Model.MoveModel;
import main.java.Exception.ExceptionGameDoesNotExist;
import main.java.Exception.ExceptionNotPlayerTurn;
import main.java.Exception.ExceptionUserAlreadyPlayed;
import main.java.Game.GameService;
import org.dom4j.rule.Mode;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.json.JSONObject;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class WebSocketController {

    @Autowired
    private GameService gameService;

    @MessageMapping(value = "/test")
    @SendTo("/chat/private")
    public String send(@RequestBody String message) {
        System.out.println("WR recue : " + message);
        return "Hello " + message +" !";
    }

    @MessageMapping(value = "/submitMove")
    @SendTo("/chat/chosenMove")
    public MoveModel sendChosenMove(@RequestBody String message) throws JSONException, ExceptionUserAlreadyPlayed, InterruptedException, ExceptionNotPlayerTurn, ExceptionGameDoesNotExist {
        MoveModel temp = String2MoveModel(message);
        gameService.vote(temp);
        return gameService.getChosenMove(temp.game_id) ;
    }

    private MoveModel String2MoveModel(String str) throws JSONException {
        MoveModel res = new MoveModel();
        JSONObject temp = new JSONObject(str);
        res.game_id = temp.getString("game_id");
        res.player = temp.getString("player");
        res.x1Coord = Integer.valueOf(temp.getString("x1Coord"));
        res.x2Coord = Integer.valueOf(temp.getString("x2Coord"));
        res.y1Coord = Integer.valueOf(temp.getString("y1Coord"));
        res.y2Coord = Integer.valueOf(temp.getString("y2Coord"));
        return res;
    }
}
