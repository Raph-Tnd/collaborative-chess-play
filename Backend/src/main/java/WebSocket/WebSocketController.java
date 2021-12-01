package main.java.WebSocket;

import main.java.Data.Model.MoveModel;
import main.java.Exception.ExceptionNotPlayerTurn;
import main.java.Exception.ExceptionUserAlreadyPlayed;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class WebSocketController {
    final String prefixe = "/game";

    @SubscribeMapping(value = (prefixe + "/vote"))
    public void voteMove(@RequestBody MoveModel moveModel) throws InterruptedException, ExceptionUserAlreadyPlayed, ExceptionNotPlayerTurn {
        //TODO implémenter le vote pour les webs sockets
    }
}
