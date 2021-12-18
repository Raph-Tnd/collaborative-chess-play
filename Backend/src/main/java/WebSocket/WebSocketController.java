package main.java.WebSocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class WebSocketController {

    @MessageMapping(value = "/test")
    @SendTo("/chat/private")
    public String send(@RequestBody String message) {
        System.out.println("WR recue : " + message);
        return "Hello " + message +" !";
    }
}
