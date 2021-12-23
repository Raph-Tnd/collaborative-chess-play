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

    @MessageMapping(value = "/submitMove/{idGame}")
    @SendTo("/chat/getChosenMove/{idGame}")
    public MoveModel sendChosenMove(@RequestBody String message) throws JSONException, ExceptionUserAlreadyPlayed, InterruptedException, ExceptionNotPlayerTurn, ExceptionGameDoesNotExist {
        MoveModel moveModel = MoveModel.FromString(message);
        gameService.vote(moveModel);
        return gameService.getChosenMove(moveModel.game_id) ;
    }
}
